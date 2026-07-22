import type { Metadata } from "next";
import { ClaimStatus } from "@/components/claim-status";
import { ContactActions } from "@/components/contact-actions";
import { PageIntro } from "@/components/page-intro";
import { InquiryForm } from "@/components/inquiry-form";
import { LocationGuide } from "@/components/location-guide";
import { UrgentHelp } from "@/components/urgent-help";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("/contact", "문의", "돌봄 문의 전 준비 내용과 검증된 상담 연결 상태를 안내합니다.");

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageIntro eyebrow="말이 정리되지 않아도 괜찮습니다" title="지금 가장 어려운 한 가지부터 준비해 주세요" description="전화·카카오톡·온라인 문의는 실제 연결 및 개인정보 검토가 끝난 뒤 활성화합니다. 현재는 민감한 개인정보를 입력하거나 보내지 마세요." compactMascot />
      <UrgentHelp />
      <section className="section" id="alternatives" aria-labelledby="contact-options-title"><div className="shell contact-layout"><div><p className="eyebrow">상담 연결 상태</p><h2 id="contact-options-title">검증된 경로만 열립니다</h2><p>임시 번호나 확인되지 않은 채널로 연결하지 않습니다. 활성화 전에는 버튼이 링크가 아닌 ‘확인 중’ 상태로 표시됩니다.</p><ContactActions /></div><div className="preparation-card"><h3>상담 전 메모할 세 가지</h3><ol><li>누구의 돌봄을 알아보는지</li><li>요즘 가장 어려워진 일상은 무엇인지</li><li>장기요양등급 유무를 알고 있는지</li></ol><p>진단명, 주민번호, 상세 주소 같은 민감한 내용은 이 웹사이트에 보내지 마세요.</p></div></div></section>
      <LocationGuide />
      <section className="section paper-section" aria-labelledby="visit-title"><div className="shell narrow"><p className="eyebrow">방문 전 확인</p><h2 id="visit-title">운영 시간</h2><ClaimStatus keys={["hours"]} /></div></section>
      <section className="section"><div className="shell narrow"><InquiryForm route="care" /></div></section>
    </main>
  );
}
