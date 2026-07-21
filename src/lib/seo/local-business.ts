import { factIsVerifiedForKey } from "../config/fact-validation.mjs";
import { publicationIsReady } from "../config/production-validation.mjs";
import { siteConfig, type SiteFacts } from "../config/site";

type JsonLd = Record<string, unknown>;

export function localBusinessJsonLd(facts: SiteFacts = siteConfig.facts, env: NodeJS.ProcessEnv = process.env): JsonLd | null {
  if (!publicationIsReady(facts, env)) return null;
  const required = ["legalName", "canonicalUrl", "address"] as const;
  if (required.some((key) => !factIsVerifiedForKey(key, facts[key]))) return null;

  const result: JsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: facts.legalName.value,
    url: facts.canonicalUrl.value,
    address: { "@type": "PostalAddress", streetAddress: facts.address.value },
  };
  if (factIsVerifiedForKey("phone", facts.phone)) result.telephone = facts.phone.value;
  if (factIsVerifiedForKey("hours", facts.hours)) result.openingHours = facts.hours.value;
  if (factIsVerifiedForKey("serviceArea", facts.serviceArea)) result.areaServed = facts.serviceArea.value;
  if (factIsVerifiedForKey("designatedServices", facts.designatedServices)) result.knowsAbout = facts.designatedServices.value;
  return result;
}
