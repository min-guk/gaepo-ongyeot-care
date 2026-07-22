import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import RootLayout from "../../src/app/layout";
import HomePage from "../../src/app/page";
import ServicesPage from "../../src/app/services/page";
import ProcessPage from "../../src/app/process/page";
import AboutPage from "../../src/app/about/page";
import ContactPage from "../../src/app/contact/page";
import RecruitmentPage from "../../src/app/recruitment/page";
import PrivacyPage from "../../src/app/privacy/page";
import NotFound from "../../src/app/not-found";
import { LocationGuide } from "../../src/components/location-guide";
import { siteConfig } from "../../src/lib/config/site";

const routes = [
  ["home", HomePage],
  ["services", ServicesPage],
  ["process", ProcessPage],
  ["about", AboutPage],
  ["contact", ContactPage],
  ["recruitment", RecruitmentPage],
  ["privacy", PrivacyPage],
  ["404", NotFound],
] as const;

describe("G003 public pages", () => {
  for (const [name, Page] of routes) {
    it(`${name} has one main landmark and one page heading`, () => {
      const html = renderToStaticMarkup(<RootLayout><Page /></RootLayout>);
      expect(html.match(/<main\b/gu)).toHaveLength(1);
      expect(html).toContain('<main id="main-content"');
      expect(html.match(/<h1\b/gu)).toHaveLength(1);
      expect(html).not.toContain("__REQUIRED_");
      expect(html).not.toMatch(/href="tel:(?:02|010)/u);
      expect(html).not.toMatch(/href="https:\/\/pf\.kakao/u);
    });
  }

  it("uses the original working brand and tagline without pretending it is a verified legal name", () => {
    const html = renderToStaticMarkup(<RootLayout><HomePage /></RootLayout>);
    expect(html).toContain("개포 온곁");
    expect(html).toContain("재가복지센터 · 가칭");
    expect(html).toContain("돌봄의 무게,");
    expect(html).toContain("가까운 곁에서");
    expect(html).toContain("법정 기관명과 운영 정보를 확인하고 있습니다.");
    expect(html).not.toMatch(/후기|만족도|1위|수상|년 경력/u);
  });

  it("links every public destination from the shell and lets 404 recover home", () => {
    const shell = renderToStaticMarkup(<RootLayout><HomePage /></RootLayout>);
    for (const path of ["/services", "/process", "/guides", "/about", "/contact", "/recruitment", "/privacy"]) {
      expect(shell).toContain(`href="${path}"`);
    }
    expect(renderToStaticMarkup(<NotFound />)).toContain('href="/"');
  });

  it("keeps services, cost, contact, recruitment, and privacy claims visibly gated", () => {
    const html = [ServicesPage, ProcessPage, ContactPage, RecruitmentPage, PrivacyPage]
      .map((Page) => renderToStaticMarkup(<Page />))
      .join("\n");
    expect(html).toContain("일반적인 돌봄 영역");
    expect(html).toContain("검증된 비용 수치를 게시하지 않습니다");
    expect(html).toContain("전화 정보 확인 중");
    expect(html).toContain("현재 공개된 채용 공고는 없습니다");
    expect(html).toContain("승인된 법정 개인정보처리방침이 아닙니다");
  });

  it("renders accessible native care and recruitment forms with no free-text or upload fields", () => {
    const care = renderToStaticMarkup(<ContactPage />);
    const recruitment = renderToStaticMarkup(<RecruitmentPage />);
    expect(care).toContain('action="/api/inquiries/care"');
    expect(recruitment).toContain('action="/api/inquiries/recruitment"');
    expect(care).toContain('name="topic"');
    expect(recruitment).not.toContain('name="topic"');
    expect(`${care}${recruitment}`).not.toMatch(/<textarea|type="file"/u);
    expect(care).toMatch(/<fieldset[^>]*class="inquiry-fields"[^>]*disabled/u);
    expect(recruitment).toMatch(/<fieldset[^>]*class="inquiry-fields"[^>]*disabled/u);
    expect(`${care}${recruitment}`).toContain("현재 입력란은 잠겨 있습니다");
  });

  it("routes urgent situations to verified public emergency and elder-abuse channels", () => {
    const contact = renderToStaticMarkup(<ContactPage />);
    expect(contact).toContain("센터 답변을 기다리지 말아야 할 때");
    expect(contact).toContain('href="tel:119"');
    expect(contact).toContain('href="tel:112"');
    expect(contact).toContain('href="tel:15771389"');
    expect(contact).toContain("www.nfa.go.kr");
    expect(contact).toContain("www.mohw.go.kr");
  });

  it("keeps directions honest until the exact address is verified, then opens map searches", () => {
    const pending = renderToStaticMarkup(<ContactPage />);
    expect(pending).toContain("찾아오시는 길");
    expect(pending).toContain("정확한 위치 확인 중");
    expect(pending).not.toContain("map.naver.com");
    expect(pending).not.toContain("m.map.kakao.com");

    const originalAddress = siteConfig.facts.address;
    try {
      siteConfig.facts.address = {
        value: "서울특별시 강남구 개포로 123",
        status: "verified",
        source: "https://evidence.example/address",
        verifiedAt: "2026-07-21T00:00:00.000Z",
        reviewDueAt: "2027-01-21T00:00:00.000Z",
      };
      const verified = renderToStaticMarkup(<LocationGuide />);
      expect(verified).toContain("서울특별시 강남구 개포로 123");
      expect(verified).toContain("map.naver.com");
      expect(verified).toContain("m.map.kakao.com");
      expect(verified).toContain("새 창");
    } finally {
      siteConfig.facts.address = originalAddress;
    }
  });
});
