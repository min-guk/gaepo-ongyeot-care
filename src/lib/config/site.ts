import rawSiteFacts from "@/data/site-facts.json";
import { factIsVerified, factIsVerifiedForKey } from "./fact-validation.mjs";

export type FactValue = string | readonly string[];
export interface VerifiedFact<T extends FactValue = FactValue> {
  value: T;
  status: "verified" | "unverified";
  source: string | null;
  verifiedAt: string | null;
  reviewDueAt: string | null;
}

export type SiteFactKey = keyof typeof rawSiteFacts.facts;
export type SiteFacts = Record<SiteFactKey, VerifiedFact>;

export const siteConfig = rawSiteFacts as { workingName: string; facts: SiteFacts };

export { factIsVerified };

export function unresolvedFactKeys(facts: SiteFacts = siteConfig.facts): SiteFactKey[] {
  return (Object.keys(facts) as SiteFactKey[]).filter((key) => !factIsVerifiedForKey(key, facts[key]));
}

export function verifiedString(key: SiteFactKey): string | null {
  const fact = siteConfig.facts[key];
  return factIsVerifiedForKey(key, fact) && typeof fact.value === "string" ? fact.value : null;
}

export function verifiedList(key: SiteFactKey): readonly string[] {
  const fact = siteConfig.facts[key];
  return factIsVerifiedForKey(key, fact) && Array.isArray(fact.value) ? fact.value : [];
}

export function phoneHref(phone: string): string | null {
  const normalized = phone.replace(/[\s()-]/gu, "");
  return /^0\d{8,10}$/u.test(normalized) ? `tel:${normalized}` : null;
}
