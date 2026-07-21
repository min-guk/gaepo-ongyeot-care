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
      <section className="section" aria-labelledby="privacy-principles-title"><div className="shell privacy-layout"><div><p className="eyebrow">현재 적용 원칙</p><h2 id="privacy-principles-title">꼭 필요한 정보만 받습니다</h2><p>온라인 문의는 이름, 전화번호, 희망 연락 시간, 대략적인 지역과 고지 버전만 받으며 돌봄 문의에만 고정 상담 주제를 더합니다. 진단명, 주민번호, 상세 주소, 자유 서술, 이력서와 파일은 받지 않습니다.</p><dl className="claim-status"><div><dt>고지 버전</dt><dd>{version || <span className="pending-fact">검토 중 — 미승인</span>}</dd></div><div><dt>적격 검토</dt><dd>{review || <span className="pending-fact">검토 중 — 미승인</span>}</dd></div></dl></div><div className="privacy-card"><h3>출시 전 확인할 내용</h3><ul className="check-list"><li>수집 항목과 이용 목적</li><li>보관 장소와 삭제 기한</li><li>외부 처리자와 접근 권한</li><li>동의 거부 시 이용 가능한 대안</li><li>문의와 권리 행사 방법</li></ul></div></div></section>
      <section className="section sage-section"><div className="shell narrow"><h2>보관과 외부 전달 원칙</h2><p>확인된 온라인 문의는 접근이 제한된 돌봄·채용별 Discord 채널로 전달하며, 후속 연락 뒤 또는 늦어도 30일 안에 삭제합니다. Discord를 돌봄 기록이나 고객관리 데이터베이스로 사용하지 않습니다.</p><h2>웹사이트가 만들지 않는 것</h2><p>회원 계정, 관리자 로그인, 예약·결제, 보호자 포털, 돌봄 기록, 사례관리 데이터베이스, 파일 업로드 기능을 만들지 않습니다.</p></div></section>
    </main>
  );
}
