"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CASE, GIRL } from "../../../assets/footer/sprites.js";

// The footer's sign-off scene, from Sanskriti's footer reference: "One last thing", the hire-me line
// with "Japan trip." underlined in red, a Calendly button, pixel Sanskriti resting her chin on her
// hands (with her heart mug and a heart bubble), her travel suitcase whose stickers are her socials,
// and Mount Fuji with a red sun and a shinkansen gliding past.

export type Social = { name: string; href: string; icon: "x" | "linkedin" | "instagram" };

// ---------- pixel art ----------
// every sprite layer is a grid of palette keys ('.' = empty), drawn as crisp SVG rects
const cache = new Map<string, string>();
function pixelUrl(rows: string[], palette: Record<string, string>) {
  const key = rows.join("\n");
  let url = cache.get(key);
  if (url) return url;
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
  url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">${rects}</svg>`,
  )}`;
  cache.set(key, url);
  return url;
}

function Layer({ rows, palette, className = "" }: { rows: string[]; palette: Record<string, string>; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={pixelUrl(rows, palette)} alt="" draggable={false} className={`absolute inset-0 size-full [image-rendering:pixelated] ${className}`} />;
}

// ---------- pixel Sanskriti ----------
export function PixelGirl({ className = "" }: { className?: string }) {
  const still = useReducedMotion();
  const loop = (d: number, delay = 0) => ({ duration: d, delay, repeat: Infinity, ease: "easeInOut" as const });
  return (
    <div className={className || "relative"} style={{ aspectRatio: `${GIRL.w} / ${GIRL.h}` }} role="img" aria-label="Pixel-art Sanskriti resting her chin on her hands, smiling">
      <Layer rows={GIRL.body} palette={GIRL.palette} />
      {/* steam curling up from her mug */}
      <motion.div className="absolute inset-0" animate={still ? undefined : { y: ["0%", "-2%", "0%"], opacity: [0.95, 0.55, 0.95] }} transition={loop(3.2)}>
        <Layer rows={GIRL.steam} palette={GIRL.palette} />
      </motion.div>
      {/* the sparkles twinkle */}
      <motion.div className="absolute inset-0" animate={still ? undefined : { opacity: [1, 0.25, 1, 1] }} transition={{ ...loop(2.6, 0.4), times: [0, 0.3, 0.6, 1] }}>
        <Layer rows={GIRL.sparkles} palette={GIRL.palette} />
      </motion.div>
      {/* the heart bubble bobs */}
      <motion.div className="absolute inset-0" animate={still ? undefined : { y: ["0%", "-2.4%", "0%"] }} transition={loop(2.8)}>
        <Layer rows={GIRL.bubble} palette={GIRL.palette} />
      </motion.div>
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

// ---------- Mount Fuji, a red sun, clouds and a shinkansen ----------
function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 18 H62 C66 18 66 10 60 10 C60 3 51 1 47 6 C44 -2 31 -3 28 6 C24 2 16 4 17 11 C10 9 6 13 8 18Z"
      className="fill-bg stroke-[#d4c2ad] dark:stroke-[#5b5566]"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  );
}

export function FujiScene({ className = "" }: { className?: string }) {
  const still = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { margin: "100px" });
  return (
    <svg ref={ref} viewBox="0 0 342 150" aria-hidden="true" className={`overflow-visible ${className}`}>
      <defs>
        <linearGradient id="fuji-slope" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b9c5d6" />
          <stop offset="0.55" stopColor="#a3b2c8" />
          <stop offset="1" stopColor="#8e9fb8" />
        </linearGradient>
        <clipPath id="fuji-track">
          <rect x="0" y="100" width="342" height="40" />
        </clipPath>
      </defs>
      {/* the sun, half behind the peak */}
      <circle cx="140" cy="44" r="40" className="fill-[#e8643c] dark:fill-[#efe0b4]" />
      <Cloud x={22} y={36} s={0.9} />
      <Cloud x={248} y={58} />
      {/* the mountain */}
      <path d="M0 132 C 40 124, 78 92, 112 58 L 124 46 Q 140 40 156 46 L 168 58 C 210 96, 280 126, 342 132Z" fill="url(#fuji-slope)" />
      {/* snow cap with a ragged hem */}
      <path
        d="M112 58 L124 46 Q140 40 156 46 L168 58 L162 66 L156 60 L150 72 L144 62 L138 74 L132 61 L126 70 L121 62Z"
        fill="#fbfbf8"
      />
      <path d="M140 44 L134 70 M146 46 L150 70" stroke="#dfe6ef" strokeWidth="1.2" />
      {/* the ground and the track */}
      <path d="M0 132 H342" stroke="#d9cbb8" strokeWidth="1.2" className="dark:stroke-[#4a4655]" />
      <path d="M10 126 H332" stroke="#cfc2b0" strokeWidth="1" strokeDasharray="5 4" className="dark:stroke-[#4a4655]" />
      {/* the shinkansen glides past now and then */}
      <g clipPath="url(#fuji-track)">
        <motion.g
          initial={{ x: -120 }}
          animate={still || !seen ? { x: 150 } : { x: [-120, 360] }}
          transition={still || !seen ? { duration: 0 } : { duration: 9, ease: "linear", repeat: Infinity, repeatDelay: 5 }}
        >
          <path d="M0 112 H84 C98 112 110 117 114 124 H0Z" fill="#fbfbf8" stroke="#9aa6b6" strokeWidth="0.8" />
          <path d="M0 119 H104 L108 121 H0Z" fill="#2d58a6" />
          {[8, 20, 32, 44, 56, 68].map((x) => (
            <rect key={x} x={x} y="114" width="8" height="3" rx="1" fill="#33435c" />
          ))}
          <path d="M84 113.5 C92 113.5 99 115.5 103 118 H86Z" fill="#33435c" />
        </motion.g>
      </g>
    </svg>
  );
}

// ---------- the heading, underline and button ----------
export function HireHeading({ calendly }: { calendly: string }) {
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
      <a
        href={calendly}
        target="_blank"
        rel="noreferrer"
        className="group mt-3 inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#c23a2b] px-6 py-2.5 text-[14px] tracking-[0.08em] text-[#c23a2b] uppercase transition-colors hover:bg-[#c23a2b] hover:text-[#fffaf3] dark:border-[#ec7a62] dark:text-[#ec7a62] dark:hover:bg-[#ec7a62] dark:hover:text-[#17161e]"
      >
        Let&apos;s make something good
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </a>
    </div>
  );
}

// ---------- the whole stage over the belt ----------
// Below xl the sprites sit in a row under the heading; from xl they flank it like the reference.
export function HireScene({ calendly, stickers }: { calendly: string; stickers: Partial<Record<StickerName, Social>> }) {
  return (
    <div className="relative pt-6 pb-[96px] md:pb-[130px] xl:pb-[44px]">
      <HireHeading calendly={calendly} />
      {/* Fuji sits a little above the belt so its train stays in view; Sanskriti and the bag are tucked behind the back rail */}
      <FujiScene className="absolute right-[max(-24px,calc(50%-330px))] bottom-[-30px] w-[210px] md:right-[max(0px,calc(50%-390px))] md:w-[300px] xl:right-auto xl:left-[calc(50%+284px)] xl:w-[342px]" />
      <PixelSuitcase
        links={stickers}
        className="absolute right-[max(20px,calc(50%-300px))] bottom-[-64px] w-[78px] md:right-[max(24px,calc(50%-300px))] md:w-[92px] xl:right-auto xl:left-[calc(50%+193px)] xl:w-[104px]"
      />
      <PixelGirl className="absolute bottom-[-64px] left-[max(4px,calc(50%-330px))] w-[168px] md:w-[210px] xl:left-[calc(50%-488px)] xl:w-[248px]" />
    </div>
  );
}
