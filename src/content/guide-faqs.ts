import type { GuideSource } from "@/lib/guides/schema";

export const GUIDE_FAQ_CATEGORIES = ["신청·판정", "서비스 선택", "방문요양 이용", "비용·복지용구", "가족·지역 지원"] as const;
export type GuideFaqCategory = (typeof GUIDE_FAQ_CATEGORIES)[number];

export type GuideFaq = {
  category: GuideFaqCategory;
  question: string;
  answer: string;
  relatedGuideSlug: string;
  relatedLabel: string;
  sources: GuideSource[];
};

export const guideFaqs: readonly GuideFaq[] = [
  {
    category: "신청·판정",
    question: "장기요양 신청은 어르신 본인만 할 수 있나요?",
    answer: "아닙니다. 본인 외에도 가족·친족 또는 이해관계인 등 정해진 대리인이 신청할 수 있습니다. 대리인의 유형에 따라 신분증과 증명서류가 달라질 수 있으므로 접수 전 공단 안내를 확인하세요.",
    relatedGuideSlug: "long-term-care-application",
    relatedLabel: "신청 순서 보기",
    sources: [{ title: "국민건강보험공단 장기요양인정 신청", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" }],
  },
  {
    category: "신청·판정",
    question: "65세 미만이면 장기요양을 신청할 수 없나요?",
    answer: "65세 미만이라도 치매·뇌혈관질환 등 법령에서 정한 노인성 질병이 있는 경우 신청 대상이 될 수 있습니다. 질병명만으로 결과가 정해지는 것은 아니며 공식 신청과 판정 절차를 거칩니다.",
    relatedGuideSlug: "long-term-care-application",
    relatedLabel: "신청 대상 확인하기",
    sources: [{ title: "국민건강보험공단 장기요양 신청자격", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" }],
  },
  {
    category: "신청·판정",
    question: "의사소견서는 신청서와 반드시 같은 날 내야 하나요?",
    answer: "공단 안내상 65세 이상 신청자는 등급판정위원회 심의자료 제출 전까지 의사소견서를 낼 수 있습니다. 개인별 제출기한과 발급 절차는 공단에서 받은 안내를 기준으로 확인하세요.",
    relatedGuideSlug: "long-term-care-application",
    relatedLabel: "신청 서류 정리하기",
    sources: [{ title: "국민건강보험공단 신청 서류 안내", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" }],
  },
  {
    category: "신청·판정",
    question: "방문조사 날 컨디션만으로 등급이 정해지나요?",
    answer: "방문조사는 최근 한 달의 일상생활 도움 정도, 인지·행동 변화와 최근 간호처치 등 여러 항목을 확인합니다. 조사 당일 모습만 강조하기보다 평소 반복되는 어려움과 가족이 실제로 돕는 일을 사실대로 설명하세요.",
    relatedGuideSlug: "assessment-preparation",
    relatedLabel: "방문조사 준비하기",
    sources: [{ title: "국민건강보험공단 장기요양인정 조사", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" }],
  },
  {
    category: "신청·판정",
    question: "진단이 무거우면 장기요양등급도 자동으로 높아지나요?",
    answer: "등급판정은 진단명 하나가 아니라 인정조사 결과, 의사소견서와 그 밖의 자료를 바탕으로 일상생활에 필요한 도움의 정도인 요양필요도를 판단합니다. 개별 등급은 공식 판정 결과로만 확인할 수 있습니다.",
    relatedGuideSlug: "reading-care-grade-results",
    relatedLabel: "등급 결과 읽기",
    sources: [{ title: "국민건강보험공단 장기요양 등급판정", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac03.html" }],
  },
  {
    category: "신청·판정",
    question: "인정 결과를 받으면 서비스는 언제부터 이용할 수 있나요?",
    answer: "원칙적으로 장기요양인정서와 개인별장기요양이용계획서가 도달한 날부터 급여를 이용할 수 있습니다. 이후 이용할 기관을 선택해 계약하고 세부 급여제공계획을 확인합니다.",
    relatedGuideSlug: "reading-care-grade-results",
    relatedLabel: "결과서 다음 순서 보기",
    sources: [{ title: "국민건강보험공단 장기요양급여 제공 시기", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" }],
  },
  {
    category: "서비스 선택",
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
    category: "서비스 선택",
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
    category: "서비스 선택",
    question: "가족요양과 가족요양비는 같은 제도인가요?",
    answer: "같은 뜻이 아닙니다. 가족인 요양보호사가 기관 소속으로 방문요양을 제공하는 경우와, 도서·벽지 등 정해진 사유로 지급되는 특별현금급여인 가족요양비는 구분해야 합니다. 적용 가능 여부는 공단과 기관에 확인하세요.",
    relatedGuideSlug: "starting-home-care",
    relatedLabel: "가족요양 확인하기",
    sources: [{ title: "국민건강보험공단 재가급여와 특별현금급여", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" }],
  },
  {
    category: "서비스 선택",
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
    category: "비용·복지용구",
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
    category: "비용·복지용구",
    question: "상담 전에 한 달 비용을 정확히 알 수 있나요?",
    answer: "개인 부담은 인정등급, 급여 종류, 실제 이용량, 감경 여부와 비급여 항목에 따라 달라질 수 있습니다. 예상액을 받을 때에는 어떤 일정과 횟수를 가정했는지, 별도 비용이 무엇인지 계약서와 함께 확인하세요.",
    relatedGuideSlug: "understanding-personal-costs",
    relatedLabel: "비용 질문 준비하기",
    sources: [
      { title: "보건복지부 노인장기요양보험제도", url: "https://www.mohw.go.kr/menu.es?mid=a10712030100" },
      { title: "국민건강보험공단 장기요양급여 제공기준", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" },
    ],
  },
  {
    category: "신청·판정",
    question: "장기요양등급이 없어도 재가복지센터에 먼저 상담할 수 있나요?",
    answer: "센터마다 상담 범위는 다르지만 등급 신청 절차와 필요한 돌봄을 일반적으로 문의할 수 있습니다. 다만 장기요양보험이 적용되는 급여 이용은 공식 인정 결과와 이용계획을 기준으로 시작하므로 상담만으로 자격이나 등급이 정해지지는 않습니다.",
    relatedGuideSlug: "long-term-care-application",
    relatedLabel: "등급 신청 시작하기",
    sources: [{ title: "국민건강보험공단 장기요양 신청과 급여 이용", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" }],
  },
  {
    category: "가족·지역 지원",
    question: "등급외 판정을 받으면 이용할 수 있는 지원이 전혀 없나요?",
    answer: "등급외 판정이 다른 지원의 자동 대상이 된다는 뜻은 아니지만, 강남 통합돌봄·노인맞춤돌봄·치매안심센터처럼 별도 기준으로 운영되는 지역 지원을 확인할 수 있습니다. 필요한 도움을 나누어 각 기관의 현재 대상과 중복 기준을 문의하세요.",
    relatedGuideSlug: "support-without-care-grade",
    relatedLabel: "등급 없이 찾을 지원 보기",
    sources: [
      { title: "보건복지부 노인맞춤돌봄서비스", url: "https://www.mohw.go.kr/menu.es?mid=a10712010400" },
      { title: "강남구 통합돌봄 안내", url: "https://www.gangnam.go.kr/board/cardnews/1205/view.do?mid=fm0306" },
    ],
  },
  {
    category: "방문요양 이용",
    question: "방문요양에서는 어떤 집안일을 부탁할 수 있나요?",
    answer: "방문요양은 어르신의 일상생활과 신체활동을 돕는 급여입니다. 어르신 식사 준비와 어르신이 사용하는 공간의 정돈처럼 수급자에게 필요한 일을 계획에 반영하고, 넓은 의미의 집안일 전체로 이해하지 않는 것이 좋습니다.",
    relatedGuideSlug: "home-care-service-boundaries",
    relatedLabel: "업무 범위 확인하기",
    sources: [
      { title: "국민건강보험공단 방문요양 안내", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "국민건강보험공단 장기요양급여 제공기준", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" },
    ],
  },
  {
    category: "방문요양 이용",
    question: "함께 사는 가족의 식사나 빨래도 부탁할 수 있나요?",
    answer: "장기요양급여 제공기준은 수급자의 가족만을 위한 행위나 가족의 생업을 돕는 행위를 요구하거나 제공하지 않도록 정합니다. 가족 식사·빨래처럼 어르신 돌봄과 구분되는 일은 방문 전에 기관과 업무 범위를 확인하세요.",
    relatedGuideSlug: "home-care-service-boundaries",
    relatedLabel: "가능한 일과 어려운 일 보기",
    sources: [{ title: "국민건강보험공단 장기요양급여 제공기준", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" }],
  },
  {
    category: "방문요양 이용",
    question: "요양보호사와 어르신이 잘 맞지 않으면 바꿀 수 있나요?",
    answer: "기관 담당자에게 구체적인 불편 장면과 반복 여부를 알리고 시간·업무 설명 조정으로 해결할지, 담당자 교체가 필요한지 상담할 수 있습니다. 교체할 때에는 새 담당자가 필요한 생활 방식과 주의사항을 이어받도록 인수인계를 확인하세요.",
    relatedGuideSlug: "changing-caregiver-or-schedule",
    relatedLabel: "안전하게 조정하는 순서",
    sources: [{ title: "국민건강보험공단 장기요양기관 계약과 급여계획", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" }],
  },
  {
    category: "방문요양 이용",
    question: "방문 요일이나 시간을 중간에 바꿀 수 있나요?",
    answer: "기관의 인력과 다른 이용 일정, 인정 내용에 따라 가능 여부가 달라집니다. 바뀐 일정이 일회성인지 계속 적용할 것인지 알리고, 급여제공계획과 예상 비용도 함께 달라지는지 문서로 확인하세요.",
    relatedGuideSlug: "changing-caregiver-or-schedule",
    relatedLabel: "시간 변경 준비하기",
    sources: [
      { title: "국민건강보험공단 장기요양급여 이용 절차", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "국민건강보험공단 장기요양급여 제공기준", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" },
    ],
  },
  {
    category: "방문요양 이용",
    question: "방문요양 시간에 보호자가 꼭 집에 있어야 하나요?",
    answer: "모든 가정에 같은 답을 적용하기 어렵습니다. 어르신의 상태, 출입 방법과 기관의 안전 기준을 함께 확인하고 보호자가 없을 때의 연락 순서, 열쇠 관리, 반려동물과 귀가 확인 방법을 서비스 시작 전에 합의하세요.",
    relatedGuideSlug: "first-week-home-care",
    relatedLabel: "첫 방문 준비하기",
    sources: [{ title: "국민건강보험공단 장기요양기관 계약과 세부계획", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" }],
  },
  {
    category: "방문요양 이용",
    question: "어르신이 입원하면 병원에서도 방문요양을 받을 수 있나요?",
    answer: "방문요양은 장기요양요원이 수급자의 가정 등을 방문해 제공하는 재가급여이므로 병실 간병과 같은 서비스가 아닙니다. 입원과 퇴원 날짜를 기관에 알리고 서비스 중단·재개 일정과 계약 처리 방법을 확인하세요.",
    relatedGuideSlug: "hospital-discharge-home-care",
    relatedLabel: "퇴원 후 돌봄 준비하기",
    sources: [{ title: "국민건강보험공단 방문요양 정의", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" }],
  },
  {
    category: "가족·지역 지원",
    question: "퇴원 전에 지역 돌봄을 미리 신청할 수 있나요?",
    answer: "보건복지부 통합돌봄 안내에는 퇴원환자 연계 자료가 제공되고, 강남구는 본인·가족뿐 아니라 병원과 복지시설 등 관계자도 상담·신청할 수 있다고 안내합니다. 퇴원 전에 병원 담당자와 주소지 동주민센터에 연계 가능 여부를 문의하세요.",
    relatedGuideSlug: "hospital-discharge-home-care",
    relatedLabel: "퇴원 전 체크리스트 보기",
    sources: [
      { title: "보건복지부 지역사회 통합돌봄", url: "https://www.mohw.go.kr/integratedcare/" },
      { title: "강남구 통합돌봄 안내", url: "https://www.gangnam.go.kr/board/cardnews/1205/view.do?mid=fm0306" },
    ],
  },
  {
    category: "가족·지역 지원",
    question: "치매 어르신이 목욕이나 식사를 계속 거부하면 어떻게 하나요?",
    answer: "틀렸다고 설득하거나 기억을 시험하기보다 거부가 시작되는 시간과 말, 주변 환경을 기록하고 짧은 요청을 한 번에 하나씩 제안해 보세요. 평소와 다른 갑작스러운 변화나 통증·식사 저하는 치매 탓으로만 넘기지 말고 의료진과 상의하세요.",
    relatedGuideSlug: "dementia-communication-routine",
    relatedLabel: "돌봄 거부 대화법 보기",
    sources: [
      { title: "중앙치매센터 치매가이드북", url: "https://www.nid.or.kr/download/download.aspx?NIDAPP=Y&filename=%EC%A4%91%EC%95%99%EC%B9%98%EB%A7%A4%EC%84%BC%ED%84%B0+%EC%B9%98%EB%A7%A4%EA%B0%80%EC%9D%B4%EB%93%9C%EB%B6%81%28%EC%98%A8%EB%9D%BC%EC%9D%B8%29.pdf&path=%2F%2Fansim%2Fsupport_notice%2F2023020311325284.pdf" },
      { title: "강남구보건소 치매관리·가족 지원", url: "https://health.gangnam.go.kr/web/business/elderly/sub01.do" },
    ],
  },
  {
    category: "가족·지역 지원",
    question: "형제자매가 번갈아 돌볼 때 무엇을 공유해야 하나요?",
    answer: "평소 식사·수면·이동 방식, 오늘 달라진 점, 다음 진료와 기관에 전달할 내용을 같은 양식으로 짧게 공유하세요. 기관 연락 담당자 한 명을 정하고 건강·개인정보는 필요한 사람에게 필요한 범위만 전달하세요.",
    relatedGuideSlug: "family-care-handover-note",
    relatedLabel: "한 장 인수인계 노트 만들기",
    sources: [
      { title: "중앙치매센터 치매가이드북", url: "https://www.nid.or.kr/download/download.aspx?NIDAPP=Y&filename=%EC%A4%91%EC%95%99%EC%B9%98%EB%A7%A4%EC%84%BC%ED%84%B0+%EC%B9%98%EB%A7%A4%EA%B0%80%EC%9D%B4%EB%93%9C%EB%B6%81%28%EC%98%A8%EB%9D%BC%EC%9D%B8%29.pdf&path=%2F%2Fansim%2Fsupport_notice%2F2023020311325284.pdf" },
      { title: "국민건강보험공단 장기요양급여 이용 절차", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
    ],
  },
  {
    category: "비용·복지용구",
    question: "방문시간이나 횟수를 바꾸면 그달 비용도 달라지나요?",
    answer: "실제 이용한 급여 종류와 시간·횟수, 월 한도, 본인부담 구분에 따라 예상액이 달라질 수 있습니다. 변경 전후의 일정과 적용 시작일을 기준으로 기관에 다시 산출을 요청하고 비급여가 있는지도 확인하세요.",
    relatedGuideSlug: "understanding-personal-costs",
    relatedLabel: "비용 확인 질문 보기",
    sources: [
      { title: "보건복지부 노인장기요양보험제도", url: "https://www.mohw.go.kr/menu.es?mid=a10712030100" },
      { title: "국민건강보험공단 장기요양급여 제공기준", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" },
    ],
  },
];
