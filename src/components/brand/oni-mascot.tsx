interface OniMascotProps {
  className?: string;
  decorative?: boolean;
  mood?: "welcome" | "guide" | "rest";
}

export function OniMascot({ className = "", decorative = false, mood = "welcome" }: OniMascotProps) {
  const accessible = decorative
    ? { "aria-hidden": true as const }
    : { role: "img", "aria-label": "살구빛 새 온이가 세이지 잎 스카프를 두르고 곁을 지키는 모습" };
  const wingRotation = mood === "guide" ? -8 : mood === "rest" ? 8 : 0;

  return (
    <svg
      {...accessible}
      className={`oni-mascot ${className}`.trim()}
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title>온이 — 개포 온곁의 이웃 새</title>}
      <path className="oni-sun" d="M54 186c-16-74 36-132 105-138 74-6 131 47 130 119-1 67-49 116-119 119-59 3-105-35-116-100Z" />
      <path className="oni-tail" d="m93 226-45 36 58 2 31-35Z" />
      <path className="oni-body" d="M97 212c-13-52 12-113 71-122 53-8 98 29 99 83 1 63-41 96-102 91-35-3-60-22-68-52Z" />
      <path className="oni-belly" d="M138 239c-24-20-29-65-3-86 27-21 67-4 73 33 5 34-20 65-49 64-8 0-15-4-21-11Z" />
      <path className="oni-wing" style={{ transform: `rotate(${wingRotation}deg)` }} d="M126 170c-18 1-35 18-30 39 5 22 31 33 58 18 17-10 26-25 29-42-18-10-37-16-57-15Z" />
      <path className="oni-head" d="M118 116c4-39 36-66 76-61 43 5 67 40 58 78-9 36-42 55-80 47-37-8-58-30-54-64Z" />
      <path className="oni-cheek" d="M206 131c11 0 20 6 20 13s-9 13-20 13-19-6-19-13 8-13 19-13Z" />
      <path className="oni-beak" d="m238 116 41 14-39 17c4-10 4-21-2-31Z" />
      <circle className="oni-eye" cx="207" cy="107" r="7" />
      <path className="oni-eye-glint" d="M204 104h3" />
      <path className="oni-scarf" d="M119 153c27 19 77 28 123 1l9 20c-43 28-100 25-143-1Z" />
      <path className="oni-leaf" d="M133 174c-14 12-18 34-7 54 21-3 37-18 40-39-8 1-20 8-31 21 9-17 23-27 39-31-17-11-31-10-41-5Z" />
      <path className="oni-feet" d="M146 257v17m-13 0h27m44-17v17m-13 0h27" />
      {mood === "guide" && <path className="oni-path" d="M41 87c24-23 48-26 72-9" />}
    </svg>
  );
}
