import { hasExactKeys, parseBase } from "./schema-helpers";
import { careTopics, type CareInquiry, type CareTopic, type ParseResult } from "./types";

const careKeys = ["name", "phone", "preferredContactTime", "coarseArea", "topic", "privacyConsent"] as const;

export function parseCareInquiry(input: Record<string, string>): ParseResult<CareInquiry> {
  if (!hasExactKeys(input, careKeys) || !careTopics.includes(input.topic as CareTopic)) {
    return { ok: false, code: "invalid_fields" };
  }
  const base = parseBase(input);
  if (!base.ok) return base;
  return { ok: true, data: { ...base.data, topic: input.topic as CareTopic } };
}
