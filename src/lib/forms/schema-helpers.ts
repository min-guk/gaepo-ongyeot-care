import {
  coarseAreas,
  preferredContactTimes,
  type BaseInquiry,
  type CoarseArea,
  type ParseResult,
  type PreferredContactTime,
} from "./types";

const forbiddenText = /[<>]|(?:주민|진단|질환|병명|장애|주소|상세주소)/u;
const normalizedName = /^[가-힣A-Za-z](?:[가-힣A-Za-z .'-]{0,28}[가-힣A-Za-z])?$/u;

export function normalizePhone(value: string): string | null {
  const normalized = value.replace(/[\s()-]/g, "");
  return /^0\d{8,10}$/.test(normalized) ? normalized : null;
}

export function hasExactKeys(input: Record<string, string>, expected: readonly string[]): boolean {
  const actual = Object.keys(input).sort();
  const required = [...expected].sort();
  return actual.length === required.length && actual.every((key, index) => key === required[index]);
}

export function parseBase(input: Record<string, string>): ParseResult<BaseInquiry> {
  const name = input.name?.trim();
  const phone = input.phone ? normalizePhone(input.phone) : null;
  const preferredContactTime = input.preferredContactTime;
  const coarseArea = input.coarseArea;
  if (
    !name || name.length > 30 || [...name].some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127) ||
    forbiddenText.test(name) || !normalizedName.test(name) || !phone ||
    !preferredContactTimes.includes(preferredContactTime as PreferredContactTime) ||
    !coarseAreas.includes(coarseArea as CoarseArea) || input.privacyConsent !== "accepted"
  ) return { ok: false, code: "invalid_fields" };

  return {
    ok: true,
    data: {
      name,
      phone,
      preferredContactTime: preferredContactTime as PreferredContactTime,
      coarseArea: coarseArea as CoarseArea,
      privacyConsent: "accepted",
    },
  };
}
