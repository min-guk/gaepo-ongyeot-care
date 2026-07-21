import { readFile } from "node:fs/promises";

const placeholder = (value) => typeof value !== "string" || value.length === 0 || value.startsWith("__REQUIRED_") || value.startsWith("replace-with-");
const siteFacts = JSON.parse(await readFile(new URL("../src/data/site-facts.json", import.meta.url), "utf8"));
const strict = process.argv.includes("--mode=production") || process.env.SITE_RELEASE_MODE === "production" || process.env.VERCEL_ENV === "production";
const errors = [];

for (const [key, fact] of Object.entries(siteFacts.facts)) {
  const valueReady = Array.isArray(fact.value) ? fact.value.length > 0 : !placeholder(fact.value);
  if (fact.status !== "verified" || !valueReady || placeholder(fact.source) || Number.isNaN(Date.parse(fact.verifiedAt ?? ""))) {
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
  ["DURABLE_RATE_LIMIT_ADAPTER", (value) => value === "vercel-firewall-reviewed"],
  ["PRIVACY_REVIEW_APPROVED", (value) => value === "true"],
];

for (const [name, valid] of envRequirements) {
  if (!valid(process.env[name])) errors.push(`env:${name}`);
}

if (errors.length > 0) {
  const message = `Unresolved production requirements: ${errors.join(", ")}`;
  if (strict) throw new Error(message);
  console.warn(`[preview only] ${message}`);
} else {
  console.info("Production facts and required controls are verified.");
}
