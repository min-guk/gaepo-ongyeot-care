export const privacyApproval = {
  approved: false,
  label: "적격 검토 전 공개 초안 — 미승인",
} as const;

export const inquiryFieldMatrix = {
  care: ["name", "phone", "preferredContactTime", "coarseArea", "topic", "privacyNoticeVersion"],
  recruitment: ["name", "phone", "preferredContactTime", "coarseArea", "privacyNoticeVersion"],
} as const;

export const prohibitedInquiryFields = [
  "freeText", "diagnosis", "residentRegistrationNumber", "detailedAddress", "careNotes", "fileUpload",
] as const;

export const privacyDataFlow = [
  "브라우저에서 고정된 최소 항목과 Turnstile 토큰을 같은 출처의 문의 엔드포인트로 전송합니다.",
  "서버는 허용 필드, 고지 버전, Turnstile, HMAC 전화번호 키 기반 Upstash 제한을 순서대로 검사합니다.",
  "검증된 최소 항목만 돌봄·채용별 비공개 Discord 웹훅으로 보내며, Discord 메시지 ID가 반환돼야 접수를 확정합니다.",
  "후속 연락 뒤 또는 접수일부터 30일 이내에 Discord 메시지를 삭제하고 삭제 일자와 건수만 기록합니다.",
] as const;
