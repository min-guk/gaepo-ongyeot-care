import { rawGuides } from "@/content/guides";
import { assertGuidesFresh, guidesDueSoon, publishedGuides, validateGuideCollection } from "@/lib/guides/schema";

const collection = publishedGuides(validateGuideCollection(rawGuides));
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
