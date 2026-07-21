import type { Metadata } from "next";
import { factIsVerifiedForKey } from "@/lib/config/fact-validation.mjs";
import { releaseIsReady, siteConfig, type SiteFacts } from "@/lib/config/site";

export function buildPageMetadata(
  path: string,
  title: string,
  description: string,
  facts: SiteFacts = siteConfig.facts,
): Metadata {
  const canonicalFact = facts.canonicalUrl;
  const canonicalUrl = releaseIsReady(facts)
    && factIsVerifiedForKey("canonicalUrl", canonicalFact)
    && typeof canonicalFact.value === "string"
    ? new URL(path, canonicalFact.value).toString()
    : null;

  return {
    title,
    description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  };
}
