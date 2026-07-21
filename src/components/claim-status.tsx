import { verifiedList, verifiedString } from "@/lib/config/site";

type ClaimKey = "address" | "hours" | "serviceArea" | "designatedServices";

const labels: Record<ClaimKey, string> = {
  address: "센터 주소",
  hours: "운영 시간",
  serviceArea: "방문 가능 지역",
  designatedServices: "지정 서비스",
};

export function ClaimStatus({ keys }: { keys: readonly ClaimKey[] }) {
  return (
    <dl className="claim-status">
      {keys.map((key) => {
        const value = key === "serviceArea" || key === "designatedServices"
          ? verifiedList(key).join(", ")
          : verifiedString(key);
        return (
          <div key={key}>
            <dt>{labels[key]}</dt>
            <dd>{value || <span className="pending-fact">확인 중 — 검증 후 공개</span>}</dd>
          </div>
        );
      })}
    </dl>
  );
}
