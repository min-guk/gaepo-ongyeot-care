import { rawGuides } from "@/content/guides";
import { assertGuidesFresh, guidesDueSoon, publishedGuides, validateGuideCollection } from "@/lib/guides/schema";

const guideOrder = [
  "long-term-care-application",
  "assessment-preparation",
  "reading-care-grade-results",
  "choosing-home-care-agency",
  "starting-home-care",
  "day-night-and-short-term-care",
  "home-nursing-and-bathing",
  "welfare-equipment-home-safety",
  "understanding-personal-costs",
  "first-week-home-care",
  "dementia-family-self-care",
  "gangnam-integrated-care",
] as const;

const orderBySlug = new Map<string, number>(guideOrder.map((slug, index) => [slug, index]));
const collection = publishedGuides(validateGuideCollection(rawGuides)).sort((a, b) => (orderBySlug.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (orderBySlug.get(b.slug) ?? Number.MAX_SAFE_INTEGER));
assertGuidesFresh(collection);

for (const guide of guidesDueSoon(collection)) {
  console.warn(`[guide freshness] ${guide.slug} 검토 기한이 ${guide.reviewDueAt}에 도래합니다.`);
}

export const guides = Object.freeze(collection);

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getRelatedGuides(slugs: readonly string[]) {
  return slugs.map((slug) => getGuideBySlug(slug)).filter((guide) => guide !== undefined);
}

export function formatGuideDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}
