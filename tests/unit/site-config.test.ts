import { describe, expect, it } from "vitest";
import {
  factIsVerified,
  phoneHref,
  siteConfig,
  unresolvedFactKeys,
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
    const facts = Object.fromEntries(
      Object.entries(siteConfig.facts).map(([key, fact]) => [
        key,
        verified(Array.isArray(fact.value) ? ["verified"] : key === "phone" ? "02-1234-5678" : `verified-${key}`),
      ]),
    ) as SiteFacts;
    facts.phone = { ...facts.phone, status: "unverified" };
    expect(unresolvedFactKeys(facts)).toEqual(["phone"]);
  });

  it("creates a telephone link only from a valid Korean phone number", () => {
    expect(phoneHref("02-1234-5678")).toBe("tel:0212345678");
    expect(phoneHref("__REQUIRED_PHONE__")).toBeNull();
  });
});
