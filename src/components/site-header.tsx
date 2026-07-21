import Link from "next/link";
import { ContactActions } from "@/components/contact-actions";
import { siteConfig } from "@/lib/config/site";

const navigation = [
  { href: "/", label: "홈" },
  { href: "/#services", label: "돌봄 서비스" },
  { href: "/#process", label: "상담 순서" },
  { href: "/#contact", label: "문의" },
];

function NavigationLinks() {
  return navigation.map((item) => (
    <Link key={item.href} href={item.href}>
      {item.label}
    </Link>
  ));
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-row">
        <Link className="brand" href="/" aria-label={`${siteConfig.workingName}(가칭) 홈`}>
          <span aria-hidden="true" className="brand-mark">
            온
          </span>
          <span>{siteConfig.workingName} <small>(가칭)</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          <NavigationLinks />
        </nav>
        <ContactActions className="desktop-actions" />
        <details className="mobile-nav">
          <summary>메뉴</summary>
          <nav aria-label="모바일 주요 메뉴">
            <NavigationLinks />
          </nav>
        </details>
      </div>
    </header>
  );
}
