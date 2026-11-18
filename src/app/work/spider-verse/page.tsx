import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HoloTilt, Phone, TemplateFan } from "@/components/spider/Holo";

export const metadata: Metadata = {
  title: "Spider-Verse cards · Sanskriti",
  description: "A playful experiment: turning the thrill of opening a trading card pack into an interactive web experience.",
};

// Spider-Verse cards: a vibe-coded side project. Copy and assets from Sanskriti's Framer case
// study, redesigned to feel like opening a pack: a dark cinematic stage, a holographic tilt
// borrowed from the project itself, a hand of AI card templates and a code window.
const LIVE = "https://spider-verse-cards.netlify.app/";
const VIDEO = "https://x.com/GuptaSanskritii/status/2082887168863920342/video/1";
const INK = "bg-[#0e0a0f] text-[#f4ece6]";

function WebLines() {
  // a faint spider web drawn from the top corner of the stage
  return (
    <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMidYMin slice" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]">
      <g stroke="#e3342f" strokeWidth="0.6" fill="none">
        {[0, 15, 30, 45, 60, 75, 90].map((a) => {
          const r = (a * Math.PI) / 180;
          return <line key={a} x1="400" y1="0" x2={400 - Math.cos(r) * 520} y2={Math.sin(r) * 520} />;
        })}
        {[60, 120, 180, 250, 330].map((r) => (
          <path key={r} d={`M${400 - r} 0 Q ${400 - r * 0.72} ${r * 0.3} ${400 - r * 0.7} ${r * 0.7} Q ${400 - r * 0.3} ${r * 0.72} 400 ${r}`} />
        ))}
      </g>
    </svg>
  );
}

const BEATS = [
  ["01", "Open", "the pack"],
  ["02", "Wait", "the suspense!"],
  ["03", "Reveal", "omg!"],
  ["04", "Happiness", "every time"],
];

const FLOW = [
  ["01", "Tap “Reveal my spider”", "start"],
  ["02", "A red web pulls you into the deck", "0.5s"],
  ["03", "The deck wakes into a ring", "0.9s"],
  ["04", "Cards orbit and weave", "5.8s"],
  ["05", "One card is pulled out", "settle"],
  ["06", "Your card, in your colors", "reveal"],
];

const STEPS = [
  ["AI template", "The frame, slots and stat bars"],
  ["Character art", "Placed and blended into each frame"],
  ["Name, subtitle and Earth", "Peter Parker, Earth-616, #001"],
  ["One color story per card", "Later reused to tint the whole screen"],
];

const CODE = `// HolographicCard.tsx
const MAX_TILT = 12
const SPRING = { stiffness: 150, damping: 18 }

const onMove = (e) => {
  const nx = (e.clientX - rect.left) / rect.width
  const ny = (e.clientY - rect.top) / rect.height
  rotateY.set((nx * 2 - 1) * MAX_TILT)
  rotateX.set(-(ny * 2 - 1) * MAX_TILT)
  lightX.set(nx * 100)  // the shine follows your finger
}`;

const FILES = ["spider-verse-cards", "  src", "    components", "      LandingStage.tsx", "      CardOrbitStage.tsx", "      HolographicCard.tsx", "      ShareCard.tsx", "    lib", "      shufflePhysics.ts", "      motion.ts", "    data", "      cards.ts"];

function Label({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <span className={`label ${dark ? "!text-[#f4ece6]/60" : ""}`}>{children}</span>;
}

export default function SpiderVerse() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6">
      <div className="mx-auto max-w-[826px]">
        <Nav />
      </div>

      <Link href="/#vibe" className="label !text-ink underline-offset-4 hover:underline">
        ← All work
      </Link>

      {/* the stage */}
      <section className={`relative mt-6 overflow-hidden rounded-[28px] ${INK} px-6 pt-14 pb-0 md:px-14`}>
        <WebLines />
        <div className="relative grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div className="grid gap-5 pb-14">
            <span className="w-fit rounded-full border border-[#e3342f]/50 bg-[#e3342f]/10 px-3 py-1 text-sm text-[#ff8a80]">
              <a href={LIVE} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                Live at spider-verse-cards.netlify.app ↗
              </a>
            </span>
            <h1 className="font-serif text-h2 text-balance text-white">What if the Spider‑Verse chose you?</h1>
            <p className="text-base leading-relaxed text-[#f4ece6]/75">
              A playful side project where I turned the thrill of opening a trading card pack into an interactive web experience. Designed in Figma, explored with ChatGPT,
              vibecoded in Cursor.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                ["Figma", "Designed"],
                ["ChatGPT", "Explored"],
                ["Cursor", "Vibecoded"],
              ].map(([tool, verb]) => (
                <span key={tool} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  <span className="block text-white">{tool}</span>
                  <span className="text-[#f4ece6]/55">{verb}</span>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href={LIVE} target="_blank" rel="noreferrer" className="rounded-full bg-[#e3342f] px-5 py-2.5 text-sm text-white shadow-[0_10px_30px_-10px_rgba(227,52,47,0.9)] transition hover:-translate-y-0.5">
                Reveal my spider ↗
              </a>
              <a href={VIDEO} target="_blank" rel="noreferrer" className="text-sm text-[#f4ece6]/70 underline-offset-4 hover:underline">
                Watch the video on X ↗
              </a>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-5 sm:grid-cols-4">
              {[
                ["Role", "Design, prompts, build"],
                ["Type", "Personal experiment"],
                ["Platform", "Web + iOS app"],
                ["Cards", "7 Spider-People, 7 Earths"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="label !text-[#f4ece6]/50">{k}</dt>
                  <dd className="mt-1 text-sm text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {/* the three screens; the reveal tilts toward you */}
          <div className="relative flex items-end justify-center gap-3 self-end">
            <Phone src="/assets/cases/spider/s-landing.webp" alt="Landing: the Spider-Verse chooses you" className="w-[33%] translate-y-6 -rotate-6 opacity-85" />
            <HoloTilt className="z-10 w-[44%]" rounded="rounded-[34px]">
              <Phone src="/assets/cases/spider/s-reveal.webp" alt="The reveal: your Spider-Verse card" />
            </HoloTilt>
            <Phone src="/assets/cases/spider/s-orbit.webp" alt="Cards orbiting before the pick" className="w-[33%] translate-y-6 rotate-6 opacity-85" />
          </div>
        </div>
        <p className="relative pb-4 text-center font-worn text-base text-[#f4ece6]/60">hover the middle card ✦ it tilts like the real one</p>
      </section>

      <div className="mx-auto grid max-w-[760px] gap-32 py-28">
        {/* the spark */}
        <section className="grid gap-6">
          <Label>The spark</Label>
          <h2 className="font-serif text-h2m text-head md:text-h2">It started with a childhood obsession.</h2>
          <p className="printed text-pretty">
            I grew up collecting trading cards. The best part was never the card itself. It was the few seconds before you saw it: the anticipation, the surprise, the joy of
            meeting a new character.
          </p>
          <p className="font-worn text-h1 text-head">I wanted to see if I could recreate that feeling on the web, with the Spider-Verse.</p>
          {/* a four-panel comic strip */}
          <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {BEATS.map(([n, a, b], i) => (
              <li key={n} className="relative grid aspect-[4/5] content-between rounded-xl border-2 border-head bg-bg p-3" style={{ rotate: `${[-1.5, 1, -0.5, 1.5][i]}deg` }}>
                <span className="label">{n}</span>
                <span aria-hidden="true" className="text-center text-[44px] leading-none">
                  {["📦", "⏳", "🕷️", "✨"][i]}
                </span>
                <span>
                  <span className="block font-serif text-lg text-head">{a}</span>
                  <span className="font-worn text-base text-[#c8402c]">{b}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* asking AI */}
        <section className="grid gap-6">
          <Label>Okay, let&apos;s ask AI</Label>
          <h2 className="font-serif text-h2m text-head md:text-h2">Words first, not pixels.</h2>
          <p className="printed text-pretty">
            I sketched the card skeleton myself, with a placeholder hero called “The Crimson Warden”, and asked ChatGPT to fill it in for each of my seven Spider-People.
            Every reply came back as a text wireframe: the type badge, what the art should show, a short bio, three stats and a signature ability. These became the spec for
            every card in Figma.
          </p>
          {/* the conversation */}
          <div className="grid gap-3 rounded-3xl border border-line bg-surface/50 p-5">
            <span className="label">ChatGPT · Card templates</span>
            <p className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-head px-4 py-3 text-sm leading-relaxed text-bg">
              Can you make a trading card template inspired by Pokémon cards? Futuristic and holographic. Leave the character area empty, I&apos;ll add the art myself. Include
              space for name, type and powers.
            </p>
            {/* ChatGPT's answer: the templates themselves */}
            <div className="flex max-w-[78%] gap-1.5 rounded-2xl rounded-bl-md border border-line bg-bg p-2.5">
              {["peter", "miles", "gwen", "miguel", "noir", "punk", "ham"].map((t) => (
                <Image key={t} src={`/assets/cases/spider/t-${t}.webp`} alt="" width={593} height={900} sizes="60px" className="h-auto w-[13%] rounded-[4px]" />
              ))}
            </div>
          </div>
          <div className="relative w-fit max-w-[52ch] bg-[#fff7dc] px-5 pt-6 pb-4 shadow-[0_10px_20px_-14px_rgba(80,60,20,0.5)]" style={{ rotate: "-1.2deg" }}>
            <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-[#f4c7bd]/80" />
            <span className="label mb-1 block !text-[#c8402c]">The catch</span>
            <p className="font-serif text-lg text-ink">
              ChatGPT couldn&apos;t create the actual Spider-Verse characters because they&apos;re copyrighted. Every template came back with an empty art slot, and the
              heroes were up to me.
            </p>
          </div>
        </section>

        {/* the templates */}
        <section className="grid gap-6">
          <Label>Seven templates from ChatGPT</Label>
          <h2 className="font-serif text-h2m text-head md:text-h2">Same structure. Different personalities.</h2>
          <TemplateFan />
          <p className="printed text-pretty">
            I brought the ChatGPT templates into Figma and made each one mine: character art, names, Earths, rarity and stats.
          </p>
          <ol className="grid gap-3 sm:grid-cols-2">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-2xl border border-line bg-bg p-4">
                <span className="font-worn text-h1 text-[#c8402c]">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-serif text-lg text-head">{t}</span>
                  <span className="printed text-sm">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* building it */}
        <section className="grid gap-6">
          <Label>Vibecoding in Cursor</Label>
          <h2 className="font-serif text-h2m text-head md:text-h2">From design to something alive.</h2>
          <p className="printed text-pretty">
            Static cards looked good, but I wanted the reveal to feel like ripping open a pack. I vibecoded the whole experience in Cursor, describing the feeling I wanted
            and tuning the motion until it felt right.
          </p>
          {/* a little editor window */}
          <div className={`overflow-hidden rounded-2xl ${INK} shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7)]`}>
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-sm text-[#f4ece6]/60">spider-verse-cards</span>
            </div>
            <div className="grid md:grid-cols-[190px_1fr_230px]">
              <ul className="hidden border-r border-white/10 py-3 text-sm md:block">
                {FILES.map((f) => (
                  <li key={f} className={`px-4 py-0.5 whitespace-pre ${f.includes("HolographicCard") ? "bg-white/10 text-white" : "text-[#f4ece6]/55"}`}>
                    {f}
                  </li>
                ))}
              </ul>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-[#ffd7c9]">
                <code>{CODE}</code>
              </pre>
              <div className="grid content-start gap-2 border-t border-white/10 p-3 text-sm md:border-t-0 md:border-l">
                <span className="label !text-[#f4ece6]/50">Chat</span>
                <p className="rounded-xl bg-white/10 p-2.5 text-white">Make the cards orbit like a magical deck being shuffled. Some should pass in front, some behind.</p>
                <p className="rounded-xl border border-white/10 p-2.5 text-[#f4ece6]/70">Added 3 depth lanes and a breathing radius in shufflePhysics.ts</p>
                <p className="rounded-xl bg-white/10 p-2.5 text-white">Needs more suspense. Slow down after one full spin before picking a card.</p>
                <p className="rounded-xl border border-white/10 p-2.5 text-[#f4ece6]/70">Orbit now ramps up, then coasts with decay 0.94</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["5.8s", "of orbit before the pick. Long enough for suspense, short enough to keep you watching."],
              ["3 lanes", "of depth so cards weave in front of and behind each other, like a real shuffle."],
              ["12°", "of tilt on the final card, with a foil and a highlight that follow your finger."],
            ].map(([n, d]) => (
              <div key={n} className="rounded-2xl border border-line bg-bg p-5">
                <span className="block font-worn text-h2 text-[#c8402c]">{n}</span>
                <span className="printed mt-1 block text-sm">{d}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label mr-1">Built with</span>
            {["Next.js", "React", "Framer Motion", "Tailwind", "Capacitor"].map((t) => (
              <span key={t} className="rounded-full border border-line bg-surface/60 px-3 py-1 text-sm text-ink">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* the finished flow */}
        <section className="grid gap-6">
          <Label>The finished flow</Label>
          <h2 className="font-serif text-h2m text-head md:text-h2">A little idea that actually works.</h2>
          <p className="printed text-pretty">
            The finished flow is six beats long. I also wrapped it as an iOS app with Capacitor so I could feel it in my hand, and the reveal ends with a native share sheet.
          </p>
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <ol className="relative grid gap-4 border-l border-dashed border-[#c8402c]/50 pl-6">
              {FLOW.map(([n, t, d]) => (
                <li key={n} className="relative">
                  <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-[#c8402c] ring-4 ring-bg" />
                  <span className="label">{n}</span>
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-serif text-lg text-head">{t}</span>
                    <span className="shrink-0 rounded-full bg-[#fdece6] px-2.5 py-0.5 text-sm text-[#b53424]">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex justify-center gap-3">
              <Phone src="/assets/cases/spider/s-landing.webp" alt="Landing" className="w-[120px]" />
              <Phone src="/assets/cases/spider/s-orbit.webp" alt="Orbit" className="w-[120px] translate-y-6" />
              <Phone src="/assets/cases/spider/s-reveal.webp" alt="Reveal" className="w-[120px]" />
            </div>
          </div>
        </section>

        {/* the response */}
        <section className="grid gap-6">
          <Label>P.S.</Label>
          <h2 className="font-serif text-h2m text-head md:text-h2">You liked it.</h2>
          <p className="printed text-pretty">I shared it on X just to see what people thought. The response was way more heartwarming than I expected.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["1.2K+", "Likes"],
              ["40K+", "Views"],
              ["180+", "Reposts"],
              ["120+", "Replies"],
            ].map(([n, k]) => (
              <div key={k} className="rounded-2xl border border-line bg-bg p-4 text-center">
                <span className="block font-worn text-h2 text-head">{n}</span>
                <span className="label">{k}</span>
              </div>
            ))}
          </div>
          <a href={VIDEO} target="_blank" rel="noreferrer" className="group grid gap-3 rounded-2xl border border-line bg-bg p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_36px_-26px_rgba(60,40,20,0.35)]">
            <span className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-head font-serif text-bg">S</span>
              <span>
                <span className="block text-sm text-head">Sanskriti</span>
                <span className="text-sm text-muted-foreground">@GuptaSanskritii</span>
              </span>
              <span className="ml-auto text-sm text-muted-foreground transition group-hover:text-head">Watch on X ↗</span>
            </span>
            <span className="font-serif text-lg text-head">
              what if the Spider-Verse chose you? 🕷️ A little experiment I built, inspired by the trading cards I loved as a kid. Design × AI × Code
            </span>
          </a>
          <p className="text-center font-worn text-h1 text-[#c8402c]">small experiment, big love ♡</p>
          <div className="flex justify-center">
            <a href={LIVE} target="_blank" rel="noreferrer" className="rounded-full bg-[#e3342f] px-6 py-3 text-sm text-white shadow-[0_10px_30px_-10px_rgba(227,52,47,0.9)] transition hover:-translate-y-0.5">
              Ready to meet your spider? ↗
            </a>
          </div>
          <Link href="/#vibe" className="label mx-auto mt-6 w-fit !text-ink underline-offset-4 hover:underline">
            ← Back to all work
          </Link>
        </section>
      </div>

      <div className="mx-auto max-w-[826px]">
        <Footer />
      </div>
    </div>
  );
}

