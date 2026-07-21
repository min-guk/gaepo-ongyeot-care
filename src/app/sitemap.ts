import type { MetadataRoute } from "next";
import { factIsVerifiedForKey } from "@/lib/config/fact-validation.mjs";
import { publicationIsReady } from "@/lib/config/production-validation.mjs";
import { siteConfig, type SiteFacts } from "@/lib/config/site";
import { guides } from "@/lib/guides/collection";

const publicRoutes = ["", "/services", "/process", "/guides", "/about", "/contact", "/recruitment", "/privacy"];
const guideRoutes = guides.map(({ slug }) => `/guides/${slug}`);

export function buildSitemap(facts: SiteFacts = siteConfig.facts, env: NodeJS.ProcessEnv = process.env): MetadataRoute.Sitemap {
  const canonicalUrl = factIsVerifiedForKey("canonicalUrl", facts.canonicalUrl) ? facts.canonicalUrl.value as string : null;
  if (!publicationIsReady(facts, env) || !canonicalUrl) return [];
  return [...publicRoutes, ...guideRoutes].map((path) => ({ url: new URL(path || "/", canonicalUrl).toString(), changeFrequency: "monthly" }));
}

export default function sitemap(): MetadataRoute.Sitemap { return buildSitemap(); }
