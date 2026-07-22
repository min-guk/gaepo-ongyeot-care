import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { buildRobots } from "../../src/app/robots";
import { buildSitemap } from "../../src/app/sitemap";
import { buildRootMetadata } from "../../src/app/layout";
import PrivacyPage from "../../src/app/privacy/page";
import ContactPage from "../../src/app/contact/page";
import RecruitmentPage from "../../src/app/recruitment/page";
import { inquiryEnvironment } from "../../src/lib/forms/environment";
import { guides } from "../../src/lib/guides/collection";
import { inquiryFieldMatrix, privacyApprovalState, prohibitedInquiryFields } from "../../src/lib/privacy/disclosure";
import { localBusinessJsonLd } from "../../src/lib/seo/local-business";
import { buildPageMetadata } from "../../src/lib/seo/metadata";
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

const validProductionControls = {
  NODE_ENV: "production",
  SITE_RELEASE_MODE: "production",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "turnstile-site-key",
  TURNSTILE_SECRET: "turnstile-secret",
  RATE_LIMIT_PEPPER: "a-secure-rate-limit-pepper-at-least-32-characters",
  CARE_DISCORD_WEBHOOK_URL: "https://discord.com/api/webhooks/care/token",
  RECRUITMENT_DISCORD_WEBHOOK_URL: "https://discord.com/api/webhooks/recruitment/token",
  UPSTASH_REDIS_REST_URL: "https://redis.example.com",
  UPSTASH_REDIS_REST_TOKEN: "redis-token",
  DURABLE_RATE_LIMIT_ADAPTER: "upstash-rest",
  PRIVACY_REVIEW_APPROVED: "true",
} as NodeJS.ProcessEnv;

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
    expect(html).toContain("현재 입력란은 잠겨 있습니다");
    expect(html.match(/<fieldset[^>]*disabled/gu)).toHaveLength(2);
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

  it("keeps fully verified previews closed without canonical publication signals", () => {
    const facts = verifiedFacts();
    const previewEnv = { ...validProductionControls, SITE_RELEASE_MODE: "preview", VERCEL_ENV: "preview" };
    expect(buildRobots(facts, previewEnv)).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    expect(buildSitemap(facts, previewEnv)).toEqual([]);
    expect(localBusinessJsonLd(facts, previewEnv)).toBeNull();
    const root = buildRootMetadata(facts, previewEnv);
    expect(root.robots).toEqual({ index: false, follow: false });
    expect(root.metadataBase).toBeUndefined();
    expect(root.openGraph).not.toHaveProperty("url");
    expect(buildPageMetadata("/services", "서비스", "설명", facts, previewEnv).alternates).toBeUndefined();
  });

  it("opens publication only with fully verified facts and valid explicit production controls", () => {
    const facts = verifiedFacts();
    expect(buildRobots(facts, validProductionControls)).toMatchObject({ rules: { allow: "/" }, sitemap: "https://care.example/sitemap.xml" });
    const sitemap = buildSitemap(facts, validProductionControls);
    expect(sitemap).toHaveLength(8 + guides.length);
    expect(sitemap.map(({ url }) => url)).toEqual(expect.arrayContaining(guides.map(({ slug }) => `https://care.example/guides/${slug}`)));
    const json = localBusinessJsonLd(facts, validProductionControls)!;
    expect(json).toMatchObject({ name: "검증 법인명", url: "https://care.example/", telephone: "02-1234-5678", openingHours: "검증 운영시간" });
    const root = buildRootMetadata(facts, validProductionControls);
    expect(root.robots).toEqual({ index: true, follow: true });
    expect(root.metadataBase?.toString()).toBe("https://care.example/");
    expect(root.openGraph).toMatchObject({ url: "https://care.example/" });
    expect(buildPageMetadata("/services", "서비스", "설명", facts, validProductionControls).alternates).toEqual({ canonical: "https://care.example/services" });
  });

  it("fails fully closed when a fact or required production control is invalid", () => {
    const facts = verifiedFacts();
    facts.phone = { ...facts.phone, status: "unverified" };
    expect(buildRobots(facts, validProductionControls)).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    expect(buildSitemap(facts, validProductionControls)).toEqual([]);
    expect(localBusinessJsonLd(facts, validProductionControls)).toBeNull();
    expect(buildPageMetadata("/services", "서비스", "설명", facts, validProductionControls).alternates).toBeUndefined();
    expect(buildRootMetadata(facts, validProductionControls).metadataBase).toBeUndefined();

    const missingControl = { ...validProductionControls };
    delete missingControl.TURNSTILE_SECRET;
    expect(buildRobots(verifiedFacts(), missingControl)).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
});

describe("emergency operations", () => {
  it("requires shutdown rebuild, redeploy, and static fallback verification", () => {
    const runbook = readFileSync(new URL("../../docs/operations-runbook.md", import.meta.url), "utf8");
    expect(runbook).toContain("npm run build");
    expect(runbook).toMatch(/재배포|redeploy/u);
    expect(runbook).toContain("/contact");
    expect(runbook).toContain("/recruitment");
    expect(runbook).toMatch(/정적 HTML/u);
  });

  it("keeps native-form values and raw request bodies out of browser QA artifacts", () => {
    const runner = readFileSync(new URL("../../scripts/run-browser-qa.mjs", import.meta.url), "utf8");
    const browserReportText = readFileSync(new URL("../../docs/evidence/g007/browser-qa.json", import.meta.url), "utf8");
    const browserReport = JSON.parse(browserReportText) as {
      formJourneys: {
        simulatedNativeNavigation: Record<string, {
          submitted: { method: string; contentType: string; fieldNames: string[] };
        }>;
      };
    };
    const expectedFieldNames = [...inquiryFieldMatrix.care, "website"].sort();

    expect(runner).not.toMatch(/submitted\s*=\s*\{[^}]*\bpostData\s*:/su);
    expect(runner).not.toMatch(/submitted\s*=\s*\{[^}]*(?:name|phone|preferredContactTime|coarseArea|topic)\s*:/su);
    expect(runner).toMatch(/submitted\s*=\s*\{[^}]*\bfieldNames\b[^}]*\}/su);
    expect(browserReportText).not.toContain('"postData"');
    expect(browserReportText).not.toContain("브라우저 점검");
    expect(browserReportText).not.toContain("010-0000-0000");

    for (const journey of Object.values(browserReport.formJourneys.simulatedNativeNavigation)) {
      expect(Object.keys(journey.submitted).sort()).toEqual(["contentType", "fieldNames", "method"]);
      expect(journey.submitted.method).toBe("POST");
      expect(journey.submitted.contentType).toContain("application/x-www-form-urlencoded");
      expect(journey.submitted.fieldNames).toEqual(expectedFieldNames);
    }
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
