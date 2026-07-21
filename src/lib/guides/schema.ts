export const GUIDE_FRESHNESS_DAYS = [30, 90, 180] as const;

export const GUIDE_SOURCE_URLS = [
  "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html",
  "https://www.mohw.go.kr/menu.es?mid=a10712030100",
  "https://www.mohw.go.kr/menu.es?mid=a10712040200",
  "https://www.nid.or.kr/download/download.aspx?NIDAPP=Y&filename=%EC%A4%91%EC%95%99%EC%B9%98%EB%A7%A4%EC%84%BC%ED%84%B0+%EC%B9%98%EB%A7%A4%EA%B0%80%EC%9D%B4%EB%93%9C%EB%B6%81%28%EC%98%A8%EB%9D%BC%EC%9D%B8%29.pdf&path=%2F%2Fansim%2Fsupport_notice%2F2023020311325284.pdf",
  "https://health.gangnam.go.kr/web/business/elderly/sub01.do",
  "https://www.gangnam.go.kr/board/cardnews/1205/view.do?mid=fm0306",
  "https://bokji.gangnam.go.kr/contents/tongtoll1/1/view.do?mid=ID08_01",
] as const;

export type GuideFreshnessDays = (typeof GUIDE_FRESHNESS_DAYS)[number];
export type GuideContentClass = "cost" | "local" | "policy" | "stable";
export type GuideStatus = "draft" | "published";
export type GuideSourceUrl = (typeof GUIDE_SOURCE_URLS)[number];

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  items?: string[];
};

export type GuideSource = {
  title: string;
  url: GuideSourceUrl;
};

export type Guide = {
  status: GuideStatus;
  slug: string;
  title: string;
  summary: string;
  category: string;
  contentClass: GuideContentClass;
  freshnessDays: GuideFreshnessDays;
  reviewedAt: string;
  reviewDueAt: string;
  sections: GuideSection[];
  nextStep: { label: string; href: string; note: string };
  relatedGuideSlugs: string[];
  sources: GuideSource[];
};

const classFreshness: Record<GuideContentClass, GuideFreshnessDays> = {
  cost: 30,
  local: 30,
  policy: 90,
  stable: 180,
};

const sourceUrls = new Set<string>(GUIDE_SOURCE_URLS);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;

function record(value: unknown, path: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`${path}: 객체여야 합니다.`);
  }
  return value as Record<string, unknown>;
}

function text(value: unknown, path: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${path}: 비어 있지 않은 문자열이어야 합니다.`);
  }
  return value.trim();
}

function textArray(value: unknown, path: string, minimum = 1): string[] {
  if (!Array.isArray(value) || value.length < minimum) {
    throw new Error(`${path}: ${minimum}개 이상의 항목이 필요합니다.`);
  }
  return value.map((item, index) => text(item, `${path}[${index}]`));
}

function isoDate(value: unknown, path: string): string {
  const date = text(value, path);
  if (!datePattern.test(date)) throw new Error(`${path}: YYYY-MM-DD 형식이어야 합니다.`);
  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) {
    throw new Error(`${path}: 유효한 날짜여야 합니다.`);
  }
  return date;
}

export function addUtcDays(date: string, days: number): string {
  const parsed = new Date(`${date}T00:00:00.000Z`);
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return parsed.toISOString().slice(0, 10);
}

function parseSection(value: unknown, path: string): GuideSection {
  const item = record(value, path);
  const paragraphs = textArray(item.paragraphs, `${path}.paragraphs`);
  const items = item.items === undefined ? undefined : textArray(item.items, `${path}.items`);
  return {
    heading: text(item.heading, `${path}.heading`),
    paragraphs,
    ...(items ? { items } : {}),
  };
}

function parseSource(value: unknown, path: string): GuideSource {
  const item = record(value, path);
  const url = text(item.url, `${path}.url`);
  if (!sourceUrls.has(url)) throw new Error(`${path}.url: 승인된 출처가 아닙니다.`);
  return { title: text(item.title, `${path}.title`), url: url as GuideSourceUrl };
}

export function validateGuide(value: unknown, index = 0): Guide {
  const path = `guides[${index}]`;
  const item = record(value, path);
  const slug = text(item.slug, `${path}.slug`);
  if (!slugPattern.test(slug)) throw new Error(`${path}.slug: 소문자 영문·숫자·하이픈만 사용할 수 있습니다.`);
  const status = text(item.status, `${path}.status`);
  if (status !== "draft" && status !== "published") {
    throw new Error(`${path}.status: draft 또는 published여야 합니다.`);
  }

  const contentClass = text(item.contentClass, `${path}.contentClass`) as GuideContentClass;
  if (!(contentClass in classFreshness)) throw new Error(`${path}.contentClass: 지원하지 않는 분류입니다.`);

  const freshnessDays = item.freshnessDays;
  if (!GUIDE_FRESHNESS_DAYS.includes(freshnessDays as GuideFreshnessDays)) {
    throw new Error(`${path}.freshnessDays: 30, 90, 180 중 하나여야 합니다.`);
  }
  if (freshnessDays !== classFreshness[contentClass]) {
    throw new Error(`${path}.freshnessDays: ${contentClass} 분류는 ${classFreshness[contentClass]}일이어야 합니다.`);
  }

  const reviewedAt = isoDate(item.reviewedAt, `${path}.reviewedAt`);
  const reviewDueAt = isoDate(item.reviewDueAt, `${path}.reviewDueAt`);
  const expectedDueAt = addUtcDays(reviewedAt, freshnessDays as GuideFreshnessDays);
  if (reviewDueAt !== expectedDueAt) {
    throw new Error(`${path}.reviewDueAt: 검토일과 TTL에 따른 날짜 ${expectedDueAt}이어야 합니다.`);
  }

  const nextStep = record(item.nextStep, `${path}.nextStep`);
  const nextStepHref = text(nextStep.href, `${path}.nextStep.href`);
  if (!nextStepHref.startsWith("/guides/")) throw new Error(`${path}.nextStep.href: 내부 가이드 경로여야 합니다.`);

  if (!Array.isArray(item.sections) || item.sections.length < 2) {
    throw new Error(`${path}.sections: 2개 이상의 본문 구역이 필요합니다.`);
  }
  if (!Array.isArray(item.sources) || item.sources.length < 1) {
    throw new Error(`${path}.sources: 1개 이상의 출처가 필요합니다.`);
  }

  return {
    status,
    slug,
    title: text(item.title, `${path}.title`),
    summary: text(item.summary, `${path}.summary`),
    category: text(item.category, `${path}.category`),
    contentClass,
    freshnessDays: freshnessDays as GuideFreshnessDays,
    reviewedAt,
    reviewDueAt,
    sections: item.sections.map((section, sectionIndex) => parseSection(section, `${path}.sections[${sectionIndex}]`)),
    nextStep: {
      label: text(nextStep.label, `${path}.nextStep.label`),
      href: nextStepHref,
      note: text(nextStep.note, `${path}.nextStep.note`),
    },
    relatedGuideSlugs: textArray(item.relatedGuideSlugs, `${path}.relatedGuideSlugs`, 2),
    sources: item.sources.map((source, sourceIndex) => parseSource(source, `${path}.sources[${sourceIndex}]`)),
  };
}

export function validateGuideCollection(values: unknown): Guide[] {
  if (!Array.isArray(values) || values.length < 1) throw new Error("guides: 1개 이상의 가이드가 필요합니다.");
  const guides = values.map(validateGuide);
  const slugs = new Set(guides.map(({ slug }) => slug));
  if (slugs.size !== guides.length) throw new Error("guides: slug가 중복되었습니다.");

  const publicGuides = publishedGuides(guides);
  if (publicGuides.length < 6) throw new Error("guides: published 가이드가 6개 이상이어야 합니다.");
  const publicSlugs = new Set(publicGuides.map(({ slug }) => slug));

  for (const guide of guides) {
    for (const relatedSlug of guide.relatedGuideSlugs) {
      if (relatedSlug === guide.slug || !slugs.has(relatedSlug) || (guide.status === "published" && !publicSlugs.has(relatedSlug))) {
        throw new Error(`${guide.slug}: relatedGuideSlugs에 존재하는 다른 가이드만 사용할 수 있습니다.`);
      }
    }
    const nextSlug = guide.nextStep.href.replace("/guides/", "");
    if (!slugs.has(nextSlug) || (guide.status === "published" && !publicSlugs.has(nextSlug))) {
      throw new Error(`${guide.slug}: nextStep 경로가 존재하는 published 가이드여야 합니다.`);
    }
  }

  return guides;
}

export function publishedGuides(guides: readonly Guide[]): Guide[] {
  return guides.filter(({ status }) => status === "published");
}

export function assertGuidesFresh(guides: readonly Guide[], now = new Date()): void {
  const today = now.toISOString().slice(0, 10);
  const expired = guides.filter(({ reviewDueAt }) => reviewDueAt < today);
  if (expired.length > 0) {
    const details = expired.map(({ slug, reviewDueAt }) => `${slug}(${reviewDueAt})`).join(", ");
    throw new Error(`[guide freshness] 검토 기한이 지난 콘텐츠가 있어 빌드를 중단합니다: ${details}`);
  }
}

export function guidesDueSoon(guides: readonly Guide[], now = new Date(), warningDays = 14): Guide[] {
  const today = now.toISOString().slice(0, 10);
  const warningLimit = addUtcDays(today, warningDays);
  return guides.filter(({ reviewDueAt }) => reviewDueAt >= today && reviewDueAt <= warningLimit);
}
