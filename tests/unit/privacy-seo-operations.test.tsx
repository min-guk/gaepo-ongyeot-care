import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { buildRobots } from "../../src/app/robots";
import { buildSitemap } from "../../src/app/sitemap";
import PrivacyPage from "../../src/app/privacy/page";
import ContactPage from "../../src/app/contact/page";
import RecruitmentPage from "../../src/app/recruitment/page";
import { inquiryEnvironment } from "../../src/lib/forms/environment";
import { inquiryFieldMatrix, privacyApprovalState, prohibitedInquiryFields } from "../../src/lib/privacy/disclosure";
import { localBusinessJsonLd } from "../../src/lib/seo/local-business";
import { siteConfig, type SiteFacts, type VerifiedFact } from "../../src/lib/config/site";
import { assertSyntheticTarget, runSynthetic, syntheticFixtures } from "../../scripts/run-synthetic-inquiries.mjs";

const verified = <T extends string | readonly string[]>(value: T): VerifiedFact<T> => ({
  value, status: "verified", source: "https://evidence.example/fact",
  verifiedAt: "2026-07-21T00:00:00.000Z", reviewDueAt: "2027-01-21T00:00:00.000Z",
});

function verifiedFacts(): SiteFacts {
  const values: Record<string, string | readonly string[]> = {
    legalName: "검증 법인명", address: "검증 주소", phone: "02-1234-5678", hours: "검증 운영시간",
    designatedServices: ["검증 서비스"], serviceArea: ["검증 지역"], kakaoChannelUrl: "https://pf.kakao.com/_verified",
    privacyNoticeVersion: "privacy-v1", privacyReview: "qualified-review-1", canonicalUrl: "https://care.example/",
    rateLimitAdapter: "upstash-rest",
  };
  return Object.fromEntries(Object.keys(siteConfig.facts).map((key) => [key, verified(values[key]!)])) as SiteFacts;
}

describe("privacy approval and exact data disclosure", () => {
  const approvedEnv = { NODE_ENV: "test", PRIVACY_REVIEW_APPROVED: "true" } as NodeJS.ProcessEnv;

  it("publishes the exact field matrix while remaining visibly unapproved", () => {
    const html = renderToStaticMarkup(<PrivacyPage />);
    const approval = privacyApprovalState();
    expect(approval.approved).toBe(false);
    expect(approval.label).toBe("적격 검토 전 공개 초안 — 미승인");
    expect(html).toContain(approval.label);
    expect(html).toContain(inquiryFieldMatrix.care.join(", "));
    expect(html).toContain(inquiryFieldMatrix.recruitment.join(", "));
    expect(html).toContain(prohibitedInquiryFields.join(", "));
    expect(html).toContain("30일 이내");
    expect(html).toContain("국외 처리 여부");
  });

  it("gates care, recruitment, and server notice configuration until qualified approval", () => {
    const html = `${renderToStaticMarkup(<ContactPage />)}${renderToStaticMarkup(<RecruitmentPage />)}`;
    expect(html).toContain("적격 개인정보 검토가 승인되기 전에는");
    expect(html.match(/<button[^>]*disabled/gu)).toHaveLength(2);
    expect(inquiryEnvironment().PRIVACY_NOTICE_VERSION).toBeUndefined();
  });

  it("keeps the approved label and form gating aligned when facts and approval are fully verified", () => {
    const approvedFacts = verifiedFacts();
    const approval = privacyApprovalState(approvedFacts, approvedEnv);
    expect(approval.approved).toBe(true);
    expect(approval.label).toBe("적격 개인정보 검토 완료 — 승인");
    expect(approval.noticeVersion).toBe("privacy-v1");
    expect(approval.reviewVersion).toBe("qualified-review-1");
    const configured = inquiryEnvironment(approvedFacts, approvedEnv);
    expect(configured.PRIVACY_NOTICE_VERSION).toBe("privacy-v1");
  });

  it("fails closed when a fact is placeholder text or lacks provenance", () => {
    const placeholderFacts = verifiedFacts();
    placeholderFacts.privacyNoticeVersion = {
      ...placeholderFacts.privacyNoticeVersion,
      value: "__REQUIRED_privacyNoticeVersion",
    };
    expect(privacyApprovalState(placeholderFacts, approvedEnv).approved).toBe(false);

    const missingProvenanceFacts = verifiedFacts();
    missingProvenanceFacts.privacyReview = {
      ...missingProvenanceFacts.privacyReview,
      source: null,
    };
    expect(privacyApprovalState(missingProvenanceFacts, approvedEnv).approved).toBe(false);
  });
});

describe("verified-only SEO", () => {
  it("noindexes unresolved preview state and emits neither sitemap nor local JSON-LD", () => {
    expect(buildRobots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    expect(buildSitemap()).toEqual([]);
    expect(localBusinessJsonLd()).toBeNull();
  });

  it("uses only verified facts for canonical sitemap and optional local fields", () => {
    const facts = verifiedFacts();
    expect(buildRobots(facts)).toMatchObject({ rules: { allow: "/" }, sitemap: "https://care.example/sitemap.xml" });
    expect(buildSitemap(facts)).toHaveLength(8);
    const json = localBusinessJsonLd(facts)!;
    expect(json).toMatchObject({ name: "검증 법인명", url: "https://care.example/", telephone: "02-1234-5678", openingHours: "검증 운영시간" });
    facts.phone = { ...facts.phone, status: "unverified" };
    facts.hours = { ...facts.hours, status: "unverified" };
    const limited = localBusinessJsonLd(facts)!;
    expect(limited).not.toHaveProperty("telephone");
    expect(limited).not.toHaveProperty("openingHours");
  });
});

describe("staging-only synthetic workflow", () => {
  const baseEnv = {
    SYNTHETIC_ENVIRONMENT: "staging", SYNTHETIC_STAGING_BASE_URL: "https://staging.care.example",
    SYNTHETIC_ALLOWED_HOST: "staging.care.example", SYNTHETIC_PRODUCTION_HOST: "care.example",
    SYNTHETIC_PRIVACY_NOTICE_VERSION: "privacy-staging", SYNTHETIC_TURNSTILE_TOKEN: "test-token",
  };

  it("rejects production, unallowlisted, and forced-failure execution before network access", async () => {
    expect(() => assertSyntheticTarget({ ...baseEnv, SYNTHETIC_STAGING_BASE_URL: "https://care.example", SYNTHETIC_ALLOWED_HOST: "care.example" })).toThrow(/distinct from production/u);
    expect(() => assertSyntheticTarget({ ...baseEnv, SYNTHETIC_ALLOWED_HOST: "other.example" })).toThrow(/allowlisted/u);
    const fetchFn = vi.fn<typeof fetch>();
    await expect(runSynthetic({ ...baseEnv, SYNTHETIC_FORCE_FAILURE: "true" }, fetchFn)).rejects.toThrow(/Forced synthetic failure/u);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("requires both endpoint confirmed statuses and uses fixed non-person fixtures", async () => {
    const fetchFn = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ status: "confirmed", requestId: "synthetic-care" }))
      .mockResolvedValueOnce(Response.json({ status: "confirmed", requestId: "synthetic-recruitment" }));
    await expect(runSynthetic(baseEnv, fetchFn)).resolves.toBeUndefined();
    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(syntheticFixtures.care.name).toContain("합성");
    expect(syntheticFixtures.recruitment.name).toContain("합성");
    expect(String(fetchFn.mock.calls[0]![0])).toBe("https://staging.care.example/api/inquiries/care");
    expect(String(fetchFn.mock.calls[1]![0])).toBe("https://staging.care.example/api/inquiries/recruitment");
    expect(fetchFn.mock.calls[0]![1]?.headers).toMatchObject({ origin: "https://staging.care.example", "sec-fetch-site": "same-origin" });

    fetchFn.mockReset().mockResolvedValue(Response.json({ status: "known_failure" }, { status: 502 }));
    await expect(runSynthetic(baseEnv, fetchFn)).rejects.toThrow(/not transitively confirmed/u);
  });

  it("has schedule/manual triggers, no payload artifact, and no production or secret literals", () => {
    const workflow = readFileSync(new URL("../../.github/workflows/synthetic-inquiry.yml", import.meta.url), "utf8");
    const runner = readFileSync(new URL("../../scripts/run-synthetic-inquiries.mjs", import.meta.url), "utf8");
    expect(workflow).toContain("schedule:");
    expect(workflow).toContain("workflow_dispatch:");
    expect(workflow).toContain("environment: staging");
    expect(workflow).not.toMatch(/upload-artifact|environment:\s*production/iu);
    expect(`${workflow}${runner}`).not.toMatch(/discord\.com\/api\/webhooks\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+/u);
    expect(runner).not.toMatch(/console\.log\([^)]*(fields|result|body)/u);
  });
});
