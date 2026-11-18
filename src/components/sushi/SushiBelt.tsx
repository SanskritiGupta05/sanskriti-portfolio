"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { BELT_H, MENU, NOREN, SURFACE, beltSvg } from "./art";
import { Branch, FallingPetals, HANG_X, HANG_Y, Lantern, Shoji } from "./Decor";

// Sushi conveyor footer, in smooth vector art.
// Plates ride the belt to the right forever; hovering the belt slows it to a stop.
const PLATE_W = 132; // shown size of one plate drawing (120×80 art)
const PLATE_H = 88;
const GAP = 22;
const STEP = PLATE_W + GAP;
const SPEED = 34; // px per second
const SLAT = 26; // belt slat spacing
const SLAT_INK = "rgba(30,15,10,0.35)";
// the belt runs on past both sides of the column and is cut off at its edges, as if it keeps going
const EXT = 64;

// encode each drawing once and reuse it (re-encoding the big SVG strings on every render was slow)
const urls = new Map<string, string>();
const toUrl = (svg: string) => {
  let u = urls.get(svg);
  if (!u) urls.set(svg, (u = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`));
  return u;
};

// one of the SVG drawings from art.ts, shown as an image
function Art({ svg, w, h, className = "" }: { svg: string; w: number; h: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={toUrl(svg)} alt="" width={w} height={h} draggable={false} decoding="async" className={className} />;
}

// Chopsticks reach in from the nearer side at a low angle, pinch the sushi, lift it a little
// and carry it back out the same side, vanishing at the edge of the column.
type Side = "left" | "right";
const PICK = { duration: 2, times: [0, 0.3, 0.42, 0.55, 1] };
const AWAY = 760; // far enough to be past the column edge from anywhere on the belt
const SUSHI_AT = { x: 66, y: 44 }; // the sushi's centre inside a plate
const TIP = { x: 19, y: 82 }; // where the chopstick tips meet, inside their drawing
const CHOP_W = 300;
const CHOP_H = 90;

function PickUp({ svg, side, onDone }: { svg: string; side: Side; onDone: () => void }) {
  const dir = side === "right" ? 1 : -1;
  const lift = { x: [0, 0, 0, 0, dir * AWAY], y: [0, 0, 0, -26, -44] };
  const ease = [[0.2, 0.7, 0.3, 1], "linear", [0.4, 0, 0.6, 1], [0.5, 0, 0.8, 0.6]] as const;
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute inset-0"
        animate={lift}
        transition={{ duration: PICK.duration, times: PICK.times, ease: ease as never }}
        onAnimationComplete={onDone}
      >
        <Art svg={svg} w={PLATE_W} h={PLATE_H} className="absolute inset-0" />
      </motion.div>
      <motion.div
        className="absolute"
        style={{
          width: CHOP_W,
          height: CHOP_H,
          top: SUSHI_AT.y - TIP.y,
          left: side === "right" ? SUSHI_AT.x - TIP.x : SUSHI_AT.x - (CHOP_W - TIP.x),
          scaleX: dir,
        }}
        initial={{ x: dir * AWAY }}
        animate={{ x: [dir * AWAY, 0, 0, 0, dir * AWAY], y: lift.y }}
        transition={{ duration: PICK.duration, times: PICK.times, ease: ease as never }}
      >
        <Chopsticks />
      </motion.div>
    </div>
  );
}

// a pair of wooden chopsticks lying low from the right, their tips meeting at the sushi
function stick(x1: number, y1: number, x2: number, y2: number, w1: number, w2: number) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const nx = -(y2 - y1) / len, ny = (x2 - x1) / len;
  const p = (x: number, y: number, w: number, s: number) => `${(x + nx * w * s).toFixed(1)} ${(y + ny * w * s).toFixed(1)}`;
  return `M${p(x1, y1, w1 / 2, 1)} L${p(x2, y2, w2 / 2, 1)} L${p(x2, y2, w2 / 2, -1)} L${p(x1, y1, w1 / 2, -1)}Z`;
}
const along = (x1: number, y1: number, x2: number, y2: number, t: number) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t] as const;
function Chopsticks() {
  const lower = [298, 30, 24, 86] as const; // [from x, from y, tip x, tip y]
  const upper = [296, 6, 14, 78] as const;
  const tipBand = (s: readonly [number, number, number, number]) => {
    const [mx, my] = along(s[0], s[1], s[2], s[3], 0.78);
    return stick(mx, my, s[2], s[3], 3, 2.2);
  };
  return (
    <svg viewBox={`0 0 ${CHOP_W} ${CHOP_H}`} className="size-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="chop-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6c592" />
          <stop offset="0.5" stopColor="#c9975c" />
          <stop offset="1" stopColor="#9c6b37" />
        </linearGradient>
      </defs>
      <path d={stick(...lower, 6.5, 2.4)} fill="url(#chop-wood)" />
      <path d={tipBand(lower)} fill="#6e4423" opacity="0.85" />
      {/* the upper stick closes down onto the lower one to pinch */}
      <motion.g animate={{ y: [-6, -6, 0, 0, 0] }} transition={{ duration: PICK.duration, times: PICK.times }}>
        <path d={stick(...upper, 6.5, 2.4)} fill="url(#chop-wood)" />
        <path d={tipBand(upper)} fill="#6e4423" opacity="0.85" />
        <path d={stick(upper[0], upper[1] - 1.4, upper[2] + 6, upper[3] - 1.2, 1.2, 0.4)} fill="#f6e2bf" opacity="0.6" />
      </motion.g>
    </svg>
  );
}

export function SushiBelt() {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const onScreen = useInView(box, { margin: "200px 0px" });
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

  // one shared clock moves the plates and the slats together; hovering eases it to a stop
  const offset = useMotionValue(0);
  const speed = useRef(SPEED);
  const hovered = useRef(false);
  // the track jumps back one menu-length each time it wraps; counting the wraps lets every
  // plate keep its identity (plate id = slot − 6 × wraps), so an eaten plate stays empty
  // until it rides off the edge, and plates coming in are always full
  const [wraps, setWraps] = useState(0);
  useAnimationFrame((_, delta) => {
    if (still || !onScreen) return; // nothing moves while the footer is off screen
    const target = hovered.current ? 0 : SPEED;
    speed.current += (target - speed.current) * Math.min(1, delta / 250);
    const next = offset.get() + (speed.current * delta) / 1000;
    const loop = STEP * MENU.length;
    if (next >= loop) {
      offset.set(next - loop);
      setWraps((w) => w + 1);
    } else offset.set(next);
  });
  const [eaten, setEaten] = useState<Set<number>>(() => new Set());
  const [picking, setPicking] = useState<Map<number, Side>>(() => new Map());
  const pick = (id: number, side: Side) => {
    if (still) return setEaten((e) => new Set(e).add(id));
    setPicking((p) => new Map(p).set(id, side));
  };
  const done = (id: number) => {
    setEaten((e) => new Set(e).add(id));
    setPicking((p) => {
      const n = new Map(p);
      n.delete(id);
      return n;
    });
  };
  const trackX = useTransform(offset, (o) => o - STEP * MENU.length);
  const slatX = useTransform(offset, (o) => `${o % SLAT}px 0`);
  // the round ends turn as the belt runs: arc length / radius, in degrees
  const turn = useTransform(offset, (o) => -((o / (SURFACE.h / 2)) * 180) / Math.PI);
  const surfaceBottom = BELT_H - SURFACE.top - SURFACE.h; // from the container's bottom

  // enough copies of the menu to cover the whole belt, however wide the screen is
  const copies = Math.max(3, Math.ceil((width || 1440) / (STEP * MENU.length)) + 2);
  const plates = Array.from({ length: copies }, () => MENU).flat();
  const slats = `repeating-linear-gradient(90deg, transparent 0 ${SLAT - 3}px, ${SLAT_INK} ${SLAT - 3}px ${SLAT}px)`;

  return (
    <footer className="relative ml-[50%] w-screen -translate-x-1/2 overflow-x-clip pt-20">
      {/* (the footer runs the full width of the screen, edge to edge, not just the column) */}
      {/* scenery: a cherry branch in each top corner with a lantern hanging from it,
          and a shoji window down each side, standing on the belt (mirrored on the right) */}
      {[false, true].map((right) => (
        <div
          key={String(right)}
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 hidden h-full w-[380px] overflow-hidden md:block ${right ? "right-0 -scale-x-100" : "left-0"}`}
        >
          <Shoji className="absolute top-[252px] left-0 w-[84px]" />
          <Branch className="absolute top-[150px] left-0 w-[380px]" />
          <div className="absolute" style={{ left: HANG_X * (380 / 270) - 34, top: 150 + (HANG_Y - 4) * (380 / 270) }}>
            <Lantern className="w-[68px]" delay={right ? 1.4 : 0} />
          </div>
        </div>
      ))}

      {/* petals drifting down from both branches, fading before the counter */}
      <FallingPetals active={onScreen} className="absolute inset-0 hidden overflow-hidden md:block" />

      {/* the noren over the counter */}
      <div className="relative mt-[180px] grid justify-items-center">
        <Art svg={NOREN} w={220} h={76} />
      </div>

      {/* the belt */}
      <div
        ref={box}
        className="relative -mt-3"
        style={{ height: BELT_H + 70, clipPath: "inset(-400px 0 0 0)" }}
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
      >
        {width > 0 && (
          <>
            <div className="absolute bottom-0" style={{ left: -EXT, width: width + 2 * EXT }}>
              <Art svg={beltSvg(width + 2 * EXT)} w={width + 2 * EXT} h={BELT_H} className="block" />
            </div>
            {/* the moving slats on the straight run */}
            <motion.div
              aria-hidden="true"
              className="absolute"
              style={{
                left: SURFACE.inset + SURFACE.h / 2 - EXT,
                right: SURFACE.inset + SURFACE.h / 2 - EXT,
                bottom: surfaceBottom,
                height: SURFACE.h,
                backgroundImage: slats,
                backgroundPosition: slatX,
              }}
            />
            {/* the round ends: half-discs of slats that turn with the belt, so it reads as one loop */}
            {(["left", "right"] as const).map((side) => (
              <div
                key={side}
                aria-hidden="true"
                className="absolute"
                style={{
                  [side]: SURFACE.inset - EXT,
                  bottom: surfaceBottom,
                  width: SURFACE.h,
                  height: SURFACE.h,
                  clipPath: side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
                }}
              >
                <motion.div
                  className="size-full rounded-full"
                  style={{
                    rotate: turn,
                    backgroundImage: `repeating-conic-gradient(${SLAT_INK} 0deg 5deg, transparent 5deg ${(SLAT / (SURFACE.h / 2)) * (180 / Math.PI)}deg)`,
                  }}
                />
                <div className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7a2c1d]" />
              </div>
            ))}
          </>
        )}
        {/* plates ride along the top of the belt and slide out of sight at the column edges */}
        <div className="absolute inset-x-0" style={{ bottom: BELT_H - 60, height: PLATE_H + 50, clipPath: "inset(-400px 0 0 0)" }}>
          <motion.ul className="absolute bottom-0 left-0 flex will-change-transform" style={{ x: trackX, gap: GAP }}>
            {plates.map((m, i) => {
              const id = i - MENU.length * wraps;
              const gone = eaten.has(id);
              const lifting = picking.get(id);
              return (
                <motion.li
                  key={i}
                  className="relative shrink-0"
                  style={{ width: PLATE_W, height: PLATE_H }}
                  whileHover={still || gone || lifting ? undefined : { y: -10, rotate: [0, -4, 3, 0], transition: { duration: 0.45 } }}
                  title={gone ? undefined : m.name}
                >
                  <Art svg={m.plateSvg} w={PLATE_W} h={PLATE_H} className="absolute inset-0" />
                  {lifting ? (
                    <PickUp svg={m.sushiSvg} side={lifting} onDone={() => done(id)} />
                  ) : (
                    !gone && (
                      <button type="button" aria-label={`Pick up the ${m.name}`} onClick={(e) => {
                          // the chopsticks come from whichever side of the belt the plate is nearer
                          const r = e.currentTarget.getBoundingClientRect();
                          const b = box.current?.getBoundingClientRect();
                          pick(id, b && r.left + r.width / 2 < b.left + b.width / 2 ? "left" : "right");
                        }} className="absolute inset-0 cursor-pointer">
                        <Art svg={m.sushiSvg} w={PLATE_W} h={PLATE_H} className="absolute inset-0" />
                      </button>
                    )
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>

    </footer>
  );
}
