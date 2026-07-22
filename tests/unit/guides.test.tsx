import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import GuidesPage from "../../src/app/guides/page";
import GuideDetailPage, { generateMetadata, generateStaticParams } from "../../src/app/guides/[slug]/page";
import { guideFaqs } from "../../src/content/guide-faqs";
import { rawGuides } from "../../src/content/guides";
import { guides } from "../../src/lib/guides/collection";
import { GUIDE_SOURCE_URLS, addUtcDays, assertGuidesFresh, guidesDueSoon, publishedGuides, validateGuideCollection } from "../../src/lib/guides/schema";

describe("guide collection schema and freshness", () => {
  it("validates twelve public guides, all freshness classes, sources, and internal links", () => {
    expect(guides).toHaveLength(12);
    expect(new Set(guides.map(({ freshnessDays }) => freshnessDays))).toEqual(new Set([30, 90, 180]));
    const slugs = new Set(guides.map(({ slug }) => slug));
    const allowedSources = new Set<string>(GUIDE_SOURCE_URLS);
    for (const guide of guides) {
      expect(guide.status).toBe("published");
      expect(guide.reviewedAt).toBe("2026-07-22");
      expect(guide.sources.every(({ url }) => allowedSources.has(url))).toBe(true);
      expect(guide.relatedGuideSlugs.every((slug) => slugs.has(slug))).toBe(true);
      expect(slugs.has(guide.nextStep.href.replace("/guides/", ""))).toBe(true);
    }
    const publicContent = JSON.stringify(guides);
    for (const topic of ["장기요양 인정 신청", "방문요양", "가족요양", "방문목욕", "본인부담", "기관 선택 체크리스트", "지속하기 어려운 신호", "상담 전에 정보 체크리스트", "장기요양인정서", "주·야간보호", "방문간호", "복지용구", "첫 일주일"]) {
      expect(publicContent).toContain(topic);
    }
    expect(publicContent).toContain("https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356");
    for (const faq of guideFaqs) {
      expect(slugs.has(faq.relatedGuideSlug)).toBe(true);
      expect(faq.sources.every(({ url }) => allowedSources.has(url))).toBe(true);
    }
  });

  it("rejects malformed, unapproved, and incorrectly dated content", () => {
    const invalid = structuredClone(rawGuides) as Array<Record<string, unknown>>;
    invalid[0] = { ...invalid[0], reviewDueAt: "2026-10-21" };
    expect(() => validateGuideCollection(invalid)).toThrow("2026-10-20");

    invalid[0] = { ...rawGuides[0] as object, sources: [{ title: "임의 출처", url: "https://example.com" }] };
    expect(() => validateGuideCollection(invalid)).toThrow("승인된 출처");

    invalid[0] = { ...rawGuides[0] as object };
    delete invalid[0]!.status;
    expect(() => validateGuideCollection(invalid)).toThrow("status");

    invalid[0] = { ...rawGuides[0] as object, status: "scheduled" };
    expect(() => validateGuideCollection(invalid)).toThrow("draft 또는 published");
  });

  it("keeps drafts out of every public guide surface and requires exactly twelve published guides", () => {
    const withDraft = [...structuredClone(rawGuides), { ...structuredClone(rawGuides[0] as object), slug: "private-draft", status: "draft" }];
    const validated = validateGuideCollection(withDraft);
    expect(validated).toHaveLength(13);
    expect(publishedGuides(validated)).toHaveLength(12);
    expect(publishedGuides(validated).some(({ slug }) => slug === "private-draft")).toBe(false);

    const tooFewPublished = structuredClone(rawGuides) as Array<Record<string, unknown>>;
    tooFewPublished[0] = { ...tooFewPublished[0], status: "draft" };
    expect(() => validateGuideCollection(tooFewPublished)).toThrow("published 가이드가 정확히 12개");

    const tooManyPublished = [...structuredClone(rawGuides), { ...structuredClone(rawGuides[0] as object), slug: "thirteenth-guide" }];
    expect(() => validateGuideCollection(tooManyPublished)).toThrow("published 가이드가 정확히 12개");
  });

  it("fails closed after the review due date and warns within 14 days", () => {
    for (const freshnessDays of [30, 90, 180] as const) {
      const group = guides.filter((guide) => guide.freshnessDays === freshnessDays);
      expect(() => assertGuidesFresh(group, new Date(`${group[0]!.reviewDueAt}T23:59:59.000Z`))).not.toThrow();
      const dayAfter = addUtcDays(group[0]!.reviewDueAt, 1);
      expect(() => assertGuidesFresh(group, new Date(`${dayAfter}T00:00:00.000Z`))).toThrow("빌드를 중단");
    }
    expect(guidesDueSoon(guides, new Date("2026-08-07T00:00:00.000Z"))).toHaveLength(2);
  });
});

describe("guide index and details", () => {
  it("renders a semantic index with reviewed dates and prominent advice limits", () => {
    const html = renderToStaticMarkup(<GuidesPage />);
    expect(html.match(/<main\b/gu)).toHaveLength(1);
    expect(html.match(/<h1\b/gu)).toHaveLength(1);
    expect(html.match(/<article\b/gu)).toHaveLength(12);
    expect(html.match(/<details\b/gu)).toHaveLength(guideFaqs.length);
    expect(guideFaqs).toHaveLength(12);
    expect(html).toContain("의료·법률 자문이 아닙니다");
    expect(html).toContain('dateTime="2026-07-22"');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain("공식 답변과 함께 확인하세요");
    expect(html.indexOf('id="frequent-questions-title"')).toBeLessThan(html.indexOf('id="guide-list-title"'));
    for (const guide of guides) expect(html).toContain(`href="/guides/${guide.slug}"`);
    for (const faq of guideFaqs) {
      expect(html).toContain(faq.question);
      for (const source of faq.sources) expect(html).toContain(`href="${source.url.replaceAll("&", "&amp;")}"`);
    }
  });

  it("prebuilds every guide and renders sources, next step, and related guides", async () => {
    expect(generateStaticParams()).toEqual(guides.map(({ slug }) => ({ slug })));
    for (const guide of guides) {
      const html = renderToStaticMarkup(await GuideDetailPage({ params: Promise.resolve({ slug: guide.slug }) }));
      expect(html.match(/<h1\b/gu)).toHaveLength(1);
      expect(html).toContain("의료·법률 자문이 아닙니다");
      expect(html).toContain("다음 한 걸음");
      expect(html).toContain("확인한 공공 출처");
      expect(html).toContain("함께 보면 좋은 가이드");
      expect(html).toContain("focus-surface-dark");
      expect(html).toContain(`dateTime="${guide.reviewDueAt}"`);
      expect(html).toContain(`aria-labelledby="${guide.slug}-section-1"`);
      expect(html).toContain(`id="${guide.slug}-section-1"`);
      for (const source of guide.sources) expect(html).toContain(`href="${source.url.replaceAll("&", "&amp;")}"`);
      expect(await generateMetadata({ params: Promise.resolve({ slug: guide.slug }) })).toMatchObject({ title: guide.title, description: guide.summary });
    }
  });

  it("includes responsive guide grids and forced-color fallbacks", () => {
    const css = readFileSync(new URL("../../src/app/guides/guides.module.css", import.meta.url), "utf8");
    expect(css).toContain("@media (min-width: 48rem)");
    expect(css).toContain("@media (min-width: 72rem)");
    expect(css).toContain("@media (forced-colors: active)");
    expect(css).toMatch(/grid-template-columns:\s*repeat\(3,/u);
  });
});

vi.restoreAllMocks();
