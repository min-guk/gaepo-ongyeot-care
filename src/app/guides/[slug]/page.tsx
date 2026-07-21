import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatGuideDate, getGuideBySlug, getRelatedGuides, guides } from "@/lib/guides/collection";
import styles from "../guides.module.css";

type GuideDetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: GuideDetailProps): Promise<Metadata> {
  const guide = getGuideBySlug((await params).slug);
  if (!guide) return { title: "가이드를 찾을 수 없습니다" };
  return { title: guide.title, description: guide.summary };
}

export default async function GuideDetailPage({ params }: GuideDetailProps) {
  const guide = getGuideBySlug((await params).slug);
  if (!guide) notFound();
  const relatedGuides = getRelatedGuides(guide.relatedGuideSlugs);

  return (
    <main id="main-content">
      <article>
        <header className="page-hero">
          <div className={`shell ${styles.detailHeader}`}>
            <Link className={styles.backLink} href="/guides">← 전체 가이드</Link>
            <span className={styles.tag}>{guide.category}</span>
            <h1>{guide.title}</h1>
            <p className="lede">{guide.summary}</p>
            <p className={styles.meta}>
              <span>검토 <time dateTime={guide.reviewedAt}>{formatGuideDate(guide.reviewedAt)}</time></span>
              <span>다음 검토 기한 <time dateTime={guide.reviewDueAt}>{formatGuideDate(guide.reviewDueAt)}</time></span>
              <span>재검토 주기 {guide.freshnessDays}일</span>
            </p>
            <aside className={styles.notice} aria-label="의료·법률 자문 아님">
              이 글은 일반적인 준비 정보이며 의료·법률 자문이 아닙니다. 개인의 자격, 건강 상태, 비용과 긴급 상황은 해당 공공기관의 최신 안내와 전문가 판단을 확인하세요.
            </aside>
          </div>
        </header>

        <div className={`shell ${styles.detailSection} ${styles.articleLayout}`}>
          <div className={styles.articleBody}>
            {guide.sections.map((section, index) => {
              const sectionId = `${guide.slug}-section-${index + 1}`;
              return <section key={section.heading} aria-labelledby={sectionId}>
                <h2 id={sectionId}>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </section>;
            })}
          </div>

          <aside className={styles.nextStep} aria-labelledby="next-step-title">
            <p className="eyebrow">다음 한 걸음</p>
            <h2 id="next-step-title">{guide.nextStep.label}</h2>
            <p>{guide.nextStep.note}</p>
            <Link className="button button-paper" href={guide.nextStep.href}>이어 읽기</Link>
          </aside>
        </div>

        <footer className={`shell ${styles.sources}`}>
          <h2>확인한 공공 출처</h2>
          <p className={styles.sourceMeta}>모든 출처는 <time dateTime={guide.reviewedAt}>{formatGuideDate(guide.reviewedAt)}</time>에 검토했습니다. 링크의 최신 내용을 다시 확인하세요.</p>
          <ul>
            {guide.sources.map((source) => <li key={source.url}><a href={source.url}>{source.title}</a></li>)}
          </ul>
        </footer>
      </article>

      <section className={styles.relatedSection} aria-labelledby="related-guides-title">
        <div className="shell">
          <h2 id="related-guides-title">함께 보면 좋은 가이드</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((relatedGuide) => (
              <article className={styles.relatedCard} key={relatedGuide.slug}>
                <h3>{relatedGuide.title}</h3>
                <p>{relatedGuide.summary}</p>
                <Link href={`/guides/${relatedGuide.slug}`}>관련 가이드 읽기 <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
