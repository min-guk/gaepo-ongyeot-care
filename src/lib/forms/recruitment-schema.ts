import { hasExactKeys, parseBase } from "./schema-helpers";
import type { ParseResult, RecruitmentInquiry } from "./types";

const recruitmentKeys = ["name", "phone", "preferredContactTime", "coarseArea", "privacyNoticeVersion"] as const;

export function parseRecruitmentInquiry(input: Record<string, string>): ParseResult<RecruitmentInquiry> {
  if (!hasExactKeys(input, recruitmentKeys)) return { ok: false, code: "invalid_fields" };
  return parseBase(input);
}
