import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { verifiedString } from "@/lib/config/site";

export const metadata: Metadata = { title: "개인정보 안내", description: "출시 전 개인정보 처리 검토 상태와 안전한 이용 원칙을 안내합니다." };

export default function PrivacyPage() {
  const version = verifiedString("privacyNoticeVersion");
  const review = verifiedString("privacyReview");
  return (
    <main id="main-content">
      <PageIntro eyebrow="출시 전 개인정보 안내" title="수집하기 전에, 필요한지부터 따집니다" description="이 페이지는 승인된 법정 개인정보처리방침이 아닙니다. 온라인 문의는 고지와 처리 흐름에 대한 적격 검토가 완료되기 전까지 활성화하지 않습니다." compactMascot />
      <section className="section" aria-labelledby="privacy-principles-title"><div className="shell privacy-layout"><div><p className="eyebrow">현재 적용 원칙</p><h2 id="privacy-principles-title">지금은 입력하지 마세요</h2><p>이름, 전화번호, 진단명, 주민번호, 상세 주소, 이력서 등 개인정보를 웹사이트에 보내지 마세요. 공개된 입력 화면이나 파일 업로드 기능이 없습니다.</p><dl className="claim-status"><div><dt>고지 버전</dt><dd>{version || <span className="pending-fact">검토 중 — 미승인</span>}</dd></div><div><dt>적격 검토</dt><dd>{review || <span className="pending-fact">검토 중 — 미승인</span>}</dd></div></dl></div><div className="privacy-card"><h3>출시 전 확인할 내용</h3><ul className="check-list"><li>수집 항목과 이용 목적</li><li>보관 장소와 삭제 기한</li><li>외부 처리자와 접근 권한</li><li>동의 거부 시 이용 가능한 대안</li><li>문의와 권리 행사 방법</li></ul></div></div></section>
      <section className="section sage-section"><div className="shell narrow"><h2>웹사이트가 만들지 않는 것</h2><p>회원 계정, 관리자 로그인, 예약·결제, 보호자 포털, 돌봄 기록, 사례관리 데이터베이스, 파일 업로드 기능을 만들지 않습니다.</p></div></section>
    </main>
  );
}
