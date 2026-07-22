import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import RootLayout, { metadata } from "../../src/app/layout";
import HomePage from "../../src/app/page";
import { ConsultationPanel } from "../../src/components/consultation-panel";
import { ContactActions } from "../../src/components/contact-actions";
import { SiteFooter } from "../../src/components/site-footer";
import { SiteHeader } from "../../src/components/site-header";
import { siteConfig } from "../../src/lib/config/site";

describe("semantic accessible shell", () => {
  const html = renderToStaticMarkup(
    <RootLayout>
      <HomePage />
    </RootLayout>,
  );

  it("orders the skip link before the header and provides one target main landmark", () => {
    expect(html.indexOf('href="#main-content"')).toBeLessThan(html.indexOf("<header"));
    expect(html).toContain('<main id="main-content">');
    expect(html.match(/<main\b/gu)).toHaveLength(1);
    expect(html).toContain('<nav class="desktop-nav" aria-label="주요 메뉴">');
    expect(html).toContain("<footer");
  });

  it("uses a native mobile disclosure and hides unavailable shell contact controls", () => {
    expect(html).toContain('<details class="mobile-nav">');
    expect(html).toContain("<summary>메뉴</summary>");
    expect(html).toContain("전화 정보 확인 중");
    expect(renderToStaticMarkup(<SiteHeader />)).not.toContain("desktop-actions");
    expect(renderToStaticMarkup(<ContactActions className="mobile-cta" hideWhenUnavailable />)).toBe("");
    expect(html).not.toContain('class="contact-actions mobile-cta"');
    expect(html).not.toContain("tel:__REQUIRED");
    expect(html).not.toContain("href=\"__REQUIRED");
  });

  it("keeps unresolved previews out of search results without disabling zoom", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(html).not.toContain("user-scalable=no");
    expect(html).not.toContain("maximum-scale=1");
  });
});

describe("shell CSS contracts", () => {
  const css = readFileSync(new URL("../../src/app/globals.css", import.meta.url), "utf8");

  it("defines tokens, visible focus, responsive CTAs, and motion/forced-color fallbacks", () => {
    expect(css).toContain("--color-primary:");
    expect(css).toContain("--color-focus-on-dark: #fffaf0");
    expect(css).toMatch(/\.focus-surface-dark :focus-visible\s*\{[^}]*outline-color:\s*var\(--color-focus-on-dark\)/su);
    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:/su);
    expect(css).not.toMatch(/outline\s*:\s*none/iu);
    expect(css).toContain("position: sticky");
    expect(css).toContain("env(safe-area-inset-bottom)");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("@media (forced-colors: active)");
    expect(css).not.toContain("overflow-x: hidden");
    expect(css).toMatch(/body\s*\{[^}]*word-break:\s*keep-all/su);
    expect(css).toMatch(/h1, h2, h3\s*\{[^}]*word-break:\s*keep-all/su);
  });

  it("applies the reusable dark-surface focus contract to footer and consultation links", () => {
    expect(renderToStaticMarkup(<SiteFooter />)).toContain('class="site-footer focus-surface-dark"');
    const originalPhone = siteConfig.facts.phone;
    const originalKakao = siteConfig.facts.kakaoChannelUrl;
    try {
      siteConfig.facts.phone = { value: "02-1234-5678", status: "verified", source: "https://evidence.example/phone", verifiedAt: "2026-07-21T00:00:00.000Z", reviewDueAt: "2027-01-21T00:00:00.000Z" };
      siteConfig.facts.kakaoChannelUrl = { value: "https://pf.kakao.com/_verified", status: "verified", source: "https://evidence.example/kakao", verifiedAt: "2026-07-21T00:00:00.000Z", reviewDueAt: "2027-01-21T00:00:00.000Z" };
      const consultation = renderToStaticMarkup(<ConsultationPanel />);
      const header = renderToStaticMarkup(<SiteHeader />);
      expect(consultation).toContain('class="consultation-panel focus-surface-dark"');
      expect(consultation).toContain('href="tel:0212345678"');
      expect(consultation).toContain('href="https://pf.kakao.com/_verified"');
      expect(consultation).toContain('href="/contact"');
      expect(header).toContain('class="contact-actions desktop-actions"');
    } finally {
      siteConfig.facts.phone = originalPhone;
      siteConfig.facts.kakaoChannelUrl = originalKakao;
    }
  });

  it("keeps large-text mobile navigation scrollable and preserves responsive breakpoints", () => {
    expect(css).toMatch(/\.mobile-nav nav\s*\{[^}]*max-block-size:[^}]*overflow-y:\s*auto/su);
    expect(css).toMatch(/\.button\s*\{[^}]*min-height:\s*3rem/su);
    expect(css).toContain("@media (min-width: 48rem)");
    expect(css).toContain("@media (min-width: 72rem)");
    expect(css).toMatch(/@media \(min-width: 72rem\)[\s\S]*\.mobile-cta\s*\{\s*display:\s*none/su);
  });

  it("keeps the contact CTA sticky only below the tablet breakpoint", () => {
    expect(css).toMatch(/\.mobile-cta\s*\{[^}]*position:\s*sticky/su);
    expect(css).toMatch(/@media \(min-width: 48rem\)\s*\{[\s\S]*?\.mobile-cta\s*\{\s*position:\s*static;?\s*\}/su);
    expect(css).toMatch(/@media \(min-width: 72rem\)[\s\S]*?\.mobile-cta\s*\{\s*display:\s*none/su);
  });

  it("keeps header contact actions hidden until the desktop breakpoint", () => {
    expect(css).toMatch(/\.contact-actions\.desktop-actions\s*\{\s*display:\s*none/su);
    expect(css).toMatch(/@media \(min-width: 72rem\)[\s\S]*\.contact-actions\.desktop-actions\s*\{\s*display:\s*flex/su);
  });
});

describe("production blockers and security headers", () => {
  it("allows an honest preview but rejects unresolved production facts and controls", () => {
    const preview = spawnSync(process.execPath, ["scripts/validate-production-facts.mjs"], { encoding: "utf8" });
    const production = spawnSync(process.execPath, ["scripts/validate-production-facts.mjs", "--mode=production"], { encoding: "utf8" });
    expect(preview.status).toBe(0);
    expect(preview.stderr).toContain("[preview only]");
    expect(production.status).not.toBe(0);
    expect(production.stderr).toContain("fact:legalName");
    expect(production.stderr).toContain("env:DURABLE_RATE_LIMIT_ADAPTER");
  });

  it("applies baseline browser security headers to every route", async () => {
    const groups = await nextConfig.headers?.();
    const headers = Object.fromEntries(groups?.[0]?.headers.map(({ key, value }) => [key, value]) ?? []);
    expect(groups?.[0]?.source).toBe("/:path*");
    expect(headers).toMatchObject({
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
  });
});
