"use client";

import Image from "next/image";
import { useState } from "react";
import { BOUNCE as B } from "./content";

// C · Clipped sheets. Playful, like the homepage: each chapter is its own paperclipped sheet,
// the project facts sit on a perforated ticket, the lifecycle is a row of index-card tabs,
// before/after are two taped polaroids, and the three questions are stamped like seals.
export function LayoutSheets() {
  const [tab, setTab] = useState(0);
  const tabColors = ["#fde3dc", "#fdf0d2", "#e3f0dc", "#dcebf5", "#ece2f5", "#f5e0ea", "#e6e2da"];
  return (
    <div className="grid gap-10 pt-12">
      {/* the ticket */}
      <header className="grid gap-6">
        <span className="label">Case study</span>
        <h1 className="font-serif text-h2 text-head">{B.name}</h1>
        <p className="max-w-[36ch] font-worn text-h1 text-head">{B.title}</p>
        <div className="relative grid overflow-hidden rounded-2xl border border-line bg-bg shadow-[0_14px_30px_-24px_rgba(60,40,20,0.45)] sm:grid-cols-[1fr_auto]">
          <div className="grid gap-3 p-5">
            <span className="label">Rider app redesign · Admit one</span>
            <p className="printed text-sm">{B.intro}</p>
          </div>
          <div className="grid gap-3 border-t border-dashed border-line p-5 sm:border-t-0 sm:border-l">
            {B.meta.map((m) => (
              <div key={m.k} className="flex justify-between gap-6">
                <span className="label">{m.k}</span>
                <span className="text-sm text-head">{m.v}</span>
              </div>
            ))}
          </div>
          <span aria-hidden="true" className="absolute top-[-10px] hidden size-5 rounded-full border border-line bg-surface sm:right-[214px] sm:block" />
          <span aria-hidden="true" className="absolute bottom-[-10px] hidden size-5 rounded-full border border-line bg-surface sm:right-[214px] sm:block" />
        </div>
      </header>

      <Sheet tilt={-0.8}>
        <div className="relative aspect-[1600/966] overflow-hidden rounded-xl">
          <Image src={B.hero} alt="Bounce Daily redesigned screens" fill sizes="800px" className="object-cover" />
        </div>
        <p className="mt-6 font-worn text-h1 text-head">“{B.quote}”</p>
        {B.overview.map((p) => (
          <p key={p} className="printed mt-3">{p}</p>
        ))}
      </Sheet>

      <Sheet tilt={0.7} clipRight>
        <span className="label">The rider lifecycle</span>
        <p className="mt-2 font-serif text-h1 text-head">{B.lifecycleIntro}</p>
        {/* index-card tabs */}
        <div className="mt-6 flex flex-wrap gap-1">
          {B.lifecycle.map((l, i) => (
            <button
              key={l.stage}
              type="button"
              onClick={() => setTab(i)}
              className={`rounded-t-lg border border-b-0 border-line px-3 pt-2 pb-1.5 text-sm transition ${tab === i ? "-translate-y-1 text-head" : "text-muted-foreground hover:-translate-y-0.5"}`}
              style={{ background: tabColors[i] }}
            >
              {l.stage}
            </button>
          ))}
        </div>
        <div className="-mt-px rounded-b-xl rounded-tr-xl border border-line p-5" style={{ background: tabColors[tab] }}>
          <span className="label">Stage {tab + 1} of 7</span>
          <p className="mt-2 font-serif text-h1 text-head">{B.lifecycle[tab].q}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <span className="printed text-sm">{B.principle.lead}</span>
          {B.principle.qs.map((q, i) => (
            <span key={q} className="grid size-24 place-items-center rounded-full border-2 border-[#c8402c] p-2 text-center font-serif text-sm text-[#c8402c] opacity-85" style={{ rotate: `${[-8, 5, -3][i]}deg` }}>
              {q}
            </span>
          ))}
        </div>
      </Sheet>

      <Sheet tilt={-0.6}>
        <span className="label">{B.chapter.no} / {B.chapter.name}</span>
        <p className="mt-2 font-serif text-h1 text-head">{B.chapter.title}</p>
        <p className="printed mt-3">{B.chapter.body}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Polaroid src={B.chapter.before} caption="before: a list of hub names" tilt={-3} />
          <Polaroid src={B.chapter.after} caption="after: the map leads" tilt={2.5} />
        </div>
        <p className="mt-8 font-worn text-h1 text-head">{B.chapter.shift}</p>
      </Sheet>
    </div>
  );
}

function Sheet({ children, tilt = 0, clipRight = false }: { children: React.ReactNode; tilt?: number; clipRight?: boolean }) {
  return (
    <section
      className="relative rounded-[22px] border border-line bg-bg p-6 shadow-[0_-16px_40px_-30px_rgba(60,40,20,0.4)] [background-image:radial-gradient(color-mix(in_srgb,var(--dot)_40%,transparent)_1.6px,transparent_1.9px)] [background-size:22px_22px] md:p-8"
      style={{ rotate: `${tilt}deg` }}
    >
      <svg viewBox="0 0 16 46" aria-hidden="true" className={`absolute -top-4 h-[46px] w-4 -rotate-6 drop-shadow-[0_2px_1.5px_rgba(40,30,20,0.3)] ${clipRight ? "right-12" : "left-12"}`}>
        <path d="M5.5 16 V8 a3.5 3.5 0 0 1 7 0 V36 a5 5 0 0 1 -10 0 V11 a2 2 0 0 1 4 0 V33" fill="none" stroke="#b9b5ae" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      {children}
    </section>
  );
}

function Polaroid({ src, caption, tilt }: { src: string; caption: string; tilt: number }) {
  return (
    <figure className="relative bg-white p-2.5 pb-10 shadow-[0_14px_26px_-16px_rgba(60,40,20,0.55)]" style={{ rotate: `${tilt}deg` }}>
      <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[4deg] bg-[#f4c7bd]/80" />
      <div className="relative aspect-[1600/892] overflow-hidden">
        <Image src={src} alt={caption} fill sizes="400px" className="object-cover" />
      </div>
      <figcaption className="absolute bottom-2.5 left-3 font-worn text-base text-ink">{caption}</figcaption>
    </figure>
  );
}
