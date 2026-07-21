import { describe, expect, it } from "vitest";
import { parseCareInquiry } from "../../src/lib/forms/care-schema";
import { createRateLimitKey } from "../../src/lib/forms/rate-key";
import { outcomeResponse } from "../../src/lib/forms/responses";

const care = {
  name: "김온곁",
  phone: "010-1234-5678",
  preferredContactTime: "afternoon",
  coarseArea: "gaepo",
  topic: "visit-care",
  privacyConsent: "accepted",
};

describe("minimal inquiry schemas", () => {
  it("accepts only the care allowlist and normalizes phone", () => {
    const parsed = parseCareInquiry(care);
    expect(parsed).toEqual({ ok: true, data: { ...care, phone: "01012345678" } });
    expect(parseCareInquiry({ ...care, memo: "free text" })).toEqual({ ok: false, code: "invalid_fields" });
    expect(parseCareInquiry({ ...care, name: "김온곁<script>" })).toEqual({ ok: false, code: "invalid_fields" });
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
});
