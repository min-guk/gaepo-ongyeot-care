export type FactValue = string | readonly string[];
export interface FactRecord<T extends FactValue = FactValue> {
  value: T;
  status: "verified" | "unverified";
  source: string | null;
  verifiedAt: string | null;
  reviewDueAt: string | null;
}

export function factValidationErrors(fact: FactRecord, now?: Date): string[];
export function factIsVerified(fact: FactRecord, now?: Date): boolean;
export function factValueIsValidForKey(key: string, value: FactValue): boolean;
export function factIsVerifiedForKey(key: string, fact: FactRecord, now?: Date): boolean;
