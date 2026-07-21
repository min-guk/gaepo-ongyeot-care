import type { MetadataRoute } from "next";
import { factIsVerifiedForKey } from "@/lib/config/fact-validation.mjs";
import { releaseIsReady, siteConfig, type SiteFacts } from "@/lib/config/site";
import { guides } from "@/lib/guides/collection";

const publicRoutes = ["", "/services", "/process", "/guides", "/about", "/contact", "/recruitment", "/privacy"];
const guideRoutes = guides.map(({ slug }) => `/guides/${slug}`);

export function buildSitemap(facts: SiteFacts = siteConfig.facts): MetadataRoute.Sitemap {
  const canonicalUrl = factIsVerifiedForKey("canonicalUrl", facts.canonicalUrl) ? facts.canonicalUrl.value as string : null;
  if (!releaseIsReady(facts) || !canonicalUrl) return [];
  return [...publicRoutes, ...guideRoutes].map((path) => ({ url: new URL(path || "/", canonicalUrl).toString(), changeFrequency: "monthly" }));
}

export default function sitemap(): MetadataRoute.Sitemap { return buildSitemap(); }
