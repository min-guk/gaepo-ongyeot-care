export const preferredContactTimes = ["anytime", "morning", "afternoon", "evening"] as const;
export type PreferredContactTime = (typeof preferredContactTimes)[number];

export const coarseAreas = ["gaepo", "daechi", "dogok", "irwon", "suseo", "other-gangnam"] as const;
export type CoarseArea = (typeof coarseAreas)[number];

export const careTopics = [
  "visit-care",
  "family-care",
  "visit-bathing",
  "long-term-care-grade",
  "other-basic",
] as const;
export type CareTopic = (typeof careTopics)[number];
export type InquiryRoute = "care" | "recruitment";

export interface BaseInquiry {
  name: string;
  phone: string;
  preferredContactTime: PreferredContactTime;
  coarseArea: CoarseArea;
  privacyNoticeVersion: string;
}

export interface CareInquiry extends BaseInquiry { topic: CareTopic }
export type RecruitmentInquiry = BaseInquiry;
export type InquiryData = CareInquiry | RecruitmentInquiry;
export type ParseResult<T> = { ok: true; data: T } | { ok: false; code: "invalid_fields" };

export interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean; unavailable?: boolean }>;
}

export interface InquiryEnvironment {
  INQUIRY_RATE_LIMITER?: RateLimitBinding;
  TURNSTILE_SECRET?: string;
  RATE_LIMIT_PEPPER?: string;
  CARE_DISCORD_WEBHOOK_URL?: string;
  RECRUITMENT_DISCORD_WEBHOOK_URL?: string;
  PRIVACY_NOTICE_VERSION?: string;
}
