export type OniScene =
  | "welcome"
  | "guide"
  | "services"
  | "process"
  | "contact"
  | "recruitment"
  | "privacy"
  | "story"
  | "rest"
  | "search";

interface OniMascotProps {
  className?: string;
  decorative?: boolean;
  scene?: OniScene;
}

const sceneLabels: Record<OniScene, string> = {
  welcome: "온이가 반갑게 인사하는 모습",
  guide: "온이가 이정표 옆에서 길을 안내하는 모습",
  services: "온이가 돌봄이 필요한 일상의 집을 살피는 모습",
  process: "온이가 징검다리를 따라 차근차근 걷는 모습",
  contact: "온이가 상담 전에 메모장을 준비하는 모습",
  recruitment: "온이가 채용 조건을 확인하는 서류판을 든 모습",
  privacy: "온이가 개인정보가 담긴 편지를 방패로 지키는 모습",
  story: "온이가 새싹 곁에서 센터의 마음을 소개하는 모습",
  rest: "온이가 잠시 눈을 감고 쉬는 모습",
  search: "온이가 돋보기로 잃어버린 길을 찾는 모습",
};

const wingRotations: Record<OniScene, number> = {
  welcome: -3,
  guide: -12,
  services: 5,
  process: -9,
  contact: 11,
  recruitment: -15,
  privacy: 8,
  story: 2,
  rest: 10,
  search: -5,
};

function SceneProp({ scene }: { scene: OniScene }) {
  if (scene === "guide") {
    return <g className="oni-signpost"><path d="M58 119v143" /><path className="oni-prop-fill" d="m31 126 82-10 10 28-83 11Z" /><path className="oni-prop-fill" d="m47 165 76 8-4 28-79-8Z" /><path className="oni-path" d="M42 286c33-25 61-28 88-14" /></g>;
  }
  if (scene === "services") {
    return <g className="oni-home"><path className="oni-prop-fill" d="M28 190 78 147l50 43v65H28Z" /><path d="M47 255v-43h29v43m18-34c0-13 20-13 20 0 0 13-20 25-20 25s-20-12-20-25c0-13 20-13 20 0Z" /></g>;
  }
  if (scene === "process") {
    return <g className="oni-steps"><ellipse cx="52" cy="276" rx="26" ry="11" /><ellipse cx="105" cy="252" rx="24" ry="10" /><ellipse cx="153" cy="281" rx="23" ry="10" /><path className="oni-path" d="M31 244c38-53 86-63 132-28" /></g>;
  }
  if (scene === "contact") {
    return <g className="oni-notepad"><path className="oni-prop-fill" d="M31 151h85v108H31Z" /><path d="M48 139v24m20-24v24m20-24v24M48 190h49M48 211h49M48 232h32" /><path className="oni-pencil" d="m103 242 35-50 10 7-35 50-15 7Z" /></g>;
  }
  if (scene === "recruitment") {
    return <g className="oni-clipboard"><path className="oni-prop-fill" d="M29 147h92v116H29Z" /><path className="oni-prop-fill" d="M53 137h44v23H53Z" /><path d="m48 192 8 8 15-18m10 10h22m-55 34 8 8 15-18m10 10h22" /></g>;
  }
  if (scene === "privacy") {
    return <g className="oni-shield"><path className="oni-prop-fill" d="M75 143c21 15 42 17 57 17v45c0 35-23 52-57 66-34-14-57-31-57-66v-45c16 0 37-2 57-17Z" /><rect x="52" y="190" width="46" height="34" rx="5" /><path d="M61 190v-9c0-19 28-19 28 0v9" /><circle cx="75" cy="206" r="3" /></g>;
  }
  if (scene === "story") {
    return <g className="oni-sprout"><path d="M70 269v-57" /><path className="oni-prop-fill" d="M69 230c-29-1-37-25-34-39 25 1 39 13 34 39Zm2-10c27 0 38-22 36-39-26 1-39 14-36 39Z" /><path className="oni-ground" d="M30 271h86" /></g>;
  }
  if (scene === "rest") {
    return <g className="oni-rest"><path d="m44 128 20-21H45l20-21M77 108l15-16H78l15-16" /><path className="oni-ground" d="M44 276c24-9 52-9 78 0" /></g>;
  }
  if (scene === "search") {
    return <g className="oni-search"><circle className="oni-prop-fill" cx="72" cy="195" r="39" /><path d="m99 224 32 34" /><path className="oni-path" d="M35 284c39-23 75-22 103 1" /></g>;
  }
  return <g className="oni-sparkles"><path d="M54 115v34m-17-17h34M91 73v24M79 85h24" /></g>;
}

export function OniMascot({ className = "", decorative = false, scene = "welcome" }: OniMascotProps) {
  const accessible = decorative
    ? { "aria-hidden": true as const }
    : { role: "img", "aria-label": sceneLabels[scene] };

  return (
    <svg
      {...accessible}
      className={`oni-mascot ${className}`.trim()}
      data-scene={scene}
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title>온이 — 개포 온곁의 이웃 새</title>}
      <path className="oni-sun" d="M54 186c-16-74 36-132 105-138 74-6 131 47 130 119-1 67-49 116-119 119-59 3-105-35-116-100Z" />
      <SceneProp scene={scene} />
      <path className="oni-tail" d="m93 226-45 36 58 2 31-35Z" />
      <path className="oni-body" d="M97 212c-13-52 12-113 71-122 53-8 98 29 99 83 1 63-41 96-102 91-35-3-60-22-68-52Z" />
      <path className="oni-belly" d="M138 239c-24-20-29-65-3-86 27-21 67-4 73 33 5 34-20 65-49 64-8 0-15-4-21-11Z" />
      <path className="oni-wing" style={{ transform: `rotate(${wingRotations[scene]}deg)` }} d="M126 170c-18 1-35 18-30 39 5 22 31 33 58 18 17-10 26-25 29-42-18-10-37-16-57-15Z" />
      <path className="oni-head" d="M118 116c4-39 36-66 76-61 43 5 67 40 58 78-9 36-42 55-80 47-37-8-58-30-54-64Z" />
      <path className="oni-cheek" d="M206 131c11 0 20 6 20 13s-9 13-20 13-19-6-19-13 8-13 19-13Z" />
      <path className="oni-beak" d="m238 116 41 14-39 17c4-10 4-21-2-31Z" />
      {scene === "rest" ? <path className="oni-closed-eye" d="M198 108c7 6 14 6 20 0" /> : <><circle className="oni-eye" cx="207" cy="107" r="7" /><path className="oni-eye-glint" d="M204 104h3" /></>}
      <path className="oni-scarf" d="M119 153c27 19 77 28 123 1l9 20c-43 28-100 25-143-1Z" />
      <path className="oni-leaf" d="M133 174c-14 12-18 34-7 54 21-3 37-18 40-39-8 1-20 8-31 21 9-17 23-27 39-31-17-11-31-10-41-5Z" />
      <path className="oni-feet" d="M146 257v17m-13 0h27m44-17v17m-13 0h27" />
    </svg>
  );
}
