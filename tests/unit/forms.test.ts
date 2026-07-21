import { describe, expect, it, vi } from "vitest";
import { parseCareInquiry } from "../../src/lib/forms/care-schema";
import { parseRecruitmentInquiry } from "../../src/lib/forms/recruitment-schema";
import { createRateLimitKey } from "../../src/lib/forms/rate-key";
import { createDurableRateLimitAdapter } from "../../src/lib/forms/rate-limit";
import { outcomeResponse } from "../../src/lib/forms/responses";

const care = {
  name: "김온곁",
  phone: "010-1234-5678",
  preferredContactTime: "afternoon",
  coarseArea: "gaepo",
  topic: "visit-care",
  privacyNoticeVersion: "privacy-v1",
};

describe("minimal inquiry schemas", () => {
  it("accepts only the care allowlist and normalizes phone", () => {
    const parsed = parseCareInquiry(care);
    expect(parsed).toEqual({ ok: true, data: { ...care, phone: "01012345678" } });
    expect(parseCareInquiry({ ...care, memo: "free text" })).toEqual({ ok: false, code: "invalid_fields" });
    expect(parseCareInquiry({ ...care, name: "김온곁<script>" })).toEqual({ ok: false, code: "invalid_fields" });
  });

  it("accepts recruitment without topic and rejects every extra field", () => {
    const recruitment = {
      name: care.name, phone: care.phone, preferredContactTime: care.preferredContactTime,
      coarseArea: care.coarseArea, privacyNoticeVersion: care.privacyNoticeVersion,
    };
    expect(parseRecruitmentInquiry(recruitment)).toEqual({ ok: true, data: { ...recruitment, phone: "01012345678" } });
    expect(parseRecruitmentInquiry({ ...recruitment, topic: "visit-care" })).toEqual({ ok: false, code: "invalid_fields" });
  });

});

describe("durable production rate adapter", () => {
  it("uses the HMAC key in one atomic no-store REST operation", async () => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ result: 1 }));
    const adapter = createDurableRateLimitAdapter("https://example.upstash.io", "server-token", fetchFn);
    await expect(adapter?.limit({ key: "care:hash-only" })).resolves.toEqual({ success: true });
    const init = fetchFn.mock.calls[0]![1] as RequestInit;
    expect(init.cache).toBe("no-store");
    expect(String(init.body)).toContain("inquiry:care:hash-only");
  });

  it.each([
    [0, { success: false }],
    [1, { success: true }],
    [2, { success: false, unavailable: true }],
    ["1", { success: false, unavailable: true }],
    [null, { success: false, unavailable: true }],
  ])("accepts only numeric Redis script result %j", async (result, expected) => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ result }));
    const adapter = createDurableRateLimitAdapter("https://example.upstash.io", "server-token", fetchFn);
    await expect(adapter?.limit({ key: "care:hash-only" })).resolves.toEqual(expected);
  });

  it("fails closed for missing configuration or provider errors", async () => {
    expect(createDurableRateLimitAdapter(undefined, undefined)).toBeUndefined();
    const adapter = createDurableRateLimitAdapter("https://example.upstash.io", "server-token", vi.fn<typeof fetch>().mockRejectedValue(new Error("down")));
    await expect(adapter?.limit({ key: "care:hash-only" })).resolves.toEqual({ success: false, unavailable: true });
  });
});

describe("HMAC rate key", () => {
  const pepper = "a-production-length-pepper-placeholder-123456";
  it("is stable, route scoped, and contains no raw phone", async () => {
    const first = await createRateLimitKey("01012345678", "care", pepper);
    const again = await createRateLimitKey("01012345678", "care", pepper);
    const otherPhone = await createRateLimitKey("01099998888", "care", pepper);
    expect(first).toBe(again);
    expect(first).not.toBe(otherPhone);
    expect(first).not.toContain("01012345678");
    expect(first).toMatch(/^care:[a-f0-9]{64}$/);
  });

  it("fails closed without a strong server-only pepper", async () => {
    await expect(createRateLimitKey("01012345678", "care", "short")).rejects.toThrow("rate_limit_pepper_missing");
    await expect(createRateLimitKey("01012345678", "care", "__REQUIRED_RANDOM_SECRET__")).rejects.toThrow();
  });
});

describe("response negotiation", () => {
  it.each(["confirmed", "invalid", "rate_limited", "known_failure", "unknown"] as const)("sets private headers for %s", (outcome) => {
    const response = outcomeResponse(new Request("https://example.test/api/inquiries/care"), outcome);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
    expect(response.headers.get("vary")).toBe("Accept");
  });
  it("uses Accept only and never exposes a request id for non-success", async () => {
    const request = new Request("https://example.test/api/inquiries/care", { headers: { accept: "application/json" } });
    const response = outcomeResponse(request, "unknown", "must-not-leak");
    expect(response.status).toBe(503);
    expect(response.headers.get("vary")).toBe("Accept");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
    expect(await response.json()).toEqual({ status: "unknown" });
  });

  it("renders endpoint-generated accessible HTML", async () => {
    const request = new Request("https://example.test/api/inquiries/care", { headers: { accept: "text/html" } });
    const html = await outcomeResponse(request, "invalid").text();
    expect(html).toContain('<html lang="ko">');
    expect(html).toContain("<main>");
    expect(html).toContain("다른 문의 방법");
    expect(html).not.toContain("문의가 접수되었습니다");
  });

  it("renders only explicitly verified recovery contacts", async () => {
    const request = new Request("https://example.test/api/inquiries/care", { headers: { accept: "text/html" } });
    const html = await outcomeResponse(request, "unknown", undefined, {
      phone: "02-1234-5678", phoneHref: "tel:0212345678", kakaoUrl: "https://pf.kakao.com/_verified",
    }).text();
    expect(html).toContain('href="tel:0212345678"');
    expect(html).toContain("02-1234-5678");
    expect(html).toContain('href="https://pf.kakao.com/_verified"');
  });
});
