import Image from "next/image";

type DirectorPhotoVariant = "portrait" | "consultation" | "welcome";

const photos: Record<DirectorPhotoVariant, { src: string; width: number; height: number; alt: string; caption: string }> = {
  portrait: {
    src: "/images/director/yoo-changsoon-portrait.webp",
    width: 800,
    height: 1120,
    alt: "검은 재킷을 입고 미소 짓는 유창순 원장",
    caption: "유창순 원장 · 제공 사진을 바탕으로 AI로 보정한 프로필 이미지",
  },
  consultation: {
    src: "/images/director/yoo-changsoon-consultation.webp",
    width: 1400,
    height: 933,
    alt: "유창순 원장이 어르신의 이야기를 듣는 상담 장면",
    caption: "상담 장면 · 유창순 원장 제공 사진을 바탕으로 AI로 보정한 연출 이미지",
  },
  welcome: {
    src: "/images/director/yoo-changsoon-welcome.webp",
    width: 1400,
    height: 933,
    alt: "밝은 상담 공간에서 방문자를 맞이하는 유창순 원장",
    caption: "방문 안내 장면 · 유창순 원장 제공 사진을 바탕으로 AI로 보정한 연출 이미지",
  },
};

export function DirectorPhoto({ variant, className = "" }: { variant: DirectorPhotoVariant; className?: string }) {
  const photo = photos[variant];
  return (
    <figure className={`director-photo director-photo-${variant} ${className}`.trim()}>
      <Image src={photo.src} width={photo.width} height={photo.height} sizes={variant === "portrait" ? "(min-width: 768px) 34vw, 82vw" : "(min-width: 768px) 48vw, 100vw"} alt={photo.alt} unoptimized />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}
