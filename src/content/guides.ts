export const rawGuides: readonly unknown[] = [
  {
    slug: "long-term-care-application",
    title: "장기요양 인정 신청, 첫 순서부터",
    summary: "신청 자격을 확인하고 국민건강보험공단에 서류를 접수한 뒤 이어지는 절차를 짧게 정리합니다.",
    category: "장기요양 시작",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-21",
    reviewDueAt: "2026-10-19",
    sections: [
      {
        heading: "먼저 신청 대상을 확인하세요",
        paragraphs: [
          "장기요양보험 가입자와 피부양자, 의료급여수급권자가 신청 대상이 될 수 있습니다. 65세 미만인 경우에는 치매·뇌혈관질환 등 정해진 노인성 질병 요건을 함께 확인해야 합니다.",
          "가족이 대신 신청할 수도 있지만 신청인과 대리인의 관계에 따라 필요한 신분증과 서류가 달라집니다. 접수 전에 국민건강보험공단 안내에서 현재 서류를 다시 확인하세요.",
        ],
      },
      {
        heading: "접수 뒤에는 방문조사와 판정이 이어집니다",
        paragraphs: [
          "신청 후 공단 직원의 방문조사, 등급판정위원회의 판정, 장기요양인정서와 표준장기요양이용계획서 통지 순서로 진행됩니다.",
          "이 가이드는 신청 가능 여부나 등급 결과를 판단하지 않습니다. 개인 상황에 대한 결정은 공단의 최신 안내와 공식 판정을 기준으로 하세요.",
        ],
        items: ["신청할 사람과 대리 신청 여부 정하기", "현재 접수 방법과 제출 서류 확인하기", "방문조사 연락을 받을 방법 정리하기"],
      },
    ],
    nextStep: {
      label: "방문조사 준비 가이드 보기",
      href: "/guides/assessment-preparation",
      note: "평소 생활에서 도움이 필요한 장면을 사실대로 정리하는 방법을 이어서 확인하세요.",
    },
    relatedGuideSlugs: ["assessment-preparation", "understanding-personal-costs"],
    sources: [
      { title: "국민건강보험공단 장기요양인정 신청절차", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" },
      { title: "보건복지부 노인장기요양보험제도", url: "https://www.mohw.go.kr/menu.es?mid=a10712030100" },
    ],
  },
  {
    slug: "assessment-preparation",
    title: "장기요양 방문조사, 평소 생활을 정리하는 법",
    summary: "조사 당일만 잘 보이려 하기보다 최근 일상에서 실제로 필요했던 도움을 빠뜨리지 않도록 준비합니다.",
    category: "장기요양 시작",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-21",
    reviewDueAt: "2026-10-19",
    sections: [
      {
        heading: "최근 일상의 모습을 기준으로 적어보세요",
        paragraphs: [
          "공단 직원은 신청인의 거주지를 방문해 심신 상태와 일상생활에서 다른 사람의 도움이 필요한 정도를 조사합니다. 조사 당일의 한 장면보다 최근 생활에서 반복된 어려움을 구체적으로 떠올려 보세요.",
          "씻기, 옷 입기, 식사, 이동처럼 혼자 하기 어려웠던 일과 가족이 실제로 도운 일을 짧게 기록하면 설명할 때 도움이 됩니다.",
        ],
      },
      {
        heading: "과장하거나 줄이지 말고 사실대로 말하세요",
        paragraphs: [
          "인지 변화나 행동 변화, 간호가 필요했던 상황도 최근에 실제로 있었던 일을 중심으로 정리하세요. 신청인이 평소와 다르게 긴장하거나 답하기 어려울 수 있다는 점도 조사자에게 설명할 수 있습니다.",
          "이 기록은 등급을 예상하는 도구가 아닙니다. 최종 판정은 공식 조사와 의사소견서 등 정해진 자료를 바탕으로 이루어집니다.",
        ],
        items: ["도움이 필요했던 일과 빈도", "가족이 대신하거나 지켜본 일", "최근 달라진 기능이나 생활 환경"],
      },
    ],
    nextStep: {
      label: "재가서비스 선택 가이드 보기",
      href: "/guides/starting-home-care",
      note: "인정서와 이용계획서를 받은 뒤 어떤 재가서비스를 살펴볼지 확인하세요.",
    },
    relatedGuideSlugs: ["long-term-care-application", "starting-home-care"],
    sources: [
      { title: "국민건강보험공단 장기요양인정 신청의 조사", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac02.html" },
    ],
  },
  {
    slug: "starting-home-care",
    title: "재가서비스를 고르고 시작하기 전 확인할 것",
    summary: "방문요양만 떠올리기보다 재가서비스 종류와 계약 전 확인 순서를 함께 살펴봅니다.",
    category: "재가돌봄 이용",
    contentClass: "stable",
    freshnessDays: 180,
    reviewedAt: "2026-07-21",
    reviewDueAt: "2027-01-17",
    sections: [
      {
        heading: "필요한 도움에 맞는 서비스 종류를 살펴보세요",
        paragraphs: [
          "재가급여에는 방문요양, 방문목욕, 방문간호, 주·야간보호, 단기보호, 복지용구 등이 있습니다. 이름부터 고르기보다 집에서 필요한 도움과 외부 기관을 이용할 수 있는 시간을 먼저 정리하세요.",
          "인정서와 표준장기요양이용계획서에 적힌 내용을 확인한 뒤 이용 가능한 기관과 서비스 범위를 비교하세요.",
        ],
      },
      {
        heading: "계약과 실제 제공 내용을 같은 말로 맞추세요",
        paragraphs: [
          "기관과 상담할 때에는 제공 시간, 업무 범위, 본인부담과 비급여 가능 항목, 일정 변경 방법을 문서로 확인하세요. 기관마다 모든 재가서비스를 제공하는 것은 아닙니다.",
          "의료급여수급권자 등 일부 이용 절차는 다를 수 있으므로 해당되는 경우 관할 행정기관과 공단의 안내를 함께 확인하세요.",
        ],
        items: ["우리 가족에게 필요한 도움", "기관이 실제 지정받아 제공하는 급여", "계약서와 급여제공계획의 내용", "변경·중단 때 연락할 곳"],
      },
    ],
    nextStep: {
      label: "개인 부담 비용 가이드 보기",
      href: "/guides/understanding-personal-costs",
      note: "변하기 쉬운 금액을 외우기보다 현재 비용을 확인하는 질문을 준비하세요.",
    },
    relatedGuideSlugs: ["assessment-preparation", "understanding-personal-costs"],
    sources: [
      { title: "보건복지부 재가노인복지시설 종류와 이용절차", url: "https://www.mohw.go.kr/menu.es?mid=a10712040200" },
      { title: "보건복지부 노인장기요양보험제도", url: "https://www.mohw.go.kr/menu.es?mid=a10712030100" },
    ],
  },
  {
    slug: "understanding-personal-costs",
    title: "장기요양 개인 부담 비용, 숫자보다 먼저 볼 것",
    summary: "바뀔 수 있는 요율과 금액을 고정해 말하지 않고, 현재 본인부담과 별도 비용을 확인하는 기준을 안내합니다.",
    category: "비용 확인",
    contentClass: "cost",
    freshnessDays: 30,
    reviewedAt: "2026-07-21",
    reviewDueAt: "2026-08-20",
    sections: [
      {
        heading: "급여 비용과 별도 비용을 나누어 물어보세요",
        paragraphs: [
          "장기요양서비스 이용자는 급여 종류와 자격에 따라 본인부담이 생길 수 있습니다. 식재료비처럼 급여에 포함되지 않는 항목이 따로 발생할 수도 있습니다.",
          "비율과 한도액은 바뀔 수 있으므로 이 페이지에 숫자를 고정해 두지 않습니다. 이용을 시작하는 날의 보건복지부·공단 안내와 기관의 계약서를 함께 확인하세요.",
        ],
      },
      {
        heading: "상담에서 같은 기준으로 확인하세요",
        paragraphs: [
          "한 달 예상액만 묻기보다 어떤 서비스와 이용 횟수를 가정한 금액인지, 본인부담 경감 대상 확인이 필요한지, 비급여 항목이 있는지를 나누어 질문하세요.",
          "개별 부담액은 이용자의 자격과 실제 이용 내역에 따라 달라질 수 있습니다. 이 가이드는 비용을 확정하거나 감면 자격을 판단하지 않습니다.",
        ],
        items: ["급여 종류와 이용 횟수", "현재 적용되는 본인부담 기준", "경감 여부의 공식 확인", "계약서에 적힌 비급여 항목"],
      },
    ],
    nextStep: {
      label: "재가서비스 시작 가이드 다시 보기",
      href: "/guides/starting-home-care",
      note: "비용 질문을 실제 서비스 범위와 계약 확인 순서에 연결해 보세요.",
    },
    relatedGuideSlugs: ["long-term-care-application", "starting-home-care"],
    sources: [
      { title: "보건복지부 노인장기요양보험 재원과 본인부담 안내", url: "https://www.mohw.go.kr/menu.es?mid=a10712030100" },
    ],
  },
  {
    slug: "dementia-family-self-care",
    title: "치매 가족 돌봄, 나를 돌보는 시간과 강남 지원 찾기",
    summary: "가족 돌봄자의 상태도 살피면서 강남구 치매안심센터의 가족 지원 정보를 확인하는 출발점을 정리합니다.",
    category: "가족 돌봄",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-21",
    reviewDueAt: "2026-10-19",
    sections: [
      {
        heading: "돌봄자의 생활도 함께 기록하세요",
        paragraphs: [
          "치매 가족을 돌보는 동안 식사, 수면, 휴식이 계속 미뤄지는지 살펴보세요. 혼자 감당하기 어려운 일과 다른 가족·기관에 요청할 수 있는 일을 나누어 적는 것부터 시작할 수 있습니다.",
          "죄책감 때문에 쉼을 미루기보다 돌봄을 이어가기 위한 준비로 바라보세요. 몸이나 마음의 어려움에 대한 진단과 치료는 전문가에게 상담해야 합니다.",
        ],
      },
      {
        heading: "강남구의 치매 가족 지원 창구를 확인하세요",
        paragraphs: [
          "강남구 치매안심센터는 치매 검진과 등록관리, 치매환자 맞춤형 사례관리, 치매 가족 지원과 가족교육 등의 정보를 안내합니다. 대상과 일정은 바뀔 수 있으므로 방문 전에 공식 페이지에서 최신 내용을 확인하세요.",
          "중앙치매센터의 치매가이드북과 강남구 안내를 함께 읽고, 지금 필요한 지원을 한 가지씩 문의 목록으로 정리하세요.",
        ],
        items: ["지금 가장 지친 시간대", "다른 사람에게 맡길 수 있는 일", "가족교육·상담 등 확인할 지원", "최신 대상과 신청 방법"],
      },
    ],
    nextStep: {
      label: "강남 통합돌봄 경로 보기",
      href: "/guides/gangnam-integrated-care",
      note: "치매 지원 외에도 여러 돌봄이 함께 필요하다면 지역 통합돌봄 창구를 확인하세요.",
    },
    relatedGuideSlugs: ["gangnam-integrated-care", "starting-home-care"],
    sources: [
      { title: "중앙치매센터 치매가이드북(온라인)", url: "https://www.nid.or.kr/download/download.aspx?NIDAPP=Y&filename=%EC%A4%91%EC%95%99%EC%B9%98%EB%A7%A4%EC%84%BC%ED%84%B0+%EC%B9%98%EB%A7%A4%EA%B0%80%EC%9D%B4%EB%93%9C%EB%B6%81%28%EC%98%A8%EB%9D%BC%EC%9D%B8%29.pdf&path=%2F%2Fansim%2Fsupport_notice%2F2023020311325284.pdf" },
      { title: "강남구보건소 어르신건강증진·치매관리", url: "https://health.gangnam.go.kr/web/business/elderly/sub01.do" },
    ],
  },
  {
    slug: "gangnam-integrated-care",
    title: "강남 통합돌봄과 긴급 상황, 어느 길부터 찾을까",
    summary: "여러 돌봄이 겹칠 때 지역 통합돌봄을 신청하는 흐름과 긴급 상황을 이 안내로 대신하지 않는 원칙을 확인합니다.",
    category: "강남 지역 지원",
    contentClass: "local",
    freshnessDays: 30,
    reviewedAt: "2026-07-21",
    reviewDueAt: "2026-08-20",
    sections: [
      {
        heading: "복합적인 도움이 필요하면 통합돌봄을 살펴보세요",
        paragraphs: [
          "강남구 통합돌봄은 집에서 생활을 이어가기 위해 보건·의료, 건강관리, 요양, 일상생활, 주거 지원 등을 함께 연결하는 안내입니다. 실제 연결 서비스와 대상은 개인 상황과 현재 사업 기준에 따라 달라질 수 있습니다.",
          "공식 안내의 흐름은 상담·신청, 돌봄 필요도 조사, 개인별 지원계획 수립, 서비스 연계, 모니터링 순서입니다. 거주지 동 주민센터 등 현재 안내된 접수 창구를 확인하세요.",
        ],
      },
      {
        heading: "긴급한 위험은 이 가이드로 판단하지 마세요",
        paragraphs: [
          "통합돌봄은 여러 지원을 계획하고 연결하는 경로입니다. 지금 바로 안전 확인이나 긴급한 의료 판단이 필요한 상황을 이 페이지나 일반 상담으로 미루지 마세요.",
          "연락처와 사업 대상은 변하기 쉬워 이 페이지에 고정하지 않습니다. 강남구 공식 통합돌봄 페이지에서 현재 접수 창구와 제공 가능한 서비스를 다시 확인하세요.",
        ],
        items: ["현재 가장 시급한 생활 어려움", "함께 필요한 보건·요양·주거 지원", "대리 신청이 필요한지", "공식 페이지의 최신 접수 창구"],
      },
    ],
    nextStep: {
      label: "치매 가족 지원 가이드 보기",
      href: "/guides/dementia-family-self-care",
      note: "치매 돌봄과 가족의 쉼이 함께 필요하다면 지역 치매 지원도 확인하세요.",
    },
    relatedGuideSlugs: ["dementia-family-self-care", "long-term-care-application"],
    sources: [
      { title: "강남구청 통합돌봄 서비스 안내", url: "https://www.gangnam.go.kr/board/cardnews/1205/view.do?mid=fm0306" },
      { title: "강남복지플랫폼 강남구 통합돌봄", url: "https://bokji.gangnam.go.kr/contents/tongtoll1/1/view.do?mid=ID08_01" },
    ],
  },
];
