"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CASE, GIRL } from "../../../assets/footer/sprites.js";

// The footer's sign-off scene, from Sanskriti's footer reference: "One last thing", the hire-me line
// with "Japan trip." underlined in red, a Calendly button, pixel Sanskriti resting her chin on her
// hands (with her heart mug and a speech bubble that cycles her socials), and her travel suitcase
// whose stickers are her socials. (Mount Fuji was removed at her request.)

export type Social = { name: string; href: string; icon: "x" | "linkedin" | "instagram" };

// ---------- pixel art ----------
// Every sprite layer is a grid of palette keys ('.' = empty), drawn as inline SVG rects with
// crispEdges, like the home mascot. (An <img> of the same SVG was rasterised and then scaled, which
// looked soft on Retina screens; inline SVG stays sharp at any size.)
const cache = new Map<string, string>();
function pixelSvg(rows: string[], palette: Record<string, string>) {
  const key = JSON.stringify(palette) + rows.join("\n"); // same grid in another palette (night) is another drawing
  let svg = cache.get(key);
  if (svg) return svg;
  const H = rows.length;
  const W = [...rows[0]].length;
  let rects = "";
  rows.forEach((row, y) => {
    const cells = [...row];
    for (let x = 0; x < W; ) {
      const c = cells[x];
      if (c === ".") { x++; continue; }
      let run = 1;
      while (x + run < W && cells[x + run] === c) run++;
      rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${palette[c]}"/>`;
      x += run;
    }
  });
  svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="100%" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects}</svg>`;
  cache.set(key, svg);
  return svg;
}

function Layer({ rows, palette, className = "" }: { rows: string[]; palette: Record<string, string>; className?: string }) {
  return <span className={`pointer-events-none absolute inset-0 block [&>svg]:block ${className}`} dangerouslySetInnerHTML={{ __html: pixelSvg(rows, palette) }} />;
}

// ---------- pixel Sanskriti ----------
// ---------- the speech bubble: a heart, then her socials, one a second ----------
// Drawn here as clean pixel art (the bubble in the reference was soft and uneven).
// Keys: a = outline, o = cream fill, s = soft shade inside the bottom edge, X = icon ink.
const BUBBLE_ROWS = [
  "...XXXXXXXXXXX...",
  "..XoooooooooooX..",
  ".XoooooooooooooX.",
  "XoooooooooooooooX",
  "XoooooooooooooooX",
  "XoooooooooooooooX",
  "XoooooooooooooooX",
  "XoooooooooooooooX",
  "XoooooooooooooooX",
  "XoooooooooooooooX",
  "XsssssssssssssssX",
  ".XsssssssssssssX.",
  "..XooXXXXXXXXXX..",
  "..XoX............",
  "..XX.............",
];
// 9×9 pixel icons, drawn at the bubble's centre (columns 4–12, rows 2–10)
const ICONS: Record<"heart" | Social["icon"], { rows: string[]; ink: string }> = {
  heart: {
    ink: "#b3302c",
    rows: [".XX...XX.", "XXXX.XXXX", "XXXXXXXXX", "XXXXXXXXX", ".XXXXXXX.", "..XXXXX..", "...XXX...", "....X....", "........."],
  },
  x: {
    ink: "#251513",
    // one thick stroke and one thin, like the X logo
    rows: ["XX......X", ".XX....X.", "..XX..X..", "...XXX...", "....XX...", "...X.XX..", "..X...XX.", ".X.....XX", "X.......X"],
  },
  linkedin: {
    ink: "#2867b2",
    rows: [".XXXXXXX.", "XXXXXXXXX", "X.XXXXXXX", "XXXXXXXXX", "X.X....XX", "X.X.XX.XX", "X.X.XX.XX", "X.X.XX.XX", ".XXXXXXX."],
  },
  instagram: {
    ink: "#c43a6e",
    // rounded frame, the lens ring, and the little dot on its own in the top corner
    rows: [".XXXXXXX.", "X.....X.X", "X.......X", "X..XXX..X", "X.X...X.X", "X.X...X.X", "X..XXX..X", "X.......X", ".XXXXXXX."],
  },
};
const BUBBLE_W = BUBBLE_ROWS[0].length;
const BUBBLE_H = BUBBLE_ROWS.length;
function bubbleGrid(icon: keyof typeof ICONS) {
  const g = BUBBLE_ROWS.map((r) => [...r]);
  ICONS[icon].rows.forEach((row, y) => [...row].forEach((c, x) => { if (c === "X") g[2 + y][4 + x] = "i"; }));
  return g.map((r) => r.join(""));
}
const bubblePalette = (icon: keyof typeof ICONS) => ({ X: "#251513", o: "#fdf3e4", s: "#f1dfc6", i: ICONS[icon].ink });

// cycles heart → each social, one a second; clicking takes you to the social on show.
// Hovering or focusing it holds the current one so it's easy to click.
function SpeechBubble({ socials, className = "", style }: { socials: Social[]; className?: string; style?: React.CSSProperties }) {
  const still = useReducedMotion();
  const steps: ("heart" | Social)[] = ["heart", ...socials];
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % steps.length), 1000);
    return () => window.clearInterval(t);
  }, [held, steps.length]);
  const step = steps[i];
  const icon = step === "heart" ? "heart" : step.icon;
  const body = (
    <motion.span
      key={icon}
      className="relative block size-full"
      initial={still ? false : { scale: 0.8, y: 2 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 600, damping: 18 }}
    >
      <Layer rows={bubbleGrid(icon)} palette={bubblePalette(icon)} />
    </motion.span>
  );
  const hold = { onPointerEnter: () => setHeld(true), onPointerLeave: () => setHeld(false), onFocus: () => setHeld(true), onBlur: () => setHeld(false) };
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ ...style, aspectRatio: `${BUBBLE_W} / ${BUBBLE_H}` }}
      animate={still ? undefined : { y: ["0%", "-8%", "0%"] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {step === "heart" ? (
        <span className="block size-full" {...hold}>{body}</span>
      ) : (
        <a
          href={step.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${step.name} (opens in a new tab)`}
          className="group block size-full cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#c23a2b]"
          {...hold}
        >
          {body}
          <span className="pointer-events-none absolute top-1/2 left-full ml-1.5 -translate-y-1/2 rounded-md bg-head px-2 py-0.5 text-[11px] leading-4 whitespace-nowrap text-bg opacity-0 shadow-[0_4px_10px_-6px_rgba(0,0,0,0.5)] transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {step.name} ↗
          </span>
        </a>
      )}
    </motion.div>
  );
}

export function PixelGirl({ className = "", socials = [] }: { className?: string; socials?: Social[] }) {
  const still = useReducedMotion();
  const loop = (d: number, delay = 0) => ({ duration: d, delay, repeat: Infinity, ease: "easeInOut" as const });
  // her eyes are closed in a smile (^ ^); every 7–12 s she opens them for a couple of seconds, with a blink
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (still) return;
    let timer = 0;
    const steps: [boolean, number][] = [[true, 1100], [false, 140], [true, 1200], [false, 0]];
    const cycle = () => {
      timer = window.setTimeout(() => {
        let i = 0;
        const run = () => {
          const [o, ms] = steps[i++];
          setOpen(o);
          timer = window.setTimeout(i < steps.length ? run : cycle, ms);
        };
        run();
      }, 7000 + Math.random() * 5000);
    };
    cycle();
    return () => window.clearTimeout(timer);
  }, [still]);
  return (
    <div className={className || "relative"} style={{ aspectRatio: `${GIRL.w} / ${GIRL.h}` }} role="group" aria-label="Pixel-art Sanskriti resting her chin on her hands, smiling">
      <Layer rows={GIRL.body} palette={GIRL.palette} />
      {/* steam curling up from her mug */}
      <motion.div className="absolute inset-0" animate={still ? undefined : { y: ["0%", "-2%", "0%"], opacity: [0.95, 0.55, 0.95] }} transition={loop(3.2)}>
        <Layer rows={GIRL.steam} palette={GIRL.palette} />
      </motion.div>
      {open && <Layer rows={GIRL.eyes} palette={GIRL.palette} />}
      {/* two four-point sparkles twinkle in turn */}
      <motion.div className="absolute inset-0" animate={still ? undefined : { opacity: [1, 0.15, 1, 1] }} transition={{ ...loop(2.4), times: [0, 0.25, 0.5, 1] }}>
        <Layer rows={GIRL.sparkleBig} palette={GIRL.palette} />
      </motion.div>
      <motion.div className="absolute inset-0" animate={still ? undefined : { opacity: [1, 1, 0.15, 1] }} transition={{ ...loop(2.4), times: [0, 0.5, 0.75, 1] }}>
        <Layer rows={GIRL.sparkleSmall} palette={GIRL.palette} />
      </motion.div>
      {/* the speech bubble by her head: a heart, then her socials, one a second (3px cells: 51px wide) */}
      <SpeechBubble socials={socials} className="z-10 w-[51px]" style={{ left: "72%", top: "2%" }} />
    </div>
  );
}

// ---------- the suitcase: its stickers are the socials ----------
function SocialIcon({ icon, className = "" }: { icon: Social["icon"]; className?: string }) {
  if (icon === "x")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path fill="currentColor" d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" />
      </svg>
    );
  if (icon === "linkedin")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <rect x="2.5" y="9" width="4.2" height="12.5" rx="0.6" fill="currentColor" />
        <circle cx="4.6" cy="4.6" r="2.4" fill="currentColor" />
        <path fill="currentColor" d="M9.4 9h4v1.75c.6-1.05 1.95-2.05 4-2.05 3.75 0 4.4 2.35 4.4 5.45v7.35h-4.15v-6.45c0-1.55-.05-3.2-2.05-3.2-2.05 0-2.35 1.55-2.35 3.1v6.55H9.4z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="17.3" cy="6.7" r="1.4" fill="currentColor" />
    </svg>
  );
}

// touch screens have no hover, so there the stickers rest a little peeled, logos peeking out
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

type StickerName = keyof typeof CASE.stickers;

export function PixelSuitcase({ links, className = "" }: { links: Partial<Record<StickerName, Social>>; className?: string }) {
  const canHover = useCanHover();
  const still = useReducedMotion();
  const [on, setOn] = useState<StickerName | null>(null);
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  return (
    <div className={className || "relative"} style={{ aspectRatio: `${CASE.w} / ${CASE.h}` }}>
      <Layer rows={CASE.body} palette={CASE.palette} />
      {(Object.keys(CASE.stickers) as StickerName[]).map((name) => {
        const { rows, box } = CASE.stickers[name];
        const [y0, y1, x0, x1] = box;
        const social = links[name];
        const peeled = !!social && (on === name || !canHover);
        const area = { top: pct(y0, CASE.h), left: pct(x0, CASE.w), width: pct(x1 - x0 + 1, CASE.w), height: pct(y1 - y0 + 1, CASE.h) };
        return (
          <div key={name}>
            {/* the logo printed on the case, under the sticker */}
            {social && (
              <span aria-hidden="true" className="absolute grid place-items-center text-[#5a2a14]" style={area}>
                <SocialIcon icon={social.icon} className="size-[62%]" />
              </span>
            )}
            {/* the sticker: peels up from its top-left corner */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ originX: (x0 / CASE.w).toFixed(3), originY: (y0 / CASE.h).toFixed(3) }}
              animate={
                peeled
                  ? still
                    ? { opacity: 0 }
                    : { rotate: canHover ? -38 : -14, y: canHover ? -3 : 0, filter: "drop-shadow(1px 3px 2px rgba(60,30,10,0.35))" }
                  : { rotate: 0, y: 0, opacity: 1, filter: "drop-shadow(0px 0px 0px rgba(60,30,10,0))" }
              }
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Layer rows={rows} palette={CASE.palette} />
            </motion.div>
            {social && (
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="absolute z-10 block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#c23a2b]"
                style={area}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOn(name)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setOn(null)}
                onFocus={() => setOn(name)}
                onBlur={() => setOn(null)}
              >
                {on === name && canHover && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 rounded-md bg-head px-2 py-0.5 text-[11px] leading-4 whitespace-nowrap text-bg shadow-[0_4px_10px_-6px_rgba(0,0,0,0.5)]"
                  >
                    {social.name} ↗
                  </motion.span>
                )}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------- the heading, underline and button ----------
// `calendly` is null until her link is in: the button then shows but isn't a link yet
export function HireHeading({ calendly }: { calendly: string | null }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  const still = useReducedMotion();
  const draw = (delay: number) => ({ initial: { pathLength: still ? 1 : 0 }, animate: seen ? { pathLength: 1 } : undefined, transition: { duration: 0.7, delay, ease: "easeOut" as const } });
  return (
    <div className="relative z-10 mx-auto grid max-w-[520px] justify-items-center gap-4 px-6 text-center">
      <span className="flex items-center gap-4 text-[13px] tracking-[0.24em] text-ink uppercase">
        <span aria-hidden="true" className="h-px w-10 bg-current opacity-70" />
        One last thing
        <span aria-hidden="true" className="h-px w-10 bg-current opacity-70" />
      </span>
      <h2 className="font-serif text-h2m text-balance text-head md:text-h2 xl:text-[44px] xl:leading-[1.12]">
        Hire me, so I can fund my dream{" "}
        <span ref={ref} className="relative inline-block text-[#c23a2b] dark:text-[#ec7a62]">
          Japan trip.
          {/* a hand-drawn underline and two little ticks of excitement */}
          <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-2.5 left-[-2%] h-[10px] w-[104%] overflow-visible">
            <motion.path d="M2 9 C 50 3, 120 2, 198 8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" {...draw(0.2)} />
          </svg>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute -top-3 -right-7 size-6 overflow-visible">
            <motion.path d="M8 14 L15 4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...draw(0.8)} />
            <motion.path d="M11 19 L21 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...draw(0.95)} />
          </svg>
        </span>
      </h2>
      {(() => {
        // skeuomorphic, in the site's own skeu-red (raised, soft red gradient, inner highlight); it lifts a
        // little on hover and presses in on click
        const cls =
          "skeu-red group mt-3 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[14px] tracking-[0.08em] text-[#b4321f] uppercase transition-transform dark:text-[#ec7a62]";
        const label = (
          <>
            Let&apos;s make something good
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </>
        );
        return calendly ? (
          <a
            href={calendly}
            target="_blank"
            rel="noreferrer"
            className={`${cls} hover:-translate-y-0.5 active:translate-y-px active:shadow-[inset_0_2px_5px_rgba(180,50,31,0.22),0_0_0_1px_rgba(200,85,59,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c23a2b]`}
          >
            {label}
          </a>
        ) : (
          <span className={cls}>{label}</span>
        );
      })()}
    </div>
  );
}

// ---------- the whole stage over the belt ----------
const SOCIAL_ORDER: Social["icon"][] = ["x", "linkedin", "instagram"];
// Below xl the sprites sit in a row under the heading; from xl they flank it like the reference.
// Pixel sprites are drawn at whole screen pixels per cell (girl 99 cells: 2px = 198px;
// suitcase 46 cells: 2px) so every pixel is the same size and stays crisp.
export function HireScene({ calendly, stickers }: { calendly: string | null; stickers: Partial<Record<StickerName, Social>> }) {
  return (
    <div className="relative pt-6 pb-[108px] xl:pb-[44px]">
      <HireHeading calendly={calendly} />
      {/* Sanskriti and the bag are tucked ~10px behind the back rail (its top edge is 74px below this stage) */}
      <PixelSuitcase
        links={stickers}
        className="absolute right-[max(20px,calc(50%-300px))] bottom-[-84px] w-[92px] md:right-[max(24px,calc(50%-300px))] xl:right-auto xl:left-[calc(50%+193px)]"
      />
      <PixelGirl socials={SOCIAL_ORDER.map((k) => Object.values(stickers).find((x) => x?.icon === k)).filter((x): x is Social => !!x)} className="absolute bottom-[-84px] left-[max(12px,calc(50%-320px))] w-[198px] xl:left-[calc(50%-440px)]" />
    </div>
  );
}
