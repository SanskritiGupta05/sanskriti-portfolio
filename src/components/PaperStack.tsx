"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// The hero scrolls normally until its bottom reaches the bottom of the screen, then stays put,
// and the next section slides up over it like a sheet of paper clipped on with a paperclip.
// As the sheet arrives it straightens out, and the hero behind it sinks back a little.
export function PaperStack({ hero, children }: { hero: ReactNode; children: ReactNode }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [pinTop, setPinTop] = useState(0);
  const still = useReducedMotion();

  // pin the hero at the point where its bottom edge meets the bottom of the screen
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const fit = () => setPinTop(Math.min(0, window.innerHeight - el.offsetHeight));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  // 0 when the sheet's top edge enters at the bottom of the screen, 1 when it reaches the top
  const { scrollYProgress } = useScroll({ target: sheetRef, offset: ["start end", "start start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const tilt = useTransform(scrollYProgress, [0, 0.7], [-1.6, 0]);
  // over the last stretch the sheet widens to the full screen and its corners square off,
  // so once it reaches the top it simply becomes the page (and the next sheet can do the same)
  const inset = useTransform(scrollYProgress, [0.8, 1], [12, 0]);
  const width = useTransform(inset, (v) => `calc(100vw - ${v * 2}px)`);
  const radius = useTransform(scrollYProgress, [0.8, 1], [22, 0]);

  return (
    <>
      <motion.div
        ref={heroRef}
        className="sticky origin-top"
        style={{ top: pinTop, scale: still ? 1 : heroScale, opacity: still ? 1 : heroFade }}
      >
        {hero}
      </motion.div>

      {/* the sheet: nearly full width, the same dotted paper, a small paperclip at the top left */}
      <motion.div
        ref={sheetRef}
        id="work"
        className="relative z-10 left-1/2 -translate-x-1/2"
        style={{ width: still ? "100vw" : width }}
      >
        <motion.div
          className="relative origin-top-left border border-line bg-bg shadow-[0_-24px_60px_-34px_rgba(60,40,20,0.45)] [background-image:radial-gradient(color-mix(in_srgb,var(--dot)_60%,transparent)_1.6px,transparent_1.9px)] [background-size:22px_22px]"
          style={{ rotate: still ? 0 : tilt, borderRadius: still ? 0 : radius }}
        >
          <Paperclip className="absolute -top-4 left-10 md:left-16" />
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}

// a small steel paperclip, slid over the sheet's top edge
function Paperclip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 46" aria-hidden="true" className={`h-[46px] w-4 -rotate-6 drop-shadow-[0_2px_1.5px_rgba(40,30,20,0.3)] ${className}`}>
      <defs>
        <linearGradient id="clip-steel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d8a85" />
          <stop offset="0.45" stopColor="#d9d6d0" />
          <stop offset="1" stopColor="#8d8a85" />
        </linearGradient>
      </defs>
      <path
        d="M5.5 16 V8 a3.5 3.5 0 0 1 7 0 V36 a5 5 0 0 1 -10 0 V11 a2 2 0 0 1 4 0 V33"
        fill="none"
        stroke="url(#clip-steel)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
