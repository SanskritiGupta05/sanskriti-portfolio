import {
    CalendarDays,
    ChartPie,
    type LucideIcon,
    Megaphone,
    MonitorPlay,
    Newspaper,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
    CaseStudyFrame,
    Note,
    P,
    Quote,
    Section,
    type TocItem,
} from "@/components/casestudy/Margin";
import { Mark } from "@/components/casestudy/Mark";
import { Ticket } from "@/components/casestudy/pieces";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
    title: "GeeksforGeeks · Sanskriti",
    description:
        "Graphic design internship at GeeksforGeeks: article banners, YouTube thumbnails, Google ads and more.",
};

const g = (name: string, w: number, h: number) => ({ src: `/assets/cases/gfg/${name}.webp`, w, h });

const TOC: TocItem[] = [
    { id: "working", label: "Working at GFG" },
    { id: "portfolio", label: "What I contributed" },
    { id: "ads", label: "Google ads" },
    { id: "banners", label: "Article banners" },
    { id: "banners-other", label: "More article banners" },
    { id: "thumbnails", label: "YouTube thumbnails" },
];

const CARD_STYLE: Record<string, { icon: LucideIcon; tint: string; ink: string }> = {
    "Article banners": { icon: Newspaper, tint: "#E9F6EC", ink: "#2F8D46" },
    "YouTube thumbnails": { icon: MonitorPlay, tint: "#FDECEC", ink: "#D93A3A" },
    "Google advertisements": { icon: Megaphone, tint: "#EAF1FD", ink: "#2F6FE0" },
    "Monthly event creatives": { icon: CalendarDays, tint: "#FFF3DE", ink: "#D9871A" },
    "Infographics & more": { icon: ChartPie, tint: "#F1ECFB", ink: "#7A4FD6" },
};

const CONTRIBUTIONS: [string, string][] = [
    [
        "Article banners",
        "Designed eye-catching visuals for the newly introduced UX/UI and graphic design categories, making them stand out for readers.",
    ],
    ["YouTube thumbnails", "Created engaging thumbnails to enhance video click-through rates."],
    [
        "Google advertisements",
        "Developed ad creatives that aligned with the brand's vision and boosted campaign effectiveness.",
    ],
    [
        "Monthly event creatives",
        "Delivered designs for events, ensuring consistent branding and engagement.",
    ],
    [
        "Infographics & more",
        "Produced detailed infographics and diverse creatives to support content strategies.",
    ],
];

type Pin = { src: string; w: number; h: number; ar: string; pos: string; alt: string };
const P_LOGO: Pin = {
    src: "/assets/cases/gfg/office-logo-wall.webp",
    w: 900,
    h: 1200,
    ar: "2/3",
    pos: "50% 40%",
    alt: "The GeeksforGeeks logo wall at the office",
};
const P_SELFIE: Pin = {
    src: "/assets/cases/gfg/office-selfie.webp",
    w: 675,
    h: 1200,
    ar: "4/5",
    pos: "50% 45%",
    alt: "A mirror selfie at the GeeksforGeeks office",
};
const P_DESK: Pin = {
    src: "/assets/cases/gfg/office-desk.webp",
    w: 1200,
    h: 900,
    ar: "4/3",
    pos: "62% 50%",
    alt: "My desk, with a plant and two figurines",
};
const P_FLOOR: Pin = {
    src: "/assets/cases/gfg/office-floor.webp",
    w: 900,
    h: 1200,
    ar: "1/1",
    pos: "50% 55%",
    alt: "The office floor with rows of desks",
};
const P_VIEW: Pin = {
    src: "/assets/cases/gfg/office-desk-view.webp",
    w: 675,
    h: 1200,
    ar: "1/1",
    pos: "50% 60%",
    alt: "The view from my desk",
};
const P_CAKE: Pin = {
    src: "/assets/cases/gfg/office-farewell-cake.webp",
    w: 480,
    h: 852,
    ar: "4/5",
    pos: "50% 38%",
    alt: "My farewell cake at GeeksforGeeks, with a Thank You topper",
};
const BOARD_WIDE: Pin[][] = [
    [P_LOGO, P_DESK],
    [P_SELFIE, P_FLOOR],
    [P_VIEW, P_CAKE],
];
const BOARD_NARROW: Pin[][] = [
    [P_LOGO, P_DESK, P_VIEW],
    [P_SELFIE, P_FLOOR, { ...P_CAKE, ar: "1/1" }],
];

const ADS = [
    { ...g("ad-react", 250, 250), alt: "React course ad" },
    { ...g("ad-dsa", 250, 250), alt: "DSA with JavaScript course ad" },
    { ...g("ad-cpp", 250, 250), alt: "Master C++ Programming ad" },
    { ...g("ad-premium", 300, 250), alt: "GeeksforGeeks Premium ad: Master coding with us" },
];

const THUMBS = [
    {
        ...g("yt-technical-interviews", 1116, 628),
        alt: "Thumbnail: Trends in technical interviews you should know",
    },
    { ...g("yt-maxima-minima", 1920, 1080), alt: "Thumbnail: Maxima & minima" },
    { ...g("yt-vector-spaces", 1920, 1080), alt: "Thumbnail: Vector spaces" },
    { ...g("yt-geometric-distribution", 1920, 1080), alt: "Thumbnail: Geometric distribution" },
    { ...g("yt-definite-integral", 1920, 1080), alt: "Thumbnail: Definite integral" },
];

const BANNERS = [
    { ...g("banner-interactive-design", 1000, 470), alt: "Banner: What is interactive design" },
    { ...g("banner-visual-design", 1000, 470), alt: "Banner: Visual design" },
    { ...g("banner-figma-tutorial", 1000, 470), alt: "Banner: Figma tutorial" },
    { ...g("banner-prototypes", 1000, 470), alt: "Banner: Prototypes in Figma" },
    { ...g("banner-accessibility", 1000, 470), alt: "Banner: Accessibility in web design" },
    { ...g("banner-color-theory", 1000, 470), alt: "Banner: Color theory" },
    { ...g("banner-color-trends", 1000, 470), alt: "Banner: Top color trends for 2024" },
    {
        ...g("banner-canva-background", 1000, 470),
        alt: "Banner: How to add a custom background in Canva",
    },
    { ...g("banner-canva-shapes", 1000, 470), alt: "Banner: How to insert shapes in Canva" },
];

const BANNERS_OTHER = [
    { ...g("banner-netflix", 1000, 470), alt: "Banner: How does Netflix make money?" },
    { ...g("banner-data-science", 1000, 470), alt: "Banner: Data science applications" },
    {
        ...g("banner-embed", 1000, 470),
        alt: "Banner: How to embed almost anything in your website",
    },
    { ...g("banner-discord", 1000, 470), alt: "Banner: Top Discord servers for developers" },
];

function Shot({
    src,
    w,
    h,
    alt,
    caption,
    native = false,
}: {
    src: string;
    w: number;
    h: number;
    alt: string;
    caption?: string;
    native?: boolean;
}) {
    return (
        <figure className="grid gap-2">
            <Image
                src={src}
                alt={alt}
                width={w}
                height={h}
                unoptimized
                className={`block h-auto ${native ? "w-full max-w-[250px]" : "w-full"}`}
            />
            {caption && <figcaption className="label">{caption}</figcaption>}
        </figure>
    );
}

function Board({ columns, className }: { columns: Pin[][]; className: string }) {
    return (
        <div className={`items-start gap-2.5 ${className}`}>
            {columns.map((col, i) => (
                <div key={i} className="flex flex-1 flex-col gap-2.5">
                    {col.map((o) => (
                        <Image
                            key={o.src}
                            src={o.src}
                            alt={o.alt}
                            width={o.w}
                            height={o.h}
                            unoptimized
                            className="block h-auto w-full rounded-2xl object-cover shadow-[0_6px_16px_-10px_rgba(60,40,20,0.45)] transition duration-300 hover:-translate-y-0.5"
                            style={{ aspectRatio: o.ar, objectPosition: o.pos }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

function CardIcon({ name }: { name: string }) {
    const st = CARD_STYLE[name];
    if (!st) return null;
    const Icon = st.icon;
    return (
        <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
            style={{ color: st.ink }}
        >
            <Icon size={18} strokeWidth={1.8} />
        </span>
    );
}

const TOOLS = [
    { name: "Adobe Photoshop", logo: "/assets/tools/photoshop.svg", w: 240, h: 234 },
    { name: "Adobe Illustrator", logo: "/assets/tools/illustrator.svg", w: 240, h: 234 },
    { name: "Figma", logo: "/assets/tools/figma.svg", w: 200, h: 300 },
];

export default function GeeksforGeeks() {
    return (
        <div
            className="w-full [&_nav[aria-label=Contents]]:font-serif [&_nav[aria-label=Contents]_.label]:text-[15px] [&_nav[aria-label=Contents]_.label]:tracking-normal [&_nav[aria-label=Contents]_.label]:normal-case [&_nav[aria-label=Contents]_a]:text-[15px] [&_article>section>.label:first-child]:flex [&_article>section>.label:first-child]:items-center [&_article>section>.label:first-child]:gap-2.5 [&_article>section>.label:first-child]:font-mono [&_article>section>.label:first-child]:!text-[14px] [&_article>section>.label:first-child]:font-bold [&_article>section>.label:first-child]:!tracking-[0.14em] [&_article>section>.label:first-child]:!text-(--cs-accent) [&_article>section>.label:first-child]:before:content-[''] [&_article>section>.label:first-child]:before:size-[7px] [&_article>section>.label:first-child]:before:shrink-0 [&_article>section>.label:first-child]:before:rounded-full [&_article>section>.label:first-child]:before:bg-(--cs-accent) [&_article>section>.label:first-child]:before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--cs-accent)_35%,transparent)]"
            style={
                {
                    "--scribble": "#2F8D46",
                    "--scribble-fill": "#BFE6C8",
                    "--marker-height": "13px",
                } as React.CSSProperties
            }
        >
            <div className="mx-auto max-w-[826px] px-6">
                <Nav />
            </div>

            <CaseStudyFrame
                layout="sheet"
                accent="#2F8D46"
                toc={TOC}
                header={
                    <header>
                        <Link
                            href="/work#early"
                            className="label !text-ink underline-offset-4 hover:underline"
                        >
                            ← All work
                        </Link>
                        <span className="label mt-8 block">Early career · 2024</span>
                        <h1 className="mt-3 font-serif text-h2 text-head">GeeksforGeeks</h1>
                        <p className="mt-3 max-w-[34ch] font-worn text-h1 text-balance text-head">
                            Designing for growth at GeeksforGeeks, a game-changer in ed-tech.
                        </p>
                        <div className="mt-8">
                            <Ticket
                                kicker="Graphic design intern"
                                text="During my time at GeeksforGeeks, I worked on a diverse range of design projects that allowed me to explore my creativity and hone my skills."
                                meta={[
                                    { k: "My role", v: "Graphic design intern" },
                                    { k: "Duration", v: "6 months" },
                                    { k: "Scope", v: "Thumbnails, banners, ads" },
                                ]}
                            />
                        </div>
                        <div className="mt-8">
                            <span className="label">Tools I used day to day</span>
                            <ul className="mt-3 flex flex-wrap gap-3">
                                {TOOLS.map((t) => (
                                    <li
                                        key={t.name}
                                        className="skeu flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5"
                                    >
                                        <Image
                                            src={t.logo}
                                            alt=""
                                            width={t.w}
                                            height={t.h}
                                            unoptimized
                                            className="h-6 w-auto"
                                        />
                                        <span className="text-sm text-head">{t.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-10">
                            <Shot
                                src="/assets/cases/gfg/cover.webp"
                                w={2128}
                                h={1598}
                                alt="Designing for growth at GeeksforGeeks"
                            />
                        </div>
                    </header>
                }
            >
                <Section id="working" label="Working at GeeksforGeeks" title="From tech to design.">
                    <div className="grid gap-4">
                        <P>
                            Shifting from{" "}
                            <span className="text-[#2F8D46]">&ldquo;Tech to Design&rdquo;</span> was
                            no easy feat, but I&apos;m incredibly thankful for{" "}
                            <Mark type="marker">the head start GFG provided</Mark>. It&apos;s been
                            an amazing experience working on diverse creatives &amp; ideas.
                        </P>
                        <P>
                            I&apos;ve gained so much knowledge from the team,{" "}
                            <Mark type="marker">
                                lessons I&apos;ll carry with me moving forward
                            </Mark>
                            . Grateful to have collaborated with such passionate and creative
                            individuals there!
                        </P>
                    </div>
                    <Board columns={BOARD_WIDE} className="hidden sm:flex" />
                    <Board columns={BOARD_NARROW} className="flex sm:hidden" />
                </Section>

                <Section
                    id="portfolio"
                    label="What's in my GFG portfolio?"
                    title="A diverse range of design projects."
                >
                    <P>
                        During my tenure at GeeksforGeeks, I was responsible, as an intern, for{" "}
                        <Mark type="marker">all the visual design and the thinking behind it</Mark>:
                        what each banner needed to communicate, and making sure it looked visually
                        appealing too.
                    </P>
                    <P>Here&apos;s a summary of what I contributed:</P>
                    <ul className="grid gap-4 sm:grid-cols-2">
                        {CONTRIBUTIONS.map(([k, v]) => (
                            <li
                                key={k}
                                className="skeu rounded-2xl p-5"
                                style={{
                                    background: `linear-gradient(180deg, #ffffff -40%, ${CARD_STYLE[k].tint} 100%)`,
                                }}
                            >
                                <span className="flex items-center gap-3">
                                    <CardIcon name={k} />
                                    <span className="font-serif text-h1m text-head">{k}</span>
                                </span>
                                <p className="printed mt-2 text-sm leading-relaxed">{v}</p>
                            </li>
                        ))}
                    </ul>
                </Section>

                <Section
                    id="ads"
                    label="Google advertisements"
                    title="Promoting courses and premium offerings."
                >
                    <P>
                        These designs were{" "}
                        <Mark type="marker">created from scratch in Photoshop</Mark> to promote
                        GeeksforGeeks&apos; courses and premium offerings.
                    </P>
                    <div className="grid grid-cols-2 items-start justify-items-start gap-4 sm:grid-cols-4">
                        {ADS.map((s) => (
                            <Shot key={s.src} {...s} native />
                        ))}
                    </div>
                </Section>

                <Section
                    id="banners"
                    label="Article banners"
                    title="Making complex concepts more approachable."
                >
                    <P>
                        Designing article banners was{" "}
                        <Mark type="marker">one of my core responsibilities</Mark> at GeeksforGeeks.
                        Each banner was crafted to visually complement the article&apos;s topic,
                        <Mark type="marker" order={1}>
                            making complex concepts more approachable and engaging
                        </Mark>
                        .
                    </P>
                    {BANNERS.map((b) => (
                        <Shot key={b.src} {...b} />
                    ))}
                    <Note label="Fun fact">
                        All these article banners are live on the website! Just search for the
                        article title, and you&apos;ll see the banner featured directly on the page.
                    </Note>
                    <Shot
                        {...g("live-on-site", 1899, 867)}
                        alt="The What is Interactive Design? banner live on a GeeksforGeeks article"
                    />
                </Section>

                <Section
                    id="banners-other"
                    label="Article banners"
                    title="Beyond design and UX/UI."
                >
                    <P>Article banners for topics other than the design and UX/UI domain.</P>
                    {BANNERS_OTHER.map((b) => (
                        <Shot key={b.src} {...b} />
                    ))}
                </Section>

                <Section
                    id="thumbnails"
                    label="YouTube thumbnails"
                    title="Grab attention, say what the video is about."
                >
                    <P>
                        YouTube thumbnails were designed to{" "}
                        <Mark type="marker">
                            grab attention &amp; communicate the video&apos;s content effectively
                        </Mark>
                        . Each thumbnail is tailored to the topic, featuring bold typography,
                        vibrant colors, &amp; relevant visuals to ensure clarity and engagement.
                    </P>
                    <Shot {...THUMBS[0]} />
                    {THUMBS.slice(1).map((t) => (
                        <Shot key={t.src} {...t} />
                    ))}
                </Section>

                <Section id="closing">
                    <Quote>
                        &ldquo;I&apos;m incredibly thankful for the head start GFG provided.&rdquo;
                    </Quote>
                    <Link
                        href="/work#early"
                        className="label mt-6 w-fit !text-ink underline-offset-4 hover:underline"
                    >
                        ← Back to all work
                    </Link>
                </Section>
            </CaseStudyFrame>

            <div className="mx-auto max-w-[826px]">
                <Footer />
            </div>
        </div>
    );
}
