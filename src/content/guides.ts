export const rawGuides: readonly unknown[] = [
  {
    status: "published",
    slug: "long-term-care-application",
    title: "장기요양 인정 신청, 첫 순서부터",
    summary: "신청 자격을 확인하고 국민건강보험공단에 서류를 접수한 뒤 이어지는 절차를 짧게 정리합니다.",
    category: "신청·판정",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-10-20",
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
    status: "published",
    slug: "assessment-preparation",
    title: "장기요양 방문조사, 평소 생활을 정리하는 법",
    summary: "조사 당일만 잘 보이려 하기보다 최근 일상에서 실제로 필요했던 도움을 빠뜨리지 않도록 준비합니다.",
    category: "신청·판정",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-10-20",
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
    status: "published",
    slug: "starting-home-care",
    title: "재가서비스를 고르고 시작하기 전 확인할 것",
    summary: "방문요양만 떠올리기보다 재가서비스 종류와 계약 전 확인 순서를 함께 살펴봅니다.",
    category: "서비스 선택",
    contentClass: "stable",
    freshnessDays: 180,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2027-01-18",
    sections: [
      {
        heading: "방문요양·가족요양·방문목욕의 차이를 먼저 확인하세요",
        paragraphs: [
          "방문요양은 요양보호사가 가정을 방문해 신체활동과 일상생활을 돕고, 방문목욕은 목욕 설비와 인력이 방문해 목욕을 지원하는 서로 다른 급여입니다. 가족요양은 가족인 요양보호사가 일정 조건 아래 방문요양을 제공하는 경우를 가리키며 자동으로 생기는 별도 급여나 현금수당이 아닙니다.",
          "가족요양을 검토한다면 가족 요양보호사의 자격과 관계, 소속 장기요양기관의 계약·급여 제공 가능 여부를 확인하고 국민건강보험공단에 현재 적용 조건을 다시 문의하세요. 인정서와 표준장기요양이용계획서에 적힌 내용도 함께 비교해야 합니다.",
        ],
      },
      {
        heading: "기관 선택 체크리스트로 계약 내용을 맞추세요",
        paragraphs: [
          "기관과 상담할 때에는 제공 시간, 업무 범위, 본인부담과 비급여 가능 항목, 일정 변경 방법을 문서로 확인하세요. 기관마다 모든 재가서비스를 제공하는 것은 아닙니다.",
          "의료급여수급권자 등 일부 이용 절차는 다를 수 있으므로 해당되는 경우 관할 행정기관과 공단의 안내를 함께 확인하세요.",
        ],
        items: ["기관이 실제 지정받아 제공하는 급여와 담당 인력", "방문 일정·업무 범위와 대체 인력 기준", "본인부담·비급여와 계약서·급여제공계획의 내용", "불편 접수, 일정 변경·중단 때 연락할 곳"],
      },
    ],
    nextStep: {
      label: "개인 부담 비용 가이드 보기",
      href: "/guides/understanding-personal-costs",
      note: "변하기 쉬운 금액을 외우기보다 현재 비용을 확인하는 질문을 준비하세요.",
    },
    relatedGuideSlugs: ["assessment-preparation", "understanding-personal-costs"],
    sources: [
      { title: "국민건강보험공단 장기요양급여 제공기준 및 급여비용 산정방법", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" },
      { title: "보건복지부 재가노인복지시설 종류와 이용절차", url: "https://www.mohw.go.kr/menu.es?mid=a10712040200" },
      { title: "보건복지부 노인장기요양보험제도", url: "https://www.mohw.go.kr/menu.es?mid=a10712030100" },
    ],
  },
  {
    status: "published",
    slug: "understanding-personal-costs",
    title: "장기요양 개인 부담 비용, 숫자보다 먼저 볼 것",
    summary: "바뀔 수 있는 요율과 금액을 고정해 말하지 않고, 현재 본인부담과 별도 비용을 확인하는 기준을 안내합니다.",
    category: "계약·이용",
    contentClass: "cost",
    freshnessDays: 30,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-08-21",
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
    status: "published",
    slug: "dementia-family-self-care",
    title: "치매 가족 돌봄, 나를 돌보는 시간과 강남 지원 찾기",
    summary: "가족 돌봄자의 상태도 살피면서 강남구 치매안심센터의 가족 지원 정보를 확인하는 출발점을 정리합니다.",
    category: "가족 돌봄",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-10-20",
    sections: [
      {
        heading: "가족 돌봄을 지속하기 어려운 신호를 함께 기록하세요",
        paragraphs: [
          "치매 가족을 돌보는 동안 식사, 수면, 휴식이 계속 미뤄지는지, 통증·불안·짜증이 잦아지는지, 약속이나 생업을 반복해서 포기하는지 살펴보세요. 이런 변화가 이어지면 가족 돌봄을 지금 방식대로 지속하기 어려운 신호일 수 있습니다.",
          "죄책감 때문에 쉼을 미루기보다 돌봄을 이어가기 위한 준비로 바라보세요. 몸이나 마음의 어려움에 대한 진단과 치료는 전문가에게 상담해야 합니다.",
        ],
      },
      {
        heading: "강남구의 치매 가족 지원 창구를 확인하세요",
        paragraphs: [
          "강남구 치매안심센터는 치매 검진과 등록관리, 치매환자 맞춤형 사례관리, 치매 가족 지원과 가족교육 등의 정보를 안내합니다. 대상과 일정은 바뀔 수 있으므로 방문 전에 공식 페이지에서 최신 내용을 확인하세요.",
          "중앙치매센터의 치매가이드북과 강남구 안내를 함께 읽고, 지금 필요한 지원을 한 가지씩 문의 목록으로 정리하세요.",
        ],
        items: ["지금 가장 지친 시간대와 수면·식사 변화", "다른 사람에게 맡길 수 있는 일", "가족교육·상담 등 확인할 지원", "최신 대상과 신청 방법"],
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
    status: "published",
    slug: "gangnam-integrated-care",
    title: "강남 통합돌봄과 긴급 상황, 어느 길부터 찾을까",
    summary: "여러 돌봄이 겹칠 때 지역 통합돌봄을 신청하는 흐름과 긴급 상황을 이 안내로 대신하지 않는 원칙을 확인합니다.",
    category: "지역·전환 지원",
    contentClass: "local",
    freshnessDays: 30,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-08-21",
    sections: [
      {
        heading: "상담 전에 정보 체크리스트를 준비하세요",
        paragraphs: [
          "강남구 통합돌봄은 집에서 생활을 이어가기 위해 보건·의료, 건강관리, 요양, 일상생활, 주거 지원 등을 함께 연결하는 안내입니다. 상담 전 거주 동, 장기요양 인정 여부와 보유 서류, 현재 이용 중인 서비스, 일상에서 가장 어려운 장면, 연락 가능한 보호자를 정리하면 필요한 경로를 설명하기 쉽습니다.",
          "공식 안내의 흐름은 상담·신청, 돌봄 필요도 조사, 개인별 지원계획 수립, 서비스 연계, 모니터링 순서입니다. 거주지 동 주민센터 등 현재 안내된 접수 창구를 확인하세요.",
        ],
        items: ["거주 동과 연락 가능한 보호자", "장기요양 인정 여부와 보유 서류", "현재 이용 중인 보건·요양·주거 지원", "최근 가장 어려운 일상 장면과 원하는 도움"],
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
  {
    status: "published",
    slug: "reading-care-grade-results",
    title: "장기요양 등급 결과를 받은 날, 세 문서 읽는 순서",
    summary: "등급 숫자만 보지 않고 인정서, 개인별장기요양이용계획서와 기관 계약 내용을 차례로 확인합니다.",
    category: "신청·판정",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-10-20",
    sections: [
      {
        heading: "인정서에서 유효기간과 급여 범위를 먼저 보세요",
        paragraphs: [
          "등급판정은 인정조사 결과와 의사소견서 등을 바탕으로 요양필요도를 판단하고, 등급과 유효기간, 이용할 수 있는 장기요양급여의 종류와 내용을 결정하는 절차입니다. 등급 숫자만 따로 떼어 서비스 시간을 예상하지 마세요.",
          "장기요양인정서의 이름, 등급, 유효기간, 급여 종류와 내용이 현재 안내받은 내용과 맞는지 먼저 확인하고 이해되지 않는 표현은 국민건강보험공단에 문의할 질문으로 표시해 두세요.",
        ],
        items: ["수급자 정보와 인정등급", "유효기간 시작일과 종료일", "급여 종류 및 내용", "공단에 다시 물을 표현"],
      },
      {
        heading: "이용계획서와 실제 계약을 나란히 놓으세요",
        paragraphs: [
          "개인별장기요양이용계획서에는 필요한 도움과 목표, 희망 급여, 이용계획과 비용 등이 담깁니다. 가족이 원하는 시간표와 다를 수 있으므로 현재 생활에서 가장 어려운 시간대를 표시해 기관 상담 때 함께 보여주세요.",
          "기관은 이용계획서와 계약 내용을 반영해 세부 급여제공계획을 세웁니다. 계획과 실제 제공 시간이 다르거나 돌봄 목표가 빠졌다면 시작 전에 조정 방법을 확인하세요.",
        ],
      },
    ],
    nextStep: {
      label: "기관 선택 가이드 보기",
      href: "/guides/choosing-home-care-agency",
      note: "받은 문서를 기준으로 여러 기관에 같은 질문을 해보세요.",
    },
    relatedGuideSlugs: ["choosing-home-care-agency", "starting-home-care"],
    sources: [
      { title: "국민건강보험공단 장기요양 등급판정", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac03.html" },
      { title: "국민건강보험공단 장기요양급여 이용", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
    ],
  },
  {
    status: "published",
    slug: "choosing-home-care-agency",
    title: "재가복지센터 선택과 계약 전 꼭 물을 질문",
    summary: "가까운 곳 하나만 고르기보다 제공 급여, 담당 인력, 일정 변경과 비용 설명을 같은 기준으로 비교합니다.",
    category: "서비스 선택",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-10-20",
    sections: [
      {
        heading: "우리 집에 필요한 급여를 실제로 제공하는지 확인하세요",
        paragraphs: [
          "장기요양 수급자는 장기요양기관을 선택해 계약할 수 있지만 모든 기관이 방문요양, 방문목욕, 방문간호 등 모든 급여를 제공하는 것은 아닙니다. 인정서와 이용계획서를 보여주고 필요한 급여와 희망 시간대를 실제로 맡을 수 있는지 물어보세요.",
          "기관의 공개 정보와 평가 결과는 비교의 출발점입니다. 최종 선택 전에는 담당자와 직접 상담해 어르신의 생활 방식, 이동 환경, 가족의 돌봄 가능 시간까지 설명하고 서로 맞는지 확인하세요.",
        ],
        items: ["지정받아 제공하는 급여 종류", "담당 인력 배정과 대체 기준", "희망 요일·시간 조정 가능 여부", "공개된 기관 정보와 평가 결과"],
      },
      {
        heading: "계약서와 급여제공계획을 말로만 넘기지 마세요",
        paragraphs: [
          "계약 전 본인부담과 비급여 가능 항목, 제공 업무, 일정 변경, 중단 절차를 문서에서 확인하세요. 가족이 기대한 집안일과 장기요양급여로 제공할 수 있는 업무 범위가 다를 수 있습니다.",
          "설명을 들은 뒤에는 가족이 이해한 내용을 짧게 다시 말해 확인해 보세요. 담당자 이름과 연락 방법, 불편 사항을 전달할 창구도 함께 기록하면 이용 중 혼선을 줄일 수 있습니다.",
        ],
      },
    ],
    nextStep: {
      label: "서비스 첫 일주일 가이드 보기",
      href: "/guides/first-week-home-care",
      note: "계약 뒤 실제 돌봄이 계획대로 시작되는지 차분히 확인하세요.",
    },
    relatedGuideSlugs: ["reading-care-grade-results", "first-week-home-care"],
    sources: [
      { title: "국민건강보험공단 장기요양급여 이용과 기관 선택", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "국민건강보험공단 장기요양기관 평가방법 등에 관한 고시", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=102&SEQ_HISTORY=593826" },
    ],
  },
  {
    status: "published",
    slug: "day-night-and-short-term-care",
    title: "방문요양만으로 부족할 때 주·야간보호와 단기보호",
    summary: "낮 시간 돌봄 공백이나 가족의 일시적인 부재가 있을 때 살펴볼 재가급여의 차이를 정리합니다.",
    category: "서비스 선택",
    contentClass: "stable",
    freshnessDays: 180,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2027-01-18",
    sections: [
      {
        heading: "필요한 시간이 매일인지 일시적인지 나눠보세요",
        paragraphs: [
          "주·야간보호는 하루 중 일정 시간 기관에서 신체활동 지원과 기능 유지·향상을 위한 프로그램 등을 제공하는 급여입니다. 가족이 일하거나 쉬어야 하는 낮 시간에 반복적으로 돌봄 공백이 생길 때 비교해 볼 수 있습니다.",
          "단기보호는 일정 기간 기관에서 보호와 돌봄을 제공하는 급여입니다. 가족의 입원이나 출장처럼 일시적으로 집에서 돌보기 어려운 시기를 앞두고 있다면 이용 가능 기간과 자리를 미리 확인하세요.",
        ],
        items: ["돌봄 공백이 생기는 요일과 시간", "이동 지원 가능 여부", "식사·투약 등 확인할 일상 지원", "가족 부재가 예상되는 날짜"],
      },
      {
        heading: "이동과 적응까지 포함해 기관에 물어보세요",
        paragraphs: [
          "서비스 이름만 보고 결정하지 말고 차량 운행 범위, 하루 일정, 휴식 공간, 귀가 연락 방식과 어르신의 적응을 돕는 절차를 확인하세요. 치매전담실 등 별도 운영 여부도 필요한 경우 질문하세요.",
          "이용 가능 대상과 횟수, 비용은 인정 내용과 현재 기준에 따라 달라질 수 있습니다. 계약 전 공단의 최신 급여 기준과 기관의 설명을 함께 확인하세요.",
        ],
      },
    ],
    nextStep: {
      label: "개인 부담 비용 가이드 보기",
      href: "/guides/understanding-personal-costs",
      note: "이용 시간과 횟수를 정했다면 급여와 별도 비용을 나누어 확인하세요.",
    },
    relatedGuideSlugs: ["starting-home-care", "understanding-personal-costs"],
    sources: [
      { title: "국민건강보험공단 재가급여 종류", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "보건복지부 재가노인복지시설 종류와 이용절차", url: "https://www.mohw.go.kr/menu.es?mid=a10712040200" },
    ],
  },
  {
    status: "published",
    slug: "home-nursing-and-bathing",
    title: "방문간호와 방문목욕, 함께 살펴볼 때",
    summary: "요양보호사의 일상 지원과 방문간호·방문목욕의 역할을 구분하고 집에서 준비할 점을 확인합니다.",
    category: "서비스 선택",
    contentClass: "stable",
    freshnessDays: 180,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2027-01-18",
    sections: [
      {
        heading: "방문간호는 의료인의 지시와 전문 인력이 필요합니다",
        paragraphs: [
          "방문간호는 간호사 등이 의사·한의사 또는 치과의사의 지시서에 따라 가정을 방문해 간호, 진료 보조, 요양 상담이나 구강위생 등을 제공하는 장기요양급여입니다. 방문요양의 일상생활 지원과 같은 서비스로 생각하지 마세요.",
          "상처, 투약, 건강 변화처럼 염려되는 내용은 먼저 의료진과 상의하고 방문간호가 가능한 내용인지 확인하세요. 갑작스러운 증상이나 응급 판단을 일반적인 방문 일정으로 미루어서는 안 됩니다.",
        ],
        items: ["의료진에게 확인할 건강 변화", "방문간호지시서 필요 여부", "현재 복용약과 처치 내용", "기관이 제공 가능한 방문간호 범위"],
      },
      {
        heading: "방문목욕은 집의 동선과 당일 상태까지 확인하세요",
        paragraphs: [
          "방문목욕은 목욕 설비와 인력이 가정을 방문해 목욕을 돕는 급여입니다. 차량 이용 여부와 집 안에서 목욕하는 방식에 따라 준비가 달라질 수 있으므로 현관, 엘리베이터, 주차와 이동 동선을 미리 설명하세요.",
          "목욕 당일 어르신의 몸 상태가 평소와 다르면 무리하게 진행하지 말고 기관과 일정 조정 기준을 확인하세요. 필요한 급여 종류와 내용은 인정서와 이용계획서를 기준으로 상담하세요.",
        ],
      },
    ],
    nextStep: {
      label: "복지용구와 집안 안전 가이드 보기",
      href: "/guides/welfare-equipment-home-safety",
      note: "이동과 목욕 동선을 함께 살피며 필요한 보조 도구를 확인하세요.",
    },
    relatedGuideSlugs: ["welfare-equipment-home-safety", "starting-home-care"],
    sources: [
      { title: "국민건강보험공단 방문간호·방문목욕 안내", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "보건복지부 방문간호·방문목욕 안내", url: "https://www.mohw.go.kr/menu.es?mid=a10712040200" },
    ],
  },
  {
    status: "published",
    slug: "welfare-equipment-home-safety",
    title: "복지용구를 고르기 전 집안 안전부터 보는 법",
    summary: "제품 이름부터 고르지 않고 생활 속 위험 장면과 집의 치수를 기록한 뒤 구입·대여 가능 여부를 확인합니다.",
    category: "서비스 선택",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-10-20",
    sections: [
      {
        heading: "위험한 장면을 방별로 한 가지씩 적어보세요",
        paragraphs: [
          "복지용구는 장기요양 수급자의 일상생활이나 신체활동을 돕기 위해 정해진 제품을 구입하거나 대여하는 급여입니다. 휠체어, 침대, 욕창예방용품, 보행기처럼 종류가 다양하므로 다른 집에서 좋았다는 제품을 바로 고르지 마세요.",
          "침실에서 일어나기, 화장실까지 이동하기, 변기에 앉고 일어나기, 목욕하기처럼 실제로 위험하거나 가족의 도움이 많이 필요한 장면을 먼저 기록하세요.",
        ],
        items: ["침대 높이와 주변 공간", "문턱·복도·욕실의 폭", "몸을 돌릴 수 있는 공간", "사용자와 가족이 함께 다룰 수 있는지"],
      },
      {
        heading: "현재 급여 대상 제품과 구입·대여 조건을 확인하세요",
        paragraphs: [
          "복지용구는 품목과 제품에 따라 구입 또는 대여 방식이 다르고, 인정 내용이나 다른 급여 이용 상황에 따라 제한이 생길 수 있습니다. 연간 한도나 제품 목록처럼 바뀔 수 있는 숫자는 계약 당일 공단과 복지용구 사업소의 최신 안내를 확인하세요.",
          "설치 뒤에는 실제 이동이 더 안전해졌는지, 오히려 통로를 막거나 사용이 어려운지 살펴보세요. 건강 상태에 맞는 사용법은 의료·재활 전문가에게 확인해야 합니다.",
        ],
      },
    ],
    nextStep: {
      label: "방문간호·목욕 가이드 보기",
      href: "/guides/home-nursing-and-bathing",
      note: "집 안 동선과 함께 전문적인 재가급여가 필요한지도 살펴보세요.",
    },
    relatedGuideSlugs: ["home-nursing-and-bathing", "reading-care-grade-results"],
    sources: [
      { title: "국민건강보험공단 복지용구 급여 안내", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "국민건강보험공단 복지용구 급여범위 및 급여기준 고시", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawListManager.do?LAWGROUP=2" },
    ],
  },
  {
    status: "published",
    slug: "first-week-home-care",
    title: "재가서비스 첫 일주일, 기록하고 조정할 것",
    summary: "첫 방문이 완벽한지 평가하기보다 계약 내용과 실제 돌봄이 맞는지 짧게 기록하며 조정합니다.",
    category: "계약·이용",
    contentClass: "stable",
    freshnessDays: 180,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2027-01-18",
    sections: [
      {
        heading: "계약서와 급여제공계획 옆에 실제 시간을 적어보세요",
        paragraphs: [
          "장기요양기관은 인정서와 개인별장기요양이용계획서, 계약 내용을 반영해 세부 급여제공계획을 세웁니다. 첫 일주일에는 방문 시작과 종료 시간, 제공된 주요 도움, 어르신의 반응을 한두 줄로만 기록하세요.",
          "담당자를 감시하기 위한 기록이 아니라 가족과 기관이 같은 계획을 이해하고 있는지 확인하기 위한 기록입니다. 사소한 취향과 익숙한 순서를 전달하면 어르신의 불편을 줄이는 데 도움이 됩니다.",
        ],
        items: ["실제 방문 시간과 주요 도움", "어르신이 편안해한 방식", "거부하거나 힘들어한 장면", "다음 방문 전에 전달할 한 가지"],
      },
      {
        heading: "반복되는 차이는 한 번에 모아 조정하세요",
        paragraphs: [
          "시간, 업무 범위, 비용 설명이 계약과 반복해서 다르면 담당 사회복지사에게 기록을 바탕으로 확인하세요. 건강 상태나 가족 일정이 달라져 서비스 조합을 바꿔야 한다면 이용계획과 인정 내용에 맞는지도 함께 살펴보세요.",
          "갑작스러운 건강 악화는 서비스 만족도 문제와 구분해야 합니다. 의료 판단이 필요한 변화는 의료진에게, 계약과 제공 내용의 문제는 기관과 공단의 안내 창구에 문의하세요.",
        ],
      },
    ],
    nextStep: {
      label: "기관 선택 질문 다시 보기",
      href: "/guides/choosing-home-care-agency",
      note: "조정이 잘 되지 않는다면 처음 비교했던 기준을 다시 확인하세요.",
    },
    relatedGuideSlugs: ["choosing-home-care-agency", "understanding-personal-costs"],
    sources: [
      { title: "국민건강보험공단 장기요양급여 이용 절차", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "국민건강보험공단 장기요양급여 제공기준", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" },
    ],
  },
  {
    status: "published",
    slug: "home-care-service-boundaries",
    title: "방문요양에서 부탁할 수 있는 일과 어려운 일",
    summary: "방문요양을 가족 전체의 가사도우미 서비스로 오해하지 않도록 수급자 중심의 업무 범위를 정리합니다.",
    category: "계약·이용",
    contentClass: "policy",
    freshnessDays: 90,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-10-20",
    sections: [
      {
        heading: "급여는 어르신의 일상생활과 신체활동을 중심으로 합니다",
        paragraphs: [
          "방문요양은 수급자의 식사, 위생, 옷 갈아입기, 이동과 주변 정돈처럼 일상생활을 이어가는 데 필요한 도움을 제공하는 장기요양급여입니다. 같은 집에 사는 가족 전체의 집안일을 대신하는 서비스와는 다릅니다.",
          "계약 전에 개인별장기요양이용계획서와 세부 급여제공계획을 보면서 어떤 도움이 필요한지 구체적으로 정하세요. '집안일 전부'처럼 넓은 표현보다 어르신 식사 준비, 어르신이 사용하는 방 정돈처럼 대상을 분명히 적는 편이 좋습니다.",
        ],
        items: ["어르신의 식사와 위생 지원", "이동·옷 갈아입기 등 신체활동 지원", "어르신이 사용하는 공간의 정돈", "계획서에 반영할 반복적인 도움"],
      },
      {
        heading: "가족만을 위한 일이나 위험한 부탁은 먼저 기관과 확인하세요",
        paragraphs: [
          "장기요양급여 제공기준은 수급자 가족만을 위한 행위, 가족의 생업을 돕는 행위, 수급자의 일상생활에 지장이 없는 일을 요구하거나 제공하지 않도록 정하고 있습니다. 가족 식사 준비, 가족 방 청소, 사업장 심부름 등을 당연한 업무로 요청하지 마세요.",
          "현금 인출, 카드·비밀번호 보관, 고가 물품 구매처럼 분쟁 위험이 큰 부탁이나 의료 판단이 필요한 처치는 현장에서 즉흥적으로 맡기지 말고 기관과 공식 절차를 확인하세요.",
        ],
      },
    ],
    nextStep: {
      label: "첫 일주일 기록 가이드 보기",
      href: "/guides/first-week-home-care",
      note: "정한 업무 범위와 실제 제공 내용이 맞는지 짧게 기록해 보세요.",
    },
    relatedGuideSlugs: ["first-week-home-care", "changing-caregiver-or-schedule"],
    sources: [
      { title: "국민건강보험공단 방문요양 안내", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "국민건강보험공단 장기요양급여 제공기준", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" },
    ],
  },
  {
    status: "published",
    slug: "changing-caregiver-or-schedule",
    title: "요양보호사나 방문시간을 바꾸고 싶을 때",
    summary: "한 번의 불편과 반복되는 불일치를 구분하고 기관과 안전하게 조정하는 대화 순서를 안내합니다.",
    category: "계약·이용",
    contentClass: "stable",
    freshnessDays: 180,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2027-01-18",
    sections: [
      {
        heading: "바꾸고 싶은 이유를 사람 평가가 아닌 장면으로 적으세요",
        paragraphs: [
          "어르신과 요양보호사의 말투나 생활 방식이 맞지 않거나 약속한 시간이 반복해서 어긋날 수 있습니다. 막연히 '마음에 들지 않는다'고 하기보다 어떤 상황에서 무엇이 어려웠는지 날짜와 장면을 짧게 기록하세요.",
          "어르신의 안전, 계약된 업무 범위, 방문 일정과 관련된 문제는 기관 담당 사회복지사에게 먼저 알리세요. 개인 연락으로만 해결하려 하면 기관이 상황을 파악하고 대체 인력이나 계획 변경을 준비하기 어렵습니다.",
        ],
        items: ["반복된 날짜와 상황", "어르신이 불편해한 구체적인 장면", "계약·계획과 달랐던 내용", "원하는 조정 방법과 가능한 시간"],
      },
      {
        heading: "교체보다 조정이 먼저인지, 인수인계가 필요한지 확인하세요",
        paragraphs: [
          "방문시간 조정, 업무 설명 보완, 담당자 동행 상담만으로 해결되는 문제인지 기관과 먼저 살펴보세요. 교체가 필요하다면 새 담당자에게 전달할 식사, 이동, 의사소통 방식과 주의사항을 수급자 중심으로 정리하세요.",
          "급여제공계획이나 계약 내용이 달라지는 경우에는 변경된 일정과 비용, 시작일을 문서로 다시 확인하세요. 갑작스러운 건강 변화는 담당자 교체 문제와 구분해 의료진에게 알려야 합니다.",
        ],
      },
    ],
    nextStep: {
      label: "방문요양 업무 범위 보기",
      href: "/guides/home-care-service-boundaries",
      note: "불편이 업무 범위에 대한 서로 다른 기대에서 시작된 것은 아닌지 확인하세요.",
    },
    relatedGuideSlugs: ["home-care-service-boundaries", "choosing-home-care-agency"],
    sources: [
      { title: "국민건강보험공단 장기요양급여 이용 절차", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
      { title: "국민건강보험공단 장기요양급여 제공기준", url: "https://www.nhis.or.kr/lm/lmxsrv/law/lawFullContent.do?SEQ=1637&SEQ_HISTORY=50356" },
    ],
  },
  {
    status: "published",
    slug: "hospital-discharge-home-care",
    title: "퇴원 전에 집에서의 돌봄을 맞추는 체크리스트",
    summary: "퇴원일만 정하지 않고 이동, 약, 식사, 후속 진료와 지역 돌봄 연결을 한 장에 정리합니다.",
    category: "지역·전환 지원",
    contentClass: "local",
    freshnessDays: 30,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-08-21",
    sections: [
      {
        heading: "병원에서 확인할 내용과 집에서 준비할 일을 나누세요",
        paragraphs: [
          "퇴원 전에는 이동과 식사, 복약, 상처 관리, 후속 진료처럼 의료진에게 확인할 내용과 침대·화장실 동선, 가족 돌봄시간처럼 집에서 준비할 일을 나누어 적으세요. 재가복지센터는 퇴원 처방이나 의료 판단을 대신하지 않습니다.",
          "혼자 일어나기, 화장실 가기, 식사하기처럼 퇴원 직후 어려울 장면을 기준으로 필요한 방문요양, 방문간호, 복지용구와 가족의 역할을 비교하세요. 서비스 시작 가능일도 기관과 미리 맞춰야 합니다.",
        ],
        items: ["퇴원일과 다음 진료일", "복약·처치에 대한 의료진 설명", "집 안 이동과 화장실 동선", "가족이 비는 시간과 서비스 시작일"],
      },
      {
        heading: "여러 지원이 필요하면 강남 통합돌봄 창구를 확인하세요",
        paragraphs: [
          "지역사회 통합돌봄은 의료·요양·일상생활·주거 지원을 지역에서 연결하는 제도입니다. 강남구 공식 안내에는 본인뿐 아니라 가족, 병원, 복지시설 등 관계자가 상담과 신청을 할 수 있는 경로가 안내되어 있습니다.",
          "지원 대상과 연결 가능한 사업은 개인 상황과 시기에 따라 달라집니다. 퇴원 전에 병원 담당자와 주소지 동주민센터에 연계 가능 여부를 문의하고, 이미 이용 중인 장기요양서비스가 있다면 기관에도 입·퇴원 일정을 알리세요.",
        ],
      },
    ],
    nextStep: {
      label: "강남 통합돌봄 가이드 보기",
      href: "/guides/gangnam-integrated-care",
      note: "보건·요양·생활 지원이 함께 필요할 때 지역 신청 흐름을 확인하세요.",
    },
    relatedGuideSlugs: ["gangnam-integrated-care", "welfare-equipment-home-safety"],
    sources: [
      { title: "보건복지부 지역사회 통합돌봄", url: "https://www.mohw.go.kr/integratedcare/" },
      { title: "강남구청 통합돌봄 서비스 안내", url: "https://www.gangnam.go.kr/board/cardnews/1205/view.do?mid=fm0306" },
    ],
  },
  {
    status: "published",
    slug: "dementia-communication-routine",
    title: "치매 어르신이 돌봄을 거부할 때 대화와 일상 정리",
    summary: "설득을 반복하기보다 거부가 시작되는 장면과 익숙한 순서를 살피며 돌봄 방법을 조정합니다.",
    category: "가족 돌봄",
    contentClass: "stable",
    freshnessDays: 180,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2027-01-18",
    sections: [
      {
        heading: "틀렸다고 바로잡기보다 한 번에 한 가지를 제안하세요",
        paragraphs: [
          "치매 어르신이 씻기, 옷 갈아입기나 식사를 거부할 때 사실을 따지거나 기억을 시험하면 불안이 커질 수 있습니다. 짧고 익숙한 표현으로 한 번에 한 가지 행동을 제안하고 기다릴 시간을 주세요.",
          "평소 잘 받아들이는 시간, 사람, 음악이나 물건이 있는지 살펴보세요. 거부가 반복되면 누가, 언제, 어떤 말로 시작했을 때 어려웠는지 기록해 가족과 요양보호사가 같은 방식을 시도하도록 맞추세요.",
        ],
        items: ["거부가 시작되는 시간과 상황", "편안해하는 말투와 익숙한 순서", "한 번에 전달할 짧은 요청", "가족과 기관이 함께 사용할 대응 방식"],
      },
      {
        heading: "갑작스러운 변화는 치매 탓으로만 넘기지 마세요",
        paragraphs: [
          "평소와 다르게 갑자기 처지거나 혼란이 심해지고 통증, 식사 저하, 수면 변화가 함께 나타나면 단순한 고집이나 치매 행동으로 단정하지 마세요. 건강 상태에 대한 판단은 의료진과 상의해야 합니다.",
          "가족도 계속 설득하고 대응하다 지칠 수 있습니다. 강남구 치매안심센터의 가족교육과 상담 등 현재 이용 가능한 지원을 확인하고, 돌봄을 나눌 방법을 함께 찾으세요.",
        ],
      },
    ],
    nextStep: {
      label: "가족 돌봄자 자기돌봄 보기",
      href: "/guides/dementia-family-self-care",
      note: "어르신의 일상뿐 아니라 돌보는 가족의 수면과 휴식도 함께 살펴보세요.",
    },
    relatedGuideSlugs: ["dementia-family-self-care", "family-care-handover-note"],
    sources: [
      { title: "중앙치매센터 치매가이드북", url: "https://www.nid.or.kr/download/download.aspx?NIDAPP=Y&filename=%EC%A4%91%EC%95%99%EC%B9%98%EB%A7%A4%EC%84%BC%ED%84%B0+%EC%B9%98%EB%A7%A4%EA%B0%80%EC%9D%B4%EB%93%9C%EB%B6%81%28%EC%98%A8%EB%9D%BC%EC%9D%B8%29.pdf&path=%2F%2Fansim%2Fsupport_notice%2F2023020311325284.pdf" },
      { title: "강남구보건소 치매관리·가족 지원", url: "https://health.gangnam.go.kr/web/business/elderly/sub01.do" },
    ],
  },
  {
    status: "published",
    slug: "family-care-handover-note",
    title: "가족이 번갈아 돌볼 때 한 장 인수인계 노트",
    summary: "가족마다 다른 지시를 줄이지 않도록 꼭 필요한 생활 정보와 변화만 한 장으로 공유합니다.",
    category: "가족 돌봄",
    contentClass: "stable",
    freshnessDays: 180,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2027-01-18",
    sections: [
      {
        heading: "평소 생활과 오늘의 변화를 분리해 적으세요",
        paragraphs: [
          "인수인계 노트의 첫 부분에는 평소 식사, 수면, 화장실, 이동과 의사소통 방식을 적고, 다음 부분에는 오늘 달라진 점만 기록하세요. 모든 가족이 긴 일지를 새로 쓰기보다 같은 기준으로 짧게 남기는 것이 중요합니다.",
          "의료진이 설명한 복약과 처치 내용은 가족의 추측을 섞지 말고 원문을 확인할 수 있게 정리하세요. 요양보호사에게 전달할 내용은 급여제공계획과 관련된 필요한 정보로 제한하세요.",
        ],
        items: ["평소 식사·수면·배변·이동 방식", "오늘 달라진 점 한두 가지", "다음 진료와 가족 일정", "기관에 전달하거나 확인할 내용"],
      },
      {
        heading: "연락 담당자와 결정할 사람을 미리 정하세요",
        paragraphs: [
          "가족마다 다른 요청을 하면 어르신과 요양보호사가 혼란스러울 수 있습니다. 기관이 먼저 연락할 가족 한 명과 중요한 변경을 함께 결정할 가족을 정하고, 연락이 되지 않을 때의 순서도 남겨두세요.",
          "어르신의 건강과 개인정보는 필요한 사람에게 필요한 범위만 공유하세요. 노트는 현관이나 외부인이 볼 수 있는 곳보다 가족과 기관이 합의한 안전한 장소나 방법으로 관리하세요.",
        ],
      },
    ],
    nextStep: {
      label: "치매 돌봄 대화 가이드 보기",
      href: "/guides/dementia-communication-routine",
      note: "가족과 요양보호사가 같은 말과 순서를 사용할 수 있게 정리해 보세요.",
    },
    relatedGuideSlugs: ["dementia-communication-routine", "first-week-home-care"],
    sources: [
      { title: "중앙치매센터 치매가이드북", url: "https://www.nid.or.kr/download/download.aspx?NIDAPP=Y&filename=%EC%A4%91%EC%95%99%EC%B9%98%EB%A7%A4%EC%84%BC%ED%84%B0+%EC%B9%98%EB%A7%A4%EA%B0%80%EC%9D%B4%EB%93%9C%EB%B6%81%28%EC%98%A8%EB%9D%BC%EC%9D%B8%29.pdf&path=%2F%2Fansim%2Fsupport_notice%2F2023020311325284.pdf" },
      { title: "국민건강보험공단 장기요양급여 이용 절차", url: "https://www.nhis.or.kr/static/html/wbda/c/wbdac04.html" },
    ],
  },
  {
    status: "published",
    slug: "support-without-care-grade",
    title: "장기요양등급이 없거나 등급외일 때 찾을 지원",
    summary: "장기요양급여를 바로 이용하기 어려워도 강남 지역에서 확인할 수 있는 돌봄 경로를 정리합니다.",
    category: "지역·전환 지원",
    contentClass: "local",
    freshnessDays: 30,
    reviewedAt: "2026-07-22",
    reviewDueAt: "2026-08-21",
    sections: [
      {
        heading: "등급 결과와 지금 필요한 도움을 따로 정리하세요",
        paragraphs: [
          "장기요양등급을 받지 못했거나 아직 신청 전이라고 해서 모든 지역 돌봄의 대상에서 자동으로 제외되는 것은 아닙니다. 반대로 다른 사업을 자동으로 이용할 수 있다는 뜻도 아니므로 각 사업의 대상과 중복 이용 기준을 확인해야 합니다.",
          "안전 확인, 식사와 외출, 치매 상담, 퇴원 후 생활, 주거 환경처럼 지금 필요한 도움을 나누어 적으세요. 등급 결과에 대한 문의는 공단에, 지역 지원은 주소지 동주민센터와 해당 기관에 각각 확인하는 편이 정확합니다.",
        ],
        items: ["장기요양 신청·판정 상태", "혼자 하기 어려운 일상 장면", "현재 이용 중인 복지·보건 서비스", "거주 동과 연락 가능한 가족"],
      },
      {
        heading: "강남 통합돌봄·노인맞춤돌봄·치매 지원을 구분해 보세요",
        paragraphs: [
          "강남구 통합돌봄은 의료, 요양, 일상생활과 주거 등 복합적인 지원이 필요한 경우 상담할 수 있는 지역 경로입니다. 노인맞춤돌봄서비스는 소득과 가구 상황 등 별도 기준으로 대상자를 선정해 안전지원, 사회참여, 생활교육과 일상생활 지원 등을 제공합니다.",
          "기억력 변화와 치매 관련 어려움이 중심이라면 강남구 치매안심센터의 검진·상담·가족 지원도 확인하세요. 대상과 신청 방법은 바뀔 수 있으므로 공식 페이지에서 최신 내용을 다시 확인해야 합니다.",
        ],
      },
    ],
    nextStep: {
      label: "강남 통합돌봄 가이드 보기",
      href: "/guides/gangnam-integrated-care",
      note: "여러 생활 어려움이 겹친다면 지역 통합 창구의 신청 흐름을 확인하세요.",
    },
    relatedGuideSlugs: ["gangnam-integrated-care", "dementia-family-self-care"],
    sources: [
      { title: "보건복지부 노인맞춤돌봄서비스", url: "https://www.mohw.go.kr/menu.es?mid=a10712010400" },
      { title: "강남복지플랫폼 노인맞춤돌봄서비스", url: "https://bokji.gangnam.go.kr/board/BBS_SUPPORT/1546/view.do?mid=ID03_02&type=" },
      { title: "강남구청 통합돌봄 서비스 안내", url: "https://www.gangnam.go.kr/board/cardnews/1205/view.do?mid=fm0306" },
    ],
  },
];
