import Script from "next/script";
import Link from "next/link";
import { ContactActions } from "@/components/contact-actions";
import { siteConfig, verifiedString } from "@/lib/config/site";
import { privacyApprovalState } from "@/lib/privacy/disclosure";
import type { InquiryRoute } from "@/lib/forms/types";

const timeOptions = [
  ["anytime", "언제든지"], ["morning", "오전"], ["afternoon", "오후"], ["evening", "저녁"],
] as const;
const areaOptions = [
  ["gaepo", "개포동"], ["daechi", "대치동"], ["dogok", "도곡동"], ["irwon", "일원동"],
  ["suseo", "수서동"], ["other-gangnam", "강남구 기타 지역"],
] as const;
const topicOptions = [
  ["visit-care", "방문요양"], ["family-care", "가족요양"], ["visit-bathing", "방문목욕"],
  ["long-term-care-grade", "장기요양등급"], ["other-basic", "기타 기본 상담"],
] as const;

export function InquiryForm({ route }: { route: InquiryRoute }) {
  const approval = privacyApprovalState(siteConfig.facts, process.env);
  const noticeVersion = approval.noticeVersion ?? "";
  const privacyApproved = approval.approved;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const configuredSiteKey = siteKey && !siteKey.startsWith("__REQUIRED_") ? siteKey : null;
  const formAvailable = privacyApproved && Boolean(configuredSiteKey);
  const recoveryAvailable = Boolean(verifiedString("phone") || verifiedString("kakaoChannelUrl"));
  const prefix = `${route}-inquiry`;
  const statusId = `${prefix}-status`;
  return (
    <section className="inquiry-card" aria-labelledby={`${prefix}-title`}>
      <p className="eyebrow">최소 정보 온라인 문의</p>
      <h2 id={`${prefix}-title`}>{route === "care" ? "돌봄 문의" : "채용 문의"}</h2>
      <p>{recoveryAvailable
        ? "자유 서술, 진단명, 주민번호, 상세 주소, 파일은 받지 않습니다. 온라인 접수가 어렵다면 아래 검증된 상담 경로를 이용해 주세요."
        : "자유 서술, 진단명, 주민번호, 상세 주소, 파일은 받지 않습니다. 센터 상담 경로가 공개되기 전에는 개인정보를 입력하지 마세요."}</p>
      <form className="inquiry-form" action={`/api/inquiries/${route}`} method="post" aria-describedby={!formAvailable ? statusId : undefined}>
        {!formAvailable ? <div className="form-unavailable" id={statusId} role="status"><strong>온라인 문의 준비 중</strong><p>개인정보 검토와 자동 제출 방지가 모두 확인된 뒤 입력할 수 있습니다. 현재 입력란은 잠겨 있습니다.</p></div> : null}
        <fieldset className="inquiry-fields" disabled={!formAvailable}>
          <legend className="visually-hidden">{route === "care" ? "돌봄 문의 정보" : "채용 문의 정보"}</legend>
          <input type="hidden" name="privacyNoticeVersion" value={noticeVersion} />
          <div className="honeypot" aria-hidden="true"><label htmlFor={`${prefix}-website`}>웹사이트</label><input id={`${prefix}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
          <label htmlFor={`${prefix}-name`}>이름</label>
          <input id={`${prefix}-name`} name="name" autoComplete="name" maxLength={30} required />
          <label htmlFor={`${prefix}-phone`}>연락받을 전화번호</label>
          <input id={`${prefix}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
          <label htmlFor={`${prefix}-time`}>희망 연락 시간</label>
          <select id={`${prefix}-time`} name="preferredContactTime" required defaultValue=""><option value="" disabled>선택해 주세요</option>{timeOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          <label htmlFor={`${prefix}-area`}>대략적인 지역</label>
          <select id={`${prefix}-area`} name="coarseArea" required defaultValue=""><option value="" disabled>선택해 주세요</option>{areaOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          {route === "care" ? <><label htmlFor={`${prefix}-topic`}>고정 상담 주제</label><select id={`${prefix}-topic`} name="topic" required defaultValue=""><option value="" disabled>선택해 주세요</option>{topicOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></> : null}
          <label className="consent-row"><input type="checkbox" required /> <span><Link href="/privacy">개인정보 안내</Link>{noticeVersion ? ` (${noticeVersion})` : " (검토 중)"}를 확인했습니다.</span></label>
        </fieldset>
        {formAvailable && configuredSiteKey ? <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /><div className="cf-turnstile" data-sitekey={configuredSiteKey} /></> : null}
        <button className="button button-primary" type="submit" disabled={!formAvailable}>안전하게 문의 보내기</button>
      </form>
      {recoveryAvailable ? <div className="form-recovery"><h3>다른 문의 방법</h3><ContactActions hideWhenUnavailable /></div> : null}
    </section>
  );
}
