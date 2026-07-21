import { describe, expect, it } from "vitest";
import {
  factIsVerified,
  phoneHref,
  siteConfig,
  unresolvedFactKeys,
  verifiedList,
  verifiedString,
  type SiteFacts,
  type VerifiedFact,
} from "../../src/lib/config/site";

const verified = <T extends string | readonly string[]>(value: T): VerifiedFact<T> => ({
  value,
  status: "verified",
  source: "https://evidence.example/fact",
  verifiedAt: "2026-07-21T00:00:00.000Z",
  reviewDueAt: "2027-01-21T00:00:00.000Z",
});

describe("verified institutional facts", () => {
  it("keeps every unresolved critical fact out of production readiness", () => {
    expect(unresolvedFactKeys()).toEqual(Object.keys(siteConfig.facts));
  });

  it("requires verified evidence, a date, and a non-placeholder value", () => {
    expect(factIsVerified(verified("서울 강남구"))).toBe(true);
    expect(factIsVerified({ ...verified("서울 강남구"), source: null })).toBe(false);
    expect(factIsVerified({ ...verified("서울 강남구"), source: "not-a-url" })).toBe(false);
    expect(factIsVerified(verified("__REQUIRED_ADDRESS__"))).toBe(false);
    expect(factIsVerified(verified([]))).toBe(false);
    expect(factIsVerified({ ...verified("서울 강남구"), reviewDueAt: "2020-01-01T00:00:00.000Z" })).toBe(false);
  });

  it("reports only the remaining unresolved keys from a verified fixture", () => {
    const valueFor = (key: string, value: string | readonly string[]) => {
      if (Array.isArray(value)) return ["verified"];
      if (key === "phone") return "02-1234-5678";
      if (key === "canonicalUrl") return "https://example.com";
      if (key === "kakaoChannelUrl") return "https://pf.kakao.com/_example";
      return `verified-${key}`;
    };
    const facts = Object.fromEntries(
      Object.entries(siteConfig.facts).map(([key, fact]) => [
        key,
        verified(valueFor(key, fact.value)),
      ]),
    ) as SiteFacts;
    facts.phone = { ...facts.phone, status: "unverified" };
    expect(unresolvedFactKeys(facts)).toEqual(["phone"]);
  });

  it("creates a telephone link only from a valid Korean phone number", () => {
    expect(phoneHref("02-1234-5678")).toBe("tel:0212345678");
    expect(phoneHref("__REQUIRED_PHONE__")).toBeNull();
  });

  it("fails closed for malformed URL and array facts even when their metadata says verified", () => {
    const originalCanonical = siteConfig.facts.canonicalUrl;
    const originalServices = siteConfig.facts.designatedServices;
    siteConfig.facts.canonicalUrl = verified("javascript:alert(1)");
    siteConfig.facts.designatedServices = verified([]);
    expect(verifiedString("canonicalUrl")).toBeNull();
    expect(verifiedList("designatedServices")).toEqual([]);
    expect(unresolvedFactKeys()).toContain("canonicalUrl");
    expect(unresolvedFactKeys()).toContain("designatedServices");
    siteConfig.facts.canonicalUrl = originalCanonical;
    siteConfig.facts.designatedServices = originalServices;
  });

  it("accepts only official Kakao Channel profile URLs without query or hash variants", () => {
    const original = siteConfig.facts.kakaoChannelUrl;
    for (const value of [
      "https://pf.kakao.com/_ZeUTxl?ref=campaign",
      "https://pf.kakao.com/_ZeUTxl#chat",
      "https://pf.kakao.com/_ZeUTxl/chat",
      "https://evil.example/_ZeUTxl",
      "https://pf.kakao.com/",
    ]) {
      siteConfig.facts.kakaoChannelUrl = verified(value);
      expect(verifiedString("kakaoChannelUrl")).toBeNull();
    }
    siteConfig.facts.kakaoChannelUrl = verified("https://pf.kakao.com/_ZeUTxl");
    expect(verifiedString("kakaoChannelUrl")).toBe("https://pf.kakao.com/_ZeUTxl");
    siteConfig.facts.kakaoChannelUrl = original;
  });
});
