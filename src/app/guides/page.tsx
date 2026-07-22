import type { Metadata } from "next";
import Link from "next/link";
import { OniMascot } from "@/components/brand/oni-mascot";
import { GUIDE_FAQ_CATEGORIES, guideFaqs } from "@/content/guide-faqs";
import { formatGuideDate, guides } from "@/lib/guides/collection";
import { buildPageMetadata } from "@/lib/seo/metadata";
import styles from "./guides.module.css";

export const metadata: Metadata = buildPageMetadata("/guides", "가족 돌봄 시작 가이드와 Q&A", "장기요양 신청부터 재가서비스 이용, 가족 돌봄과 강남 지역 지원까지 18개 가이드와 24개 출처 기반 Q&A로 안내합니다.");

const GUIDE_CATEGORIES = [
  { name: "신청·판정", description: "신청 대상과 방문조사, 결과서를 읽는 순서를 확인합니다." },
  { name: "서비스 선택", description: "기관과 재가급여 종류, 복지용구를 생활 상황에 맞게 비교합니다." },
  { name: "계약·이용", description: "비용과 업무 범위, 일정·담당자 변경 등 이용 중 필요한 기준을 살펴봅니다." },
  { name: "가족 돌봄", description: "치매 돌봄과 가족의 휴식, 가족 사이 인수인계를 함께 준비합니다." },
  { name: "지역·전환 지원", description: "퇴원 이후와 등급외 상황에서 강남 지역의 연결 경로를 찾습니다." },
] as const;

export default function GuidesPage() {
  const latestReviewedAt = guides.reduce((latest, guide) => guide.reviewedAt > latest ? guide.reviewedAt : latest, guides[0]!.reviewedAt);
  const guideGroups = GUIDE_CATEGORIES.map((category) => ({ ...category, guides: guides.filter((guide) => guide.category === category.name) }));
  const faqGroups = GUIDE_FAQ_CATEGORIES.map((category) => ({ category, faqs: guideFaqs.filter((faq) => faq.category === category) }));
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guideFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</gu, "\\u003c") }} />
      <header className={styles.hero}>
        <div className={`shell ${styles.heroInner}`}>
          <div>
            <p className="eyebrow">처음 가족을 돌보는 분을 위한 짧은 안내</p>
            <h1>출처와 검토일을 확인하는 돌봄 가이드</h1>
            <p className="lede">신청과 방문조사부터 결과서, 기관 선택, 재가서비스 조합, 생활 안전과 강남 지역 지원까지 한 단계씩 살펴보세요.</p>
            <nav className={styles.quickLinks} aria-label="가이드 페이지 바로가기">
              <a href="#frequent-questions-title"><strong>{guideFaqs.length}</strong><span>개 자주 묻는 질문</span></a>
              <a href="#guide-list-title"><strong>{guides.length}</strong><span>개 가이드</span></a>
            </nav>
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

      <section className={styles.faqSection} aria-labelledby="frequent-questions-title">
        <div className={`shell ${styles.faqLayout}`}>
          <div className={styles.faqIntro}>
            <p className="eyebrow">처음 상담할 때 자주 묻는 질문</p>
            <h2 id="frequent-questions-title">짧은 답을 공식 답변과 함께 확인하세요</h2>
            <p>국민건강보험공단·보건복지부의 공개 안내를 기준으로 정리했습니다. 질문을 열면 답변, 관련 가이드와 원문 출처를 한 번에 볼 수 있습니다.</p>
            <nav className={styles.categoryNav} aria-label="Q&A 범주 바로가기">
              {faqGroups.map((group, index) => <a key={group.category} href={`#faq-category-${index + 1}`}><span>{group.category}</span><strong>{group.faqs.length}</strong></a>)}
            </nav>
          </div>
          <div className={styles.faqGroups}>
            {faqGroups.map((group, groupIndex) => (
              <section className={styles.faqGroup} key={group.category} aria-labelledby={`faq-category-${groupIndex + 1}`}>
                <header className={styles.groupHeading}>
                  <h3 id={`faq-category-${groupIndex + 1}`}>{group.category}</h3>
                  <span>{group.faqs.length}개 질문</span>
                </header>
                <div className={styles.faqList}>
                  {group.faqs.map((faq, faqIndex) => (
                    <details key={faq.question}>
                      <summary><span>{String(faqIndex + 1).padStart(2, "0")}</span>{faq.question}</summary>
                      <div className={styles.faqAnswer}>
                        <p>{faq.answer}</p>
                        <div className={styles.faqLinks}>
                          <Link href={`/guides/${faq.relatedGuideSlug}`}>{faq.relatedLabel} <span aria-hidden="true">→</span></Link>
                          <span aria-hidden="true">·</span>
                          {faq.sources.map((source, sourceIndex) => (
                            <span key={source.url}>
                              <a href={source.url}>공식 출처 {sourceIndex + 1}</a>{sourceIndex < faq.sources.length - 1 ? <span aria-hidden="true">, </span> : null}
                            </span>
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.indexSection} aria-labelledby="guide-list-title">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">{formatGuideDate(latestReviewedAt)} 최신 검토</p>
            <h2 id="guide-list-title">지금 필요한 순서부터 읽어보세요</h2>
          </div>
          <nav className={`${styles.categoryNav} ${styles.guideCategoryNav}`} aria-label="가이드 범주 바로가기">
            {guideGroups.map((group, index) => <a key={group.name} href={`#guide-category-${index + 1}`}><span>{group.name}</span><strong>{group.guides.length}</strong></a>)}
          </nav>
          <div className={styles.guideGroups}>
            {guideGroups.map((group, groupIndex) => (
              <section className={styles.guideGroup} key={group.name} aria-labelledby={`guide-category-${groupIndex + 1}`}>
                <header className={styles.guideGroupHeading}>
                  <div>
                    <p className="eyebrow">{String(groupIndex + 1).padStart(2, "0")}</p>
                    <h3 id={`guide-category-${groupIndex + 1}`}>{group.name}</h3>
                  </div>
                  <p>{group.description}</p>
                </header>
                <div className={styles.guideGrid}>
                  {group.guides.map((guide) => (
                    <article className={styles.guideCard} key={guide.slug}>
                      <span className={styles.tag}>{guide.category}</span>
                      <h4>{guide.title}</h4>
                      <p>{guide.summary}</p>
                      <p className={styles.meta}>
                        <span>검토 <time dateTime={guide.reviewedAt}>{formatGuideDate(guide.reviewedAt)}</time></span>
                        <span>재검토 주기 {guide.freshnessDays}일</span>
                      </p>
                      <Link href={`/guides/${guide.slug}`}>가이드 읽기 <span aria-hidden="true">→</span></Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
