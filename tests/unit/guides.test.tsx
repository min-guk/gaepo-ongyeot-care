import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import GuidesPage from "../../src/app/guides/page";
import GuideDetailPage, { generateMetadata, generateStaticParams } from "../../src/app/guides/[slug]/page";
import { rawGuides } from "../../src/content/guides";
import { guides } from "../../src/lib/guides/collection";
import { GUIDE_SOURCE_URLS, addUtcDays, assertGuidesFresh, guidesDueSoon, publishedGuides, validateGuideCollection } from "../../src/lib/guides/schema";

describe("guide collection schema and freshness", () => {
  it("validates six launch guides, all freshness classes, sources, and internal links", () => {
    expect(guides).toHaveLength(6);
    expect(new Set(guides.map(({ freshnessDays }) => freshnessDays))).toEqual(new Set([30, 90, 180]));
    const slugs = new Set(guides.map(({ slug }) => slug));
    const allowedSources = new Set<string>(GUIDE_SOURCE_URLS);
    for (const guide of guides) {
      expect(guide.status).toBe("published");
      expect(guide.reviewedAt).toBe("2026-07-21");
      expect(guide.sources.every(({ url }) => allowedSources.has(url))).toBe(true);
      expect(guide.relatedGuideSlugs.every((slug) => slugs.has(slug))).toBe(true);
      expect(slugs.has(guide.nextStep.href.replace("/guides/", ""))).toBe(true);
    }
  });

  it("rejects malformed, unapproved, and incorrectly dated content", () => {
    const invalid = structuredClone(rawGuides) as Array<Record<string, unknown>>;
    invalid[0] = { ...invalid[0], reviewDueAt: "2026-10-20" };
    expect(() => validateGuideCollection(invalid)).toThrow("2026-10-19");

    invalid[0] = { ...rawGuides[0] as object, sources: [{ title: "임의 출처", url: "https://example.com" }] };
    expect(() => validateGuideCollection(invalid)).toThrow("승인된 출처");

    invalid[0] = { ...rawGuides[0] as object };
    delete invalid[0]!.status;
    expect(() => validateGuideCollection(invalid)).toThrow("status");

    invalid[0] = { ...rawGuides[0] as object, status: "scheduled" };
    expect(() => validateGuideCollection(invalid)).toThrow("draft 또는 published");
  });

  it("keeps drafts out of every public guide surface and fails closed below six published guides", () => {
    const withDraft = [...structuredClone(rawGuides), { ...structuredClone(rawGuides[0] as object), slug: "private-draft", status: "draft" }];
    const validated = validateGuideCollection(withDraft);
    expect(validated).toHaveLength(7);
    expect(publishedGuides(validated)).toHaveLength(6);
    expect(publishedGuides(validated).some(({ slug }) => slug === "private-draft")).toBe(false);

    const tooFewPublished = structuredClone(rawGuides) as Array<Record<string, unknown>>;
    tooFewPublished[0] = { ...tooFewPublished[0], status: "draft" };
    expect(() => validateGuideCollection(tooFewPublished)).toThrow("published 가이드가 6개 이상");
  });

  it("fails closed after the review due date and warns within 14 days", () => {
    for (const freshnessDays of [30, 90, 180] as const) {
      const group = guides.filter((guide) => guide.freshnessDays === freshnessDays);
      expect(() => assertGuidesFresh(group, new Date(`${group[0]!.reviewDueAt}T23:59:59.000Z`))).not.toThrow();
      const dayAfter = addUtcDays(group[0]!.reviewDueAt, 1);
      expect(() => assertGuidesFresh(group, new Date(`${dayAfter}T00:00:00.000Z`))).toThrow("빌드를 중단");
    }
    expect(guidesDueSoon(guides, new Date("2026-08-06T00:00:00.000Z"))).toHaveLength(2);
  });
});

describe("guide index and details", () => {
  it("renders a semantic index with reviewed dates and prominent advice limits", () => {
    const html = renderToStaticMarkup(<GuidesPage />);
    expect(html.match(/<main\b/gu)).toHaveLength(1);
    expect(html.match(/<h1\b/gu)).toHaveLength(1);
    expect(html.match(/<article\b/gu)).toHaveLength(6);
    expect(html).toContain("의료·법률 자문이 아닙니다");
    expect(html).toContain('dateTime="2026-07-21"');
    for (const guide of guides) expect(html).toContain(`href="/guides/${guide.slug}"`);
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
