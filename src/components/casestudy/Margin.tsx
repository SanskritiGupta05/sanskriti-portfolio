"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, type MotionValue } from "motion/react";
import { Paperclip } from "@/components/PaperStack";

// The "margin notes" case study language, as reusable parts:
// a page frame with a sticky contents list (its dot follows the section you're in) and a thin
// reading-progress line, plus sections, screens, a before/after switch, taped notes and flow chips.

// sub: optional parts of a section (e.g. Solution #1–#4); in the sheet layout they unfold under the item while you're in it
export type TocItem = {
  id: string;
  label: string;
  match?: string[];
  sub?: { id: string; label: string }[];
};

// a quiet nudge back to the top, bottom right: it appears once the reader is past the header, its ring
// fills with reading progress, and it steps away once the case study has ended (so it never sits on the footer)
function BackToTop({ progress, end }: { progress: MotionValue<number>; end: React.RefObject<HTMLDivElement | null> }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const bottom = end.current?.getBoundingClientRect().bottom ?? Infinity;
      setShow(window.scrollY > 900 && bottom > window.innerHeight - 40);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [end]);
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to the top"
      tabIndex={show ? 0 : -1}
      className={`skeu group fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 md:right-8 md:bottom-8 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
        <circle cx="24" cy="24" r="21" fill="none" stroke="var(--line)" strokeWidth="2" />
        <motion.circle cx="24" cy="24" r="21" fill="none" stroke="var(--cs-accent)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: progress }} />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="relative size-[18px] text-[var(--cs-accent)] transition-transform group-hover:-translate-y-0.5">
        <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="pointer-events-none absolute right-[calc(100%+10px)] rounded-md bg-[#1e1e1e] px-2 py-1 text-[11px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        Back to top
      </span>
    </button>
  );
}

export function CaseStudyFrame({
  toc,
  header,
  children,
  layout = "column",
  contentClassName = "",
  accent = "#c8553b",
}: {
  toc: TocItem[];
  header: ReactNode;
  children: ReactNode;
  // "column": contents list beside the article in one centred column.
  // "sheet": contents list on the dotted page at the left, the case study on a clipped paper sheet that runs off the right edge.
  layout?: "column" | "sheet";
  // extra classes for the sheet's content, e.g. a body font for one case study
  contentClassName?: string;
  // colour of the reading-progress line and the active contents item (default: the site's terracotta)
  accent?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: box,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(toc[0]?.id);
  const [activeSub, setActiveSub] = useState<string | undefined>();

  useEffect(() => {
    // a contents item can stand for several sections (match) and sub-parts (sub); whichever is in view lights it up
    const owner = new Map<string, string>();
    const subs = new Set<string>();
    toc.forEach((t) => {
      (t.match ?? [t.id]).forEach((id) => owner.set(id, t.id));
      t.sub?.forEach((s) => {
        owner.set(s.id, t.id);
        subs.add(s.id);
      });
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setActive(owner.get(e.target.id) ?? e.target.id);
          setActiveSub(subs.has(e.target.id) ? e.target.id : undefined);
        }),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    owner.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [toc]);

  const bar = (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[var(--cs-accent)]"
        style={{ scaleX: scrollYProgress }}
      />
      <BackToTop progress={scrollYProgress} end={box} />
    </>
  );

  if (layout === "sheet") {
    return (
      <div ref={box} className="relative" style={{ "--cs-accent": accent } as React.CSSProperties}>
        {bar}
        <div className="md:grid md:grid-cols-[minmax(220px,22vw)_1fr] md:items-start">
          <nav
            aria-label="Contents"
            className="hidden md:block md:sticky md:top-0 md:pt-24 md:pr-6 md:pl-[max(24px,3vw)]"
          >
            <span className="label mb-5 block tracking-[0.18em]">Contents</span>
            <ol className="grid gap-3.5">
              {toc.map((s, i) => {
                const on = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`flex items-center gap-3 text-sm transition-colors ${on ? "text-[var(--cs-accent)]" : "text-muted-foreground hover:text-ink"}`}
                    >
                      <span
                        className={`size-1.5 shrink-0 rounded-full transition-all ${on ? "scale-125 bg-[var(--cs-accent)]" : "bg-line"}`}
                      />
                      <span className="tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>·</span>
                      <span>{s.label}</span>
                    </a>
                    {s.sub && (
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <ol
                          className="ml-[22px] grid gap-2 overflow-hidden border-l border-line pl-[22px]"
                          aria-hidden={!on}
                        >
                          {s.sub.map((p, j) => (
                            <li
                              key={p.id}
                              className={
                                j === 0
                                  ? "pt-3"
                                  : j === s.sub!.length - 1
                                    ? "pb-1"
                                    : ""
                              }
                            >
                              <a
                                href={`#${p.id}`}
                                tabIndex={on ? 0 : -1}
                                className={`block !text-[14px] leading-snug transition-colors ${activeSub === p.id ? "text-[var(--cs-accent)]" : "text-muted-foreground hover:text-ink"}`}
                              >
                                {p.label}
                              </a>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="relative mt-4 rounded-t-[22px] rounded-bl-[22px] border border-line bg-bg shadow-[0_-10px_50px_-24px_rgba(60,40,20,0.35)] md:mt-0 md:rounded-tr-none md:border-r-0">
            <Paperclip className="absolute -top-6 left-6 z-10 !h-[70px] !w-6 rotate-[18deg]" />
            {/* a woven fabric label hanging from the top edge, text reading bottom to top */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-16 z-10 hidden w-[34px] rotate-180 rounded-t-[2px] px-[9px] py-5 font-mono text-[12px] font-bold tracking-[0.2em] text-[#f6e4d8] uppercase [writing-mode:vertical-rl] [text-shadow:0_1px_0_rgba(90,20,15,0.45)] sm:block md:left-12"
              style={{
                backgroundColor: "#c64a40",
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 3px)",
                boxShadow:
                  "inset 0 0 0 2px rgba(120,25,20,0.25), inset 0 0 0 3px rgba(255,235,225,0.12), 0 8px 14px -8px rgba(110,30,20,0.55)",
              }}
            >
              Case study
            </span>
            <div
              className={`max-w-[1040px] px-6 pt-12 pb-24 sm:pr-10 sm:pl-24 md:pl-[104px] [&_h2]:max-w-[44ch] [&_p.printed]:max-w-[82ch] ${contentClassName}`}
            >
              {header}
              <article className="mt-24 grid min-w-0 gap-28">
                {children}
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={box} className="relative" style={{ "--cs-accent": accent } as React.CSSProperties}>
      {bar}
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
                <span
                  className={`size-1.5 shrink-0 rounded-full transition-all ${active === s.id ? "scale-125 bg-[var(--cs-accent)]" : "bg-line"}`}
                />
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

export function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label?: string;
  title?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="grid scroll-mt-16 gap-6">
      {label && <span className="label">{label}</span>}
      {title && (
        <h2 className="max-w-[32ch] font-serif text-h1 text-balance text-head">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="printed max-w-[64ch] text-pretty">{children}</p>;
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="max-w-[28ch] font-worn text-h2m text-balance text-head md:text-h2">
      {children}
    </blockquote>
  );
}

// a screen or set of screens, framed
export function Shot({
  src,
  w,
  h,
  alt,
  caption,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="grid gap-2">
      <div className="overflow-hidden rounded-[16px] border border-line bg-surface/40">
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          sizes="(min-width: 1080px) 820px, 100vw"
          className="block h-auto w-full"
        />
      </div>
      {caption && <figcaption className="label">{caption}</figcaption>}
    </figure>
  );
}

// flip between the old and the new screens
export function BeforeAfter({
  before,
  after,
}: {
  before: { src: string; w: number; h: number };
  after: { src: string; w: number; h: number };
}) {
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
        <Image
          key={cur.src}
          src={cur.src}
          alt={showAfter ? "After" : "Before"}
          width={cur.w}
          height={cur.h}
          sizes="(min-width: 1080px) 820px, 100vw"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

// a principle or decision, pinned on with a strip of tape
export function Note({
  label,
  children,
  tilt = -1.2,
}: {
  label?: string;
  children: ReactNode;
  tilt?: number;
}) {
  return (
    <div
      className="relative w-fit max-w-[48ch] bg-[#fff7dc] px-5 pt-6 pb-4 shadow-[0_10px_20px_-14px_rgba(80,60,20,0.5)]"
      style={{ rotate: `${tilt}deg` }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-[#f4c7bd]/80"
      />
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
          <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-sm text-ink">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="text-muted-foreground">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
