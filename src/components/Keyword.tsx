"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// App icons for the tools behind each skill. Drawn in SVG (no image files).
const TILE = "grid size-10 place-items-center rounded-[10px] shadow-[0_8px_18px_-8px_rgba(40,20,10,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)] [-webkit-text-stroke:0] [text-shadow:none]";
const adobe = (bg: string, fg: string, label: string) => (
  <span className={TILE} style={{ background: bg }}>
    <span className="font-[system-ui] text-base leading-none font-semibold tracking-tight" style={{ color: fg }}>{label}</span>
  </span>
);
export const TOOLS = {
  figma: {
    name: "Figma",
    icon: (
      <span className={`${TILE} bg-white`}>
        <svg viewBox="0 0 38 57" className="h-[22px]" aria-hidden="true">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
      </span>
    ),
  },
  photoshop: { name: "Photoshop", icon: adobe("#001E36", "#31A8FF", "Ps") },
  illustrator: { name: "Illustrator", icon: adobe("#330000", "#FF9A00", "Ai") },
} as const;
export type Tool = keyof typeof TOOLS;

// A highlighted word in running text: a soft vermilion chip with an underline.
// Hovering it (or tabbing to it, or tapping on a phone) pops its tools out above it in a little fan.
export function Keyword({ children, tools = [] }: { children: React.ReactNode; tools?: Tool[] }) {
  const [open, setOpen] = useState(false);
  const mid = (tools.length - 1) / 2;
  return (
    <span
      className="relative inline-block"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      tabIndex={tools.length ? 0 : undefined}
      aria-label={tools.length ? `${children} (${tools.map((t) => TOOLS[t].name).join(", ")})` : undefined}
    >
      <motion.span
        animate={open ? { y: -2, rotate: -2 } : { y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 24 }}
        className="inline-block cursor-default rounded-md border-b-[1.5px] border-[#e8a596] bg-[#fdece6] px-1.5 leading-[1.5] text-[#b53424] dark:border-[#7a3a2e] dark:bg-[#3a201d] dark:text-[#f2a08c]"
      >
        {children}
      </motion.span>
      <AnimatePresence>
        {open &&
          tools.map((t, i) => {
            const d = i - mid; // -1, 0, 1 … from the middle of the fan
            return (
              <motion.span
                key={t}
                aria-hidden="true"
                title={TOOLS[t].name}
                className="pointer-events-none absolute bottom-full left-1/2 z-20 -ml-5"
                initial={{ opacity: 0, x: 0, y: 14, scale: 0.4, rotate: 0 }}
                animate={{ opacity: 1, x: d * 46, y: -10 - (mid - Math.abs(d)) * 6, scale: 1, rotate: d * 10 }}
                exit={{ opacity: 0, x: d * 14, y: 10, scale: 0.5, rotate: 0, transition: { duration: 0.18, ease: "easeIn" } }}
                transition={{ type: "spring", stiffness: 420, damping: 20, mass: 0.7, delay: (i - 0) * 0.04 }}
              >
                {TOOLS[t].icon}
              </motion.span>
            );
          })}
      </AnimatePresence>
    </span>
  );
}
