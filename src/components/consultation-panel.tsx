import Link from "next/link";
import { ContactActions } from "@/components/contact-actions";

export function ConsultationPanel({ title = "결정하지 않아도, 먼저 정리할 수 있습니다" }: { title?: string }) {
  return (
    <aside className="consultation-panel" aria-labelledby="consultation-panel-title">
      <div>
        <p className="eyebrow">부담 없는 다음 걸음</p>
        <h2 id="consultation-panel-title">{title}</h2>
        <p>전화와 카카오톡은 실제 연결 정보가 검증된 뒤 열립니다. 지금은 준비할 내용을 먼저 확인해 주세요.</p>
      </div>
      <div>
        <ContactActions />
        <Link className="text-link" href="/contact">문의 준비 안내 보기 <span aria-hidden="true">→</span></Link>
      </div>
    </aside>
  );
}
