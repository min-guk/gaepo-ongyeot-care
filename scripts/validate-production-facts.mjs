import { readFile } from "node:fs/promises";
import { factIsVerifiedForKey } from "../src/lib/config/fact-validation.mjs";

const placeholder = (value) => typeof value !== "string" || value.length === 0 || value.startsWith("__REQUIRED_") || value.startsWith("replace-with-");
const siteFacts = JSON.parse(await readFile(new URL("../src/data/site-facts.json", import.meta.url), "utf8"));
const strict = process.argv.includes("--mode=production") || process.env.SITE_RELEASE_MODE === "production" || process.env.VERCEL_ENV === "production";
const errors = [];

for (const [key, fact] of Object.entries(siteFacts.facts)) {
  if (!factIsVerifiedForKey(key, fact)) {
    errors.push(`fact:${key}`);
  }
}

const envRequirements = [
  ["NEXT_PUBLIC_TURNSTILE_SITE_KEY", (value) => !placeholder(value)],
  ["TURNSTILE_SECRET", (value) => !placeholder(value)],
  ["RATE_LIMIT_PEPPER", (value) => typeof value === "string" && value.length >= 32 && !placeholder(value)],
  ["CARE_DISCORD_WEBHOOK_URL", (value) => {
    try {
      const url = new URL(value ?? "");
      return url.protocol === "https:" && url.hostname === "discord.com" && url.pathname.startsWith("/api/webhooks/") && !url.pathname.includes("replace/me");
    } catch {
      return false;
    }
  }],
  ["RECRUITMENT_DISCORD_WEBHOOK_URL", (value) => {
    try {
      const url = new URL(value ?? "");
      return url.protocol === "https:" && url.hostname === "discord.com" && url.pathname.startsWith("/api/webhooks/") && !url.pathname.includes("replace/");
    } catch {
      return false;
    }
  }],
  ["UPSTASH_REDIS_REST_URL", (value) => {
    try { return new URL(value ?? "").protocol === "https:" && !placeholder(value); } catch { return false; }
  }],
  ["UPSTASH_REDIS_REST_TOKEN", (value) => !placeholder(value)],
  ["DURABLE_RATE_LIMIT_ADAPTER", (value) => value === "upstash-rest"],
  ["PRIVACY_REVIEW_APPROVED", (value) => value === "true"],
];

for (const [name, valid] of envRequirements) {
  if (!valid(process.env[name])) errors.push(`env:${name}`);
}
if (process.env.CARE_DISCORD_WEBHOOK_URL === process.env.RECRUITMENT_DISCORD_WEBHOOK_URL) {
  errors.push("env:route_specific_discord_webhooks");
}

if (errors.length > 0) {
  const message = `Unresolved production requirements: ${errors.join(", ")}`;
  if (strict) throw new Error(message);
  console.warn(`[preview only] ${message}`);
} else {
  console.info("Production facts and required controls are verified.");
}
