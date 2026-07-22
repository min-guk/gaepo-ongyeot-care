export function UrgentHelp() {
  return (
    <section className="section urgent-section" aria-labelledby="urgent-help-title">
      <div className="shell urgent-panel">
        <div>
          <p className="eyebrow">긴급한 상황이라면</p>
          <h2 id="urgent-help-title">센터 답변을 기다리지 말아야 할 때</h2>
          <p>이 센터의 상담 창구는 응급·범죄·학대 신고를 대신하지 않습니다. 지금 안전이 위협받는다면 아래 공공 신고 경로를 먼저 이용하세요.</p>
        </div>
        <div className="urgent-links" aria-label="공공 긴급 신고 전화">
          <a href="tel:119"><strong>119</strong><span>생명·신체의 응급상황</span></a>
          <a href="tel:112"><strong>112</strong><span>범죄·폭력 등 즉각적인 위험</span></a>
          <a href="tel:15771389"><strong>1577-1389</strong><span>노인학대 의심 신고 · 365일 24시간</span></a>
        </div>
        <p className="source-note urgent-sources">공식 안내: <a href="https://www.nfa.go.kr/nfa/safetyinfo/emergencyservice/119emergencydeclaration/" target="_blank" rel="noreferrer">소방청 119 신고 안내 (새 창)</a> · <a href="https://ecrm.police.go.kr/minwon/main" target="_blank" rel="noreferrer">경찰청 112 안내 (새 창)</a> · <a href="https://www.mohw.go.kr/board.es?act=view&amp;bid=0027&amp;list_no=1480113&amp;mid=a10503000000" target="_blank" rel="noreferrer">보건복지부 노인학대 신고 안내 (새 창)</a></p>
      </div>
    </section>
  );
}
