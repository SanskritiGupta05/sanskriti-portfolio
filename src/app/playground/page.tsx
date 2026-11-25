import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { LazyVideo } from "@/components/playground/LazyVideo";

export const metadata: Metadata = {
    title: "Playground · Sanskriti",
    description:
        "Products, experiments, interfaces and ideas that made their way out of Sanskriti's Figma files.",
};

type Img = { kind: "img"; src: string; w: number; h: number; alt: string };
type Vid = {
    kind: "video";
    src: string;
    w: number;
    h: number;
    alt: string;
    caption?: string;
    link?: string;
};
type Screens = { kind: "screens"; srcs: string[]; w: number; h: number; alt: string };
type Piece = Img | Vid | Screens;

const A = "/assets/playground";
const img = (file: string, w: number, h: number, alt: string): Img => ({
    kind: "img",
    src: `${A}/${file}`,
    w,
    h,
    alt,
});
const vid = (
    name: string,
    w: number,
    h: number,
    alt: string,
    caption?: string,
    link?: string,
): Vid => ({
    kind: "video",
    src: `${A}/${name}.mp4`,
    w,
    h,
    alt,
    caption,
    link,
});

const ROWS: Piece[][] = [
    [
        vid(
            "spider-verse",
            1012,
            1466,
            "A phone revealing a holographic Spider-Verse character card",
            "Let's see which spider-verse chooses YOU!",
            "https://spider-verse-cards.netlify.app",
        ),
        vid(
            "mood",
            1300,
            1740,
            "A mood check-in app: turning a weather dial changes how the cloud feels",
            "What if checking in with yourself felt as simple as picking today's weather? 🌞🌩️⛅️ Designed this fun little interaction over the weekend! 🪄🎨",
        ),
    ],
    [
        vid(
            "pixel-buddy",
            1920,
            1150,
            "A context-window meter with a tiny pixel buddy reacting while an agent works",
            "A tiny pixel buddy making the coding process a little more fun with agents 🪄",
        ),
    ],
    [
        img(
            "haloe-card.png",
            2482,
            3162,
            "The haloe app card: a soft pastel cloud winking above the haloe wordmark",
        ),
        img(
            "haloe-construction.png",
            1152,
            1350,
            "The haloe logo's construction: the cloud built from overlapping circles and ellipses, in outline on dark grey",
        ),
    ],
    [
        vid(
            "uxie-explore",
            480,
            854,
            "The UX laws app on a phone: opening it and swiping through the deck of law categories",
        ),
        vid(
            "uxie-play",
            480,
            854,
            "The UX laws app on a phone: a round of Play, picking the law a statement describes",
        ),
    ],
    [
        vid(
            "uxie-saved",
            480,
            854,
            "The UX laws app on a phone: the saved laws in a category, shown as coloured cards",
        ),
        vid(
            "uxie-search",
            480,
            854,
            "The UX laws app on a phone: a law's page, the Aesthetic-Usability Effect, with its idea and why it matters",
        ),
    ],
    [
        img(
            "halo.png",
            1740,
            1954,
            "Halo, a mood check-in app: the 'How's your weather today?' screen beside its weather dial and icon set",
        ),
    ],
    [
        vid(
            "diwali",
            1920,
            954,
            "Little Lights, a Diwali photo album: photos clipped into a red album under lanterns and fireworks",
            "Little Lights (Sound ON!)",
            "https://diwali-album.vercel.app",
        ),
    ],
    [
        img(
            "mosaic.webp",
            2000,
            1337,
            "Mosaic, a bedtime story app: sign up, new releases and a story chapter on three phones",
        ),
    ],
    [
        img("mosaic-closeup.webp", 1684, 1817, "Close-up of the Mosaic home screen"),
        img(
            "pandao-figma.webp",
            1500,
            2000,
            "The PanDAO onboarding screen being designed in Figma on a laptop",
        ),
    ],
    [
        vid(
            "inkwork",
            1920,
            954,
            "Inkwork Press, a tool that generates illustrations with geometric motifs and decorative patterns",
            "Saw some cool illustrations with \u201cgeometric motifs and decorative patterns\u201d on Pinterest, so I decided to build my own fun lil tool to generate them. 👾",
            "https://inkwork-press.vercel.app",
        ),
    ],
    [
        {
            kind: "screens",
            srcs: [1, 2, 3].map((n) => `${A}/tab-${n}.png`),
            w: 786,
            h: 1704,
            alt: "TAB, a spending tracker: three bold onboarding screens in lime, pink and blue",
        },
    ],
    [
        img(
            "tab-icon.webp",
            1600,
            1600,
            "The TAB app icon: a torn receipt with an 'every spend counts' sticker",
        ),
        img(
            "espresso.png",
            1544,
            1544,
            "A Spotify record-player widget playing Espresso by Sabrina Carpenter",
        ),
    ],
    [
        vid(
            "chat",
            1458,
            1414,
            "A tutor chat interface with lively message animations",
            "making chat interfaces feel a little more alive. 🪄",
        ),
    ],
    [
        img(
            "learning-controls.png",
            1340,
            938,
            "Learning player controls: play, pause, captions, hints and text buttons with Back and Next",
        ),
    ],
    [
        img(
            "eight-christmas.jpg",
            900,
            1600,
            "An eight money Christmas story: the card in a Santa hat, coming soon",
        ),
        vid(
            "figma-to-react",
            720,
            900,
            "A step-by-step demo of Dualite Alpha, from a Figma design to React",
        ),
    ],
    [
        vid(
            "folder",
            720,
            720,
            "A file drawer whose coloured folders lift on hover",
            "Saw this interaction somewhere, hence i tried recreating it! 📂✨",
        ),
        vid(
            "work-folder",
            534,
            536,
            "A work folder that opens to show project screens",
            "Work Folder - Interaction Design 🪄",
        ),
    ],
    [
        vid(
            "loading",
            1892,
            1246,
            "A 'Deploying' loading pill with an animated little icon",
            "Even a loading state deserves a little personality ✨",
        ),
    ],
    [
        vid(
            "whimsy",
            1088,
            1102,
            "A sign-in card with a little creature peeking over the top",
            "trying to make the little things on the internet a little more delightful, by adding a bit of whimsy 🪄",
        ),
    ],
    [
        vid(
            "figma-proto",
            796,
            512,
            "A sticky-note to-do list prototyped in Figma, items checking off",
            "Been dabbling around prototyping in Figma. 🎨🧑‍🎨",
        ),
    ],
    [img("../work/keploy.webp", 1264, 945, "Keploy AI test run screen")],
    [img("../work/context-window.webp", 1044, 798, "A context window usage card")],
    [img("../work/concertpal.webp", 1400, 1140, "ConcertPal Calendar feature cards")],
    [img("../work/figma-to-react.webp", 1400, 670, "Figma to React, two folder icons")],
    [
        img(
            "emoji-screens.webp",
            1372,
            936,
            "Pixel-emoji app onboarding: three retro screens on green",
        ),
    ],
];

const FAN = ["-rotate-3 translate-y-3", "", "rotate-3 translate-y-3"];

function Frame({ p }: { p: Piece }) {
    if (p.kind === "screens")
        return (
            <figure
                role="group"
                aria-label={p.alt}
                className="m-0 flex justify-center gap-4 py-4 md:gap-7"
            >
                {p.srcs.map((src, i) => (
                    <Image
                        key={src}
                        src={src}
                        alt=""
                        width={p.w}
                        height={p.h}
                        unoptimized
                        className={`h-auto w-[30%] max-w-[240px] rounded-[18px] shadow-[0_24px_40px_-22px_rgba(40,30,20,0.55)] md:rounded-[24px] ${FAN[i] ?? ""}`}
                    />
                ))}
            </figure>
        );
    return (
        <figure className="m-0">
            <div className="overflow-hidden rounded-[20px] border border-line bg-bg p-2 shadow-[0_18px_36px_-26px_rgba(60,40,20,0.35)]">
                <div className="overflow-hidden rounded-[14px]">
                    {p.kind === "img" ? (
                        <Image
                            src={p.src}
                            alt={p.alt}
                            width={p.w}
                            height={p.h}
                            unoptimized
                            className="block h-auto w-full"
                        />
                    ) : (
                        <LazyVideo
                            src={p.src}
                            poster={p.src.replace(".mp4", "-poster.jpg")}
                            width={p.w}
                            height={p.h}
                            label={p.alt}
                        />
                    )}
                </div>
            </div>
            {p.kind === "video" && (p.caption || p.link) && (
                <figcaption className="mt-3 px-1 text-sm leading-5 text-pretty text-muted-foreground">
                    {p.caption}
                    {p.link && (
                        <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 block w-fit text-ink underline underline-offset-4 hover:text-[#c8553b]"
                        >
                            {p.link.replace(/^https?:\/\//, "")} ↗
                        </a>
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
                    <h1 className="mt-3 font-serif text-h2m text-balance text-head md:text-h2">
                        A little bit of everything
                    </h1>
                    <p className="printed mx-auto mt-4 max-w-[52ch] text-pretty">
                        Products, experiments, interfaces, and ideas that made their way out of my
                        Figma files.
                    </p>
                </header>

                <div className="grid gap-8 md:gap-10">
                    {ROWS.map((row, i) => (
                        <div
                            key={i}
                            className={
                                row.length > 1 ? "grid gap-8 md:flex md:items-start md:gap-6" : ""
                            }
                        >
                            {row.map((p) =>
                                row.length > 1 ? (
                                    <div
                                        key={"src" in p ? p.src : p.alt}
                                        className="min-w-0 md:[flex:var(--g)_1_18px]"
                                        style={
                                            { "--g": (p.w / p.h).toFixed(4) } as React.CSSProperties
                                        }
                                    >
                                        <Frame p={p} />
                                    </div>
                                ) : (
                                    <Frame key={"src" in p ? p.src : p.alt} p={p} />
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
