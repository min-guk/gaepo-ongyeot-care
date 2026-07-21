import { deliverToDiscord, formatDiscordPayload } from "../notifications/discord";
import type { UpstreamStatusClass } from "../notifications/types";
import { parseCareInquiry } from "./care-schema";
import { parseRecruitmentInquiry } from "./recruitment-schema";
import { createRateLimitKey } from "./rate-key";
import { latencyBucket, writeSafeLog, type SafeOutcome } from "./redaction";
import { parseInquiryRequest } from "./request";
import { outcomeResponse, type PublicOutcome } from "./responses";
import { verifyTurnstile } from "./turnstile";
import type { InquiryData, InquiryEnvironment, InquiryRoute } from "./types";

export interface InquiryHandlerOptions {
  fetchFn?: typeof fetch;
  sleep?: (milliseconds: number) => Promise<void>;
  now?: () => Date;
  uuid?: () => string;
  logger?: (message: string) => void;
  recovery?: { phone?: string; phoneHref?: string; kakaoUrl?: string };
}
const webhookFor = (route: InquiryRoute, env: InquiryEnvironment) => route === "care"
  ? env.CARE_DISCORD_WEBHOOK_URL : env.RECRUITMENT_DISCORD_WEBHOOK_URL;
function publicOutcome(outcome: SafeOutcome): PublicOutcome {
  if (outcome === "confirmed") return "confirmed";
  if (outcome === "rate_limited") return "rate_limited";
  if (outcome === "unknown") return "unknown";
  if (outcome === "known_failure" || outcome === "misconfigured") return "known_failure";
  return "invalid";
}
export async function handleInquiry(
  route: InquiryRoute,
  request: Request,
  env: InquiryEnvironment,
  options: InquiryHandlerOptions = {},
): Promise<Response> {
  const started = Date.now();
  const requestId = options.uuid ? options.uuid() : crypto.randomUUID();
  let outcome: SafeOutcome = "invalid";
  let upstreamStatusClass: UpstreamStatusClass | "none" = "none";
  let confirmedRequestId: string | undefined;
  try {
    const incoming = await parseInquiryRequest(request);
    if (!incoming.ok) return outcomeResponse(request, "invalid", undefined, options.recovery);
    if (incoming.honeypot) {
      outcome = "bot_rejected";
      return outcomeResponse(request, "invalid", undefined, options.recovery);
    }
    const parsed = route === "care" ? parseCareInquiry(incoming.fields) : parseRecruitmentInquiry(incoming.fields);
    if (!parsed.ok || parsed.data.privacyNoticeVersion !== env.PRIVACY_NOTICE_VERSION) {
      return outcomeResponse(request, "invalid", undefined, options.recovery);
    }
    const turnstile = await verifyTurnstile(incoming.turnstileToken, env.TURNSTILE_SECRET ?? "", options.fetchFn);
    if (turnstile !== "valid") {
      outcome = turnstile === "invalid" ? "turnstile_rejected" : "unknown";
      return outcomeResponse(request, publicOutcome(outcome), undefined, options.recovery);
    }
    if (!env.INQUIRY_RATE_LIMITER || !env.RATE_LIMIT_PEPPER) {
      outcome = "misconfigured";
      return outcomeResponse(request, "known_failure", undefined, options.recovery);
    }
    const rateKey = await createRateLimitKey(parsed.data.phone, route, env.RATE_LIMIT_PEPPER);
    const rateLimit = await env.INQUIRY_RATE_LIMITER.limit({ key: rateKey });
    if (rateLimit.unavailable) {
      outcome = "misconfigured";
      return outcomeResponse(request, "known_failure", undefined, options.recovery);
    }
    if (!rateLimit.success) {
      outcome = "rate_limited";
      return outcomeResponse(request, "rate_limited", undefined, options.recovery);
    }
    const webhook = webhookFor(route, env);
    if (!webhook) {
      outcome = "misconfigured";
      return outcomeResponse(request, "known_failure", undefined, options.recovery);
    }
    const submittedAt = (options.now ?? (() => new Date()))().toISOString();
    const payload = formatDiscordPayload(route, parsed.data as InquiryData, requestId, submittedAt);
    const adapterOptions = {
      ...(options.fetchFn ? { fetchFn: options.fetchFn } : {}),
      ...(options.sleep ? { sleep: options.sleep } : {}),
    };
    const delivery = await deliverToDiscord(webhook, payload, adapterOptions);
    upstreamStatusClass = delivery.statusClass;
    outcome = delivery.state;
    if (delivery.state === "confirmed") confirmedRequestId = requestId;
    return outcomeResponse(request, publicOutcome(outcome), confirmedRequestId, options.recovery);
  } catch {
    outcome = "misconfigured";
    return outcomeResponse(request, "known_failure", undefined, options.recovery);
  } finally {
    writeSafeLog(
      { route, outcome, latencyBucket: latencyBucket(Date.now() - started), upstreamStatusClass },
      options.logger,
    );
  }
}
