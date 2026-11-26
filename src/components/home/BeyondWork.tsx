"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Brush, Gamepad2, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { hand } from "@/components/about/paper";
import { ConsoleArt, PolaroidArt } from "./beyondArt";

// "Beyond product work" (her reference): eyebrow, heading with a red hand-drawn underline, a mono line,
// then two illustrated tiles that lead to the Playground and About pages.
// Motion follows her reference videos, but on hover (her ask): the page blurs and a few real pieces
// from that page spring up out of the tile (≈0.35s, a slight overshoot, then settle) with the name,
// a line and a "View …" button below. Moving off it, Esc or scrolling folds it back into the tile;
// clicking the tile opens the page. On touch screens the first tap opens it.

type Peek = { src: string; w: number; h: number; x: number; y: number; r: number; width: number; caption?: string };
type Item = { id: string; name: string; href: string; line: string; Icon: LucideIcon; Art: () => React.ReactNode; peeks: Peek[] };

// x, y: each piece's centre, from the tile's top centre; width in px (height follows the image)
const ITEMS: Item[] = [
  {
    id: "playground",
    name: "Playground",
    href: "/playground",
    line: "The little experiments I build for fun.",
    Icon: Gamepad2,
    Art: ConsoleArt,
    peeks: [
      { src: "/assets/playground/haloe-card.png", w: 2482, h: 3162, x: -128, y: -128, r: -7, width: 118 },
      { src: "/assets/playground/pixel-buddy-poster.jpg", w: 1920, h: 1150, x: 46, y: -168, r: 3, width: 210 },
      { src: "/assets/playground/mood-poster.jpg", w: 1300, h: 1740, x: 158, y: -78, r: 7, width: 100 },
      { src: "/assets/playground/espresso.png", w: 1544, h: 1544, x: -10, y: -58, r: -3, width: 92 },
    ],
  },
  {
    id: "about",
    name: "About",
    href: "/about",
    line: "My journey and my interests, beyond the screen.",
    Icon: Brush,
    Art: PolaroidArt,
    peeks: [
      { src: "/assets/about/desk-now.jpg", w: 1125, h: 1420, x: -122, y: -122, r: -6, width: 124 },
      { src: "/assets/about/devfest-group.jpg", w: 1400, h: 1050, x: 50, y: -160, r: 3, width: 200 },
      { src: "/assets/about/acrylic-cat-croc.jpg", w: 1125, h: 1000, x: 168, y: -96, r: 7, width: 128 },
      { src: "/assets/about/painting-setup.jpg", w: 1179, h: 1266, x: -222, y: 30, r: -9, width: 112 },
      { src: "/assets/about/github-contributions.jpg", w: 554, h: 316, x: 206, y: 50, r: 8, width: 140 },
    ],
  },
];

const SPRING = { type: "spring" as const, stiffness: 420, damping: 24, mass: 0.8 };

function PeekCard({ p, i, open, reduce }: { p: Peek; i: number; open: boolean; reduce: boolean | null }) {
  const h = (p.width * p.h) / p.w;
  return (
    <motion.div
      className="absolute rounded-[10px] bg-white p-1.5 shadow-[0_18px_40px_-16px_rgba(40,25,10,0.45),0_2px_6px_-2px_rgba(40,25,10,0.2)]"
      style={{ width: p.width + 12, left: p.x - (p.width + 12) / 2, top: p.y - (h + 12) / 2 }}
      initial={{ x: -p.x, y: -p.y + 60, scale: 0.15, rotate: 0, opacity: 0, filter: "blur(6px)" }}
      animate={
        open
          ? { x: 0, y: 0, scale: 1, rotate: p.r, opacity: 1, filter: "blur(0px)", transition: reduce ? { duration: 0 } : { ...SPRING, delay: i * 0.03 } }
          : { x: -p.x, y: -p.y + 60, scale: 0.15, rotate: 0, opacity: 0, filter: "blur(6px)", transition: { duration: reduce ? 0 : 0.24, ease: [0.4, 0, 1, 1] } }
      }
    >
      <Image src={p.src} alt="" width={p.width * 2} height={h * 2} className="block h-auto w-full rounded-[6px]" />
      {p.caption && <span className={`${hand.className} block px-1 pt-1.5 pb-0.5 text-center text-[15px] leading-tight text-[#2B2A28]`}>{p.caption}</span>}
    </motion.div>
  );
}

function Overlay({ item, rect, onClose }: { item: Item; rect: DOMRect; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(true);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    const scroll = () => close();
    window.addEventListener("keydown", key);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("scroll", scroll);
    };
  }, [close]);

  // the cluster is ~460px wide: shrink it on phones and keep it on screen
  const vw = typeof window === "undefined" ? 1200 : window.innerWidth;
  const s = Math.min(1, (vw - 24) / 580);
  const drop = Math.max(0, 250 * s - rect.top);
  const cx = Math.min(Math.max(rect.left + rect.width / 2, 290 * s + 8), vw - 290 * s - 8);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      <motion.div
        className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)] backdrop-blur-[10px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : open ? 0.28 : 0.22 }}
        onAnimationComplete={() => !open && onClose()}
      />
      {/* the pieces, springing out of the tile */}
      <div className="absolute" style={{ left: cx, top: rect.top + drop, transform: `scale(${s})`, transformOrigin: "50% 0" }}>
        {item.peeks.map((p, i) => (
          <PeekCard key={p.src} p={p} i={i} open={open} reduce={reduce} />
        ))}
      </div>
      {/* the tile itself stays sharp above the blur, then the name, line and button */}
      <motion.div
        className="pointer-events-auto absolute grid justify-items-center"
        style={{ left: rect.left, top: rect.top, width: rect.width }}
        initial={{ y: 0 }}
        animate={{ y: open ? -4 : 0 }}
        transition={reduce ? { duration: 0 } : SPRING}
        onMouseLeave={close}
      >
        <Link href={item.href} className="block w-full" aria-label={`View ${item.name}`}>
          <Tile item={item} />
        </Link>
        <motion.div
          className="mt-3 grid justify-items-center gap-2 text-center"
          initial={{ opacity: 0, y: -6 }}
          animate={open ? { opacity: 1, y: 0, transition: { delay: reduce ? 0 : 0.08, duration: 0.25 } } : { opacity: 0, y: -6, transition: { duration: 0.12 } }}
        >
          <span className="font-serif text-h1m text-head md:text-h1">{item.name}</span>
          <span className="printed max-w-[28ch] text-sm text-pretty">{item.line}</span>
          <span className="mt-1">
            <Pill item={item} />
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Tile({ item }: { item: Item }) {
  return (
    <span className="block px-2">
      <item.Art />
    </span>
  );
}

// the label under each tile: a raised pill with the page's icon, its name and a red arrow
function Pill({ item, hidden }: { item: Item; hidden?: boolean }) {
  return (
    <Link
      href={item.href}
      className="skeu group/pill inline-flex items-center gap-3 rounded-full py-2.5 pr-5 pl-4 text-[15px] text-head"
      style={{ visibility: hidden ? "hidden" : "visible" }}
    >
      <item.Icon aria-hidden="true" className="size-5 text-[#7a5236]" strokeWidth={1.8} />
      {item.name}
      <span aria-hidden="true" className="text-[#d9472f] transition-transform duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5">
        ↗
      </span>
    </Link>
  );
}

function Entry({ item, onOpen, hidden }: { item: Item; onOpen: (rect: DOMRect) => void; hidden: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = () => ref.current && onOpen(ref.current.getBoundingClientRect());
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  return (
    <li className="grid justify-items-center gap-4">
      <Link
        ref={ref}
        href={item.href}
        aria-label={`View ${item.name}`}
        onMouseEnter={() => {
          cancel();
          timer.current = setTimeout(open, 120);
        }}
        onMouseLeave={cancel}
        onClick={(e) => {
          // touch screens have no hover: the first tap opens the preview, a tap on it then opens the page
          if (window.matchMedia("(hover: none)").matches && !hidden) {
            e.preventDefault();
            open();
          }
        }}
        className="relative block w-full max-w-[330px]"
        style={{ visibility: hidden ? "hidden" : "visible" }}
      >
        <Tile item={item} />
      </Link>
      <Pill item={item} hidden={hidden} />
    </li>
  );
}

export function BeyondWork() {
  const [active, setActive] = useState<{ item: Item; rect: DOMRect } | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section aria-labelledby="beyond-title" className="pt-24 pb-12 text-center md:pb-20">
      <h2 id="beyond-title" className="font-serif text-h2m text-balance text-head md:text-h2">
        Beyond{" "}
        <span className="relative inline-block">
          product work.
          <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-2 left-[-2%] h-[10px] w-[96%] overflow-visible text-[#c23a2b] dark:text-[#ec7a62]">
            <motion.path
              d="M2 9 C 50 3, 120 2, 198 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            />
          </svg>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute -top-2 -right-6 size-5 overflow-visible text-[#c23a2b] dark:text-[#ec7a62]">
            {["M8 14 L15 4", "M11 19 L21 16"].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.25, delay: 0.8 + i * 0.15 }}
              />
            ))}
          </svg>
        </span>
      </h2>
      <p className="printed mx-auto mt-5 max-w-[60ch] text-balance">
        The other side of my design life – my journey, my interests, and the little experiments I build for fun.
      </p>

      <ul className="mt-12 grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 sm:gap-8">
        {ITEMS.map((item) => (
          <Entry key={item.id} item={item} hidden={active?.item.id === item.id} onOpen={(rect) => setActive({ item, rect })} />
        ))}
      </ul>

      {/* warm the burst's photos once the page has loaded, so the first hover isn't blank */}
      {mounted && (
        <div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 size-px overflow-hidden opacity-0">
          {ITEMS.flatMap((it) => it.peeks).map((p) => (
            <Image key={p.src} src={p.src} alt="" width={p.width * 2} height={((p.width * p.h) / p.w) * 2} loading="eager" />
          ))}
        </div>
      )}
      {mounted && createPortal(<AnimatePresence>{active && <Overlay key={active.item.id} item={active.item} rect={active.rect} onClose={() => setActive(null)} />}</AnimatePresence>, document.body)}
    </section>
  );
}
