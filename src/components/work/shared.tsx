"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// The work visuals shown under the hero, with each image's own size (for its shape).
export type Work = { src: string; alt: string; w: number; h: number; focus?: string };

export const WORK: Work[] = [
  { src: "/assets/work/keploy.webp", alt: "Keploy AI test run screen", w: 1264, h: 945 },
  { src: "/assets/work/mosaic.webp", alt: "Mosaic, a story app home screen", w: 1400, h: 1510, focus: "50% 20%" },
  { src: "/assets/work/concertpal.webp", alt: "ConcertPal Calendar feature cards", w: 1400, h: 1140 },
  { src: "/assets/work/espresso.webp", alt: "A Spotify turntable widget", w: 1400, h: 1400 },
  { src: "/assets/work/context-window.webp", alt: "A context window usage card", w: 1044, h: 798 },
  { src: "/assets/work/figma-to-react.webp", alt: "Figma to React, two folder icons", w: 1400, h: 670, focus: "20% 50%" },
];

// One consistent frame for every visual: a white mat, a hairline and a soft shadow,
// so images with different backgrounds read as one set.
export function Frame({ work, sizes, className = "", fill = false }: { work: Work; sizes: string; className?: string; fill?: boolean }) {
  return (
    <div className={`rounded-[18px] bg-bg p-1.5 shadow-[0_18px_40px_-24px_rgba(60,40,20,0.35)] ring-1 ring-line ${className}`}>
      <div className={`relative overflow-hidden rounded-[13px] ${fill ? "h-full" : ""}`}>
        {fill ? (
          <Image src={work.src} alt={work.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: work.focus }} draggable={false} />
        ) : (
          <Image src={work.src} alt={work.alt} width={work.w} height={work.h} sizes={sizes} className="block h-auto w-full" draggable={false} />
        )}
      </div>
    </div>
  );
}

// Progressive blur: stacked backdrop blurs, each stronger and confined to a band further
// towards `edge`, so the blur ramps up smoothly instead of starting at a hard line.
const STEPS = [0.5, 1, 2, 4, 8, 16];
export function ProgressiveBlur({ edge, className }: { edge: "bottom" | "left" | "right"; className: string }) {
  const n = STEPS.length;
  const pct = (i: number) => `${Math.max(0, Math.min(100, (i / (n + 1)) * 100))}%`;
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute z-10 ${className}`}>
      {STEPS.map((b, i) => {
        const mask = `linear-gradient(to ${edge}, transparent ${pct(i)}, black ${pct(i + 1)}, black ${pct(i + 2)}, transparent ${pct(i + 3)})`;
        return <div key={b} className="absolute inset-0" style={{ backdropFilter: `blur(${b}px)`, WebkitBackdropFilter: `blur(${b}px)`, maskImage: mask, WebkitMaskImage: mask }} />;
      })}
    </div>
  );
}

// Scale a fixed-size stage down to fit its container's width.
export function useFit(stageW: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / stageW));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [stageW]);
  return [ref, scale] as const;
}
