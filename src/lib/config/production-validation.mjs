import { factIsVerifiedForKey } from "./fact-validation.mjs";

const placeholder = (value) => typeof value !== "string" || value.length === 0 || value.startsWith("__REQUIRED_") || value.startsWith("replace-with-");

function webhookIdentity(value) {
  if (!value) return value;
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname.replace(/\/+$/u, "")}`;
  } catch {
    return value;
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
    } catch { return false; }
  }],
  ["RECRUITMENT_DISCORD_WEBHOOK_URL", (value) => {
    try {
      const url = new URL(value ?? "");
      return url.protocol === "https:" && url.hostname === "discord.com" && url.pathname.startsWith("/api/webhooks/") && !url.pathname.includes("replace/");
    } catch { return false; }
  }],
  ["UPSTASH_REDIS_REST_URL", (value) => {
    try { return new URL(value ?? "").protocol === "https:" && !placeholder(value); } catch { return false; }
  }],
  ["UPSTASH_REDIS_REST_TOKEN", (value) => !placeholder(value)],
  ["DURABLE_RATE_LIMIT_ADAPTER", (value) => value === "upstash-rest"],
  ["PRIVACY_REVIEW_APPROVED", (value) => value === "true"],
];

export function isExplicitProductionRelease(env = process.env) {
  return env.SITE_RELEASE_MODE === "production" || env.VERCEL_ENV === "production";
}

export function productionRequirementErrors(facts, env = process.env, now = new Date()) {
  const errors = [];
  for (const [key, fact] of Object.entries(facts)) {
    if (!factIsVerifiedForKey(key, fact, now)) errors.push(`fact:${key}`);
  }
  for (const [name, valid] of envRequirements) {
    if (!valid(env[name])) errors.push(`env:${name}`);
  }
  if (webhookIdentity(env.CARE_DISCORD_WEBHOOK_URL) === webhookIdentity(env.RECRUITMENT_DISCORD_WEBHOOK_URL)) {
    errors.push("env:route_specific_discord_webhooks");
  }
  return errors;
}

export function publicationIsReady(facts, env = process.env, now = new Date()) {
  return isExplicitProductionRelease(env) && productionRequirementErrors(facts, env, now).length === 0;
}
