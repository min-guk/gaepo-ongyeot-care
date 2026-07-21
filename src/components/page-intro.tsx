import type { ReactNode } from "react";
import { OniMascot } from "@/components/brand/oni-mascot";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  compactMascot?: boolean;
}

export function PageIntro({ eyebrow, title, description, children, compactMascot = false }: PageIntroProps) {
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
          <OniMascot mood="guide" decorative />
          <p aria-hidden="true">천천히 살펴봐도 괜찮아요.</p>
        </div>
      </div>
    </section>
  );
}
