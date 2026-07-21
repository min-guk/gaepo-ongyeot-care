import Link from "next/link";
import { OniMascot } from "@/components/brand/oni-mascot";
import { ConsultationPanel } from "@/components/consultation-panel";

const paths = [
  { number: "01", title: "부모님 돌봄이 걱정될 때", body: "갑작스러운 변화가 아니어도 괜찮습니다. 일상에서 어려워진 일을 적어보는 것부터 시작합니다.", href: "/process" },
  { number: "02", title: "서비스가 낯설 때", body: "일반적인 재가돌봄의 범위와 상담 전 확인할 항목을 쉬운 말로 정리했습니다.", href: "/services" },
  { number: "03", title: "일을 알아보고 싶을 때", body: "채용 여부와 조건은 확인된 공고만 게시합니다. 지원 전 준비 정보를 먼저 볼 수 있습니다.", href: "/recruitment" },
];

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="shell home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">개포의 일상 가까이, 돌봄을 이해하는 첫 자리</p>
            <h1>돌봄의 무게,<br /><em>가까운 곁에서</em> 나눕니다.</h1>
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
            <OniMascot />
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

      <section className="section paper-section" aria-labelledby="first-check-title">
        <div className="shell note-composition">
          <div className="note-index" aria-hidden="true">첫<br />확인</div>
          <div>
            <p className="eyebrow">등급이 없어도 정보 확인부터</p>
            <h2 id="first-check-title">무엇을 모르는지부터 함께 정리해 보세요</h2>
            <p className="lede">장기요양등급, 필요한 도움, 가능한 시간, 비용 기준은 서로 연결되어 있습니다. 이 페이지는 특정 혜택이나 제공 여부를 약속하지 않고, 상담 전에 확인할 질문을 순서대로 보여드립니다.</p>
            <Link className="text-link" href="/process">이용 순서와 비용 질문 보기 <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="section"><div className="shell"><ConsultationPanel /></div></section>
    </main>
  );
}
