import type { Metadata } from "next";
import Link from "next/link";
import { OniMascot } from "@/components/brand/oni-mascot";
import { formatGuideDate, guides } from "@/lib/guides/collection";
import { buildPageMetadata } from "@/lib/seo/metadata";
import styles from "./guides.module.css";

export const metadata: Metadata = buildPageMetadata("/guides", "가족 돌봄 시작 가이드", "처음 가족 돌봄을 준비할 때 필요한 장기요양과 강남 지역 지원 정보를 출처와 검토일과 함께 안내합니다.");

export default function GuidesPage() {
  return (
    <main id="main-content">
      <header className={styles.hero}>
        <div className={`shell ${styles.heroInner}`}>
          <div>
            <p className="eyebrow">처음 가족을 돌보는 분을 위한 짧은 안내</p>
            <h1>출처와 검토일을 확인하는 돌봄 가이드</h1>
            <p className="lede">신청, 방문조사, 재가서비스, 비용, 치매 가족 지원과 강남 통합돌봄을 한 단계씩 살펴보세요.</p>
            <aside className={styles.notice} aria-label="중요 안내">
              이 가이드는 일반 정보이며 의료·법률 자문이 아닙니다. 개인의 자격, 건강 상태, 비용과 긴급 상황은 해당 공공기관의 최신 안내와 전문가 판단을 확인하세요.
            </aside>
          </div>
          <div className={styles.flyingGuide}>
            <OniMascot scene="guide" decorative />
            <p aria-hidden="true">확인할 출처를 향해 먼저 날아가 볼게요.</p>
          </div>
        </div>
      </header>

      <section className={styles.indexSection} aria-labelledby="guide-list-title">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">2026년 7월 21일 검토</p>
            <h2 id="guide-list-title">지금 필요한 순서부터 읽어보세요</h2>
          </div>
          <div className={styles.guideGrid}>
            {guides.map((guide) => (
              <article className={styles.guideCard} key={guide.slug}>
                <span className={styles.tag}>{guide.category}</span>
                <h2>{guide.title}</h2>
                <p>{guide.summary}</p>
                <p className={styles.meta}>
                  <span>검토 <time dateTime={guide.reviewedAt}>{formatGuideDate(guide.reviewedAt)}</time></span>
                  <span>재검토 주기 {guide.freshnessDays}일</span>
                </p>
                <Link href={`/guides/${guide.slug}`}>가이드 읽기 <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
