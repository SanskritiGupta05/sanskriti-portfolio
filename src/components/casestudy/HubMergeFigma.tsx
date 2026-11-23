"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Design decision #2 as a live Figma-style storyboard (HTML/CSS, not a video: sharp at any size and replayable).
// It tells the story in three labelled steps so a first-time viewer gets it:
//   1 Before   the old app: a list of hub names, then a second screen for one hub's details
//   2 Moved    a blue box marks the map (on the list), an orange box the hub details (on the detail screen)
//   3 After    the same blue and orange boxes land together on the new single screen
// then four comment pins explain what else got better. Plays when scrolled into view; Replay runs it again.
// Mirrors the Figma v5 frame "Figma canvas · Hub merge". Screens: public/assets/cases/bounce/v5/hq (3×).

const W = 860;
const H = 640;
const SRC = "/assets/cases/bounce/v5/hq";
const UI = {
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
};
const BLUE = "#0d99ff";
const ORANGE = "#ff7a29";

// phone sizes on the stage, and the marked areas as fractions of each screen (from the Figma frames)
const OLD = { w: 128, h: 285 };
const NEW = { w: 172, h: 374 };
const BOX = {
  listMap: { x: 0, y: 0.11, w: 1, h: 0.265 },
  detailInfo: { x: 0.03, y: 0.115, w: 0.92, h: 0.5 },
  newMap: { x: 0, y: 0.065, w: 1, h: 0.49 },
  newCard: { x: 0.1, y: 0.573, w: 0.8, h: 0.265 },
};

const STEPS = [
  {
    text: "Before: riders scrolled a list of hub names, then opened a second screen to see one hub's details.",
  },
  { text: "The map lived on one screen, and the hub's details on another." },
  {
    text: "After: one screen. The map opens on the nearest hub, with its details right on the card.",
  },
  { text: "What else got better, in comments." },
];

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

function Mark({
  show,
  color,
  label,
  at,
  w,
  h,
  side = "top",
}: {
  show: boolean;
  color: string;
  label: string;
  at: { x: number; y: number; w: number; h: number };
  w: number;
  h: number;
  side?: "top" | "bottom";
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-[6px] border-2 border-dashed transition-all duration-500 ease-out ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      style={{
        left: at.x * w - 2,
        top: at.y * h - 2,
        width: at.w * w + 4,
        height: at.h * h + 4,
        borderColor: color,
        background: `${color}14`,
      }}
    >
      <span
        className="absolute left-0 rounded px-1.5 py-[2px] text-[10px] font-semibold whitespace-nowrap text-white"
        style={{
          background: color,
          [side === "top" ? "bottom" : "top"]: "calc(100% + 4px)",
        }}
      >
        {label}
      </span>
    </span>
  );
}

function Phone({
  src,
  name,
  w,
  h,
  alt,
  children,
  dim,
}: {
  src: string;
  name: string;
  w: number;
  h: number;
  alt: string;
  children?: React.ReactNode;
  dim?: boolean;
}) {
  return (
    <div className="grid gap-1.5">
      <span className="text-[11px] text-[#8c8c8c]">{name}</span>
      <div className="relative" style={{ width: w, height: h }}>
        <div
          className={`h-full w-full overflow-hidden rounded-[14px] bg-white ring-1 ring-black/[0.09] transition-all duration-700 ${dim ? "opacity-35 grayscale" : ""}`}
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
        {children}
      </div>
    </div>
  );
}

export function HubMergeFigma() {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  // 0 before · 1 marks on old · 2 after with marks · 3 marks off, pins start · 4–7 pins · 8 done
  const [step, setStep] = useState(0);
  const timers = useRef<number[]>([]);

  const play = () => {
    timers.current.forEach(clearTimeout);
    setStep(0);
    const at = [2000, 4200, 6600, 7200, 7800, 8400, 9000, 9600];
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
        if (reduce) setStep(8);
        else play();
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    const t = timers.current;
    return () => {
      ro.disconnect();
      io.disconnect();
      t.forEach(clearTimeout);
    };
  }, []);

  const phase = step >= 3 ? 3 : step; // which caption
  const tab = Math.min(phase, 2);
  const marksOld = step >= 1 && step < 3;
  const showAfter = step >= 2;
  const marksNew = step === 2;
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
        {/* step tabs, like a Figma page switcher */}
        <div className="absolute top-5 left-6 flex items-center gap-1 rounded-lg border border-[#e2e2e2] bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          {["Before", "What moved", "After"].map((t, i) => {
            const on = tab === i;
            return (
              <span
                key={t}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors duration-300 ${on ? "bg-[#1e1e1e] text-white" : "text-[#8c8c8c]"}`}
              >
                <span
                  className={`grid size-4 place-items-center rounded-full text-[10px] ${on ? "bg-white text-[#1e1e1e]" : "bg-[#efefef] text-[#8c8c8c]"}`}
                >
                  {i + 1}
                </span>
                {t}
              </span>
            );
          })}
        </div>

        {/* Before */}
        <div className="absolute top-[88px] left-6 rounded-md border border-[#e2e2e2] bg-white px-[18px] pt-[14px] pb-6">
          <span className="inline-block rounded bg-[#e6e6e6] px-2 py-[3px] text-[11px] font-medium text-[#1e1e1e]">
            Before · 2 screens
          </span>
          <div className="mt-[14px] flex items-start gap-3">
            <Phone
              src="hub-old-list"
              name="1 · Hub list"
              w={OLD.w}
              h={OLD.h}
              alt="Old app: list of hubs by name"
              dim={step >= 3}
            >
              <Mark
                show={marksOld || marksNew}
                color={BLUE}
                label="Map"
                at={BOX.listMap}
                w={OLD.w}
                h={OLD.h}
              />
            </Phone>
            <div className="mt-[150px] text-[#b3b3b3]" aria-hidden="true">
              <svg width="18" height="12" viewBox="0 0 18 12">
                <path
                  d="M1 6h14M11 2l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Phone
              src="hub-old-detail"
              name="2 · Hub detail"
              w={OLD.w}
              h={OLD.h}
              alt="Old app: one hub's details on a second screen"
              dim={step >= 3}
            >
              <Mark
                show={marksOld || marksNew}
                color={ORANGE}
                label="Hub details"
                at={BOX.detailInfo}
                w={OLD.w}
                h={OLD.h}
              />
            </Phone>
          </div>
        </div>

        {/* connector */}
        <div
          className={`absolute top-[290px] left-[384px] grid justify-items-center gap-1.5 ${ease} ${showAfter ? "opacity-100" : "opacity-0"}`}
        >
          <svg width="56" height="16" viewBox="0 0 56 16" aria-hidden="true">
            <path
              d="M2 8 H50 M42 2 L50 8 L42 14"
              fill="none"
              stroke={BLUE}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="70"
              strokeDashoffset={showAfter ? 0 : 70}
              style={{ transition: "stroke-dashoffset 700ms ease" }}
            />
          </svg>
          <span className="text-[10px] font-medium text-[#0d99ff]">
            one screen
          </span>
        </div>

        {/* After */}
        <div
          className={`absolute top-[70px] left-[452px] rounded-md border border-[#bfe7c9] bg-[#f3fbf5] px-[18px] pt-[14px] pb-6 ${ease} ${showAfter ? "opacity-100" : "translate-y-3 opacity-0"}`}
        >
          <span className="inline-block rounded bg-[#14ae5c] px-2 py-[3px] text-[11px] font-medium text-white">
            After · 1 screen
          </span>
          <div className="mt-[14px]">
            <Phone
              src="hub-new-map"
              name="Pick a hub · Map"
              w={NEW.w}
              h={NEW.h}
              alt="New app: the hub map opening on the nearest hub"
            >
              <Mark
                show={marksNew}
                color={BLUE}
                label="Map"
                at={BOX.newMap}
                w={NEW.w}
                h={NEW.h}
              />
              <Mark
                show={marksNew}
                color={ORANGE}
                label="Hub details"
                at={BOX.newCard}
                w={NEW.w}
                h={NEW.h}
                side="bottom"
              />
              {PINS.map((p) => (
                <span
                  key={p.n}
                  className={`absolute grid size-6 place-items-center rounded-[12px] rounded-bl-[2px] border-2 border-white bg-[#9747ff] text-[11px] font-semibold text-white shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${step >= p.n + 3 ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                  style={{ left: p.x * NEW.w, top: p.y * NEW.h }}
                >
                  {p.n}
                </span>
              ))}
            </Phone>
          </div>
        </div>

        {/* comment threads */}
        <div className="absolute top-[70px] left-[666px] grid w-[176px] gap-2">
          {PINS.map((p) => (
            <div
              key={p.n}
              className={`grid gap-1 rounded-[10px] bg-white p-2.5 shadow-[0_4px_14px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out ${step >= p.n + 3 ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}`}
            >
              <span className="flex items-center gap-1.5">
                <span className="size-4 rounded-full bg-[#9747ff]" />
                <span className="text-[11px] font-semibold text-[#1e1e1e]">
                  Sanskriti
                </span>
                <span className="text-[10px] text-[#8c8c8c]">#{p.n}</span>
              </span>
              <span className="text-[12px] font-semibold text-[#1e1e1e]">
                {p.title}
              </span>
              <span className="text-[11px] leading-[15px] text-[#5c5c5c]">
                {p.sub}
              </span>
            </div>
          ))}
        </div>

        {/* caption, like a note pinned to the canvas */}
        <div className="absolute right-6 bottom-5 left-6 flex items-center gap-3 rounded-lg border border-[#e2e2e2] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#1e1e1e] text-[11px] font-semibold text-white">
            {tab + 1}
          </span>
          <span
            key={phase}
            className="animate-[hmfade_400ms_ease] text-[13px] leading-[18px] text-[#1e1e1e]"
          >
            {STEPS[phase].text}
          </span>
          <button
            type="button"
            onClick={play}
            className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-md border border-[#e2e2e2] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1e1e1e] transition-opacity hover:bg-[#f5f5f5] ${step >= 8 ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
      <style>{`@keyframes hmfade { from { opacity: 0; transform: translateY(3px) } to { opacity: 1; transform: none } }`}</style>
    </div>
  );
}
