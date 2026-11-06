"use client";

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EMAIL } from "@/lib/content";
import { rooftops } from "@/lib/draw";
import { useCopy, useTheme } from "@/lib/hooks";

const HOUSES = rooftops();
const PERCHED: [number, number][] = [[520, 344], [548, 348], [760, 350], [790, 347], [1040, 333]];
const LANTERNS = Array.from({ length: 9 }, (_, i) => {
  const t = (i + 1) / 10;
  return { x: 300 + t * 1000, y: 300 + (1 - (2 * t - 1) ** 2) * 40 };
});
const FLIES: [number, number][] = [[300, 160], [420, 90], [520, 200], [880, 120], [960, 60], [1040, 170], [1200, 110], [1260, 210], [180, 100], [640, 230], [760, 150]];

const SOFT = { stiffness: 90, damping: 20, mass: 0.6 };

/** One parallax depth layer: moves opposite the cursor, on a spring (no re-render per mouse move). */
function useLayer(px: MotionValue<number>, py: MotionValue<number>, depth: number) {
  const x = useTransform(px, (v) => -v * depth);
  const y = useTransform(py, (v) => -v * depth * 0.4);
  return { x, y };
}

/** A small bird on the wire; flees from the cursor and flaps while it's up. */
function Bird({ bx, by, mx, my }: { bx: number; by: number; mx: MotionValue<number>; my: MotionValue<number> }) {
  const dist = useTransform([mx, my], ([x, y]: number[]) => Math.hypot(bx - x, by - y));
  const rawX = useTransform([mx, my], ([x, y]: number[]) => {
    const d = Math.hypot(bx - x, by - y);
    return d < 170 ? ((bx - x) / (d || 1)) * 160 * ((170 - d) / 170) : 0;
  });
  const rawY = useTransform(dist, (d) => (d < 170 ? -140 * ((170 - d) / 170) - 30 : 0));
  const x = useSpring(rawX, { stiffness: 140, damping: 16 });
  const y = useSpring(rawY, { stiffness: 140, damping: 16 });
  const [flying, setFlying] = useState(false);
  useMotionValueEvent(dist, "change", (d) => {
    if (d < 170 !== flying) setFlying(d < 170);
  });
  return (
    <motion.g className="bird" style={{ x, y }}>
      {flying ? (
        <path d={`M${bx - 10} ${by - 6} q5 -7 10 0 q5 -7 10 0`} className="s-ink wing" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      ) : (
        <g>
          <ellipse cx={bx} cy={by - 5} rx="6" ry="4.5" className="f-ink" />
          <circle cx={bx + 5} cy={by - 9} r="3" className="f-ink" />
          <path d={`M${bx + 8} ${by - 9} l3 1 l-3 1`} fill="#C3352B" />
          <path d={`M${bx - 6} ${by - 4} l-6 2`} className="s-ink" strokeWidth="2" />
        </g>
      )}
    </motion.g>
  );
}

/**
 * Ink-wash street at the foot of Fuji.
 *  - the whole scene parallaxes with the cursor (four depth layers)
 *  - hover a lantern to light it, click the string to light them all in a wave
 *  - hover a house and its windows switch on
 *  - birds sit on the wire and scatter when the cursor gets close; a flock crosses the sky
 *  - click the sun to set it (day → night); at night a shooting star crosses now and then
 */
export default function Footer() {
  const { done, copy } = useCopy(EMAIL);
  const { theme, toggle } = useTheme();
  const sceneRef = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  // cursor in scene units (far away = birds sit still); parallax springs follow it
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const px = useSpring(nx, SOFT);
  const py = useSpring(ny, SOFT);
  const l4 = useLayer(px, py, 4);
  const l8 = useLayer(px, py, 8);
  const l14 = useLayer(px, py, 14);
  const l18 = useLayer(px, py, 18);
  const l22 = useLayer(px, py, 22);
  const l30 = useLayer(px, py, 30);
  const [lit, setLit] = useState<Set<number>>(new Set());
  const [wave, setWave] = useState(0);
  const [houseOn, setHouseOn] = useState<number | null>(null);
  const [setting, setSetting] = useState(false);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = sceneRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 1440;
    const y = ((e.clientY - r.top) / r.height) * 480;
    mx.set(x);
    my.set(y);
    if (reduce) return;
    nx.set((x / 1440 - 0.5) * 2);
    ny.set((y / 480 - 0.5) * 2);
  };

  const lightAll = () => {
    setWave((w) => w + 1);
    LANTERNS.forEach((_, i) => window.setTimeout(() => setLit((s) => new Set(s).add(i)), i * 110));
    window.setTimeout(() => setLit(new Set()), LANTERNS.length * 110 + 2600);
  };

  const clickSun = () => {
    setSetting(true);
    window.setTimeout(toggle, 700);
    window.setTimeout(() => setSetting(false), 1400);
  };

  useEffect(() => setLit(new Set()), [theme]);

  const leave = () => {
    mx.set(-9999);
    my.set(-9999);
    nx.set(0);
    ny.set(0);
  };

  return (
    <footer className="footer">
      <div className="footer-hello">
        <p className="brush footer-bye">またね</p>
        <p className="min footer-line">See you around — or say hello.</p>
        <button className={`mail ${done ? "is-done" : ""}`} onClick={copy} aria-label={`Copy email ${EMAIL}`}>
          <span>Email me</span>
          <span className="mail-seal brush">{done ? "済" : "写"}</span>
          {done && (
            <span className="mail-stamp brush" aria-hidden>
              済
            </span>
          )}
        </button>
        <p className="hand footer-hint" aria-hidden>
          psst — move around the street · light the lanterns · click the {theme === "night" ? "moon" : "sun"}
        </p>
      </div>

      <svg
        ref={sceneRef}
        className={`scene ${setting ? "is-setting" : ""}`}
        viewBox="0 0 1440 480"
        preserveAspectRatio="xMidYMax slice"
        onPointerMove={onMove}
        onPointerLeave={leave}
        role="img"
        aria-label="An ink-wash street at the foot of Mount Fuji"
      >
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
          <radialGradient id="ffglow">
            <stop offset="0" stopColor="#FFE3A6" stopOpacity="1" />
            <stop offset="0.35" stopColor="#F2C27A" stopOpacity="0.85" />
            <stop offset="1" stopColor="#F2C27A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lampGlow">
            <stop offset="0" stopColor="#FFD58A" stopOpacity="0.9" />
            <stop offset="1" stopColor="#FFD58A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* sky layer */}
        <motion.g style={l4}>
          <g className="sun-wrap" onClick={clickSun} role="button" aria-label={theme === "night" ? "Click the moon for morning" : "Click the sun for night"} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && clickSun()}>
            <circle cx="1110" cy="110" r="70" fill="transparent" />
            <circle cx="1110" cy="110" r="46" className="sun" />
          </g>
          <path className="shooting-star" d="M300 40 L380 70" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <g className="flock">
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M${i * 22} ${(i % 2) * 10} q6 -7 12 0 q6 -7 12 0`} className="s-ink" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            ))}
          </g>
        </motion.g>

        {/* far hills + Fuji */}
        <motion.g style={l8}>
          <g style={{ filter: "url(#sumi-wash)" }}>
            <path d="M-40 340 L160 250 L300 320 L470 230 L620 330 Z" fill="url(#fj2)" opacity="0.7" />
            <path d="M900 330 L1080 240 L1220 300 L1480 220 V340 Z" fill="url(#fj2)" opacity="0.7" />
            <path d="M360 420 L640 150 Q690 122 740 150 L1080 420 Z" fill="url(#fj)" />
          </g>
          <path d="M640 150 Q690 122 740 150 L770 178 L748 186 L728 170 L708 190 L690 174 L672 190 L652 170 L632 186 L610 180 Z" className="snow" style={{ filter: "url(#ink-rough)" }} />
        </motion.g>

        {/* mist */}
        <motion.g style={l14}>
          <ellipse cx="560" cy="300" rx="220" ry="16" className="mist" />
          <ellipse cx="900" cy="330" rx="260" ry="18" className="mist mist-2" />
        </motion.g>

        <motion.g className="fireflies" style={l18}>
          {FLIES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="7" style={{ animationDelay: `${(i * 370) % 2000}ms` }} />
          ))}
        </motion.g>

        {/* street layer */}
        <motion.g style={l22}>
          <rect x="296" y="290" width="5" height="190" className="street" />
          <rect x="1298" y="290" width="5" height="190" className="street" />
          <path d="M300 300 Q800 380 1300 300" className="s-ink" fill="none" />
          <path d="M300 300 Q800 380 1300 300" stroke="transparent" strokeWidth="24" fill="none" className="string-hit" onClick={lightAll} />

          {/* birds perched on the wire — scatter from the cursor */}
          <g className="birds">
            {PERCHED.map(([bx, by], i) => (
              <Bird key={i} bx={bx} by={by} mx={mx} my={my} />
            ))}
          </g>

          <g className="lantern-string" key={wave}>
            {LANTERNS.map((l, i) => {
              const on = lit.has(i);
              return (
                <g
                  key={i}
                  className={`street-lamp ${on ? "is-lit" : ""}`}
                  style={{ transformOrigin: `${l.x}px ${l.y}px`, animationDelay: `${i * 140}ms` }}
                  onPointerEnter={() => setLit((s) => new Set(s).add(i))}
                  onPointerLeave={() =>
                    setLit((s) => {
                      const n = new Set(s);
                      n.delete(i);
                      return n;
                    })
                  }
                >
                  <circle cx={l.x} cy={l.y + 24} r="34" fill="url(#lampGlow)" className="lamp-glow" />
                  <line x1={l.x} y1={l.y} x2={l.x} y2={l.y + 6} className="s-ink" />
                  <rect x={l.x - 9} y={l.y + 6} width="18" height="4" className="f-ink" />
                  <path
                    d={`M${l.x - 9} ${l.y + 10} C${l.x - 15} ${l.y + 16} ${l.x - 15} ${l.y + 30} ${l.x - 9} ${l.y + 36} H${l.x + 9} C${l.x + 15} ${l.y + 30} ${l.x + 15} ${l.y + 16} ${l.x + 9} ${l.y + 10} Z`}
                    className="lamp s-ink"
                  />
                  <rect x={l.x - 9} y={l.y + 36} width="18" height="3" className="f-ink" />
                  <path d={`M${l.x} ${l.y + 39} V${l.y + 48}`} stroke="#C3352B" strokeWidth="2" />
                </g>
              );
            })}
          </g>
        </motion.g>

        {/* houses — nearest layer */}
        <motion.g className="houses" style={l30}>
          {HOUSES.map((h, i) => {
            const top = 480 - h.h;
            const on = houseOn === i;
            return (
              <g key={h.x} onPointerEnter={() => setHouseOn(i)} onPointerLeave={() => setHouseOn(null)} className={`house ${on ? "is-on" : ""}`}>
                <rect x={h.x} y={top} width={h.w} height={h.h} className="street" />
                <path d={`M${h.x - 8} ${top + 2} Q${h.x + h.w / 2} ${top - 4} ${h.x + h.w + 8} ${top + 2} L${h.x + h.w - 8} ${top - 15} L${h.x + 8} ${top - 15} Z`} className="street" />
                {(h.win.length ? h.win : [Math.round(h.w * 0.4)]).map((wx) => (
                  <rect key={wx} x={h.x + wx} y={top + 12} width="10" height="12" className={`window ${h.win.length ? "" : "is-dark"}`} />
                ))}
              </g>
            );
          })}
          <path d="M110 376 Q185 364 260 376 L256 390 H114 Z" className="street" />
          <rect x="128" y="404" width="114" height="8" className="street" />
          <rect x="142" y="386" width="10" height="94" className="street" />
          <rect x="218" y="386" width="10" height="94" className="street" />
        </motion.g>
      </svg>

      <div className="footer-bar">
        <span className="mono">© 2026 Sanskriti</span>
        <span className="min">designed in Figma · vibe-coded with Claude · 静かに</span>
        <span className="mono footer-tm">Product names and logos are trademarks of their owners</span>
      </div>
    </footer>
  );
}
