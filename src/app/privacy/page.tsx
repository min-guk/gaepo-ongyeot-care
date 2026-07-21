import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { siteConfig } from "@/lib/config/site";
import { inquiryFieldMatrix, privacyApprovalState, privacyDataFlow, prohibitedInquiryFields } from "@/lib/privacy/disclosure";

export const metadata: Metadata = { title: "개인정보 안내", description: "출시 전 개인정보 처리 검토 상태와 실제 문의 데이터 흐름을 안내합니다." };

export default function PrivacyPage() {
  const approval = privacyApprovalState(siteConfig.facts, process.env);
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="출시 전 개인정보 안내"
        title="수집하기 전에, 필요한지부터 따집니다"
        description={approval.approved ? "검토가 완료된 고지 버전을 공개합니다. 온라인 문의는 승인된 고지와 처리 흐름에 맞춰 활성화됩니다." : "이 페이지는 승인된 법정 개인정보처리방침이 아닙니다. 온라인 문의는 고지와 처리 흐름에 대한 적격 검토가 완료되기 전까지 활성화하지 않습니다."}
        compactMascot
      />
      <section className="section" aria-labelledby="privacy-status-title"><div className="shell narrow">
        <p className="eyebrow">승인 상태</p><h2 id="privacy-status-title">{approval.label}</h2>
        <p>{approval.approved ? "아래 내용은 검증된 최소 수집 경계와 승인된 운영 정보를 설명합니다. 법정 검토와 실제 배포 설정 확인은 계속 별도로 관리됩니다." : "아래 내용은 현재 구현된 최소 수집 경계와 운영 초안을 정확히 설명하지만, 법률·개인정보 전문가의 검토와 실제 배포 설정 확인을 대신하지 않습니다."}</p>
        <dl className="claim-status"><div><dt>고지 버전</dt><dd>{approval.noticeVersion ?? <span className="pending-fact">검토 중 — 미승인</span>}</dd></div><div><dt>적격 검토</dt><dd>{approval.reviewVersion ?? <span className="pending-fact">검토 중 — 미승인</span>}</dd></div></dl>
      </div></section>
      <section className="section sage-section" aria-labelledby="field-matrix-title"><div className="shell narrow">
        <h2 id="field-matrix-title">문의별 정확한 수집 항목</h2>
        <h3>돌봄 문의</h3><p>{inquiryFieldMatrix.care.join(", ")}</p>
        <h3>채용 문의</h3><p>{inquiryFieldMatrix.recruitment.join(", ")}</p>
        <h3>수집하지 않는 항목</h3><p>{prohibitedInquiryFields.join(", ")}</p>
        <p>동의를 거부하면 온라인 문의를 보낼 수 없습니다. 검증된 전화 또는 카카오톡 경로가 공개된 경우 그 대안을 이용할 수 있습니다.</p>
      </div></section>
      <section className="section" aria-labelledby="data-flow-title"><div className="shell narrow">
        <h2 id="data-flow-title">데이터 흐름과 보관</h2><ol className="check-list">{privacyDataFlow.map((step) => <li key={step}>{step}</li>)}</ol>
        <p>Discord는 비공개 초기 문의함이며 돌봄 기록, 사례관리 시스템 또는 CRM이 아닙니다. 실제 Vercel·Upstash·Cloudflare Turnstile·Discord·Kakao 설정, 제공자 로그, 국외 처리 여부와 권리 행사 연락처는 배포 전에 확인해 승인된 고지에 반영해야 합니다.</p>
        <h2>웹사이트가 만들지 않는 것</h2><p>회원 계정, 관리자 로그인, 예약·결제, 보호자 포털, 돌봄 기록, 사례관리 데이터베이스, 파일 업로드 기능을 만들지 않습니다.</p>
      </div></section>
    </main>
  );
}
