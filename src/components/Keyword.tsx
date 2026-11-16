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
  // FigJam stand-in (no official outline available): a sticky note and a marker squiggle on FigJam purple
  figjam: {
    name: "FigJam",
    icon: (
      <span className={TILE} style={{ background: "#9747FF" }}>
        <svg viewBox="0 0 40 40" className="size-7" aria-hidden="true">
          <path d="M9 9h17a2 2 0 0 1 2 2v12l-7 7H11a2 2 0 0 1-2-2z" fill="#FFD966" />
          <path d="M28 23h-5a2 2 0 0 0-2 2v5z" fill="#F2B94A" />
          <path d="M13 15.5q3-2 6 0t6 0M13 20.5q2.5-1.6 5 0" stroke="#7A5A16" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <circle cx="31" cy="10" r="3" fill="#0ACF83" />
        </svg>
      </span>
    ),
  },
  // a design-tool cursor with its little name tag
  cursor: {
    name: "Cursor",
    icon: (
      <span className={`${TILE} bg-white`}>
        <svg viewBox="0 0 40 40" className="size-8" aria-hidden="true">
          <path d="M10 7l13 11.5-6 .8 3.6 7.4-2.6 1.3-3.6-7.5-4.4 4.2z" fill="#1c1b19" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
          <rect x="20" y="26" width="16" height="8" rx="2.5" fill="#cc4030" />
          <path d="M23.5 30h9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    ),
  },
  // Jitter: the white "Jttr" wordmark on violet (from the logo Sanskriti shared)
  jitter: {
    name: "Jitter",
    icon: (
      <span className={TILE} style={{ background: "#7444F2" }}>
        <span className="font-[system-ui] text-[13px] leading-none font-medium tracking-[-0.02em] text-white">Jttr</span>
      </span>
    ),
  },
  // Figma motion stand-in (Figma's motion tools have no logo of their own): the Figma mark with motion trails
  figmaMotion: {
    name: "Figma motion",
    icon: (
      <span className={`${TILE} bg-white`}>
        <svg viewBox="0 0 50 57" className="h-[22px]" aria-hidden="true">
          <g stroke="#c9c2b6" strokeWidth="2.6" strokeLinecap="round"><path d="M1 18h7M3 28.5h5M1 39h7" /></g>
          <g transform="translate(12 0)">
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
            <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
          </g>
        </svg>
      </span>
    ),
  },
  // Claude: the cream starburst on terracotta (app icon Sanskriti shared; outline from Simple Icons)
  claude: {
    name: "Claude",
    icon: (
      <span className={TILE} style={{ background: "#D97757" }}>
        <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true"><path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" fill="#FBF1EC" /></svg>
      </span>
    ),
  },
  // AI-assisted development (outlines from Simple Icons)
  // Cursor: the faceted grey cube on black (from the app icon Sanskriti shared)
  cursorAI: {
    name: "Cursor",
    icon: (
      <span className={TILE} style={{ background: "#000" }}>
        <svg viewBox="0 0 40 40" className="size-9" aria-hidden="true">
          <defs>
            <linearGradient id="cu-top" x1="0" x2="1"><stop offset="0" stopColor="#9a9a9a" /><stop offset=".5" stopColor="#5a5a5a" /><stop offset="1" stopColor="#0d0d0d" /></linearGradient>
            <linearGradient id="cu-left" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7c7c7c" /><stop offset="1" stopColor="#1a1a1a" /></linearGradient>
            <linearGradient id="cu-bl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5c5c5c" /><stop offset="1" stopColor="#cfcfcf" /></linearGradient>
            <linearGradient id="cu-br" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a0a0a" /><stop offset="1" stopColor="#8a8a8a" /></linearGradient>
          </defs>
          <path d="M20 8 9.6 14h20.8z" fill="url(#cu-top)" />
          <path d="M9.6 14 20 20 9.6 26z" fill="url(#cu-left)" />
          <path d="M9.6 26 20 20v12z" fill="url(#cu-bl)" />
          <path d="M30.4 14v12L20 32z" fill="url(#cu-br)" />
          <path d="M20 20 30.4 14 20 32z" fill="#e4e4e4" />
          <path d="M9.6 14h20.8L20 20z" fill="#ffffff" />
        </svg>
      </span>
    ),
  },
  github: {
    name: "GitHub",
    icon: (
      <span className={TILE} style={{ background: "#181717" }}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#ffffff" /></svg>
      </span>
    ),
  },
  // Xcode: the dark hammer on a blue blueprint tile (from the icon Sanskriti shared)
  xcode: {
    name: "Xcode",
    icon: (
      <span className={`${TILE} overflow-hidden`}>
        <svg viewBox="0 0 40 40" className="size-10" aria-hidden="true">
          <defs>
            <linearGradient id="xc-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#25A8F8" /><stop offset="1" stopColor="#1668E8" /></linearGradient>
            <linearGradient id="xc-steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#4a4c53" /><stop offset=".5" stopColor="#2a2b30" /><stop offset="1" stopColor="#17181b" /></linearGradient>
          </defs>
          <rect width="40" height="40" fill="url(#xc-bg)" />
          <g stroke="#fff" strokeOpacity=".22" strokeWidth=".6"><path d="M10 0v40M20 0v40M30 0v40M0 10h40M0 20h40M0 30h40" /></g>
          <g transform="rotate(45 20 20)">
            <rect x="18" y="15.5" width="4.6" height="19" rx="2.3" fill="url(#xc-steel)" />
            <rect x="18.7" y="10.5" width="3.2" height="6" fill="#2f3036" />
            <rect x="20" y="7" width="7.5" height="4.8" rx="1.2" fill="url(#xc-steel)" />
            <path d="M20.5 7.2C16.5 5.6 12.8 6.2 10 8.6c3.6-.6 7 .6 10.5 3.2z" fill="#2a2b30" />
          </g>
        </svg>
      </span>
    ),
  },
  vscode: {
    name: "VS Code",
    icon: (
      <span className={TILE} style={{ background: "#ffffff" }}>
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" fill="#007ACC" /></svg>
      </span>
    ),
  },
  // a tiny user flow: start → decision → two outcomes
  flow: {
    name: "Flow diagram",
    icon: (
      <span className={`${TILE} w-14 bg-[#fffaf2]`}>
        <svg viewBox="0 0 56 40" className="h-8 w-12" aria-hidden="true">
          <g stroke="#b9a68a" strokeWidth="1.2" fill="none" strokeLinecap="round">
            <path d="M14 20h8M34 20l5-7h3M34 20l5 7h3" />
          </g>
          <rect x="3" y="15" width="11" height="10" rx="2.5" fill="#1ABCFE" />
          <path d="M28 13l6 7-6 7-6-7z" fill="#FFC943" />
          <rect x="42" y="8.5" width="11" height="9" rx="2.5" fill="#0ACF83" />
          <rect x="42" y="22.5" width="11" height="9" rx="2.5" fill="#F24E1E" />
        </svg>
      </span>
    ),
  },
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
