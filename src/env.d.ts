/// <reference types="astro/client" />

interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  TURNSTILE_SECRET?: string;
  RATE_LIMIT_PEPPER?: string;
  CARE_DISCORD_WEBHOOK_URL?: string;
  INQUIRY_RATE_LIMITER?: RateLimitBinding;
}

declare namespace App {
  interface Locals {
    runtime: { env: Env };
  }
}
