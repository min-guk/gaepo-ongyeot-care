import { phoneHref, siteConfig, verifiedString } from "../config/site";
import { createDurableRateLimitAdapter } from "./rate-limit";
import { privacyApprovalState } from "../privacy/disclosure";
import type { InquiryEnvironment } from "./types";
import type { SiteFacts } from "../config/site";

function webhookIdentity(value: string | undefined): string | undefined {
  if (!value) return value;
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname.replace(/\/+$/u, "")}`;
  } catch {
    return value;
  }
}

export function inquiryEnvironment(
  facts: SiteFacts = siteConfig.facts,
  env: NodeJS.ProcessEnv = process.env,
): InquiryEnvironment {
  const {
    TURNSTILE_SECRET,
    RATE_LIMIT_PEPPER,
    CARE_DISCORD_WEBHOOK_URL,
    RECRUITMENT_DISCORD_WEBHOOK_URL,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
  } = env;
  const rateLimiter = createDurableRateLimitAdapter(UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN);
  const routeWebhooksAreDistinct = webhookIdentity(CARE_DISCORD_WEBHOOK_URL) !== webhookIdentity(RECRUITMENT_DISCORD_WEBHOOK_URL);
  const approval = privacyApprovalState(facts, env);
  return {
    ...(TURNSTILE_SECRET ? { TURNSTILE_SECRET } : {}),
    ...(RATE_LIMIT_PEPPER ? { RATE_LIMIT_PEPPER } : {}),
    ...(CARE_DISCORD_WEBHOOK_URL && routeWebhooksAreDistinct ? { CARE_DISCORD_WEBHOOK_URL } : {}),
    ...(RECRUITMENT_DISCORD_WEBHOOK_URL && routeWebhooksAreDistinct ? { RECRUITMENT_DISCORD_WEBHOOK_URL } : {}),
    ...(approval.approved ? { PRIVACY_NOTICE_VERSION: approval.noticeVersion! } : {}),
    ...(rateLimiter ? { INQUIRY_RATE_LIMITER: rateLimiter } : {}),
  };
}

export function inquiryRecovery() {
  const phone = verifiedString("phone");
  const telephone = phone ? phoneHref(phone) : null;
  const kakaoUrl = verifiedString("kakaoChannelUrl");
  return {
    ...(phone && telephone ? { phone, phoneHref: telephone } : {}),
    ...(kakaoUrl ? { kakaoUrl } : {}),
  };
}
