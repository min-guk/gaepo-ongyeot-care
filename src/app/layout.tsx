import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactActions } from "@/components/contact-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { releaseReady, siteConfig, verifiedString } from "@/lib/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${siteConfig.workingName}(가칭)`, template: `%s | ${siteConfig.workingName}(가칭)` },
  description: "개포·강남 지역 재가돌봄 정보를 쉽게 설명하는 공개 안내 기반",
  ...(verifiedString("canonicalUrl") ? { metadataBase: new URL(verifiedString("canonicalUrl")!) } : {}),
  robots: releaseReady ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: `${siteConfig.workingName}(가칭)`,
    description: "검증된 운영 정보를 준비하고 있습니다.",
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
