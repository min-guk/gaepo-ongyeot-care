import { phoneHref, verifiedString } from "../config/site";
import { createDurableRateLimitAdapter } from "./rate-limit";
import type { InquiryEnvironment } from "./types";

export function inquiryEnvironment(): InquiryEnvironment {
  const {
    TURNSTILE_SECRET,
    RATE_LIMIT_PEPPER,
    CARE_DISCORD_WEBHOOK_URL,
    RECRUITMENT_DISCORD_WEBHOOK_URL,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
  } = process.env;
  const rateLimiter = createDurableRateLimitAdapter(UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN);
  const routeWebhooksAreDistinct = CARE_DISCORD_WEBHOOK_URL !== RECRUITMENT_DISCORD_WEBHOOK_URL;
  return {
    ...(TURNSTILE_SECRET ? { TURNSTILE_SECRET } : {}),
    ...(RATE_LIMIT_PEPPER ? { RATE_LIMIT_PEPPER } : {}),
    ...(CARE_DISCORD_WEBHOOK_URL && routeWebhooksAreDistinct ? { CARE_DISCORD_WEBHOOK_URL } : {}),
    ...(RECRUITMENT_DISCORD_WEBHOOK_URL && routeWebhooksAreDistinct ? { RECRUITMENT_DISCORD_WEBHOOK_URL } : {}),
    ...(verifiedString("privacyNoticeVersion") ? { PRIVACY_NOTICE_VERSION: verifiedString("privacyNoticeVersion")! } : {}),
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
