import { describe, expect, it, vi } from "vitest";
import { deliverToDiscord, formatDiscordPayload } from "../../src/lib/notifications/discord";

const data = {
  name: "김온곁",
  phone: "01012345678",
  preferredContactTime: "afternoon" as const,
  coarseArea: "gaepo" as const,
  topic: "visit-care" as const,
  privacyConsent: "accepted" as const,
};

describe("Discord adapter", () => {
  it("formats only allowlisted fields and disables mentions", () => {
    const result = formatDiscordPayload("care", { ...data, name: "김@everyone" }, "request-1", "2026-07-21T00:00:00.000Z");
    expect(result.allowed_mentions.parse).toEqual([]);
    expect(result.content).toContain("김＠everyone");
    expect(result.content).not.toContain("cf-turnstile");
  });

  it("uses wait=true and requires a returned message id", async () => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ id: "message-1" }));
    await expect(deliverToDiscord("https://discord.com/api/webhooks/a/b", { allowed_mentions: { parse: [] } }, { fetchFn })).resolves.toEqual({
      state: "confirmed",
      messageId: "message-1",
      statusClass: "2xx",
    });
    expect(String(fetchFn.mock.calls[0]![0])).toContain("wait=true");
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

  it("retries 429 at most once after a bounded Retry-After", async () => {
    const fetchFn = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response("limited", { status: 429, headers: { "retry-after": "0" } }))
      .mockResolvedValueOnce(Response.json({ id: "message-2" }));
    await expect(deliverToDiscord("https://discord.com/api/webhooks/a/b", {}, { fetchFn })).resolves.toMatchObject({ state: "confirmed" });
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
