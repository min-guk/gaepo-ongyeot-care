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
  guide: "온이가 날개를 크게 펴고 확인할 출처를 향해 날아가는 모습",
  services: "온이가 돌봄이 필요한 일상의 집을 살피는 모습",
  process: "온이가 징검다리를 따라 차근차근 걷는 모습",
  contact: "온이가 상담 전에 메모장을 준비하는 모습",
  recruitment: "온이가 채용 조건을 확인하는 서류판을 든 모습",
  privacy: "온이가 개인정보가 담긴 편지를 방패로 지키는 모습",
  story: "온이가 새싹 곁에서 센터의 마음을 소개하는 모습",
  rest: "온이가 잠시 눈을 감고 쉬는 모습",
  search: "온이가 돋보기로 잃어버린 길을 찾는 모습",
};

type OniPose = "waving" | "flying" | "carrying" | "walking" | "writing" | "presenting" | "guarding" | "planting" | "sleeping" | "searching";

const poseByScene: Record<OniScene, OniPose> = {
  welcome: "waving",
  guide: "flying",
  services: "carrying",
  process: "walking",
  contact: "writing",
  recruitment: "presenting",
  privacy: "guarding",
  story: "planting",
  rest: "sleeping",
  search: "searching",
};

const poseTransforms: Record<OniPose, string> = {
  waving: "translate(0 0)",
  flying: "translate(-8 -30) rotate(-16 178 170)",
  carrying: "translate(-5 6) rotate(4 170 210)",
  walking: "translate(-3 -2) rotate(-5 170 228)",
  writing: "translate(9 27) scale(1 .88) rotate(4 175 215)",
  presenting: "translate(7 2) rotate(2 172 214)",
  guarding: "translate(4 3)",
  planting: "translate(7 18) rotate(10 170 224)",
  sleeping: "translate(3 35) scale(1 .84) rotate(5 170 225)",
  searching: "translate(-9 13) rotate(11 178 210)",
};

function SceneProp({ scene }: { scene: OniScene }) {
  if (scene === "guide") {
    return null;
  }
  if (scene === "services") {
    return <g className="oni-home"><path className="oni-prop-fill" d="M28 190 78 147l50 43v65H28Z" /><path d="M47 255v-43h29v43m18-34c0-13 20-13 20 0 0 13-20 25-20 25s-20-12-20-25c0-13 20-13 20 0Z" /></g>;
  }
  if (scene === "process") {
    return <g className="oni-steps"><ellipse cx="66" cy="282" rx="31" ry="10" /><ellipse cx="143" cy="272" rx="28" ry="9" /><ellipse cx="226" cy="282" rx="31" ry="10" /></g>;
  }
  if (scene === "contact") {
    return <g className="oni-notepad"><path className="oni-prop-fill" d="M31 151h85v108H31Z" /><path d="M48 139v24m20-24v24m20-24v24M48 190h49M48 211h49M48 232h32" /></g>;
  }
  if (scene === "recruitment") {
    return <g className="oni-clipboard"><path className="oni-prop-fill" d="M29 147h92v116H29Z" /><path className="oni-prop-fill" d="M53 137h44v23H53Z" /><path d="m48 192 8 8 15-18m10 10h22m-55 34 8 8 15-18m10 10h22" /></g>;
  }
  if (scene === "privacy") {
    return <g className="oni-privacy-sparkles"><path d="M43 127v24m-12-12h24M79 106v18m-9-9h18" /></g>;
  }
  if (scene === "story") {
    return <g className="oni-sprout"><path d="M70 269v-57" /><path className="oni-prop-fill" d="M69 230c-29-1-37-25-34-39 25 1 39 13 34 39Zm2-10c27 0 38-22 36-39-26 1-39 14-36 39Z" /><path className="oni-ground" d="M30 271h86" /></g>;
  }
  if (scene === "rest") {
    return <g className="oni-rest"><path d="m44 128 20-21H45l20-21M77 108l15-16H78l15-16" /><path className="oni-ground" d="M44 276c24-9 52-9 78 0" /></g>;
  }
  if (scene === "search") {
    return <g className="oni-search"><path className="oni-path" d="M35 284c39-23 75-22 103 1" /></g>;
  }
  return <g className="oni-sparkles"><path d="M54 115v34m-17-17h34M91 73v24M79 85h24" /></g>;
}

function PoseWings({ pose }: { pose: OniPose }) {
  if (pose === "waving") {
    return <g className="oni-waving-wing"><path className="oni-wing" d="M143 181c-35-15-52-52-39-84 28 12 49 39 59 71-4 8-11 13-20 13Z" /><path className="oni-wave-lines" d="M94 85 82 67m25 13 1-24" /></g>;
  }
  if (pose === "flying") {
    return <g className="oni-flying-wing"><path className="oni-wing" d="M151 183c-46-20-72-65-57-107 38 18 66 52 75 91-4 10-10 15-18 16Z" /></g>;
  }
  if (pose === "carrying") {
    return <g className="oni-carrying-wing"><path className="oni-wing" d="M135 173c-31 3-48 28-37 51 12 24 47 25 74-2 8-8 12-18 14-29-16-11-34-18-51-20Z" /></g>;
  }
  if (pose === "walking") {
    return <g className="oni-walking-wing"><path className="oni-wing" d="M136 171c-26-3-50 12-57 34 24 15 57 12 82-9 8-6 14-15 18-25-15-1-29-1-43 0Z" /></g>;
  }
  if (pose === "writing") {
    return <g className="oni-writing-wing"><path className="oni-wing" d="M139 172c-28 8-43 25-48 48 21 10 43 4 62-16 9-10 16-21 20-34-12-2-23-1-34 2Z" /><path className="oni-pencil-held" d="m108 219-23 27 7 5 25-27Z" /></g>;
  }
  if (pose === "presenting") {
    return <g className="oni-presenting-wing"><path className="oni-wing" d="M139 172c-31 3-50 17-61 39 23 14 53 8 77-13 9-8 15-17 19-27-12-2-24-2-35 1Z" /></g>;
  }
  if (pose === "guarding") {
    return <g className="oni-guard-wings"><path className="oni-wing" d="M133 173c-36-10-68 5-83 34 21 20 55 18 91-5 10-7 17-16 21-27-10 0-20-1-29-2Z" /><path className="oni-wing oni-wing-reversed" d="M194 178c31-13 63-3 78 21-15 23-47 26-78 8-9-5-16-13-21-23 7-1 14-3 21-6Z" /></g>;
  }
  if (pose === "planting") {
    return <g className="oni-planting-wing"><path className="oni-wing" d="M137 174c-28 9-46 32-47 59 27 8 54-7 73-36 5-8 9-17 11-27-13-1-25 0-37 4Z" /></g>;
  }
  if (pose === "sleeping") {
    return <g className="oni-sleeping-wing"><path className="oni-wing" d="M129 168c-28 6-43 29-35 51 9 27 47 35 80 11 12-9 21-23 25-40-23-16-47-24-70-22Z" /></g>;
  }
  return <g className="oni-searching-wing"><path className="oni-wing" d="M180 177c20-7 41 1 57 20-9 22-31 34-58 27-13-3-24-10-33-21 7-11 18-20 34-26Z" /></g>;
}

function PoseFeet({ pose }: { pose: OniPose }) {
  if (pose === "flying") return null;
  if (pose === "walking") return <path className="oni-walking-feet" d="m151 255-14 21m-13 0h26m53-21 17 15m-8 0h25" />;
  if (pose === "writing") return <path className="oni-seated-feet" d="M148 260c12 10 24 10 37 0m-30 8h-17m53 0h19" />;
  if (pose === "sleeping") return <path className="oni-sleeping-feet" d="M145 260c10 8 22 8 32 0m13 0c8 7 17 7 25 0" />;
  if (pose === "planting") return <path className="oni-planting-feet" d="m148 257-8 15m-12 0h25m48-18-4 15m-11 0h23" />;
  return <path className="oni-feet" d="M146 257v17m-13 0h27m44-17v17m-13 0h27" />;
}

function BirdFigure({ scene }: { scene: OniScene }) {
  const pose = poseByScene[scene];
  const sleeping = pose === "sleeping";
  return (
    <g className={`oni-bird oni-pose-${pose}`} data-pose={pose} transform={poseTransforms[pose]}>
      {pose === "flying" ? <g className="oni-flight-trails"><path d="M50 146h58M37 177h49M57 208h60" /></g> : null}
      {pose === "flying" ? <path className="oni-rear-wing" d="M176 180c8-42 35-74 70-89 10 39-5 77-47 104Z" /> : null}
      <path className="oni-tail" d="m93 226-45 36 58 2 31-35Z" />
      <path className="oni-body" d="M97 212c-13-52 12-113 71-122 53-8 98 29 99 83 1 63-41 96-102 91-35-3-60-22-68-52Z" />
      <path className="oni-belly" d="M138 239c-24-20-29-65-3-86 27-21 67-4 73 33 5 34-20 65-49 64-8 0-15-4-21-11Z" />
      {pose === "guarding" ? <g className="oni-held-shield"><path className="oni-prop-fill" d="M70 157c16 12 32 13 45 13v35c0 28-18 42-45 53-27-11-45-25-45-53v-35c13 0 29-1 45-13Z" /><rect x="52" y="193" width="36" height="28" rx="5" /><path d="M59 193v-8c0-15 22-15 22 0v8" /><circle cx="70" cy="207" r="3" /></g> : null}
      <PoseWings pose={pose} />
      {pose === "carrying" ? <g className="oni-care-bag"><path className="oni-prop-fill" d="M103 207h54v52h-54Z" /><path d="M115 207c0-24 30-24 30 0" /><path d="M130 222v22m-11-11h22" /></g> : null}
      <path className="oni-head" d="M118 116c4-39 36-66 76-61 43 5 67 40 58 78-9 36-42 55-80 47-37-8-58-30-54-64Z" />
      <path className="oni-cheek" d="M206 131c11 0 20 6 20 13s-9 13-20 13-19-6-19-13 8-13 19-13Z" />
      <path className="oni-beak" d="m238 116 41 14-39 17c4-10 4-21-2-31Z" />
      {sleeping ? <path className="oni-closed-eye" d="M198 108c7 6 14 6 20 0" /> : <><circle className="oni-eye" cx="207" cy="107" r="7" /><path className="oni-eye-glint" d="M204 104h3" /></>}
      <path className="oni-scarf" d="M119 153c27 19 77 28 123 1l9 20c-43 28-100 25-143-1Z" />
      <path className="oni-leaf" d="M133 174c-14 12-18 34-7 54 21-3 37-18 40-39-8 1-20 8-31 21 9-17 23-27 39-31-17-11-31-10-41-5Z" />
      <PoseFeet pose={pose} />
      {pose === "searching" ? <g className="oni-held-magnifier"><circle className="oni-prop-fill" cx="263" cy="182" r="27" /><path d="m244 201-28 29" /></g> : null}
    </g>
  );
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
      <BirdFigure scene={scene} />
    </svg>
  );
}
