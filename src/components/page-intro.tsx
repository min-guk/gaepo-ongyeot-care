import type { ReactNode } from "react";
import { OniMascot, type OniScene } from "@/components/brand/oni-mascot";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  compactMascot?: boolean;
  mascotScene?: OniScene;
  mascotCaption?: string;
}

export function PageIntro({ eyebrow, title, description, children, compactMascot = false, mascotScene = "guide", mascotCaption = "천천히 살펴봐도 괜찮아요." }: PageIntroProps) {
  return (
    <section className="page-hero">
      <div className="shell hero-composition">
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lede">{description}</p>
          {children}
        </div>
        <div className={`hero-mascot ${compactMascot ? "hero-mascot-compact" : ""}`.trim()}>
          <OniMascot scene={mascotScene} decorative />
          <p aria-hidden="true">{mascotCaption}</p>
        </div>
      </div>
    </section>
  );
}
