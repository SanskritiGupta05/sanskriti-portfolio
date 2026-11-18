"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { BELT_H, MENU, NOREN, SURFACE, beltSvg } from "./art";
import { Branch, FallingPetals, HANG_X, HANG_Y, Lantern, Shoji, Ticks } from "./Decor";

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

const toUrl = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

// one of the SVG drawings from art.ts, shown as an image
function Art({ svg, w, h, className = "" }: { svg: string; w: number; h: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={toUrl(svg)} alt="" width={w} height={h} draggable={false} className={className} />;
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

  // one shared clock moves the plates and the slats together; hovering eases it to a stop
  const offset = useMotionValue(0);
  const speed = useRef(SPEED);
  const hovered = useRef(false);
  useAnimationFrame((_, delta) => {
    if (still) return;
    const target = hovered.current ? 0 : SPEED;
    speed.current += (target - speed.current) * Math.min(1, delta / 250);
    offset.set((offset.get() + (speed.current * delta) / 1000) % (STEP * MENU.length));
  });
  const trackX = useTransform(offset, (o) => o - STEP * MENU.length);
  const slatX = useTransform(offset, (o) => `${o % SLAT}px 0`);
  // the round ends turn as the belt runs: arc length / radius, in degrees
  const turn = useTransform(offset, (o) => -((o / (SURFACE.h / 2)) * 180) / Math.PI);
  const surfaceBottom = BELT_H - SURFACE.top - SURFACE.h; // from the container's bottom

  const plates = [...MENU, ...MENU, ...MENU];
  const slats = `repeating-linear-gradient(90deg, transparent 0 ${SLAT - 3}px, ${SLAT_INK} ${SLAT - 3}px ${SLAT}px)`;

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
          <Shoji className="absolute top-[214px] left-0 w-[66px]" />
          <Branch className="absolute top-10 -left-[42px] w-[330px]" />
          <div className="absolute" style={{ left: HANG_X * (330 / 270) - 32 - 42, top: 40 + (HANG_Y - 4) * (330 / 270) }}>
            <Lantern className="w-[64px]" delay={right ? 1.4 : 0} />
          </div>
        </div>
      ))}

      {/* petals drifting down from both branches, fading before the counter */}
      <FallingPetals className="absolute inset-x-0 top-0 hidden h-[440px] overflow-hidden md:block" />

      {/* the noren over the counter, the line, and the note */}
      <div className="relative grid justify-items-center gap-5 text-center">
        <Art svg={NOREN} w={220} h={76} />
        <h2 className="font-serif text-h2m italic text-head md:text-h2">One last roll before you go?</h2>
        <p className="printed">Thanks for stopping by. Hope you found something you liked. ♡</p>
      </div>

      {/* the belt */}
      <div
        ref={box}
        className="relative mt-2 overflow-hidden"
        style={{ height: BELT_H + 70 }}
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
        <div className="absolute inset-x-0 overflow-hidden" style={{ bottom: BELT_H - 60, height: PLATE_H + 50 }}>
          <motion.ul className="absolute bottom-0 left-0 flex" style={{ x: trackX, gap: GAP }}>
            {plates.map((m, i) => (
              <motion.li
                key={i}
                className="relative shrink-0"
                style={{ width: PLATE_W, height: PLATE_H }}
                whileHover={still ? undefined : { y: -10, rotate: [0, -4, 3, 0], transition: { duration: 0.45 } }}
                title={m.name}
              >
                <Art svg={m.svg} w={PLATE_W} h={PLATE_H} />
                {/* little "tasty!" strokes over every third plate */}
                {i % 3 === 1 && <Ticks className="absolute -top-3 left-3 w-7" delay={(i % 6) * 0.3} />}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

    </footer>
  );
}
