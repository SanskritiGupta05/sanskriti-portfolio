"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { KANJI, PRIMARY, VIBE, type Project } from "./data";

// C · Stamp album.
// Primary projects are large postage stamps with perforated edges: a screen, the name,
// a kanji numeral as the "value" and a postmark with the year. Vibe-coded projects are a strip
// of small stamps overprinted with a red "vibe coded" hanko. Hovering a stamp lifts and tilts it.

// perforated edge: a dot grid of holes over the margin, with the inner area kept solid
const PERFORATED =
  "[mask:radial-gradient(circle_4px_at_center,#0000_96%,#000)_-6px_-6px/12px_12px_round,linear-gradient(#000_0_0)_content-box]";

export function CasesStamps() {
  return (
    <div className="grid gap-20">
      <div>
        <div className="mb-6 flex items-baseline justify-between">
          <span className="label">切手帳 · Case studies</span>
          <span className="label">Hover a stamp</span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {PRIMARY.map((p, i) => (
            <Stamp key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-baseline justify-between">
          <span className="label">Vibe coded</span>
          <span className="label">Click to try it live</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {VIBE.map((p, i) => (
            <Stamp key={p.name} p={p} i={i} small />
          ))}
        </div>
      </div>
    </div>
  );
}

function Stamp({ p, i, small = false }: { p: Project; i: number; small?: boolean }) {
  const still = useReducedMotion();
  const tilt = small ? [-3, 2, -1][i] : [-1.5, 1, -0.5][i];
  return (
    <motion.a
      href={p.live ?? "#"}
      className={`group relative block [filter:drop-shadow(0_10px_14px_rgba(60,40,20,0.18))] ${small ? "w-[190px]" : ""}`}
      initial={{ rotate: tilt }}
      whileHover={still ? undefined : { y: -8, rotate: tilt * -1.5, transition: { type: "spring", stiffness: 300, damping: 18 } }}
    >
      <div className={`bg-bg p-[12px] ${PERFORATED}`}>
        <div className="border border-line p-2">
          <div className={`relative overflow-hidden ${small ? "aspect-square" : "aspect-[4/5]"}`}>
            <Image src={p.shots[0].src} alt="" fill sizes={small ? "170px" : "260px"} className="object-cover" />
          </div>
          <div className="flex items-end justify-between gap-2 pt-2.5">
            <span className={`font-serif leading-tight text-head ${small ? "text-base" : "text-lg"}`}>{p.name}</span>
            <span className="font-jp shrink-0 text-lg font-light text-[#c8402c]">{small ? "¥" + (i + 1) * 10 : KANJI[i]}</span>
          </div>
          {!small && <span className="label mt-1 block">{p.role}</span>}
        </div>
      </div>

      {/* postmark on the big stamps, a red overprint on the small ones */}
      {small ? (
        <span className="font-jp pointer-events-none absolute top-6 right-3 rotate-[-14deg] rounded-[4px] border-[1.5px] border-[#c8402c] px-1.5 py-0.5 text-[11px] leading-tight text-[#c8402c] opacity-85 mix-blend-multiply">
          vibe coded
        </span>
      ) : (
        <Postmark year={p.year} />
      )}
    </motion.a>
  );
}

function Postmark({ year }: { year: string }) {
  return (
    <svg viewBox="0 0 120 70" aria-hidden="true" className="pointer-events-none absolute top-8 -right-6 w-[120px] rotate-[-12deg] text-[#5d5850] opacity-60 mix-blend-multiply">
      <circle cx="35" cy="35" r="27" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="35" cy="35" r="21" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <text x="35" y="31" textAnchor="middle" fontSize="7" fontFamily="Courier New, monospace" fill="currentColor">
        TOKYO
      </text>
      <text x="35" y="42" textAnchor="middle" fontSize="7.5" fontFamily="Courier New, monospace" fill="currentColor">
        {year.split("–")[0]}
      </text>
      {[22, 31, 40, 49].map((y) => (
        <path key={y} d={`M66 ${y} q6 -4 12 0 t12 0 t12 0 t12 0`} fill="none" stroke="currentColor" strokeWidth="1.2" />
      ))}
    </svg>
  );
}
