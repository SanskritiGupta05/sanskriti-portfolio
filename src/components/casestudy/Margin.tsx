"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll } from "motion/react";

// The "margin notes" case study language, as reusable parts:
// a page frame with a sticky contents list (its dot follows the section you're in) and a thin
// reading-progress line, plus sections, screens, a before/after switch, taped notes and flow chips.

export type TocItem = { id: string; label: string };

export function CaseStudyFrame({ toc, header, children }: { toc: TocItem[]; header: ReactNode; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: box, offset: ["start start", "end end"] });
  const [active, setActive] = useState(toc[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: "-35% 0px -60% 0px",
    });
    toc.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [toc]);

  return (
    <div ref={box} className="relative">
      <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[#c8553b]" style={{ scaleX: scrollYProgress }} />
      {header}
      <div className="mt-20 grid gap-12 md:grid-cols-[180px_1fr]">
        <nav aria-label="Contents" className="hidden md:block">
          <div className="sticky top-10 grid gap-2.5">
            <span className="label mb-1">Contents</span>
            {toc.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`flex items-center gap-2 text-sm leading-snug transition-colors ${active === s.id ? "text-head" : "text-muted-foreground hover:text-ink"}`}
              >
                <span className={`size-1.5 shrink-0 rounded-full transition-all ${active === s.id ? "scale-125 bg-[#c8553b]" : "bg-line"}`} />
                {s.label}
              </a>
            ))}
          </div>
        </nav>
        <article className="grid min-w-0 gap-28">{children}</article>
      </div>
    </div>
  );
}

export function Section({ id, label, title, children }: { id: string; label?: string; title?: ReactNode; children?: ReactNode }) {
  return (
    <section id={id} className="grid scroll-mt-16 gap-6">
      {label && <span className="label">{label}</span>}
      {title && <h2 className="max-w-[32ch] font-serif text-h1 text-balance text-head">{title}</h2>}
      {children}
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="printed max-w-[64ch] text-pretty">{children}</p>;
}

export function Quote({ children }: { children: ReactNode }) {
  return <blockquote className="max-w-[28ch] font-worn text-h2m text-balance text-head md:text-h2">{children}</blockquote>;
}

// a screen or set of screens, framed
export function Shot({ src, w, h, alt, caption }: { src: string; w: number; h: number; alt: string; caption?: string }) {
  return (
    <figure className="grid gap-2">
      <div className="overflow-hidden rounded-[16px] border border-line bg-surface/40">
        <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 1080px) 820px, 100vw" className="block h-auto w-full" />
      </div>
      {caption && <figcaption className="label">{caption}</figcaption>}
    </figure>
  );
}

// flip between the old and the new screens
export function BeforeAfter({ before, after }: { before: { src: string; w: number; h: number }; after: { src: string; w: number; h: number } }) {
  const [showAfter, setShowAfter] = useState(true);
  const cur = showAfter ? after : before;
  return (
    <div className="grid gap-3">
      <div className="flex w-fit gap-1 rounded-full border border-line bg-surface/60 p-1">
        {(["Before", "After"] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={(t === "After") === showAfter}
            onClick={() => setShowAfter(t === "After")}
            className={`rounded-full px-4 py-1 text-sm transition ${(t === "After") === showAfter ? "bg-bg text-head shadow-sm" : "text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[16px] border border-line bg-surface/40">
        <Image key={cur.src} src={cur.src} alt={showAfter ? "After" : "Before"} width={cur.w} height={cur.h} sizes="(min-width: 1080px) 820px, 100vw" className="block h-auto w-full" />
      </div>
    </div>
  );
}

// a principle or decision, pinned on with a strip of tape
export function Note({ label, children, tilt = -1.2 }: { label?: string; children: ReactNode; tilt?: number }) {
  return (
    <div className="relative w-fit max-w-[48ch] bg-[#fff7dc] px-5 pt-6 pb-4 shadow-[0_10px_20px_-14px_rgba(80,60,20,0.5)]" style={{ rotate: `${tilt}deg` }}>
      <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-[#f4c7bd]/80" />
      {label && <span className="label mb-1 block">{label}</span>}
      <p className="font-serif text-lg text-ink">{children}</p>
    </div>
  );
}

// a sequence of states, as chips joined by arrows
export function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-sm text-ink">{s}</span>
          {i < steps.length - 1 && <span aria-hidden="true" className="text-muted-foreground">→</span>}
        </li>
      ))}
    </ol>
  );
}
