import type { Metadata } from "next";
import { ConsultationPanel } from "@/components/consultation-panel";
import { ClaimStatus } from "@/components/claim-status";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "돌봄 서비스 안내", description: "재가돌봄 상담 전 확인할 일반적인 도움 영역을 안내합니다." };

const categories = [
  ["일상 돌봄", "식사, 옷 입기, 씻기, 이동처럼 하루를 이어가는 데 필요한 도움을 살핍니다."],
  ["생활 환경", "어르신이 주로 머무는 공간의 정돈, 세탁, 식사 준비처럼 생활에 직접 닿는 일을 구분합니다."],
  ["외출과 이동", "산책, 병원이나 일상 외출처럼 이동이 필요한 상황과 동행 범위를 확인합니다."],
  ["인지와 정서", "익숙한 활동, 대화, 말벗처럼 안정적인 일상을 돕는 필요가 있는지 살핍니다."],
  ["가족 돌봄의 쉼", "가족이 감당해 온 시간과 역할을 정리하고, 나눌 수 있는 부분을 상담합니다."],
  ["등급·제도 질문", "장기요양등급 신청 전후에 무엇을 확인해야 하는지 질문 목록을 준비합니다."],
];

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageIntro eyebrow="서비스를 고르기 전, 필요한 도움부터" title="돌봄은 이름보다 일상의 장면으로 살펴봅니다" description="아래 내용은 재가돌봄 상담에서 일반적으로 정리하는 영역입니다. 개포 온곁의 실제 지정 서비스와 제공 범위는 운영자 검증 후 공개합니다." />
      <section className="section" aria-labelledby="service-areas-title">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow">일반적인 돌봄 영역</p><h2 id="service-areas-title">우리 가족에게 필요한 장면 찾기</h2></div>
          <div className="service-grid">
            {categories.map(([title, body], index) => <article key={title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>
      <section className="section sage-section" aria-labelledby="availability-title"><div className="shell narrow"><p className="eyebrow">확인된 사실만 표시합니다</p><h2 id="availability-title">실제 제공 범위</h2><p>상담 전, 아래 정보가 공개되었는지 먼저 확인해 주세요. 확인되지 않은 서비스를 제공한다고 표시하지 않습니다.</p><ClaimStatus keys={["designatedServices", "serviceArea"]} /></div></section>
      <section className="section"><div className="shell"><ConsultationPanel title="서비스 이름을 몰라도 괜찮습니다" /></div></section>
    </main>
  );
}
