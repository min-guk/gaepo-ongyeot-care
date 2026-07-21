import type { InquiryRoute } from "./types";

export type SafeOutcome =
  | "confirmed" | "invalid" | "bot_rejected" | "turnstile_rejected"
  | "rate_limited" | "known_failure" | "unknown" | "misconfigured";
export interface SafeLogEvent {
  route: InquiryRoute;
  outcome: SafeOutcome;
  latencyBucket: "lt250ms" | "lt1s" | "lt3s" | "gte3s";
  upstreamStatusClass: "none" | "2xx" | "4xx" | "5xx" | "network";
}
export function latencyBucket(milliseconds: number): SafeLogEvent["latencyBucket"] {
  if (milliseconds < 250) return "lt250ms";
  if (milliseconds < 1_000) return "lt1s";
  if (milliseconds < 3_000) return "lt3s";
  return "gte3s";
}
export function writeSafeLog(event: SafeLogEvent, logger: (message: string) => void = console.info): void {
  logger(JSON.stringify(event));
}
