import type { MetadataRoute } from "next";
import { factIsVerifiedForKey } from "@/lib/config/fact-validation.mjs";
import { releaseIsReady, siteConfig, type SiteFacts } from "@/lib/config/site";

export function buildRobots(facts: SiteFacts = siteConfig.facts): MetadataRoute.Robots {
  const canonicalUrl = factIsVerifiedForKey("canonicalUrl", facts.canonicalUrl) ? facts.canonicalUrl.value as string : null;
  if (!releaseIsReady(facts) || !canonicalUrl) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("/sitemap.xml", canonicalUrl).toString() };
}

export default function robots(): MetadataRoute.Robots { return buildRobots(); }
