import Link from "next/link";
import { OniMascot } from "@/components/brand/oni-mascot";
import { ContactActions } from "@/components/contact-actions";
import { siteConfig } from "@/lib/config/site";

const navigation = [
  { href: "/", label: "홈" },
  { href: "/services", label: "돌봄 서비스" },
  { href: "/process", label: "이용 순서·비용" },
  { href: "/guides", label: "가족 돌봄 가이드" },
  { href: "/about", label: "센터 이야기" },
  { href: "/contact", label: "문의" },
  { href: "/recruitment", label: "채용" },
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
          <span aria-hidden="true" className="brand-mark"><OniMascot decorative /></span>
          <span><b>개포 온곁</b><small>재가복지센터 · 가칭</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          <NavigationLinks />
        </nav>
        <ContactActions className="desktop-actions" hideWhenUnavailable />
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
