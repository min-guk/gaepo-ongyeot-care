import rawSiteFacts from "@/data/site-facts.json";

export type FactValue = string | readonly string[];
export interface VerifiedFact<T extends FactValue = FactValue> {
  value: T;
  status: "verified" | "unverified";
  source: string | null;
  verifiedAt: string | null;
}

export type SiteFactKey = keyof typeof rawSiteFacts.facts;
export type SiteFacts = Record<SiteFactKey, VerifiedFact>;

export const siteConfig = rawSiteFacts as { workingName: string; facts: SiteFacts };

function hasPublishableValue(value: FactValue): boolean {
  if (Array.isArray(value)) return value.length > 0 && value.every((item) => item.trim().length > 0);
  return typeof value === "string" && value.trim().length > 0 && !value.startsWith("__REQUIRED_");
}

export function factIsVerified(fact: VerifiedFact): boolean {
  return (
    fact.status === "verified" &&
    hasPublishableValue(fact.value) &&
    typeof fact.source === "string" &&
    /^https:\/\//u.test(fact.source) &&
    typeof fact.verifiedAt === "string" &&
    !Number.isNaN(Date.parse(fact.verifiedAt))
  );
}

export function unresolvedFactKeys(facts: SiteFacts = siteConfig.facts): SiteFactKey[] {
  return (Object.keys(facts) as SiteFactKey[]).filter((key) => !factIsVerified(facts[key]));
}

export function verifiedString(key: SiteFactKey): string | null {
  const fact = siteConfig.facts[key];
  return factIsVerified(fact) && typeof fact.value === "string" ? fact.value : null;
}

export function phoneHref(phone: string): string | null {
  const normalized = phone.replace(/[\s()-]/gu, "");
  return /^0\d{8,10}$/u.test(normalized) ? `tel:${normalized}` : null;
}

export const releaseReady = unresolvedFactKeys().length === 0;
