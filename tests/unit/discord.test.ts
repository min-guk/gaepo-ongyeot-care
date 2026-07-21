import { describe, expect, it, vi } from "vitest";
import { deliverToDiscord, formatDiscordPayload } from "../../src/lib/notifications/discord";

const data = {
  name: "김온곁",
  phone: "01012345678",
  preferredContactTime: "afternoon" as const,
  coarseArea: "gaepo" as const,
  topic: "visit-care" as const,
  privacyNoticeVersion: "privacy-v1",
};
const discordMessageId = "123456789012345678";

describe("Discord adapter", () => {
  it("formats only allowlisted fields and disables mentions", () => {
    const result = formatDiscordPayload("care", { ...data, name: "김@everyone" }, "request-1", "2026-07-21T00:00:00.000Z");
    expect(result.allowed_mentions.parse).toEqual([]);
    expect(result.content).toContain("김＠everyone");
    expect(result.content).not.toContain("cf-turnstile");
    expect(result.content).toContain("개인정보 고지 버전: privacy-v1");
  });

  it("formats recruitment without a care topic", () => {
    const recruitment = {
      name: data.name, phone: data.phone, preferredContactTime: data.preferredContactTime,
      coarseArea: data.coarseArea, privacyNoticeVersion: data.privacyNoticeVersion,
    };
    const result = formatDiscordPayload("recruitment", recruitment, "request-2", "2026-07-21T00:00:00.000Z");
    expect(result.content).toContain("문의 유형: recruitment");
    expect(result.content).not.toContain("상담 주제:");
  });

  it("uses wait=true and requires a returned message id", async () => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ id: discordMessageId }));
    await expect(deliverToDiscord("https://discord.com/api/webhooks/a/b", { allowed_mentions: { parse: [] } }, { fetchFn })).resolves.toEqual({
      state: "confirmed",
      messageId: discordMessageId,
      statusClass: "2xx",
    });
    expect(String(fetchFn.mock.calls[0]![0])).toContain("wait=true");
  });

  it.each([
    " ",
    "12345678901234567x",
    "1234567890123456",
    "123456789012345678901",
    "18446744073709551616",
  ])("rejects unrealistic 2xx message id %j", async (id) => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ id }));
    await expect(deliverToDiscord("https://discord.com/api/webhooks/a/b", {}, { fetchFn })).resolves.toEqual({
      state: "known_failure",
      statusClass: "2xx",
    });
  });

  it.each([
    [new Response(null, { status: 204 }), { state: "known_failure", statusClass: "2xx" }],
    [Response.json({}, { status: 200 }), { state: "known_failure", statusClass: "2xx" }],
    [new Response("bad", { status: 400 }), { state: "known_failure", statusClass: "4xx" }],
    [new Response("upstream", { status: 500 }), { state: "unknown", statusClass: "5xx" }],
  ])("never reports false success", async (response, expected) => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(response);
    await expect(deliverToDiscord("https://discord.com/api/webhooks/a/b", {}, { fetchFn })).resolves.toEqual(expected);
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("bounds successful response body consumption within the attempt deadline", async () => {
    vi.useFakeTimers();
    try {
      const response = new Response(null, { status: 200 });
      vi.spyOn(response, "json").mockReturnValue(new Promise<never>(() => undefined));
      const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(response);
      const delivery = deliverToDiscord("https://discord.com/api/webhooks/a/b", {}, { fetchFn, deadlineMilliseconds: 10 });
      await vi.advanceTimersByTimeAsync(10);
      await expect(delivery).resolves.toEqual({ state: "unknown", statusClass: "network" });
      expect(fetchFn).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it("retries 429 at most once after a bounded Retry-After", async () => {
    const fetchFn = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response("limited", { status: 429, headers: { "retry-after": "0" } }))
      .mockResolvedValueOnce(Response.json({ id: discordMessageId }));
    await expect(deliverToDiscord("https://discord.com/api/webhooks/a/b", {}, { fetchFn })).resolves.toMatchObject({ state: "confirmed" });
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it.each([undefined, "2", "invalid"])("does not retry 429 with missing or unsafe Retry-After %s", async (retryAfter) => {
    const headers = retryAfter === undefined ? undefined : { "retry-after": retryAfter };
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(new Response("limited", { status: 429, ...(headers ? { headers } : {}) }));
    await expect(deliverToDiscord("https://discord.com/api/webhooks/a/b", {}, { fetchFn })).resolves.toEqual({
      state: "known_failure", statusClass: "4xx",
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("classifies a 5xx after the single explicit 429 retry as unknown", async () => {
    const fetchFn = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response("limited", { status: 429, headers: { "retry-after": "0" } }))
      .mockResolvedValueOnce(new Response("upstream", { status: 503 }));
    await expect(deliverToDiscord("https://discord.com/api/webhooks/a/b", {}, { fetchFn })).resolves.toEqual({
      state: "unknown", statusClass: "5xx",
    });
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it("does not retry network ambiguity", async () => {
    const fetchFn = vi.fn<typeof fetch>().mockRejectedValue(new Error("reset"));
    await expect(deliverToDiscord("https://discord.com/api/webhooks/a/b", {}, { fetchFn })).resolves.toEqual({
      state: "unknown",
      statusClass: "network",
    });
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });
});
