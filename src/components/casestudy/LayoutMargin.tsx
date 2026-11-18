"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import { BOUNCE as B } from "./content";
import { StageTabs, Ticket } from "./pieces";

// A · Margin notes. Editorial and calm (after Kari's case study): a sticky contents list whose
// dot follows you, a thin reading-progress line, the project facts on a perforated ticket,
// the lifecycle as index-card tabs, a big Redaction pull quote,
// a before/after switch on the screens, and principles pinned on as taped paper notes.
const SECTIONS = [
  { id: "a-overview", label: "Overview" },
  { id: "a-inherited", label: "What I inherited" },
  { id: "a-lifecycle", label: "Rider lifecycle" },
  { id: "a-hub", label: "02 · Hub discovery" },
];

export function LayoutMargin() {
  const box = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: box, offset: ["start start", "end end"] });
  const [active, setActive] = useState(SECTIONS[0].id);
  const [after, setAfter] = useState(true);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="relative">
      {/* reading progress */}
      <motion.div className="sticky top-0 z-10 h-[2px] origin-left bg-[#c8553b]" style={{ scaleX: scrollYProgress }} />

      {/* hero */}
      <header className="pt-12">
        <span className="label">Case study · 2025</span>
        <h1 className="mt-3 font-serif text-h2 text-head">{B.name}</h1>
        <p className="mt-3 max-w-[40ch] font-serif text-h1 text-balance text-head">
          <span className="font-worn">{B.title}</span>
        </p>
        <div className="mt-8">
          <Ticket kicker="Rider app redesign · Admit one" text={B.intro} meta={B.meta} />
        </div>
        <div className="relative mt-10 aspect-[1600/966] overflow-hidden rounded-[20px] border border-line">
          <Image src={B.hero} alt="Bounce Daily redesigned screens" fill sizes="900px" className="object-cover" />
        </div>
      </header>

      <div className="mt-16 grid gap-12 md:grid-cols-[170px_1fr]">
        {/* contents */}
        <nav aria-label="Contents" className="hidden md:block">
          <div className="sticky top-10 grid gap-3">
            <span className="label">Contents</span>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={`flex items-center gap-2 text-sm transition-colors ${active === s.id ? "text-head" : "text-muted-foreground hover:text-ink"}`}>
                <span className={`size-1.5 rounded-full transition-all ${active === s.id ? "scale-125 bg-[#c8553b]" : "bg-line"}`} />
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <article className="grid gap-20">
          <section id="a-overview" className="grid gap-6">
            <span className="label">Overview</span>
            <blockquote className="font-worn text-h2m text-head md:text-h2">“{B.quote}”</blockquote>
            {B.overview.map((p) => (
              <p key={p} className="printed max-w-[62ch]">{p}</p>
            ))}
            <div className="grid gap-4 sm:grid-cols-2">
              {B.facts.map((f) => (
                <div key={f.q} className="rounded-2xl border border-line p-4">
                  <span className="label">{f.q}</span>
                  <p className="printed mt-2 text-sm">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="a-inherited" className="grid gap-6">
            <span className="label">The experience I inherited</span>
            <h2 className="max-w-[30ch] font-serif text-h1 text-head">{B.inherited.title}</h2>
            <p className="printed max-w-[62ch]">{B.inherited.body}</p>
            <div className="relative aspect-[1600/837] overflow-hidden rounded-[16px] border border-line">
              <Image src={B.inherited.img} alt="Problems in the old app" fill sizes="700px" className="object-cover" />
            </div>
          </section>

          <section id="a-lifecycle" className="grid gap-6">
            <span className="label">The rider lifecycle</span>
            <h2 className="max-w-[34ch] font-serif text-h1 text-head">{B.lifecycleIntro}</h2>
            <StageTabs stages={B.lifecycle} />
            <Note>
              {B.principle.lead} <b className="font-normal text-head">{B.principle.qs.join(" ")}</b>
            </Note>
          </section>

          <section id="a-hub" className="grid gap-6">
            <span className="label">{B.chapter.no} / {B.chapter.name}</span>
            <h2 className="max-w-[30ch] font-serif text-h1 text-head">{B.chapter.title}</h2>
            <p className="printed max-w-[62ch]">{B.chapter.body}</p>
            <div className="flex w-fit gap-1 rounded-full border border-line bg-surface/60 p-1">
              {(["Before", "After"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAfter(t === "After")}
                  className={`rounded-full px-4 py-1 text-sm transition ${(t === "After") === after ? "bg-bg text-head shadow-sm" : "text-muted-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative aspect-[1600/892] overflow-hidden rounded-[16px] border border-line">
              <Image src={B.chapter.before} alt="Before" fill sizes="700px" className={`object-cover transition-opacity duration-500 ${after ? "opacity-0" : "opacity-100"}`} />
              <Image src={B.chapter.after} alt="After" fill sizes="700px" className={`object-cover transition-opacity duration-500 ${after ? "opacity-100" : "opacity-0"}`} />
            </div>
            <Note tilt={1.4}>
              <span className="label">The shift</span>
              <br />
              {B.chapter.shift}
            </Note>
          </section>
        </article>
      </div>
    </div>
  );
}

// a principle pinned on with a strip of tape
function Note({ children, tilt = -1.4 }: { children: React.ReactNode; tilt?: number }) {
  return (
    <div className="relative w-fit max-w-[46ch] bg-[#fff7dc] px-5 pt-6 pb-4 shadow-[0_10px_20px_-14px_rgba(80,60,20,0.5)]" style={{ rotate: `${tilt}deg` }}>
      <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-[#f4c7bd]/80" />
      <p className="font-serif text-lg text-ink">{children}</p>
    </div>
  );
}
