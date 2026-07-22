import type { Metadata } from "next";
import Link from "next/link";
import { OniMascot } from "@/components/brand/oni-mascot";
import { ConsultationPanel } from "@/components/consultation-panel";
import { DirectorPhoto } from "@/components/director-photo";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("/", "개포 온곁 재가복지센터", "돌봄의 무게를 가까운 곁에서 나누는, 쉬운 재가돌봄 준비 안내");

const paths = [
  { number: "01", title: "부모님 돌봄이 걱정될 때", body: "갑작스러운 변화가 아니어도 괜찮습니다. 일상에서 어려워진 일을 적어보는 것부터 시작합니다.", href: "/process" },
  { number: "02", title: "서비스가 낯설 때", body: "일반적인 재가돌봄의 범위와 상담 전 확인할 항목을 쉬운 말로 정리했습니다.", href: "/services" },
  { number: "03", title: "일을 알아보고 싶을 때", body: "채용 여부와 조건은 확인된 공고만 게시합니다. 지원 전 준비 정보를 먼저 볼 수 있습니다.", href: "/recruitment" },
];

const firstChecks = [
  { number: "01", title: "지금 어려워진 일상", body: "식사, 이동, 위생, 외출처럼 최근 달라진 장면을 한두 가지만 적어보세요." },
  { number: "02", title: "장기요양등급 여부", body: "등급이 없어도 괜찮습니다. 신청 여부와 현재 알고 있는 상태만 구분해 둡니다." },
  { number: "03", title: "필요한 요일과 시간", body: "매일 필요한지, 특정 요일이나 시간대가 어려운지 가족의 생활 기준으로 살펴봅니다." },
  { number: "04", title: "비용과 계약 전 질문", body: "본인부담 조건, 추가 비용, 계약 전에 확인할 항목을 질문 목록으로 준비합니다." },
];

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="shell home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">개포의 일상 가까이, 돌봄을 이해하는 첫 자리</p>
            <h1>돌봄의 무게, <em>가까운 곁에서</em> 나눕니다.</h1>
            <p className="lede">가족이 혼자 답을 내리지 않도록, 재가돌봄의 첫 질문부터 차분한 순서로 안내합니다.</p>
            <div className="hero-links">
              <Link className="button button-primary" href="/process">처음 준비 순서 보기</Link>
              <Link className="button button-paper" href="/services">돌봄 범위 살펴보기</Link>
            </div>
            <p className="working-note">개포 온곁 재가복지센터는 현재 가칭입니다. 법정 기관 정보와 운영 사실은 검증 후 공개합니다.</p>
          </div>
          <div className="mascot-stage">
            <span className="orbit orbit-one" aria-hidden="true" />
            <span className="orbit orbit-two" aria-hidden="true" />
            <OniMascot scene="welcome" />
            <p className="mascot-caption"><strong>온이</strong><span>곁을 먼저 살피는 이웃 새</span></p>
          </div>
        </div>
      </section>

      <section className="section path-section" aria-labelledby="path-title">
        <div className="shell">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">어디서 시작해도 괜찮습니다</p><h2 id="path-title">지금의 마음에 가까운 길</h2></div>
            <p>상담을 결정하기 전에도 읽고 정리할 수 있는, 부담 없는 안내부터 준비했습니다.</p>
          </div>
          <div className="path-grid">
            {paths.map((path) => (
              <article className="path-card" key={path.number}>
                <span className="path-number">{path.number}</span>
                <h3>{path.title}</h3>
                <p>{path.body}</p>
                <Link href={path.href}>안내 보기 <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sage-section" aria-labelledby="director-message-title">
        <div className="shell director-message">
          <DirectorPhoto variant="consultation" />
          <div>
            <p className="eyebrow">유창순 원장의 상담 약속</p>
            <h2 id="director-message-title">답을 정해 놓기보다, 먼저 이야기를 듣겠습니다</h2>
            <p className="lede">돌봄을 알아보는 가족마다 어려운 장면과 준비된 정도가 다릅니다. 지금 알고 있는 것부터 차분히 듣고, 다음에 확인할 질문을 함께 정리하는 상담을 준비하고 있습니다.</p>
          </div>
        </div>
      </section>

      <section className="section first-check-section" aria-labelledby="first-check-title">
        <div className="shell first-check-layout">
          <div className="first-check-copy">
            <p className="eyebrow">등급이 없어도 정보 확인부터</p>
            <h2 id="first-check-title">무엇을 모르는지부터 함께 정리해 보세요</h2>
            <p className="lede">장기요양등급, 필요한 도움, 가능한 시간, 비용 기준은 서로 연결되어 있습니다. 이 페이지는 특정 혜택이나 제공 여부를 약속하지 않고, 상담 전에 확인할 질문을 순서대로 보여드립니다.</p>
            <Link className="text-link" href="/process">이용 순서와 비용 질문 보기 <span aria-hidden="true">→</span></Link>
          </div>
          <ol className="first-check-list">
            {firstChecks.map((item) => (
              <li key={item.number}>
                <span aria-hidden="true">{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section"><div className="shell"><ConsultationPanel /></div></section>
    </main>
  );
}
