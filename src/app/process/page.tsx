import type { Metadata } from "next";
import { ConsultationPanel } from "@/components/consultation-panel";
import { PageIntro } from "@/components/page-intro";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("/process", "이용 순서와 비용", "재가돌봄을 알아보는 일반적인 순서와 비용 확인 질문을 안내합니다.");

const steps = [
  ["현재의 어려움 적기", "식사, 이동, 위생, 외출, 말벗 등 최근 달라진 일상을 짧게 정리합니다."],
  ["장기요양등급 확인", "등급 유무와 신청 진행 상황을 확인합니다. 아직 모른다면 그 상태 그대로 질문해도 됩니다."],
  ["가능 범위 상담", "필요한 도움, 희망 시간, 생활 환경을 바탕으로 실제 제공 가능 여부를 확인합니다."],
  ["비용과 일정 확인", "적용 기준, 본인부담, 추가 비용 여부를 서면 안내와 최신 기준으로 확인합니다."],
  ["충분히 검토 후 결정", "바로 결정하지 않아도 됩니다. 설명과 계약 내용을 가족과 다시 살펴봅니다."],
];

export default function ProcessPage() {
  return (
    <main id="main-content">
      <PageIntro eyebrow="처음 알아보는 가족을 위한 순서" title="한 번에 결정하지 않고, 다섯 걸음으로 확인합니다" description="아래는 일반적인 준비 흐름입니다. 실제 이용 절차, 소요 기간, 등급과 비용은 최신 공공 기준과 센터의 검증된 안내를 함께 확인해야 합니다." />
      <section className="section" aria-labelledby="steps-title"><div className="shell"><h2 id="steps-title" className="visually-hidden">일반적인 이용 준비 다섯 단계</h2><ol className="steps-list">{steps.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></div></section>
      <section className="section paper-section" aria-labelledby="cost-title"><div className="shell cost-layout"><div><p className="eyebrow">숫자보다 먼저 물을 것</p><h2 id="cost-title">비용 안내에서 확인할 네 가지</h2></div><ul className="check-list"><li>안내 기준일과 적용되는 공식 기준</li><li>장기요양등급 및 본인부담 조건</li><li>이용 시간과 횟수에 따른 차이</li><li>계약 전에 별도로 확인할 비용의 유무</li></ul></div><p className="shell source-note">개포 온곁은 현재 검증된 비용 수치를 게시하지 않습니다. 최신 비용 정보는 향후 검토일과 출처를 함께 표시합니다.</p></section>
      <section className="section"><div className="shell"><ConsultationPanel title="정답을 정한 뒤 연락하지 않아도 됩니다" /></div></section>
    </main>
  );
}
