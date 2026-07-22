import type { GuideSource } from "@/lib/guides/schema";

export type GuideFaq = {
  question: string;
  answer: string;
  relatedGuideSlug: string;
  relatedLabel: string;
  sources: GuideSource[];
};

export const guideFaqs: readonly GuideFaq[] = [
  {
    question: "장기요양 신청은 어르신 본인만 할 수 있나요?",
    answer: "아닙니다. 본인 외에도 가족·친족 또는 이해관계인 등 정해진 대리인이 신청할 수 있습니다. 대리인의 유형에 따라 신분증과 증명서류가 달라질 수 있으므로 접수 전 공단 안내를 확인하세요.",
    relatedGuideSlug: "long-term-care-application",
    relatedLabel: "신청 순서 보기",
    sources: [{ title: "국민건강보험공단 장기요양인정 신청", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" }],
  },
  {
    question: "65세 미만이면 장기요양을 신청할 수 없나요?",
    answer: "65세 미만이라도 치매·뇌혈관질환 등 법령에서 정한 노인성 질병이 있는 경우 신청 대상이 될 수 있습니다. 질병명만으로 결과가 정해지는 것은 아니며 공식 신청과 판정 절차를 거칩니다.",
    relatedGuideSlug: "long-term-care-application",
    relatedLabel: "신청 대상 확인하기",
    sources: [{ title: "국민건강보험공단 장기요양 신청자격", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" }],
  },
  {
    question: "의사소견서는 신청서와 반드시 같은 날 내야 하나요?",
    answer: "공단 안내상 65세 이상 신청자는 등급판정위원회 심의자료 제출 전까지 의사소견서를 낼 수 있습니다. 개인별 제출기한과 발급 절차는 공단에서 받은 안내를 기준으로 확인하세요.",
    relatedGuideSlug: "long-term-care-application",
    relatedLabel: "신청 서류 정리하기",
    sources: [{ title: "국민건강보험공단 신청 서류 안내", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" }],
  },
  {
    question: "방문조사 날 컨디션만으로 등급이 정해지나요?",
    answer: "방문조사는 최근 한 달의 일상생활 도움 정도, 인지·행동 변화와 최근 간호처치 등 여러 항목을 확인합니다. 조사 당일 모습만 강조하기보다 평소 반복되는 어려움과 가족이 실제로 돕는 일을 사실대로 설명하세요.",
    relatedGuideSlug: "assessment-preparation",
    relatedLabel: "방문조사 준비하기",
    sources: [{ title: "국민건강보험공단 장기요양인정 조사", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" }],
  },
  {
    question: "진단이 무거우면 장기요양등급도 자동으로 높아지나요?",
    answer: "등급판정은 진단명 하나가 아니라 인정조사 결과, 의사소견서와 그 밖의 자료를 바탕으로 일상생활에 필요한 도움의 정도인 요양필요도를 판단합니다. 개별 등급은 공식 판정 결과로만 확인할 수 있습니다.",
    relatedGuideSlug: "reading-care-grade-results",
    relatedLabel: "등급 결과 읽기",
    sources: [{ title: "국민건강보험공단 장기요양 등급판정", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac03.html" }],
  },
  {
    question: "인정 결과를 받으면 서비스는 언제부터 이용할 수 있나요?",
    answer: "원칙적으로 장기요양인정서와 개인별장기요양이용계획서가 도달한 날부터 급여를 이용할 수 있습니다. 이후 이용할 기관을 선택해 계약하고 세부 급여제공계획을 확인합니다.",
    relatedGuideSlug: "reading-care-grade-results",
    relatedLabel: "결과서 다음 순서 보기",
    sources: [{ title: "국민건강보험공단 장기요양급여 제공 시기", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" }],
  },
  {
    question: "재가복지센터는 공단이 정해주는 곳만 이용해야 하나요?",
    answer: "수급자와 가족이 장기요양기관을 선택해 계약할 수 있습니다. 다만 기관마다 제공하는 급여와 가능한 시간이 다르므로 인정서, 이용계획서와 공개된 기관 정보를 함께 비교하세요.",
    relatedGuideSlug: "choosing-home-care-agency",
    relatedLabel: "기관 비교 질문 보기",
    sources: [
      { title: "국민건강보험공단 장기요양기관 선택 안내", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "국민건강보험공단 장기요양기관 평가방법 고시", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=102&SEQ_HISTORY=593826" },
    ],
  },
  {
    question: "방문요양과 주·야간보호는 무엇이 다른가요?",
    answer: "방문요양은 장기요양요원이 가정을 방문해 신체활동과 일상생활을 돕고, 주·야간보호는 하루 중 일정 시간 기관에서 보호와 기능 유지·향상 프로그램 등을 제공합니다. 돌봄이 필요한 장소와 시간대를 기준으로 비교하세요.",
    relatedGuideSlug: "day-night-and-short-term-care",
    relatedLabel: "주·야간보호 비교하기",
    sources: [
      { title: "국민건강보험공단 재가급여 종류", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "보건복지부 재가노인복지시설 안내", url: "https://www.mohw.go.kr/menu.es?mid=a10712040200" },
    ],
  },
  {
    question: "가족요양과 가족요양비는 같은 제도인가요?",
    answer: "같은 뜻이 아닙니다. 가족인 요양보호사가 기관 소속으로 방문요양을 제공하는 경우와, 도서·벽지 등 정해진 사유로 지급되는 특별현금급여인 가족요양비는 구분해야 합니다. 적용 가능 여부는 공단과 기관에 확인하세요.",
    relatedGuideSlug: "starting-home-care",
    relatedLabel: "가족요양 확인하기",
    sources: [{ title: "국민건강보험공단 재가급여와 특별현금급여", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" }],
  },
  {
    question: "방문간호는 방문요양을 신청하면 함께 제공되나요?",
    answer: "자동으로 함께 제공되는 것은 아닙니다. 방문간호는 의사·한의사 또는 치과의사의 지시서에 따라 간호사 등이 제공하는 별도 장기요양급여이므로 인정 내용과 기관의 제공 가능 여부를 확인해야 합니다.",
    relatedGuideSlug: "home-nursing-and-bathing",
    relatedLabel: "방문간호 준비하기",
    sources: [
      { title: "국민건강보험공단 방문간호 안내", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "보건복지부 방문간호 안내", url: "https://www.mohw.go.kr/menu.es?mid=a10712040200" },
    ],
  },
  {
    question: "복지용구는 원하는 제품을 바로 사면 지원받을 수 있나요?",
    answer: "복지용구 급여는 정해진 품목과 급여 제품을 구입하거나 대여하는 방식입니다. 품목별 방식과 현재 제품 목록, 한도와 이용 제한을 먼저 확인한 뒤 계약해야 하며 임의로 산 제품이 모두 급여 대상이 되는 것은 아닙니다.",
    relatedGuideSlug: "welfare-equipment-home-safety",
    relatedLabel: "복지용구 고르기",
    sources: [
      { title: "국민건강보험공단 복지용구 안내", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "국민건강보험공단 복지용구 관련 현행 고시", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawListManager.do?LAWGROUP=2" },
    ],
  },
  {
    question: "상담 전에 한 달 비용을 정확히 알 수 있나요?",
    answer: "개인 부담은 인정등급, 급여 종류, 실제 이용량, 감경 여부와 비급여 항목에 따라 달라질 수 있습니다. 예상액을 받을 때에는 어떤 일정과 횟수를 가정했는지, 별도 비용이 무엇인지 계약서와 함께 확인하세요.",
    relatedGuideSlug: "understanding-personal-costs",
    relatedLabel: "비용 질문 준비하기",
    sources: [
      { title: "보건복지부 노인장기요양보험제도", url: "https://www.mohw.go.kr/menu.es?mid=a10712030100" },
      { title: "국민건강보험공단 장기요양급여 제공기준", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" },
    ],
  },
];
