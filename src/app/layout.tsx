import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactActions } from "@/components/contact-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { releaseReady, siteConfig, verifiedString } from "@/lib/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${siteConfig.workingName}(가칭)`, template: `%s | ${siteConfig.workingName}(가칭)` },
  description: "돌봄의 무게를 가까운 곁에서 나누는, 쉬운 재가돌봄 준비 안내",
  ...(verifiedString("canonicalUrl") ? { metadataBase: new URL(verifiedString("canonicalUrl")!) } : {}),
  robots: releaseReady ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: `${siteConfig.workingName}(가칭)`,
    description: "돌봄의 무게, 가까운 곁에서 나눕니다. 검증된 운영 정보만 공개합니다.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">본문으로 바로가기</a>
        <SiteHeader />
        {children}
        <ContactActions className="mobile-cta" />
        <SiteFooter />
      </body>
    </html>
  );
}
