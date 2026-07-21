import type { InquiryData, InquiryRoute } from "../forms/types";
import type { DiscordDeliveryResult } from "./types";

const deadlineMilliseconds = 4_000;
const maxRetryAfterMilliseconds = 1_500;
const privacyNoticeVersion = "DRAFT-NOT-FOR-PRODUCTION";

export interface DiscordAdapterOptions {
  fetchFn?: typeof fetch;
  sleep?: (milliseconds: number) => Promise<void>;
}

function escapeDiscord(value: string): string {
  return value.replace(/([\\`*_{}[\]()#+\-.!|>])/g, "\\$1").replace(/@/g, "＠");
}

export function formatDiscordPayload(
  route: InquiryRoute,
  data: InquiryData,
  requestId: string,
  submittedAt: string,
): { content: string; allowed_mentions: { parse: string[] } } {
  const lines = [
    `문의 유형: ${route}`,
    `요청 ID: ${requestId}`,
    `접수 시각: ${submittedAt}`,
    `이름: ${escapeDiscord(data.name)}`,
    `전화: ${data.phone}`,
    `희망 연락 시간: ${data.preferredContactTime}`,
    `지역: ${data.coarseArea}`,
  ];
  lines.push(`상담 주제: ${data.topic}`);
  lines.push(`개인정보 고지 버전: ${privacyNoticeVersion}`);
  return { content: lines.join("\n"), allowed_mentions: { parse: [] } };
}

function withWaitConfirmation(webhookUrl: string): string {
  const url = new URL(webhookUrl);
  if (url.protocol !== "https:" || url.hostname !== "discord.com" || !url.pathname.startsWith("/api/webhooks/")) {
    throw new Error("invalid_discord_webhook");
  }
  url.searchParams.set("wait", "true");
  return url.toString();
}

function retryAfterMilliseconds(response: Response): number | null {
  const header = response.headers.get("retry-after");
  if (!header) return null;
  const seconds = Number(header);
  if (!Number.isFinite(seconds) || seconds < 0) return null;
  const milliseconds = seconds * 1_000;
  return milliseconds <= maxRetryAfterMilliseconds ? milliseconds : null;
}

async function postOnce(url: string, payload: unknown, fetchFn: typeof fetch): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), deadlineMilliseconds);
  try {
    return await fetchFn(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function classify(response: Response): Promise<DiscordDeliveryResult> {
  if (response.status >= 500) return { state: "unknown", statusClass: "5xx" };
  if (!response.ok) return { state: "known_failure", statusClass: "4xx" };
  try {
    const body = (await response.json()) as { id?: unknown };
    return typeof body.id === "string" && body.id.length > 0
      ? { state: "confirmed", messageId: body.id, statusClass: "2xx" }
      : { state: "known_failure", statusClass: "2xx" };
  } catch {
    return { state: "known_failure", statusClass: "2xx" };
  }
}

export async function deliverToDiscord(
  webhookUrl: string,
  payload: unknown,
  options: DiscordAdapterOptions = {},
): Promise<DiscordDeliveryResult> {
  const fetchFn = options.fetchFn ?? fetch;
  const sleep = options.sleep ?? ((milliseconds: number) => new Promise<void>((resolve) => setTimeout(resolve, milliseconds)));
  let url: string;
  try {
    url = withWaitConfirmation(webhookUrl);
  } catch {
    return { state: "known_failure", statusClass: "4xx" };
  }
  try {
    const first = await postOnce(url, payload, fetchFn);
    if (first.status !== 429) return classify(first);
    const retryAfter = retryAfterMilliseconds(first);
    if (retryAfter === null) return { state: "known_failure", statusClass: "4xx" };
    await sleep(retryAfter);
    return classify(await postOnce(url, payload, fetchFn));
  } catch {
    return { state: "unknown", statusClass: "network" };
  }
}
