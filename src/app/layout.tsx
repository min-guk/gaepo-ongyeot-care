import type { Metadata } from "next";
import type { ReactNode } from "react";
import { factIsVerifiedForKey } from "@/lib/config/fact-validation.mjs";
import { publicationIsReady } from "@/lib/config/production-validation.mjs";
import { ContactActions } from "@/components/contact-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VerifiedLocalJsonLd } from "@/components/verified-local-json-ld";
import { siteConfig, type SiteFacts } from "@/lib/config/site";
import "./globals.css";

export function buildRootMetadata(facts: SiteFacts = siteConfig.facts, env: NodeJS.ProcessEnv = process.env): Metadata {
  const ready = publicationIsReady(facts, env);
  const canonicalFact = facts.canonicalUrl;
  const canonicalUrl = ready && factIsVerifiedForKey("canonicalUrl", canonicalFact) && typeof canonicalFact.value === "string"
    ? canonicalFact.value
    : null;
  return {
    title: { default: `${siteConfig.workingName}(가칭)`, template: `%s | ${siteConfig.workingName}(가칭)` },
    description: "돌봄의 무게를 가까운 곁에서 나누는, 쉬운 재가돌봄 준비 안내",
    ...(canonicalUrl ? { metadataBase: new URL(canonicalUrl) } : {}),
    robots: ready ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: `${siteConfig.workingName}(가칭)`,
      description: "돌봄의 무게, 가까운 곁에서 나눕니다. 검증된 운영 정보만 공개합니다.",
      locale: "ko_KR",
      type: "website",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
    },
  };
}

export const metadata: Metadata = buildRootMetadata();

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <VerifiedLocalJsonLd />
        <a className="skip-link" href="#main-content">본문으로 바로가기</a>
        <SiteHeader />
        {children}
        <ContactActions className="mobile-cta" hideWhenUnavailable />
        <SiteFooter />
      </body>
    </html>
  );
}
