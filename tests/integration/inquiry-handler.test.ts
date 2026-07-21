import { describe, expect, it, vi } from "vitest";
import { handleInquiry, type InquiryHandlerOptions } from "../../src/lib/forms/handler";
import type { InquiryEnvironment } from "../../src/lib/forms/types";
import { methodNotAllowedResponse } from "../../src/lib/forms/responses";

const url = "https://example.test/api/inquiries/care";
const fields = {
  name: "김온곁",
  phone: "010-1234-5678",
  preferredContactTime: "afternoon",
  coarseArea: "gaepo",
  topic: "visit-care",
  privacyNoticeVersion: "privacy-v1",
  "cf-turnstile-response": "token",
  website: "",
};

function request(overrides: { fields?: Record<string, string>; accept?: string; headers?: Record<string, string> } = {}) {
  return new Request(url, {
    method: "POST",
    headers: {
      origin: "https://example.test",
      "sec-fetch-site": "same-origin",
      accept: overrides.accept ?? "text/html",
      ...(overrides.headers ?? {}),
    },
    body: new URLSearchParams(overrides.fields ?? fields),
  });
}

function fixture() {
  const limiter = { limit: vi.fn().mockResolvedValue({ success: true }) };
  const env: InquiryEnvironment = {
    TURNSTILE_SECRET: "turnstile-secret",
    RATE_LIMIT_PEPPER: "0123456789abcdef0123456789abcdef",
    CARE_DISCORD_WEBHOOK_URL: "https://discord.com/api/webhooks/a/b",
    RECRUITMENT_DISCORD_WEBHOOK_URL: "https://discord.com/api/webhooks/c/d",
    PRIVACY_NOTICE_VERSION: "privacy-v1",
    INQUIRY_RATE_LIMITER: limiter,
  };
  const logger = vi.fn();
  const fetchFn = vi
    .fn<typeof fetch>()
    .mockResolvedValueOnce(Response.json({ success: true }))
    .mockResolvedValueOnce(Response.json({ id: "123456789012345678" }));
  const options: InquiryHandlerOptions = {
    fetchFn,
    logger,
    uuid: () => "request-1",
    now: () => new Date("2026-07-21T00:00:00.000Z"),
  };
  return { env, limiter, logger, fetchFn, options };
}

describe("care inquiry pipeline", () => {
  it("returns accessible no-store HTML and confirmed JSON only after a Discord message id", async () => {
    const htmlFixture = fixture();
    const html = await handleInquiry("care", request(), htmlFixture.env, htmlFixture.options);
    expect(html.status).toBe(200);
    expect(html.headers.get("cache-control")).toBe("no-store");
    expect(html.headers.get("x-robots-tag")).toBe("noindex");
    expect(html.headers.get("vary")).toBe("Accept");
    expect(await html.text()).toContain("<h1>문의가 접수되었습니다</h1>");

    const jsonFixture = fixture();
    const json = await handleInquiry("care", request({ accept: "application/json" }), jsonFixture.env, jsonFixture.options);
    expect(await json.json()).toEqual({ status: "confirmed", requestId: "request-1" });
    const discordUrl = String(jsonFixture.fetchFn.mock.calls[1]![0]);
    expect(discordUrl).toContain("wait=true");
  });

  it("rejects a honeypot before Turnstile, rate limiting, or Discord", async () => {
    const { env, limiter, fetchFn, options } = fixture();
    const response = await handleInquiry("care", request({ fields: { ...fields, website: "bot" } }), env, options);
    expect(response.status).toBe(400);
    expect(fetchFn).not.toHaveBeenCalled();
    expect(limiter.limit).not.toHaveBeenCalled();
    expect(await response.text()).not.toContain("문의가 접수되었습니다");
  });

  it("rejects invalid Turnstile before rate limiting and Discord", async () => {
    const { env, limiter, logger, options } = fixture();
    options.fetchFn = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ success: false }));
    const response = await handleInquiry("care", request({ accept: "application/json" }), env, options);
    expect(response.status).toBe(400);
    expect(limiter.limit).not.toHaveBeenCalled();
    expect(await response.json()).toEqual({ status: "invalid" });
    expect(logger).toHaveBeenCalledOnce();
  });

  it("passes an HMAC-only key to the mandatory rate binding", async () => {
    const { env, limiter, options } = fixture();
    limiter.limit.mockResolvedValue({ success: false });
    const response = await handleInquiry("care", request({ accept: "application/json" }), env, options);
    const key = limiter.limit.mock.calls[0]![0].key as string;
    expect(key).toMatch(/^care:[a-f0-9]{64}$/);
    expect(key).not.toContain("01012345678");
    expect(response.status).toBe(429);
    expect(await response.json()).toEqual({ status: "rate_limited" });
  });

  it("fails closed when the binding is absent and never calls Discord", async () => {
    const { env, fetchFn, options } = fixture();
    delete env.INQUIRY_RATE_LIMITER;
    const response = await handleInquiry("care", request({ accept: "application/json" }), env, options);
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ status: "known_failure" });
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("reports a durable rate service outage as known failure, not rate limited", async () => {
    const { env, limiter, fetchFn, options } = fixture();
    limiter.limit.mockResolvedValue({ success: false, unavailable: true });
    const response = await handleInquiry("care", request({ accept: "application/json" }), env, options);
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ status: "known_failure" });
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("maps Discord 5xx to unknown without false success or request-id leakage", async () => {
    const { env, options } = fixture();
    options.fetchFn = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ success: true }))
      .mockResolvedValueOnce(new Response("upstream", { status: 500 }));
    const response = await handleInquiry("care", request({ accept: "application/json" }), env, options);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "unknown" });
  });

  it("maps Turnstile transport failure to unknown before rate limiting", async () => {
    const { env, limiter, options } = fixture();
    options.fetchFn = vi.fn<typeof fetch>().mockRejectedValue(new Error("turnstile timeout"));
    const response = await handleInquiry("care", request({ accept: "application/json" }), env, options);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "unknown" });
    expect(limiter.limit).not.toHaveBeenCalled();
  });

  it.each([
    [request({ headers: { origin: "https://evil.test" } }), 400],
    [request({ headers: { "sec-fetch-site": "cross-site" } }), 400],
    [request({ headers: { "content-length": "9000" } }), 400],
    [new Request(url, { method: "POST", headers: { origin: "https://example.test", "sec-fetch-site": "same-origin", "content-type": "text/plain" }, body: "bad" }), 400],
    [request({ fields: { ...fields, memo: "not allowed" } }), 400],
  ])("rejects invalid transport/schema before external calls", async (invalidRequest, status) => {
    const { env, fetchFn, options } = fixture();
    const response = await handleInquiry("care", invalidRequest, env, options);
    expect(response.status).toBe(status);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it.each(["__proto__", "prototype", "constructor"])(
    "rejects prototype-like extra key %s for JSON and URL-encoded bodies",
    async (extraKey) => {
      const bodies = [
        {
          contentType: "application/json",
          body: JSON.stringify({ ...fields, [extraKey]: "not allowed" }),
        },
        {
          contentType: "application/x-www-form-urlencoded",
          body: (() => {
            const params = new URLSearchParams(fields);
            params.append(extraKey, "not allowed");
            return params.toString();
          })(),
        },
      ];

      for (const { contentType, body } of bodies) {
        const hostileRequest = new Request(url, {
          method: "POST",
          headers: {
            origin: "https://example.test",
            "sec-fetch-site": "same-origin",
            "content-type": contentType,
          },
          body,
        });
        const { env, limiter, fetchFn, options } = fixture();
        const response = await handleInquiry("care", hostileRequest, env, options);
        expect(response.status).toBe(400);
        expect(fetchFn).not.toHaveBeenCalled();
        expect(limiter.limit).not.toHaveBeenCalled();
      }
    },
  );

  it.each(["GET", "HEAD"])("prevents false success for %s", async () => {
    const response = methodNotAllowedResponse();
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST");
    expect(await response.text()).not.toContain("문의가 접수되었습니다");
  });

  it("logs only the safe allowlist", async () => {
    const { env, logger, options } = fixture();
    await handleInquiry("care", request(), env, options);
    const event = JSON.parse(logger.mock.calls[0]![0] as string) as Record<string, unknown>;
    expect(Object.keys(event).sort()).toEqual(["latencyBucket", "outcome", "requestId", "route", "upstreamStatusClass"]);
    expect(event.requestId).toBe("request-1");
    expect(JSON.stringify(event)).not.toContain("01012345678");
    expect(JSON.stringify(event)).not.toContain("김온곁");
  });

  it("delivers the recruitment exact schema to its private route webhook", async () => {
    const recruitmentFields = {
      name: fields.name, phone: fields.phone, preferredContactTime: fields.preferredContactTime,
      coarseArea: fields.coarseArea, privacyNoticeVersion: fields.privacyNoticeVersion,
      "cf-turnstile-response": fields["cf-turnstile-response"], website: fields.website,
    };
    const { env, fetchFn, options } = fixture();
    const recruitmentUrl = "https://example.test/api/inquiries/recruitment";
    const recruitmentRequest = new Request(recruitmentUrl, {
      method: "POST",
      headers: { origin: "https://example.test", "sec-fetch-site": "same-origin", accept: "application/json" },
      body: new URLSearchParams(recruitmentFields),
    });
    const response = await handleInquiry("recruitment", recruitmentRequest, env, options);
    expect(await response.json()).toEqual({ status: "confirmed", requestId: "request-1" });
    expect(String(fetchFn.mock.calls[1]![0])).toContain("/api/webhooks/c/d");
    expect(String(fetchFn.mock.calls[1]![1]?.body)).not.toContain("상담 주제");
  });

  it("rejects a stale or unknown notice version before Turnstile", async () => {
    const { env, fetchFn, options } = fixture();
    const response = await handleInquiry("care", request({ fields: { ...fields, privacyNoticeVersion: "old-v0" } }), env, options);
    expect(response.status).toBe(400);
    expect(fetchFn).not.toHaveBeenCalled();
  });
});
