import { verifiedString } from "@/lib/config/site";

export function LocationGuide() {
  const address = verifiedString("address");
  const encodedAddress = address ? encodeURIComponent(address) : null;

  return (
    <section className="section sage-section" aria-labelledby="directions-title">
      <div className="shell location-layout">
        <div className="location-visual" aria-label={address ? "검증된 센터 주소" : "개포동 중심, 정확한 위치 확인 중"}>
          <span className="location-pin" aria-hidden="true"><span>온곁</span></span>
          <strong>{address ? "검증된 센터 위치" : "개포동 중심"}</strong>
          <span>{address ? "지도에서 상세 위치를 확인하세요" : "정확한 위치 확인 중"}</span>
        </div>
        <div>
          <p className="eyebrow">방문 전 확인</p>
          <h2 id="directions-title">찾아오시는 길</h2>
          {address && encodedAddress ? (
            <>
              <address className="verified-address">{address}</address>
              <p>출발 전에 운영 시간과 방문 가능 여부를 먼저 확인해 주세요.</p>
              <div className="map-actions" aria-label="외부 지도에서 위치 확인">
                <a className="button button-primary" href={`https://map.naver.com/p/search/${encodedAddress}`} target="_blank" rel="noreferrer">네이버지도에서 보기 (새 창)</a>
                <a className="button button-paper" href={`https://m.map.kakao.com/scheme/search?q=${encodedAddress}`} target="_blank" rel="noreferrer">카카오맵에서 보기 (새 창)</a>
              </div>
            </>
          ) : (
            <>
              <p className="pending-location">사업장 주소가 확정되고 출처까지 검증되면 정확한 주소와 지도 연결을 공개합니다.</p>
              <p>현재는 강남구 개포동을 중심으로 준비하고 있으며, 임시 주소나 추정 위치는 표시하지 않습니다.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
