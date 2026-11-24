"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PALETTE, buildFrame } from "../../../assets/mascot/mascot.js";

// The footer noren with Sanskriti's socials on its three panels (X · LinkedIn · Instagram).
// Same drawing as NOREN in art.ts (220×76: a wooden rod and three red panels, a steaming bowl
// on the middle one), split into parts so each panel can move on its own.
// Four interactions to compare (lab page /lab/footer-socials):
//   part   – hovering a panel pushes it aside, like walking through, and the logo is behind it
//   crest  – hovering a panel makes it sway and its printed crest turns into the logo
//   tags   – hovering the noren lifts it in a breeze and three wooden tags pop up on the rod
//   enter  – clicking the noren swings all three panels open onto a lit doorway with the links
//   peek   – hovering a panel: pixel Sanskriti pops up over the rod and the crest turns into the logo
export type NorenVariant = "part" | "crest" | "tags" | "enter" | "peek";

export type Social = { name: string; href: string; icon: "x" | "linkedin" | "instagram" };

const RED = "#c8432e";
const RED_DARK = "#a83623";
const RED_LIGHT = "#d9614a";
const CREAM = "#fdf3ea";
const WOOD = "#a8703f";
const WOOD_DARK = "#8a5730";
const PANEL_X = [22, 81, 140];
const PANEL_W = 58;
const PANEL_TOP = 8;
const PANEL_H = 62;

export function SocialIcon({ icon, className = "" }: { icon: Social["icon"]; className?: string }) {
  if (icon === "x")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z"
        />
      </svg>
    );
  if (icon === "linkedin")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <rect x="2.5" y="9" width="4.2" height="12.5" rx="0.6" fill="currentColor" />
        <circle cx="4.6" cy="4.6" r="2.4" fill="currentColor" />
        <path
          fill="currentColor"
          d="M9.4 9h4v1.75c.6-1.05 1.95-2.05 4-2.05 3.75 0 4.4 2.35 4.4 5.45v7.35h-4.15v-6.45c0-1.55-.05-3.2-2.05-3.2-2.05 0-2.35 1.55-2.35 3.1v6.55H9.4z"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
    </svg>
  );
}

// one cloth panel, 58×62, with the wavy hem, the darker top band and a soft fold highlight
function Cloth({ crest }: { crest?: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${PANEL_W} ${PANEL_H}`} className="block size-full overflow-visible" aria-hidden="true">
      <path d="M0 0 H58 V58 Q44 62 29 58 Q14 62 0 58Z" fill={RED} />
      <rect width="58" height="5" fill={RED_DARK} />
      <rect x="3" y="6" width="3" height="48" fill={RED_LIGHT} opacity="0.6" />
      {crest}
    </svg>
  );
}

// the steaming bowl printed on the middle panel (panel coordinates)
const Bowl = () => (
  <g fill="none" stroke={CREAM} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 32 H46 Q45 45 29 45 Q13 45 12 32Z" strokeWidth="3" />
    <path d="M20 26 q-3 -4 0 -8 t0 -8 M29 26 q-3 -4 0 -8 t0 -8 M38 26 q-3 -4 0 -8 t0 -8" strokeWidth="2.6" />
  </g>
);

function Rod() {
  return (
    <svg viewBox="0 0 220 12" className="absolute inset-x-0 top-0 z-20 block h-[12px] w-full" aria-hidden="true">
      <rect x="4" y="3" width="212" height="6" rx="3" fill={WOOD} />
      <rect x="2" y="2" width="8" height="8" rx="2" fill={WOOD_DARK} />
      <rect x="210" y="2" width="8" height="8" rx="2" fill={WOOD_DARK} />
    </svg>
  );
}

// touch screens have no hover, so the hover versions start "open enough" there
function useCanHover() {
  const [can, setCan] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const set = () => setCan(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return can;
}

// a small paper label that pops up over the rod above a panel
function Tip({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-head px-2 py-0.5 text-[11px] leading-4 whitespace-nowrap text-bg shadow-[0_4px_10px_-6px_rgba(0,0,0,0.5)]"
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function SocialNoren({ variant, socials }: { variant: NorenVariant; socials: Social[] }) {
  const props = { socials };
  return (
    <div className="relative h-[76px] w-[220px]">
      <Rod />
      {variant === "part" && <Part {...props} />}
      {variant === "crest" && <Crest {...props} />}
      {variant === "tags" && <Tags {...props} />}
      {variant === "enter" && <Enter {...props} />}
      {variant === "peek" && <Peek {...props} />}
    </div>
  );
}

const slot = (i: number) => ({ left: PANEL_X[i], top: PANEL_TOP, width: PANEL_W, height: PANEL_H });

// A · part: the panel bunches up to one side, like a hand pushing through, showing the logo behind
function Part({ socials }: { socials: Social[] }) {
  const canHover = useCanHover();
  const still = useReducedMotion();
  const [on, setOn] = useState<number | null>(null);
  return (
    <>
      {socials.map((s, i) => {
        const open = on === i || !canHover;
        const fromRight = i === 2;
        return (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            className="absolute z-10 block outline-none"
            style={slot(i)}
            onMouseEnter={() => setOn(i)}
            onMouseLeave={() => setOn(null)}
            onFocus={() => setOn(i)}
            onBlur={() => setOn(null)}
          >
            {/* the doorway behind the cloth: warm dark, with the logo in cream */}
            <span className="absolute inset-x-[3px] top-[4px] bottom-[6px] grid place-items-center rounded-b-[3px] bg-[#3b2018] text-[#fdf3ea] shadow-[inset_0_6px_10px_rgba(0,0,0,0.45)]">
              <SocialIcon icon={s.icon} className="size-[22px]" />
            </span>
            <motion.span
              className="absolute inset-0 block"
              style={{ originX: fromRight ? 1 : 0, originY: 0 }}
              animate={
                open && !still
                  ? { scaleX: canHover ? 0.22 : 0.3, skewY: fromRight ? -5 : 5, rotate: fromRight ? 3 : -3 }
                  : open
                    ? { scaleX: 0.22 }
                    : { scaleX: 1, skewY: 0, rotate: 0 }
              }
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Cloth crest={i === 1 && !open ? <Bowl /> : undefined} />
            </motion.span>
            <Tip show={on === i}>{s.name} ↗</Tip>
          </a>
        );
      })}
    </>
  );
}

// B · crest: the panel sways and its printed crest turns into the logo
function Crest({ socials }: { socials: Social[] }) {
  const canHover = useCanHover();
  const still = useReducedMotion();
  const [on, setOn] = useState<number | null>(null);
  return (
    <>
      {socials.map((s, i) => {
        const open = on === i || !canHover;
        return (
          <motion.a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            className="absolute z-10 block outline-none"
            style={{ ...slot(i), originY: 0 }}
            animate={on === i && !still ? { rotate: [0, 5, -3.5, 2, 0], skewX: [0, -4, 3, -1, 0] } : { rotate: 0, skewX: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            onMouseEnter={() => setOn(i)}
            onMouseLeave={() => setOn(null)}
            onFocus={() => setOn(i)}
            onBlur={() => setOn(null)}
          >
            <Cloth crest={i === 1 ? <motion.g animate={{ opacity: open ? 0 : 1 }}><Bowl /></motion.g> : undefined} />
            <motion.span
              className="absolute inset-0 grid place-items-center pb-1 text-[#fdf3ea]"
              initial={false}
              animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.6, filter: open ? "blur(0px)" : "blur(3px)" }}
              transition={{ duration: 0.3 }}
            >
              <SocialIcon icon={s.icon} className="size-[22px]" />
            </motion.span>
            <Tip show={on === i}>{s.name} ↗</Tip>
          </motion.a>
        );
      })}
    </>
  );
}

// a little wooden tag with a red string, for the tags and enter versions
function WoodTag({ s, className = "" }: { s: Social; className?: string }) {
  return (
    <span
      className={`flex items-center gap-1.5 rounded-[5px] border border-[#7a4a25] bg-[linear-gradient(180deg,#e6c592_0%,#c9975c_100%)] px-2 py-1 text-[11px] leading-4 whitespace-nowrap text-[#4a2a12] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_4px_8px_-4px_rgba(60,30,10,0.6)] ${className}`}
    >
      <SocialIcon icon={s.icon} className="size-3" />
      {s.name}
    </span>
  );
}

// C · tags: the noren lifts in a breeze and three wooden tags pop up on strings above the rod
function Tags({ socials }: { socials: Social[] }) {
  const canHover = useCanHover();
  const still = useReducedMotion();
  const [open, setOpen] = useState(false);
  const show = open || !canHover;
  return (
    <div
      className="absolute inset-x-0 -top-[64px] bottom-0"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute z-10 block"
          style={{ ...slot(i), top: PANEL_TOP + 64, originY: 0 }}
          animate={open && !still ? { skewX: [0, -10, -6, -12, -7], scaleY: [1, 0.94, 0.97, 0.93, 0.96] } : { skewX: 0, scaleY: 1 }}
          transition={open ? { duration: 1.6, delay: i * 0.08, ease: "easeInOut" } : { duration: 0.6 }}
        >
          <Cloth crest={i === 1 ? <Bowl /> : undefined} />
        </motion.span>
      ))}
      {socials.map((s, i) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className="absolute z-0 grid justify-items-center outline-none"
          style={{ left: 110 + (i - 1) * 100, top: 64 + 6, x: "-50%", originY: 1 }}
          initial={false}
          animate={show ? { y: -58, opacity: 1, rotate: still ? 0 : [0, (i - 1) * 6 || 4, -(i - 1) * 3 || -2, 0] } : { y: 0, opacity: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 17, delay: show ? i * 0.06 : 0, rotate: { duration: 1.1, delay: 0.15 + i * 0.06 } }}
          tabIndex={0}
        >
          <WoodTag s={s} />
          {/* the string tying the tag to the rod */}
          <span aria-hidden="true" className="h-[30px] w-px bg-[#b4321f]" />
        </motion.a>
      ))}
    </div>
  );
}

// D · enter: click the noren and its panels swing apart onto a warm lit doorway with the three links
function Enter({ socials }: { socials: Social[] }) {
  const still = useReducedMotion();
  const [open, setOpen] = useState(false);
  const swing = [
    { x: -34, rotate: -16, scaleX: 0.5, originX: 0 },
    { scaleY: 0.12, y: -2 },
    { x: 34, rotate: 16, scaleX: 0.5, originX: 1 },
  ];
  return (
    <>
      {/* the doorway behind the noren */}
      <div className="absolute inset-x-[16px] top-[10px] bottom-[2px] overflow-hidden rounded-b-md bg-[radial-gradient(ellipse_at_50%_0%,#ffd9a0_0%,#e9a35d_45%,#8c4a23_100%)] shadow-[inset_0_8px_14px_rgba(60,20,5,0.45)]">
        <AnimatePresence>
          {open && (
            <motion.ul
              className="flex h-full items-end justify-center gap-2 pb-[7px]"
              initial="hide"
              animate="show"
              exit="hide"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
            >
              {socials.map((s) => (
                <motion.li key={s.name} variants={{ hide: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} className="block outline-none" tabIndex={open ? 0 : -1}>
                    <span className="grid size-[44px] place-items-center rounded-full bg-[#fdf3ea] text-[#5a2a14] shadow-[0_3px_8px_-3px_rgba(60,20,5,0.7)] transition-transform hover:-translate-y-0.5 hover:scale-105">
                      <SocialIcon icon={s.icon} className="size-[18px]" />
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close the noren" : "Open the noren to see Sanskriti's socials"}
        onClick={() => setOpen((o) => !o)}
        className={`group absolute inset-x-0 top-0 z-10 h-[24px] cursor-pointer outline-none ${open ? "" : "bottom-0 h-auto"}`}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute block"
            style={{ ...slot(i), originY: 0, originX: (swing[i] as { originX?: number }).originX ?? 0.5 }}
            animate={open ? (still ? { opacity: 0 } : { ...swing[i], opacity: 1 }) : { x: 0, y: 0, rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
            whileHover={open || still ? undefined : { rotate: [0, 2, -1.5, 0], transition: { duration: 0.6 } }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
          >
            <Cloth crest={i === 1 ? <Bowl /> : undefined} />
          </motion.span>
        ))}
        <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 text-[11px] leading-4 whitespace-nowrap text-muted-foreground opacity-80 transition-opacity group-hover:opacity-100">
          {open ? "close ✕" : "peek inside ↓"}
        </span>
      </button>
    </>
  );
}

// Pixel Sanskriti's head and shoulders, cut from the coffee pose (her reference sprite, unchanged),
// so she can peek over the noren rod. Sparkles are left out. 2 screen px per art pixel keeps it chunky.
const CROP = { x: 3, y: 2, w: 56, h: 41 };
const FACE_SCALE = 2;
function faceSvg(blink: boolean) {
  const g = buildFrame("coffee", 0, { blink }) as string[][];
  let rects = "";
  for (let y = CROP.y; y < CROP.y + CROP.h; y++) {
    let x = CROP.x;
    while (x < CROP.x + CROP.w) {
      const c = g[y][x];
      if (c === "." || c === "G") { x++; continue; }
      let run = 1;
      while (x + run < CROP.x + CROP.w && g[y][x + run] === c) run++;
      rects += `<rect x="${x - CROP.x}" y="${y - CROP.y}" width="${run}" height="1" fill="${(PALETTE as Record<string, string>)[c]}"/>`;
      x += run;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CROP.w} ${CROP.h}" width="${CROP.w * FACE_SCALE}" height="${CROP.h * FACE_SCALE}" shape-rendering="crispEdges">${rects}</svg>`;
}
const FACES = typeof window === "undefined" ? null : { open: faceSvg(false), blink: faceSvg(true) };

function Face({ blink }: { blink: boolean }) {
  const svg = (FACES ?? { open: faceSvg(false), blink: faceSvg(true) })[blink ? "blink" : "open"];
  return <span aria-hidden="true" className="block [&_svg]:block" dangerouslySetInnerHTML={{ __html: svg }} />;
}

// E · peek: hover a panel and pixel Sanskriti pops up over the rod above it (a little tilt, a blink),
// while the panel sways and its crest turns into the logo
function Peek({ socials }: { socials: Social[] }) {
  const canHover = useCanHover();
  const still = useReducedMotion();
  const [on, setOn] = useState<number | null>(null);
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    if (on === null) return;
    const t = [window.setTimeout(() => setBlink(true), 700), window.setTimeout(() => setBlink(false), 860)];
    return () => t.forEach(clearTimeout);
  }, [on]);
  const fw = CROP.w * FACE_SCALE;
  const fh = CROP.h * FACE_SCALE;
  return (
    <>
      {/* the face rises from behind the rod; everything below the rod is cut off */}
      <div aria-hidden="true" className="pointer-events-none absolute overflow-hidden" style={{ left: 110 - fw, width: fw * 2, bottom: 76 - 6, height: fh + 12 }}>
        <AnimatePresence>
          {on !== null && (
            <motion.div
              key={on}
              className="absolute bottom-0"
              style={{ left: PANEL_X[on] + PANEL_W / 2 - (110 - fw), x: "-50%", scaleX: on === 2 ? -1 : 1 }}
              initial={{ y: fh * 0.75 }}
              animate={{ y: 0, rotate: still ? 0 : on === 1 ? 0 : on === 0 ? -6 : 6 }}
              exit={{ y: fh * 0.75, transition: { duration: 0.18 } }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <Face blink={blink} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {socials.map((s, i) => {
        const open = on === i || !canHover;
        return (
          <motion.a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            className="absolute z-10 block outline-none"
            style={{ ...slot(i), originY: 0 }}
            animate={on === i && !still ? { rotate: [0, 4, -3, 1.5, 0] } : { rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            onPointerEnter={(e) => e.pointerType === "mouse" && setOn(i)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setOn(null)}
            onFocus={() => setOn(i)}
            onBlur={() => setOn(null)}
          >
            <Cloth crest={i === 1 ? <motion.g animate={{ opacity: open ? 0 : 1 }}><Bowl /></motion.g> : undefined} />
            <motion.span
              className="absolute inset-0 grid place-items-center pb-1 text-[#fdf3ea]"
              initial={false}
              animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.6 }}
              transition={{ duration: 0.25 }}
            >
              <SocialIcon icon={s.icon} className="size-[22px]" />
            </motion.span>
          </motion.a>
        );
      })}
    </>
  );
}
