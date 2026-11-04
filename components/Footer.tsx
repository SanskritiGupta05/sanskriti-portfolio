"use client";

import { useRef, useState } from "react";
import { EMAIL } from "@/lib/content";
import { rooftops } from "@/lib/draw";
import { useCopy } from "@/lib/hooks";

const HOUSES = rooftops();
const BIRDS: [number, number][] = [[880, 90], [904, 78], [926, 96], [950, 82], [972, 104], [1000, 90], [860, 112]];
const LANTERNS = Array.from({ length: 9 }, (_, i) => {
  const t = (i + 1) / 10;
  return { x: 300 + t * 1000, y: 300 + (1 - (2 * t - 1) ** 2) * 40 };
});
const FLIES: [number, number][] = [[300, 160], [420, 90], [520, 200], [880, 120], [960, 60], [1040, 170], [1200, 110], [1260, 210], [180, 100], [640, 230], [760, 150]];

/** Ink-wash street at the foot of Fuji. Birds scatter from the cursor; at night the lanterns glow. */
export default function Footer() {
  const { done, copy } = useCopy(EMAIL);
  const sceneRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = sceneRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    setCursor({ x: ((e.clientX - r.left) / r.width) * 1440, y: ((e.clientY - r.top) / r.height) * 480 });
  };

  return (
    <footer className="footer">
      <div className="footer-hello">
        <p className="brush footer-bye">またね</p>
        <p className="min footer-line">See you around — or say hello.</p>
        <button className={`mail ${done ? "is-done" : ""}`} onClick={copy} aria-label={`Copy email ${EMAIL}`}>
          <span className="mono">{EMAIL}</span>
          <span className="mail-seal brush">{done ? "済" : "写"}</span>
          {done && <span className="mail-stamp brush" aria-hidden>済</span>}
        </button>
        <nav className="footer-links mono" aria-label="Elsewhere">
          {["linkedin", "x / twitter", "read.cv", "dribbble", "resume"].map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </nav>
      </div>

      <svg ref={sceneRef} className="scene" viewBox="0 0 1440 480" preserveAspectRatio="xMidYMax slice" onPointerMove={onMove} onPointerLeave={() => setCursor(null)} aria-hidden>
        <defs>
          <linearGradient id="fj" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--fuji-top)" }} />
            <stop offset="0.55" style={{ stopColor: "var(--fuji-mid)" }} />
            <stop offset="1" style={{ stopColor: "var(--paper)", stopOpacity: 0 }} />
          </linearGradient>
          <linearGradient id="fj2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--ink3)" }} />
            <stop offset="1" style={{ stopColor: "var(--paper)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <circle cx="1110" cy="110" r="46" className="sun" />
        <path d="M0 340 L160 250 L300 320 L470 230 L620 330 Z" fill="url(#fj2)" opacity="0.7" />
        <path d="M900 330 L1080 240 L1220 300 L1440 220 V340 Z" fill="url(#fj2)" opacity="0.7" />
        <path d="M360 420 L640 150 Q690 122 740 150 L1080 420 Z" fill="url(#fj)" />
        <path d="M640 150 Q690 122 740 150 L770 178 L748 186 L728 170 L708 190 L690 174 L672 190 L652 170 L632 186 L610 180 Z" className="snow" />
        <ellipse cx="560" cy="300" rx="220" ry="16" className="mist" />
        <ellipse cx="900" cy="330" rx="260" ry="18" className="mist mist-2" />
        <g className="birds">
          {BIRDS.map(([bx, by], i) => {
            let dx = 0;
            let dy = 0;
            if (cursor) {
              const d = Math.hypot(bx - cursor.x, by - cursor.y);
              if (d < 160) {
                const f = (160 - d) / 160;
                dx = ((bx - cursor.x) / (d || 1)) * 120 * f;
                dy = -80 * f - 20;
              }
            }
            return <path key={i} d={`M${bx} ${by} q6 -7 12 0 q6 -7 12 0`} className="bird s-ink" strokeWidth="1.6" fill="none" strokeLinecap="round" style={{ transform: `translate(${dx}px, ${dy}px)` }} />;
          })}
        </g>
        <g className="fireflies">
          {FLIES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" style={{ animationDelay: `${(i * 370) % 2000}ms` }} />
          ))}
        </g>
        <rect x="296" y="290" width="5" height="190" className="street" />
        <rect x="1298" y="290" width="5" height="190" className="street" />
        <path d="M300 300 Q800 380 1300 300" className="s-ink" fill="none" />
        <g className="lantern-string">
          {LANTERNS.map((l, i) => (
            <g key={i} style={{ transformOrigin: `${l.x}px ${l.y}px`, animationDelay: `${i * 140}ms` }}>
              <line x1={l.x} y1={l.y} x2={l.x} y2={l.y + 6} className="s-ink" />
              <rect x={l.x - 9} y={l.y + 6} width="18" height="4" className="f-ink" />
              <path d={`M${l.x - 9} ${l.y + 10} C${l.x - 15} ${l.y + 16} ${l.x - 15} ${l.y + 30} ${l.x - 9} ${l.y + 36} H${l.x + 9} C${l.x + 15} ${l.y + 30} ${l.x + 15} ${l.y + 16} ${l.x + 9} ${l.y + 10} Z`} className="lamp s-ink" />
              <rect x={l.x - 9} y={l.y + 36} width="18" height="3" className="f-ink" />
              <path d={`M${l.x} ${l.y + 39} V${l.y + 48}`} stroke="#B8322A" strokeWidth="2" />
            </g>
          ))}
        </g>
        <g className="houses">
          {HOUSES.map((h) => {
            const top = 480 - h.h;
            return (
              <g key={h.x}>
                <rect x={h.x} y={top} width={h.w} height={h.h} className="street" />
                <path d={`M${h.x - 8} ${top + 2} Q${h.x + h.w / 2} ${top - 4} ${h.x + h.w + 8} ${top + 2} L${h.x + h.w - 8} ${top - 15} L${h.x + 8} ${top - 15} Z`} className="street" />
                {h.win.map((wx) => (
                  <rect key={wx} x={h.x + wx} y={top + 12} width="10" height="12" className="window" />
                ))}
              </g>
            );
          })}
        </g>
        <path d="M110 376 Q185 364 260 376 L256 390 H114 Z" className="street" />
        <rect x="128" y="404" width="114" height="8" className="street" />
        <rect x="142" y="386" width="10" height="94" className="street" />
        <rect x="218" y="386" width="10" height="94" className="street" />
      </svg>

      <div className="footer-bar">
        <span className="mono">© 2026 Sanskriti</span>
        <span className="min">designed in Figma · vibe-coded with Claude · 静かに</span>
      </div>
    </footer>
  );
}
