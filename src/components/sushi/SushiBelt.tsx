"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { BELT_H, MENU, NOREN, TRACK, beltSvg } from "./art";
import { Branch, HANG_X, HANG_Y, Lantern, Shoji, Ticks } from "./Decor";

// Sushi conveyor footer, in smooth vector art.
// The belt is a loop seen from a little above. Plates come round the left corner towards you,
// ride the straight run to the right, then turn the right corner and slip away round the back.
// Hovering the belt slows it to a stop.
const PLATE_W = 132; // shown size of one plate drawing (120×80 art, plate centred at 60,62)
const PLATE_H = 88;
const PLATE_CX = 66;
const PLATE_CY = 68;
const STEP = 154; // distance between plates along the belt
const SPEED = 34; // px per second
const SLAT = 26; // slat spacing
const SLAT_INK = "rgba(30,15,10,0.35)";
const HEAD = 70; // room above the belt for the sushi

const toUrl = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

// one of the SVG drawings from art.ts, shown as an image
function Art({ svg, w, h, className = "" }: { svg: string; w: number; h: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={toUrl(svg)} alt="" width={w} height={h} draggable={false} className={className} />;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// the path the plates follow, for a belt of width W
function geometry(W: number) {
  const { side, r, bottom, lane } = TRACK;
  const rc = r - lane; // radius of the plates' path round each corner
  const cxL = side + r;
  const cxR = W - side - r;
  const cy = HEAD + bottom - r; // corner centres
  const arc = (rc * Math.PI) / 2;
  const straight = cxR - cxL;
  // a whole number of menus, so the same sushi never sits next to itself
  const count = MENU.length * Math.max(1, Math.ceil((2 * arc + straight + 60) / (STEP * MENU.length)));
  const loop = count * STEP; // the rest of the loop runs hidden, round the back
  // where a plate is, and how present it looks, at distance d along the loop
  const at = (d: number) => {
    if (d < arc) {
      const t = d / arc; // coming round the left corner towards you
      const a = Math.PI - (t * Math.PI) / 2;
      return { x: cxL + rc * Math.cos(a), y: cy + rc * Math.sin(a), o: smooth(0, 0.55, t), s: 0.8 + 0.2 * t };
    }
    if (d < arc + straight) return { x: cxL + (d - arc), y: cy + rc, o: 1, s: 1 };
    if (d < 2 * arc + straight) {
      const t = (d - arc - straight) / arc; // turning the right corner, away from you
      const a = Math.PI / 2 - (t * Math.PI) / 2;
      return { x: cxR + rc * Math.cos(a), y: cy + rc * Math.sin(a), o: 1 - smooth(0.45, 1, t), s: 1 - 0.2 * t };
    }
    return { x: cxL, y: cy, o: 0, s: 0.8 }; // round the back, out of sight
  };
  return { rc, cxL, cxR, cy, count, loop, at };
}

function Plate({ i, offset, g, still }: { i: number; offset: MotionValue<number>; g: ReturnType<typeof geometry>; still: boolean | null }) {
  const m = MENU[i % MENU.length];
  const pos = (o: number) => g.at((((o + (g.count - 1 - i) * STEP) % g.loop) + g.loop) % g.loop);
  const x = useTransform(offset, (o) => pos(o).x - PLATE_CX);
  const y = useTransform(offset, (o) => pos(o).y - PLATE_CY);
  const opacity = useTransform(offset, (o) => pos(o).o);
  const scale = useTransform(offset, (o) => pos(o).s);
  return (
    <motion.li className="absolute top-0 left-0" style={{ x, y, opacity, scale, width: PLATE_W, height: PLATE_H }} title={m.name}>
      <motion.div className="relative size-full" whileHover={still ? undefined : { y: -10, rotate: [0, -4, 3, 0], transition: { duration: 0.45 } }}>
        <Art svg={m.svg} w={PLATE_W} h={PLATE_H} />
        {/* little "tasty!" strokes over every third plate */}
        {i % 3 === 1 && <Ticks className="absolute -top-3 left-3 w-7" delay={(i % 6) * 0.3} />}
      </motion.div>
    </motion.li>
  );
}

export function SushiBelt() {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const still = useReducedMotion();

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setWidth(el.clientWidth);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // one shared clock moves the plates, the slats and the corners together; hovering eases it to a stop
  const offset = useMotionValue(0);
  const speed = useRef(SPEED);
  const hovered = useRef(false);
  useAnimationFrame((_, delta) => {
    if (still) return;
    const target = hovered.current ? 0 : SPEED;
    speed.current += (target - speed.current) * Math.min(1, delta / 250);
    offset.set(offset.get() + (speed.current * delta) / 1000);
  });

  const g = geometry(width || 826);
  const slatX = useTransform(offset, (o) => `${o % SLAT}px 0`);
  // the corner seams turn as the belt runs round them: distance / radius
  const turn = useTransform(offset, (o) => -((o / g.rc) * 180) / Math.PI);
  const slats = `repeating-linear-gradient(90deg, transparent 0 ${SLAT - 3}px, ${SLAT_INK} ${SLAT - 3}px ${SLAT}px)`;
  const seamStep = ((SLAT / g.rc) * 180) / Math.PI;

  return (
    <footer className="relative pt-20 pb-10">
      {/* scenery: a cherry branch in each top corner with a lantern hanging from it,
          and a shoji window down each side, standing on the belt (mirrored on the right) */}
      {[false, true].map((right) => (
        <div
          key={String(right)}
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 hidden h-full w-[330px] overflow-hidden md:block ${right ? "right-0 -scale-x-100" : "left-0"}`}
        >
          <Shoji className="absolute top-[206px] left-0 w-[66px]" />
          <Branch className="absolute top-10 -left-[22px] w-[330px]" />
          <div className="absolute" style={{ left: HANG_X * (330 / 270) - 32 - 22, top: 40 + (HANG_Y - 4) * (330 / 270) }}>
            <Lantern className="w-[64px]" delay={right ? 1.4 : 0} />
          </div>
        </div>
      ))}

      {/* the noren over the counter, the line, and the note */}
      <div className="relative grid justify-items-center gap-5 text-center">
        <Art svg={NOREN} w={220} h={76} />
        <h2 className="font-serif text-h2m italic text-head md:text-h2">One last roll before you go?</h2>
        <p className="printed">Thanks for stopping by. Hope you found something you liked. ♡</p>
      </div>

      {/* the belt */}
      <div
        ref={box}
        className="relative mt-2"
        style={{ height: BELT_H + HEAD }}
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
      >
        {width > 0 && (
          <>
            <div className="absolute inset-x-0" style={{ top: HEAD }}>
              <Art svg={beltSvg(width)} w={width} h={BELT_H} className="block" />
            </div>
            {/* the moving slats on the straight run */}
            <motion.div
              aria-hidden="true"
              className="absolute"
              style={{
                left: g.cxL,
                width: g.cxR - g.cxL,
                top: HEAD + TRACK.top - 4,
                height: TRACK.bottom - TRACK.top + 4,
                backgroundImage: slats,
                backgroundPosition: slatX,
              }}
            />
            {/* the corners: seams fanning round each curve, turning with the belt */}
            {(["left", "right"] as const).map((side) => {
              const cx = side === "left" ? g.cxL : g.cxR;
              return (
                <div
                  key={side}
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    left: cx - TRACK.r,
                    top: g.cy - TRACK.r,
                    width: TRACK.r * 2,
                    height: TRACK.r * 2,
                    clipPath: side === "left" ? "inset(50% 50% 0 0 round 0 0 0 999px)" : "inset(50% 0 0 50% round 0 0 999px 0)",
                  }}
                >
                  <motion.div
                    className="size-full rounded-full"
                    style={{ rotate: turn, backgroundImage: `repeating-conic-gradient(${SLAT_INK} 0deg 2.2deg, transparent 2.2deg ${seamStep}deg)` }}
                  />
                </div>
              );
            })}
            {/* the plates, following the loop */}
            <ul className="absolute inset-0">
              {Array.from({ length: g.count }, (_, i) => (
                <Plate key={`${i}-${g.count}`} i={i} offset={offset} g={g} still={still} />
              ))}
            </ul>
          </>
        )}
      </div>
    </footer>
  );
}
