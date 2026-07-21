import type { Metadata } from "next";
import { OniMascot } from "@/components/brand/oni-mascot";
import { ClaimStatus } from "@/components/claim-status";
import { PageIntro } from "@/components/page-intro";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("/about", "센터 이야기", "개포 온곁의 working brand 원칙과 검증 중인 운영 정보를 안내합니다.");

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageIntro eyebrow="가까운 동네에서 시작하는 돌봄 언어" title="잘 보이기보다, 사실대로 말하는 곁이 되겠습니다" description="개포 온곁 재가복지센터는 현재 가칭입니다. 이름과 상표, 법정 기관 정보, 운영 사실은 각각의 검증을 마친 뒤 확정합니다." />
      <section className="section" aria-labelledby="principles-title"><div className="shell about-grid"><div><p className="eyebrow">온곁의 세 가지 태도</p><h2 id="principles-title">사람을 재촉하지 않는 안내</h2></div><div className="principle-list"><article><span>하나</span><h3>모르면 모른다고</h3><p>확인되지 않은 서비스, 지역, 경력, 수치를 그럴듯한 문장으로 채우지 않습니다.</p></article><article><span>둘</span><h3>쉬운 말로 차근차근</h3><p>제도 용어보다 가족이 지금 해야 할 질문과 다음 순서를 먼저 보여드립니다.</p></article><article><span>셋</span><h3>결정할 시간을 충분히</h3><p>상담을 곧바로 계약으로 몰지 않고, 비교하고 다시 물을 수 있는 길을 남깁니다.</p></article></div></div></section>
      <section className="section sage-section" aria-labelledby="oni-story-title"><div className="shell oni-story"><OniMascot mood="rest" decorative /><div><p className="eyebrow">마스코트 온이</p><h2 id="oni-story-title">먼저 날아가기보다 같은 속도로 걷는 새</h2><p>살구빛 몸은 따뜻한 일상을, 세이지 잎 스카프는 회복과 차분한 안내를 뜻합니다. 온이는 정보를 대신하지 않고, 어려운 내용을 살펴보는 곁에서 호흡을 잠시 고르게 합니다.</p></div></div></section>
      <section className="section" aria-labelledby="facts-title"><div className="shell narrow"><p className="eyebrow">운영 정보</p><h2 id="facts-title">검증 완료 후 공개합니다</h2><ClaimStatus keys={["address", "hours", "serviceArea", "designatedServices"]} /></div></section>
    </main>
  );
}
