import { phoneHref, verifiedString } from "@/lib/config/site";

interface ContactActionsProps {
  className?: string;
  hideWhenUnavailable?: boolean;
}

export function ContactActions({ className = "", hideWhenUnavailable = false }: ContactActionsProps) {
  const phone = verifiedString("phone");
  const telephone = phone ? phoneHref(phone) : null;
  const kakao = verifiedString("kakaoChannelUrl");

  if (hideWhenUnavailable && !telephone && !kakao) return null;

  return (
    <div className={`contact-actions ${className}`.trim()} aria-label="상담 연결">
      {telephone ? (
        <a className="button button-primary" href={telephone}>
          전화 상담 {phone}
        </a>
      ) : (
        <span className="button button-disabled" aria-disabled="true">
          전화 정보 확인 중
        </span>
      )}
      {kakao ? (
        <a className="button button-secondary" href={kakao} target="_blank" rel="noreferrer">
          카카오톡 상담 (새 창)
        </a>
      ) : (
        <span className="button button-disabled" aria-disabled="true">
          카카오톡 정보 확인 중
        </span>
      )}
    </div>
  );
}
