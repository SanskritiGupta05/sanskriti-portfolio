"use client";

import { pixelEdge } from "@/lib/draw";
import { useInView } from "@/lib/hooks";

/** Stepped pixel border between two colours; extra pixels dissolve in on scroll. */
export default function PixelEdge({ seed, side }: { seed: number; side: "top" | "bottom" }) {
  const [ref, seen] = useInView<SVGSVGElement>(0.1);
  const { P, base, extra } = pixelEdge(seed);
  const H = 64;
  const flip = side === "bottom";
  const y = (v: number, h: number) => (flip ? H - v - h : v);
  return (
    <svg
      ref={ref}
      className={`pixel-edge pixel-${side} ${seen ? "is-in" : ""}`}
      viewBox={`0 0 1440 ${H}`}
      preserveAspectRatio={flip ? "xMidYMax slice" : "xMidYMin slice"}
      aria-hidden
    >
      <rect x="0" y={y(0, P)} width="1440" height={P} />
      {base.map((b) => (b.h ? <rect key={b.x} x={b.x} y={y(P, b.h)} width={P} height={b.h} /> : null))}
      {extra.map((e, i) => (
        <rect key={`e${i}`} className="px-extra" style={{ animationDelay: `${(i % 23) * 12}ms` }} x={e.x} y={y(e.y, e.s)} width={e.s} height={e.s} />
      ))}
    </svg>
  );
}
