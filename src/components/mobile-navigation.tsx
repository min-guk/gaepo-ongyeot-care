"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";

interface NavigationItem {
  href: string;
  label: string;
}

export function MobileNavigation({ items }: { items: readonly NavigationItem[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function closeAfterSelection(event: MouseEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("a")) {
      detailsRef.current?.removeAttribute("open");
    }
  }

  return (
    <details className="mobile-nav" ref={detailsRef}>
      <summary>메뉴</summary>
      <nav aria-label="모바일 주요 메뉴" onClick={closeAfterSelection}>
        {items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
    </details>
  );
}
