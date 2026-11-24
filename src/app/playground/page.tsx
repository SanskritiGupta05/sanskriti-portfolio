import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LazyVideo } from "@/components/playground/LazyVideo";

export const metadata: Metadata = {
  title: "Playground · Sanskriti",
  description: "Products, experiments, interfaces and ideas that made their way out of Sanskriti's Figma files.",
};

// The Playground: Sanskriti's visual explorations, one after another at full column width
// (tall pieces sit in pairs so they don't tower). Visuals only; the only captions are on
// pieces with a live link. All assets are hers (public/assets/playground/), served unoptimized.
type Img = { kind: "img"; src: string; w: number; h: number; alt: string };
type Vid = { kind: "video"; src: string; poster: string; w: number; h: number; alt: string; caption?: { text: string; href?: string } };
type Piece = Img | Vid;

const A = "/assets/playground";

const ROWS: Piece[][] = [
  [
    {
      kind: "video",
      src: `${A}/diwali.mp4`,
      poster: `${A}/diwali-poster.jpg`,
      w: 1920,
      h: 954,
      alt: "Little Lights, a Diwali photo album: photos clipped into a red album under lanterns and fireworks",
      caption: { text: "Little Lights · diwali-album.vercel.app (sound on!)", href: "https://diwali-album.vercel.app" },
    },
  ],
  [{ kind: "img", src: `${A}/mosaic.webp`, w: 2000, h: 1337, alt: "Mosaic, a bedtime story app: sign up, new releases and a story chapter on three phones" }],
  [
    { kind: "img", src: `${A}/mosaic-closeup.webp`, w: 1684, h: 1817, alt: "Close-up of the Mosaic home screen" },
    { kind: "img", src: `${A}/pandao-figma.webp`, w: 1500, h: 2000, alt: "The PanDAO onboarding screen being designed in Figma on a laptop" },
  ],
  [{ kind: "img", src: `${A}/tab-onboarding.jpg`, w: 2838, h: 1864, alt: "TAB, a spending tracker: three bold onboarding screens in lime, pink and blue" }],
  [
    { kind: "img", src: `${A}/tab-icon.webp`, w: 1600, h: 1600, alt: "The TAB app icon: a torn receipt with an 'every spend counts' sticker" },
    { kind: "img", src: `${A}/espresso.png`, w: 1544, h: 1544, alt: "A Spotify record-player widget playing Espresso by Sabrina Carpenter" },
  ],
  [{ kind: "img", src: `${A}/learning-controls.png`, w: 1340, h: 938, alt: "Learning player controls: play, pause, captions, hints and text buttons with Back and Next" }],
  [
    { kind: "img", src: `${A}/eight-christmas.jpg`, w: 900, h: 1600, alt: "An eight money Christmas story: the card in a Santa hat, coming soon" },
    { kind: "img", src: `${A}/mood-checkin.png`, w: 480, h: 539, alt: "A mood check-in app that asks how your weather is today" },
  ],
  [{ kind: "img", src: `${A}/emoji-screens.webp`, w: 1372, h: 936, alt: "Pixel-emoji app onboarding: three retro screens on green" }],
];

function Frame({ p }: { p: Piece }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[20px] border border-line bg-bg p-2 shadow-[0_18px_36px_-26px_rgba(60,40,20,0.35)]">
        <div className="overflow-hidden rounded-[14px]">
          {p.kind === "img" ? (
            <Image src={p.src} alt={p.alt} width={p.w} height={p.h} unoptimized className="block h-auto w-full" />
          ) : (
            <LazyVideo src={p.src} poster={p.poster} width={p.w} height={p.h} label={p.alt} />
          )}
        </div>
      </div>
      {p.kind === "video" && p.caption && (
        <figcaption className="mt-3 px-1 text-sm text-muted-foreground">
          {p.caption.href ? (
            <a href={p.caption.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-ink hover:underline">
              {p.caption.text} ↗
            </a>
          ) : (
            p.caption.text
          )}
        </figcaption>
      )}
    </figure>
  );
}

export default function PlaygroundPage() {
  return (
    <div className="mx-auto w-full max-w-[874px] px-6">
      <Nav />
      <main className="pb-24">
        <header className="pt-10 pb-14 text-center">
          <span className="label">Playground</span>
          {/* copy from her Framer playground strip */}
          <h1 className="mt-3 font-serif text-h2m text-balance text-head md:text-h2">A little bit of everything</h1>
          <p className="printed mx-auto mt-4 max-w-[52ch] text-pretty">
            Products, experiments, interfaces, and ideas that made their way out of my Figma files.
          </p>
        </header>

        <div className="grid gap-8 md:gap-10">
          {ROWS.map((row, i) => (
            <div
              key={i}
              className={row.length > 1 ? "grid gap-8 md:flex md:items-start md:gap-6" : ""}
            >
              {row.map((p) =>
                row.length > 1 ? (
                  // pairs: each card starts at 18px (its padding + border) and takes the leftover width in
                  // proportion to its image's width-to-height ratio, so both cards end up exactly the same height
                  <div
                    key={p.src}
                    className="min-w-0 md:[flex:var(--g)_1_18px]"
                    style={{ "--g": (p.w / p.h).toFixed(4) } as React.CSSProperties}
                  >
                    <Frame p={p} />
                  </div>
                ) : (
                  <Frame key={p.src} p={p} />
                ),
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
