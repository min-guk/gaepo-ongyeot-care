import type { MetadataRoute } from "next";
import { factIsVerifiedForKey } from "@/lib/config/fact-validation.mjs";
import { releaseIsReady, siteConfig, type SiteFacts } from "@/lib/config/site";

const publicRoutes = ["", "/services", "/process", "/guides", "/about", "/contact", "/recruitment", "/privacy"];

export function buildSitemap(facts: SiteFacts = siteConfig.facts): MetadataRoute.Sitemap {
  const canonicalUrl = factIsVerifiedForKey("canonicalUrl", facts.canonicalUrl) ? facts.canonicalUrl.value as string : null;
  if (!releaseIsReady(facts) || !canonicalUrl) return [];
  return publicRoutes.map((path) => ({ url: new URL(path || "/", canonicalUrl).toString(), changeFrequency: "monthly" }));
}

export default function sitemap(): MetadataRoute.Sitemap { return buildSitemap(); }
