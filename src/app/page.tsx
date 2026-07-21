export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="shell">
          <p className="eyebrow">개포·강남 재가돌봄 안내 준비 중</p>
          <h1>돌봄의 첫 걸음을 차분히 안내하겠습니다</h1>
          <p className="lede">
            지정 서비스, 운영 시간, 상담 연결 정보를 공식 자료로 확인한 뒤 공개합니다.
          </p>
          <aside className="notice-card" aria-labelledby="preview-title">
            <h2 id="preview-title">지금은 운영 정보를 검증하는 단계입니다</h2>
            <p>전화·카카오톡·온라인 문의는 실제 연결과 개인정보 검토가 끝난 후 활성화합니다.</p>
          </aside>
        </div>
      </section>
      <section className="section" id="services" aria-labelledby="services-title">
        <div className="shell">
          <h2 id="services-title">확인된 서비스만 안내합니다</h2>
          <div className="info-grid">
            <article><h3>지정 서비스</h3><p>관할 기관 확인 전에는 서비스를 제공한다고 표시하지 않습니다.</p></article>
            <article><h3>서비스 지역</h3><p>방문 가능 지역은 운영자 검증 후 동 단위로 안내합니다.</p></article>
          </div>
        </div>
      </section>
      <section className="section" id="process" aria-labelledby="process-title">
        <div className="shell">
          <h2 id="process-title">상담 순서</h2>
          <p>연결 정보와 운영 기준이 확정되면 첫 상담부터 서비스 연결까지의 순서를 공개합니다.</p>
        </div>
      </section>
      <section className="section" id="contact" aria-labelledby="contact-title">
        <div className="shell">
          <h2 id="contact-title">안전한 상담 연결을 준비하고 있습니다</h2>
          <p>검증되지 않은 전화번호나 카카오톡 주소를 대신 노출하지 않습니다.</p>
        </div>
      </section>
    </main>
  );
}
