"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// A loose fan of work visuals under the hero: a back row and a front row of tilted cards,
// kept inside the page column, fading into the page at the bottom.
// Towards the bottom the cards blur progressively as they fade into the page.
// Laid out on a 1000×440 stage that scales down to the column's width.
const STAGE_W = 1000;
const STAGE_H = 440;

type Card = { src: string; alt: string; w: number; h: number; x: number; y: number; r: number; front?: boolean };

// x = card centre from the stage centre, y = top edge; the size keeps each image's own shape
const CARDS: Card[] = [
  { src: "/assets/work/mosaic.webp", alt: "Mosaic, a story app home screen", w: 250, h: 270, x: -345, y: 60, r: -9 },
  { src: "/assets/work/context-window.webp", alt: "A context window usage card", w: 330, h: 252, x: -205, y: 110, r: -4, front: true },
  { src: "/assets/work/figma-to-react.webp", alt: "Figma to React, two folder icons", w: 420, h: 201, x: -40, y: 28, r: 3 },
  { src: "/assets/work/keploy.webp", alt: "Keploy AI test run screen", w: 380, h: 284, x: 85, y: 125, r: -1, front: true },
  { src: "/assets/work/concertpal.webp", alt: "ConcertPal Calendar feature cards", w: 330, h: 269, x: 255, y: 45, r: 5 },
  { src: "/assets/work/espresso.webp", alt: "A Spotify turntable widget", w: 250, h: 250, x: 350, y: 100, r: 9, front: true },
]

// cards rise in from the middle outwards
const order = (x: number) => Math.abs(x) / 350;
// Progressive blur along the bottom: stacked backdrop blurs, each stronger and confined to a band
// lower down, so the blur ramps up smoothly instead of starting at a hard line.
const BLUR_STEPS = [0.5, 1, 2, 4, 8, 16];
function BottomBlur() {
  const to = "to bottom";
  const n = BLUR_STEPS.length;
  const pct = (i: number) => `${Math.max(0, Math.min(100, (i / (n + 1)) * 100))}%`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2">
      {BLUR_STEPS.map((b, i) => (
        <div
          key={b}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${b}px)`,
            WebkitBackdropFilter: `blur(${b}px)`,
            maskImage: `linear-gradient(${to}, transparent ${pct(i)}, black ${pct(i + 1)}, black ${pct(i + 2)}, transparent ${pct(i + 3)})`,
            WebkitMaskImage: `linear-gradient(${to}, transparent ${pct(i)}, black ${pct(i + 1)}, black ${pct(i + 2)}, transparent ${pct(i + 3)})`,
          }}
        />
      ))}
    </div>
  );
}

export function WorkFan() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const still = useReducedMotion();

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, el.clientWidth / STAGE_W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section aria-label="Selected work" className="relative">
      {/* the cards sink into the page (a mask, so the dotted background shows through) */}
      <div ref={box} className="relative w-full [mask-image:linear-gradient(to_bottom,black_58%,transparent)]" style={{ height: STAGE_H * scale }}>
        <div
          className="absolute top-0 left-1/2 origin-top"
          style={{ width: STAGE_W, height: STAGE_H, transform: `translateX(-50%) scale(${scale})` }}
        >
          {CARDS.map((c) => (
            <motion.div
              key={c.src}
              className="absolute overflow-hidden rounded-[28px] bg-bg shadow-[0_30px_60px_-28px_rgba(60,40,20,0.4)] ring-1 ring-black/5 dark:ring-white/10"
              style={{ width: c.w, height: c.h, left: STAGE_W / 2 + c.x - c.w / 2, top: c.y, zIndex: c.front ? 2 : 1 }}
              initial={still ? { rotate: c.r } : { opacity: 0, y: 90, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: c.r }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 70, damping: 16, delay: still ? 0 : 0.1 + order(c.x) * 0.35 }}
              whileHover={still ? undefined : { y: -16, rotate: c.r * 0.4, scale: 1.03, zIndex: 5, transition: { type: "spring", stiffness: 260, damping: 20 } }}
            >
              <Image src={c.src} alt={c.alt} fill sizes={`${c.w}px`} className="object-cover" draggable={false} />
            </motion.div>
          ))}
        </div>
        <BottomBlur />
      </div>
    </section>
  );
}
