import Link from "next/link";
import { OniMascot } from "@/components/brand/oni-mascot";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div className="shell not-found-grid">
        <div><p className="eyebrow">404 · 길을 잠시 잃었습니다</p><h1>찾으시는 페이지가 이 곁에는 없어요</h1><p className="lede">주소가 바뀌었거나 아직 준비되지 않은 페이지입니다. 홈에서 필요한 안내를 다시 찾아보세요.</p><Link className="button button-primary" href="/">홈으로 돌아가기</Link></div>
        <OniMascot scene="search" />
      </div>
    </main>
  );
}
