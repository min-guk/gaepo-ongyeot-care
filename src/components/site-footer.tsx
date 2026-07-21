import { siteConfig, verifiedString } from "@/lib/config/site";

export function SiteFooter() {
  const legalName = verifiedString("legalName");
  const privacyVersion = verifiedString("privacyNoticeVersion");

  return (
    <footer className="site-footer" id="privacy">
      <div className="shell footer-grid">
        <div>
          <strong>{siteConfig.workingName} <span>(가칭)</span></strong>
          <p>{legalName ?? "법정 기관명과 운영 정보를 확인하고 있습니다."}</p>
        </div>
        <div aria-labelledby="privacy-title">
          <strong id="privacy-title">개인정보 안내</strong>
          <p>{privacyVersion ? `안내 버전 ${privacyVersion}` : "검토가 완료되기 전에는 온라인 문의를 활성화하지 않습니다."}</p>
        </div>
      </div>
    </footer>
  );
}
