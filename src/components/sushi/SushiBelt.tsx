"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { BELT_H, MENU, NOREN, beltSvg } from "./art";

// Sushi conveyor footer. The same drawings render two ways:
//  - "smooth": crisp vector art
//  - "pixel": drawn small on a canvas, hard-edged, then scaled up (chunky but readable pixels)
// Plates ride the belt to the right forever; hovering the belt slows it to a stop.
type Look = "smooth" | "pixel";

const PLATE_W = 132; // shown size of one plate drawing (120×80 art)
const PLATE_H = 88;
const GAP = 22;
const STEP = PLATE_W + GAP;
const SPEED = 34; // px per second
const SLAT = 26; // belt slat spacing

const toUrl = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

// Draw an SVG small on a canvas with hard edges, shown at full size with pixelated scaling.
function Art({ svg, w, h, look, px = 2.6, className = "" }: { svg: string; w: number; h: number; look: Look; px?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (look !== "pixel") return;
    const c = ref.current;
    if (!c) return;
    const cw = Math.max(1, Math.round(w / px));
    const ch = Math.max(1, Math.round(h / px));
    c.width = cw;
    c.height = ch;
    const img = new Image();
    img.onload = () => {
      const g = c.getContext("2d");
      if (!g) return;
      g.clearRect(0, 0, cw, ch);
      g.imageSmoothingEnabled = true;
      g.drawImage(img, 0, 0, cw, ch);
      // hard edges: every pixel is either fully there or not at all
      const d = g.getImageData(0, 0, cw, ch);
      for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] > 100 ? 255 : 0;
      g.putImageData(d, 0, 0);
    };
    img.src = toUrl(svg);
  }, [svg, w, h, look, px]);

  if (look === "smooth") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={toUrl(svg)} alt="" width={w} height={h} draggable={false} className={className} />;
  }
  return <canvas ref={ref} aria-hidden="true" style={{ width: w, height: h }} className={`[image-rendering:pixelated] ${className}`} />;
}

export function SushiBelt({ look }: { look: Look }) {
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

  const plates = [...MENU, ...MENU, ...MENU];
  const slats =
    look === "pixel"
      ? `repeating-linear-gradient(90deg, transparent 0 ${SLAT - 4}px, #48302a ${SLAT - 4}px ${SLAT}px)`
      : `repeating-linear-gradient(90deg, transparent 0 ${SLAT - 3}px, rgba(30,15,10,0.35) ${SLAT - 3}px ${SLAT}px)`;

  return (
    <footer className="pt-20 pb-10">
      {/* the noren over the counter, the line, and the note */}
      <div className="grid justify-items-center gap-5 text-center">
        <Art svg={NOREN} w={220} h={76} look={look} px={2.4} />
        <h2 className="font-serif text-h2m italic text-head md:text-h2">One last roll before you go?</h2>
        <p className="printed">Thanks for stopping by. Hope you found something you liked. ♡</p>
      </div>

      {/* the belt */}
      <div
        ref={box}
        className="relative mt-2"
        style={{ height: BELT_H + 70 }}
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
      >
        {width > 0 && (
          <>
            <div className="absolute inset-x-0 bottom-0">
              <Art svg={beltSvg(width)} w={width} h={BELT_H} look={look} px={2.6} className="block" />
            </div>
            {/* the moving slats, inside the belt's dark surface */}
            <motion.div
              aria-hidden="true"
              className="absolute rounded-[22px]"
              style={{ left: 22, right: 22, bottom: BELT_H - 68, height: 36, backgroundImage: slats, backgroundPosition: slatX }}
            />
          </>
        )}
        {/* plates ride along the top of the belt, fading out at both ends */}
        <div className="absolute inset-x-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]" style={{ bottom: BELT_H - 66, height: PLATE_H + 50 }}>
          <motion.ul className="absolute bottom-0 left-0 flex" style={{ x: trackX, gap: GAP }}>
            {plates.map((m, i) => (
              <motion.li
                key={i}
                className="shrink-0"
                style={{ width: PLATE_W, height: PLATE_H }}
                whileHover={still ? undefined : { y: -10, rotate: [0, -4, 3, 0], transition: { duration: 0.45 } }}
                title={m.name}
              >
                <Art svg={m.svg} w={PLATE_W} h={PLATE_H} look={look} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* closing line */}
      <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <span className="h-px bg-[#efc9bd]" />
        <span aria-hidden="true" className="text-[#e58f86]">✿</span>
        <span className="h-px bg-[#efc9bd]" />
      </div>
      <div className="mt-4 flex justify-end">
        <a href="#" className="label !text-ink underline-offset-4 hover:underline">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
