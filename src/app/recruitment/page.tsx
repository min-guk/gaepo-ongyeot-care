import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = { title: "채용 안내", description: "확인된 채용 공고와 지원 준비 원칙을 안내합니다." };

export default function RecruitmentPage() {
  return (
    <main id="main-content">
      <PageIntro eyebrow="돌봄의 태도를 함께 만드는 일" title="채용 여부와 조건은 확인된 공고만 게시합니다" description="현재 공개된 채용 공고는 없습니다. 근무 지역, 역할, 일정, 보수, 자격 조건을 운영자가 확인한 뒤에만 모집 중이라고 안내합니다." />
      <section className="section" aria-labelledby="recruitment-principles-title"><div className="shell"><div className="section-heading"><p className="eyebrow">지원자를 위한 약속</p><h2 id="recruitment-principles-title">먼저 알 수 있어야 할 것</h2></div><div className="service-grid three"><article><span aria-hidden="true">01</span><h3>업무 범위</h3><p>돌봄 대상과 역할, 근무 형태를 모호하게 숨기지 않습니다.</p></article><article><span aria-hidden="true">02</span><h3>근무 조건</h3><p>지역, 일정, 보수 기준과 필요한 자격을 확인 가능한 문장으로 적습니다.</p></article><article><span aria-hidden="true">03</span><h3>최소한의 문의</h3><p>공개 전에는 이력서나 민감한 개인정보를 받지 않습니다. 별도 지원 시스템도 만들지 않습니다.</p></article></div></div></section>
      <section className="section paper-section"><div className="shell narrow centered"><p className="eyebrow">현재 상태</p><h2>공고 준비 중</h2><p>채용 문의 경로와 개인정보 안내가 검증될 때까지 온라인 지원을 열지 않습니다.</p><Link className="text-link" href="/about">센터가 지키려는 태도 보기 <span aria-hidden="true">→</span></Link></div></section>
      <section className="section"><div className="shell narrow"><InquiryForm route="recruitment" /></div></section>
    </main>
  );
}
