"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// A loose fan of work visuals under the hero: a back row and a front row of tilted cards,
// spilling past the text column and fading into the page at the bottom.
// Laid out on a 1440×520 stage that scales down to fit narrower screens.
const STAGE_W = 1440;
const STAGE_H = 520;

type Card = { src: string; alt: string; w: number; h: number; x: number; y: number; r: number; front?: boolean };

// x = card centre from the stage centre, y = top edge; the size keeps each image's own shape
const CARDS: Card[] = [
  { src: "/assets/work/mosaic.webp", alt: "Mosaic, a story app home screen", w: 320, h: 345, x: -600, y: 70, r: -12 },
  { src: "/assets/work/context-window.webp", alt: "A context window usage card", w: 400, h: 306, x: -350, y: 120, r: -4, front: true },
  { src: "/assets/work/figma-to-react.webp", alt: "Figma to React, two folder icons", w: 500, h: 239, x: -60, y: 36, r: 3 },
  { src: "/assets/work/keploy.webp", alt: "Keploy AI test run screen", w: 460, h: 344, x: 110, y: 140, r: -1, front: true },
  { src: "/assets/work/concertpal.webp", alt: "ConcertPal Calendar feature cards", w: 400, h: 326, x: 390, y: 50, r: 5 },
  { src: "/assets/work/espresso.webp", alt: "A Spotify turntable widget", w: 320, h: 320, x: 620, y: 110, r: 12, front: true },
];

// cards rise in from the middle outwards
const order = (x: number) => Math.abs(x) / 620;

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
    <section aria-label="Selected work" className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
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
      </div>
    </section>
  );
}
