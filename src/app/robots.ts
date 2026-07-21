import type { MetadataRoute } from "next";
import { factIsVerifiedForKey } from "@/lib/config/fact-validation.mjs";
import { publicationIsReady } from "@/lib/config/production-validation.mjs";
import { siteConfig, type SiteFacts } from "@/lib/config/site";

export function buildRobots(facts: SiteFacts = siteConfig.facts, env: NodeJS.ProcessEnv = process.env): MetadataRoute.Robots {
  const canonicalUrl = factIsVerifiedForKey("canonicalUrl", facts.canonicalUrl) ? facts.canonicalUrl.value as string : null;
  if (!publicationIsReady(facts, env) || !canonicalUrl) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("/sitemap.xml", canonicalUrl).toString() };
}

export default function robots(): MetadataRoute.Robots { return buildRobots(); }
