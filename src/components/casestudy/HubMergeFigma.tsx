"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Design decision #2 as a live Figma-style storyboard (built in HTML, not a video, so it stays sharp and can replay).
// The old Hub list + Hub detail sit in a "Before" section, slide into the new map screen in the "After" section,
// then four comment pins pop in with their threads. Plays when scrolled into view; Replay runs it again.
// Mirrors the Figma v5 frame "Figma canvas · Hub merge". Screens: public/assets/cases/bounce/v5/hq (3×).

const W = 860;
const H = 600;
const SRC = "/assets/cases/bounce/v5/hq";
const UI = {
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
};
const PINS: { n: number; x: number; y: number; title: string; sub: string }[] =
  [
    {
      n: 1,
      x: 0.4,
      y: 0.21,
      title: "Map first",
      sub: "Hubs around the rider, instead of a list of names to read.",
    },
    {
      n: 2,
      x: 0.8,
      y: 0.555,
      title: "Nearest hub first",
      sub: "Distance and a Nearest tag, up front.",
    },
    {
      n: 3,
      x: 0.06,
      y: 0.7,
      title: "Scooters + batteries as chips",
      sub: "Both counts read at a glance, side by side.",
    },
    {
      n: 4,
      x: 0.86,
      y: 0.875,
      title: "The CTA confirms your hub",
      sub: "“Pick scooter at RR Nagar” names the hub and invites the rider on.",
    },
  ];

function Section({
  label,
  after,
  className = "",
  children,
}: {
  label: string;
  after?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-md border px-[18px] pt-[14px] pb-6 ${after ? "border-[#bfe7c9] bg-[#f3fbf5]" : "border-[#e2e2e2] bg-white"} ${className}`}
    >
      <span
        className={`inline-block rounded px-2 py-[3px] text-[11px] font-medium ${after ? "bg-[#14ae5c] text-white" : "bg-[#e6e6e6] text-[#1e1e1e]"}`}
      >
        {label}
      </span>
      <div className="mt-[14px] flex gap-4">{children}</div>
    </div>
  );
}

function Phone({
  src,
  name,
  w,
  h,
  alt,
}: {
  src: string;
  name: string;
  w: number;
  h: number;
  alt: string;
}) {
  return (
    <div className="grid gap-1.5">
      <span className="text-[11px] text-[#8c8c8c]">{name}</span>
      <div
        className="overflow-hidden rounded-[14px] bg-white ring-1 ring-black/[0.09]"
        style={{ width: w, height: h }}
      >
        <Image
          src={`${SRC}/${src}.webp`}
          alt={alt}
          width={1320}
          height={Math.round((1320 * h) / w)}
          unoptimized
          className="block h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

export function HubMergeFigma() {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [step, setStep] = useState(0); // 0 start · 1 merge · 2 after shown · 3–6 pins · 7 done
  const timers = useRef<number[]>([]);

  const play = () => {
    timers.current.forEach(clearTimeout);
    setStep(0);
    const at = [500, 1300, 2000, 2550, 3100, 3650, 4200];
    timers.current = at.map((t, i) =>
      window.setTimeout(() => setStep(i + 1), t),
    );
  };

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setScale(Math.min(1, e.contentRect.width / W)),
    );
    ro.observe(el);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let started = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return;
        started = true;
        io.disconnect();
        if (reduce) setStep(7);
        else play();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    const t = timers.current;
    return () => {
      ro.disconnect();
      io.disconnect();
      t.forEach(clearTimeout);
    };
  }, []);

  const merged = step >= 1;
  const showAfter = step >= 2;
  const ease = "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div
      ref={wrap}
      className="relative w-full overflow-hidden rounded-2xl border border-black/[0.05] bg-[#f5f5f5]"
      style={{ height: H * scale }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})`, ...UI }}
      >
        {/* Before: two old screens that slide into one */}
        <Section
          label="Before · 2 screens"
          className={`top-[84px] left-6 ${ease} ${merged ? "opacity-80" : ""}`}
        >
          <div
            className={`${ease} ${merged ? "translate-x-[22px] -rotate-1 opacity-30 grayscale" : ""}`}
          >
            <Phone
              src="hub-old-list"
              name="Hub list"
              w={118}
              h={263}
              alt="Old app: list of hubs by name"
            />
          </div>
          <div
            className={`${ease} delay-100 ${merged ? "-translate-x-[22px] rotate-1 opacity-30 grayscale" : ""}`}
          >
            <Phone
              src="hub-old-detail"
              name="Hub detail"
              w={118}
              h={263}
              alt="Old app: hub detail on a second screen"
            />
          </div>
        </Section>

        {/* connector */}
        <div
          className={`absolute top-[250px] left-[338px] grid justify-items-center gap-1.5 ${ease} ${merged ? "opacity-100" : "opacity-0"}`}
        >
          <svg width="56" height="16" viewBox="0 0 56 16" aria-hidden="true">
            <path
              d="M2 8 H50 M42 2 L50 8 L42 14"
              fill="none"
              stroke="#0d99ff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="70"
              strokeDashoffset={merged ? 0 : 70}
              style={{ transition: "stroke-dashoffset 700ms ease" }}
            />
          </svg>
          <span className="text-[10px] font-medium text-[#0d99ff]">
            merged into one
          </span>
        </div>

        {/* After: the new map screen with comment pins */}
        <Section
          label="After · 1 screen"
          after
          className={`top-[40px] left-[412px] ${ease} ${showAfter ? "opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <div className="relative">
            <Phone
              src="hub-new-map"
              name="Pick a hub · Map"
              w={160}
              h={348}
              alt="New app: the hub map opening on the nearest hub"
            />
            {PINS.map((p) => (
              <span
                key={p.n}
                className={`absolute grid size-6 place-items-center rounded-[12px] rounded-bl-[2px] border-2 border-white bg-[#9747ff] text-[11px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= p.n + 2 ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                style={{ left: p.x * 160, top: 22 + p.y * 348 }}
              >
                {p.n}
              </span>
            ))}
          </div>
        </Section>

        {/* comment threads */}
        <div className="absolute top-[40px] left-[640px] grid w-[196px] gap-2.5">
          {PINS.map((p) => (
            <div
              key={p.n}
              className={`grid gap-1.5 rounded-[10px] bg-white p-3 shadow-[0_4px_14px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out ${step >= p.n + 2 ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}`}
            >
              <span className="flex items-center gap-2">
                <span className="size-5 rounded-full bg-[#9747ff]" />
                <span className="text-[12px] font-semibold text-[#1e1e1e]">
                  Sanskriti
                </span>
                <span className="text-[11px] text-[#8c8c8c]">#{p.n}</span>
              </span>
              <span className="text-[12px] font-semibold text-[#1e1e1e]">
                {p.title}
              </span>
              <span className="text-[12px] leading-[17px] text-[#5c5c5c]">
                {p.sub}
              </span>
            </div>
          ))}
        </div>

        {/* replay, like a small Figma toolbar button */}
        <button
          type="button"
          onClick={play}
          className={`absolute top-4 right-4 flex items-center gap-1.5 rounded-md border border-[#e2e2e2] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1e1e1e] shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-opacity hover:bg-[#f5f5f5] ${step >= 7 ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Replay
        </button>
      </div>
    </div>
  );
}
