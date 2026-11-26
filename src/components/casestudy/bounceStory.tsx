import Image from "next/image";
import type { ReactNode } from "react";

// Pieces for the Bounce Daily case study v5 (Qmentis structure). They mirror her Figma frame
// "Bounce Daily · case study v5" (file eJ4fYjVQ…, page "Case study · web page", frame 1337:10605):
// a red mono eyebrow + serif headline per section, mono body, soft skeu cards, her composed figures
// (exported 2× to public/assets/cases/bounce/v5) and decision canvases with a "The call" bar.

const FIG = "/assets/cases/bounce/v5";
// the figures restyled as a Figma file (sections, frame names, selection), exported at 3× into v5/hq
const HQ: Record<string, [number, number]> = {
    "kyc-spots": [2544, 2345],
    "old-signup": [2688, 1652],
    onboarding: [2688, 1452],
    plans: [2688, 1720],
    pay: [2688, 1822],
    home: [2688, 1712],
    errors: [2688, 1799],
    "ui-layer": [2688, 2737],
    scooter: [2544, 1742],
    "kyc-status": [2544, 1940],
    renewals: [2544, 1728],
    // the section alone (no grey canvas), shown at its 1× size
    "error-states-v1": [2058, 2934],
    "edge-cases-v1": [2556, 1634],
};
const figSrc = (name: string) => (HQ[name] ? `${FIG}/figma/${name}.webp` : `${FIG}/${name}.webp`);
const figSize = (name: string): [number, number] => HQ[name] ?? SIZES[name] ?? [1792, 1000];
const SIZES: Record<string, [number, number]> = {
    "old-signup": [1792, 1066],
    journey: [1792, 539],
    onboarding: [1792, 981],
    hubs: [1696, 1069],
    scooter: [1696, 1056],
    plans: [1792, 1138],
    "kyc-spots": [1792, 780],
    pay: [1792, 1046],
    "kyc-status": [1696, 1315],
    home: [1792, 1172],
    renewals: [1696, 1085],
    errors: [1792, 1144],
    "ui-layer": [1792, 1916],
    "flow-map": [2688, 1405],
};

const SKEU =
    "bg-[linear-gradient(180deg,#ffffff,#f7f7f7)] shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgba(0,0,0,0.07),0_1px_2px_rgba(0,0,0,0.05),0_12px_24px_-14px_rgba(40,30,20,0.2)] dark:bg-none dark:bg-surface";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        // a section label like a ticker: a small glowing red dot, then bold mono caps
        <span
            className={`flex items-center gap-2.5 font-mono text-[14px] font-bold tracking-[0.14em] text-[#c8553b] uppercase ${className}`}
        >
            <span
                aria-hidden="true"
                className="size-[7px] shrink-0 rounded-full bg-[#c8553b] shadow-[0_0_0_3px_rgba(200,85,59,0.35)]"
            />
            {children}
        </span>
    );
}

export function Body({ children }: { children: ReactNode }) {
    return (
        <p className="printed max-w-none text-[16px] leading-[26px] text-pretty text-ink">
            {children}
        </p>
    );
}

// a top-level section: red eyebrow, serif statement headline, then the story
export function Section({
    id,
    eyebrow,
    headline,
    tone = "head",
    size = "md",
    children,
}: {
    id: string;
    eyebrow: string;
    headline: ReactNode;
    tone?: "head" | "red";
    size?: "md" | "lg";
    children: ReactNode;
}) {
    return (
        <section id={id} className="grid min-w-0 scroll-mt-16 gap-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
                className={`font-serif text-balance ${tone === "red" ? "text-[#c8553b]" : "text-head"} ${
                    size === "lg"
                        ? "text-[34px] leading-[1.12] md:text-[46px]"
                        : "text-[28px] leading-[1.15] md:text-[36px]"
                }`}
            >
                {headline}
            </h2>
            {children}
        </section>
    );
}

// one of her figures, as composed in Figma
export function Fig({
    name,
    alt,
    caption,
    href,
    section,
}: {
    name: string;
    alt: string;
    caption?: string;
    href?: string;
    // a bare Figma section export (3×): shown no wider than its 1× size, centred, its own corners
    section?: boolean;
}) {
    const img = (
        <Image
            src={figSrc(name)}
            alt={alt}
            width={figSize(name)[0]}
            height={figSize(name)[1]}
            unoptimized
            sizes="(min-width: 1100px) 900px, 100vw"
            className={`block h-auto w-full ${section ? "mx-auto" : "rounded-[20px]"}`}
            style={section ? { maxWidth: figSize(name)[0] / 3 } : undefined}
        />
    );
    return (
        <figure className="grid min-w-0 gap-3">
            {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="block">
                    {img}
                </a>
            ) : (
                img
            )}
            {caption && (
                <figcaption className="printed text-[13px] leading-[20px] text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

export function Tags({ items }: { items: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((t) => (
                <span
                    key={t}
                    className={`${SKEU} rounded-full px-3.5 py-1.5 font-mono text-[12px] tracking-[0.1em] text-[#c8553b] uppercase`}
                >
                    {t}
                </span>
            ))}
        </div>
    );
}

// Company / Team / Timeline / Platform, under a hairline
export function Facts({ items }: { items: { k: string; v: ReactNode; sub?: ReactNode }[] }) {
    return (
        <dl className="grid gap-x-10 gap-y-7 border-t border-line pt-7 sm:grid-cols-2">
            {items.map((i) => (
                <div key={i.k} className="grid content-start gap-1.5">
                    <dt className="font-mono text-[12px] tracking-[0.12em] text-muted-foreground uppercase">
                        {i.k}
                    </dt>
                    <dd className="font-serif text-[18px] leading-6 text-head">{i.v}</dd>
                    {i.sub && (
                        <dd className="font-serif text-[15px] leading-5 text-muted-foreground">
                            {i.sub}
                        </dd>
                    )}
                </div>
            ))}
        </dl>
    );
}

export function BigStats({ items }: { items: { n: string; l: string }[] }) {
    return (
        <div className="grid gap-8 pt-4 sm:grid-cols-2 sm:gap-10">
            {items.map((s) => (
                <div key={s.n} className="grid content-start gap-2">
                    <span className="font-serif text-[52px] leading-none text-head md:text-[64px]">
                        {s.n}
                    </span>
                    <span className="font-serif text-[17px] leading-6 text-muted-foreground">
                        {s.l}
                    </span>
                </div>
            ))}
        </div>
    );
}

// small soft cards in two columns: optional red label, serif title, mono line
const TONES = {
    blue: "bg-[linear-gradient(180deg,#f3f7ff,#e8f0ff)] shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgba(47,95,179,0.14),0_12px_24px_-14px_rgba(40,30,20,0.2)]",
    amber: "bg-[linear-gradient(180deg,#fffaf0,#fff1d9)] shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgba(168,106,0,0.14),0_12px_24px_-14px_rgba(40,30,20,0.2)]",
    green: "bg-[linear-gradient(180deg,#f2fbf4,#e4f6e8)] shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgba(43,122,61,0.14),0_12px_24px_-14px_rgba(40,30,20,0.2)]",
    rose: "bg-[linear-gradient(180deg,#fff6f3,#fde9e3)] shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgba(176,70,47,0.14),0_12px_24px_-14px_rgba(40,30,20,0.2)]",
} as const;

export function Cards({
    items,
}: {
    items: {
        k?: string;
        t?: string;
        l: string;
        tone?: keyof typeof TONES;
        icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    }[];
}) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {items.map((c) => (
                <div
                    key={c.t ?? c.k}
                    className={`${c.tone ? TONES[c.tone] + " dark:bg-none dark:bg-surface" : SKEU} grid content-start gap-2 rounded-2xl p-[22px]`}
                >
                    {c.k &&
                        (c.icon ? (
                            // a stronger label: a small tinted icon tile, then bold caps
                            <span className="flex items-center gap-2.5">
                                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#fdeeea] shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgba(200,85,59,0.18)] dark:bg-[#3a2622]">
                                    <c.icon
                                        className="size-[15px] text-[#c8553b]"
                                        strokeWidth={2}
                                    />
                                </span>
                                <span className="font-mono text-[13px] font-bold tracking-[0.14em] text-[#c8553b] uppercase">
                                    {c.k}
                                </span>
                            </span>
                        ) : (
                            <span className="font-mono text-[11px] tracking-[0.14em] text-[#c8553b] uppercase">
                                {c.k}
                            </span>
                        ))}
                    {c.t && (
                        <span className="font-serif text-[20px] leading-[26px] text-head">
                            {c.t}
                        </span>
                    )}
                    <span
                        className={
                            c.t
                                ? "printed text-[14px] leading-[22px] text-muted-foreground"
                                : "printed text-[15px] leading-6 text-ink"
                        }
                    >
                        {c.l}
                    </span>
                </div>
            ))}
        </div>
    );
}

export function RiderCard({
    title,
    lines,
    questions,
}: {
    title: string;
    lines: string[];
    questions: string[];
}) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className={`${SKEU} grid content-start gap-3 rounded-[20px] p-7`}>
                <span className="w-fit rounded-full bg-[#fdeeea] px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-[#c8553b] uppercase">
                    Primary user
                </span>
                <span className="font-serif text-[28px] leading-8 text-head">{title}</span>
                <ul className="grid gap-2">
                    {lines.map((l) => (
                        <li key={l} className="printed text-[14px] leading-[22px] text-ink">
                            ·&nbsp;&nbsp;{l}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid content-start gap-3 rounded-[20px] bg-[#F8F8F8] p-7 dark:bg-surface">
                <span className="font-mono text-[12px] tracking-[0.14em] text-muted-foreground uppercase">
                    At every stage, they ask
                </span>
                {questions.map((q) => (
                    <span
                        key={q}
                        className="rounded-[14px] bg-white px-[18px] py-3.5 font-serif text-[20px] text-head ring-1 ring-black/[0.07] dark:bg-bg"
                    >
                        {q}
                    </span>
                ))}
            </div>
        </div>
    );
}

// one part of the solution walk-through
export function Solution({
    id,
    label,
    title,
    children,
    fig = "",
    alt = "",
    figure,
}: {
    id?: string;
    label: string;
    title: string;
    children: ReactNode;
    fig?: string;
    alt?: string;
    figure?: ReactNode;
}) {
    return (
        <div id={id} className="grid min-w-0 scroll-mt-16 gap-3.5 pt-9">
            <Eyebrow>{label}</Eyebrow>
            <h3 className="font-serif text-[24px] leading-[1.2] text-head md:text-[28px]">
                {title}
            </h3>
            <Body>{children}</Body>
            {figure ?? <Fig name={fig} alt={alt} />}
        </div>
    );
}

// a design decision: number, title, principle, why, then her figure on a canvas with "The call"
export function Decision({
    id,
    n,
    title,
    principle,
    children,
    fig = "",
    alt = "",
    figure,
    extra,
    call,
}: {
    id: string;
    n: number;
    title: string;
    principle: string;
    children: ReactNode;
    fig?: string;
    alt?: string;
    // a live figure (e.g. the hub merge) instead of an image
    figure?: ReactNode;
    // a second container under the figure (e.g. the flow as screens)
    extra?: ReactNode;
    call: ReactNode;
}) {
    return (
        <div id={id} className="grid min-w-0 scroll-mt-16 gap-4">
            <Eyebrow>Design decision #{n}</Eyebrow>
            <h3 className="font-serif text-[28px] leading-[1.18] text-head md:text-[32px]">
                {title}
            </h3>
            <p className="font-serif text-[19px] leading-7 text-muted-foreground italic md:text-[21px]">
                {principle}
            </p>
            <Body>{children}</Body>
            <div className="grid gap-4">
                {figure ?? (
                    <Image
                        src={figSrc(fig)}
                        alt={alt}
                        width={figSize(fig)[0]}
                        height={figSize(fig)[1]}
                        unoptimized
                        sizes="(min-width: 1100px) 860px, 100vw"
                        className="block h-auto w-full"
                    />
                )}
                {extra}
                <div
                    className={`${SKEU} flex flex-col gap-2 rounded-[14px] px-5 py-4 sm:flex-row sm:gap-4`}
                >
                    <span className="shrink-0 pt-0.5 font-mono text-[12px] tracking-[0.14em] text-[#c8553b] uppercase">
                        The call
                    </span>
                    <span className="printed text-[15px] leading-6 text-ink">{call}</span>
                </div>
            </div>
        </div>
    );
}

export function Chips({ items }: { items: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((c) => (
                <span
                    key={c}
                    className={`${SKEU} rounded-full px-3.5 py-2 font-mono text-[13px] text-ink`}
                >
                    {c}
                </span>
            ))}
        </div>
    );
}

export function QuoteCard({ children, by }: { children: ReactNode; by: string }) {
    return (
        <figure className="grid gap-[18px] rounded-[24px] bg-[#f3d6cc] px-6 py-8 sm:px-10 sm:pt-10 sm:pb-9 dark:bg-[#3a2622]">
            <blockquote className="font-serif text-[21px] leading-[1.35] text-pretty text-head md:text-[26px]">
                “{children}”
            </blockquote>
            <figcaption className="font-mono text-[12px] tracking-[0.14em] text-ink uppercase">
                {by}
            </figcaption>
        </figure>
    );
}

// numbered takeaways in two columns, each under a hairline
export function Takeaways({ items }: { items: [string, string][] }) {
    return (
        <ol className="grid gap-x-8 sm:grid-cols-2">
            {items.map(([a, b], i) => (
                <li key={a} className="grid content-start gap-2 border-t border-line pt-5 pb-6">
                    <span className="font-mono text-[12px] tracking-[0.1em] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[20px] leading-[26px] text-head">{a}</span>
                    <span className="printed text-[14px] leading-[22px] text-muted-foreground">
                        {b}
                    </span>
                </li>
            ))}
        </ol>
    );
}

// "Live on Google Play" as a quiet text link with the Play logo, for the Platform fact
export function PlayLink() {
    return (
        <a
            href="https://play.google.com/store/apps/details?id=com.bouncedaily.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0">
                <path
                    d="M4.5 2.6 13.4 12l-8.9 9.4c-.3-.2-.5-.6-.5-1V3.6c0-.4.2-.8.5-1Z"
                    fill="#00D7FE"
                />
                <path d="m16.4 9-3 3 3 3 3.4-1.9c1-.6 1-1.6 0-2.2L16.4 9Z" fill="#FFCE00" />
                <path d="M13.4 12 4.5 21.4c.3.2.8.2 1.2 0L16.4 15l-3-3Z" fill="#FF3A44" />
                <path d="M4.5 2.6c.4-.2.8-.2 1.2 0L16.4 9l-3 3-8.9-9.4Z" fill="#00F076" />
            </svg>
            Live on Google Play
        </a>
    );
}

// the whole old journey vs the new one, as a Figma canvas: an "Old app" and a green "New app" section, each step a small
// frame with its screen count, blue prototype arrows between them, and New / Moved here / Removed tags (Figma v5, The big move)
type Kind = "kept" | "removed" | "new" | "moved";
const KIND: Record<Kind, { stroke: string; tag?: [string, string] }> = {
    kept: { stroke: "#dcdcdc" },
    new: { stroke: "#7fd1a0", tag: ["New", "#14ae5c"] },
    moved: { stroke: "#f5b97a", tag: ["Moved here", "#f5a524"] },
    removed: { stroke: "#f2a3a3", tag: ["Removed", "#f24822"] },
};
const OLD_FLOW: [string, string, Kind][] = [
    ["Play Store", "3 screens", "kept"],
    ["Intro", "3 screens", "kept"],
    ["Location", "1 screen", "kept"],
    ["Sign up", "3 screens", "kept"],
    ["Reference contact", "3 screens", "removed"],
    ["Aadhaar", "7 screens", "kept"],
    ["Driving licence", "2 screens", "kept"],
    ["Selfie", "2 screens", "kept"],
    ["Wait for approval", "1 screen", "kept"],
    ["Pick a hub", "5 screens", "kept"],
    ["Scooter + plan", "2 screens", "kept"],
    ["Pay", "1 screen", "kept"],
    ["Countdown", "2 screens", "kept"],
    ["Time ran out", "2 screens", "kept"],
    ["Clear dues", "1 screen", "kept"],
];
const NEW_FLOW: [string, string, Kind][] = [
    ["Splash + intro", "4 screens", "kept"],
    ["Sign up", "2 screens", "kept"],
    ["3-step checklist", "1 screen", "new"],
    ["Allow location", "1 screen", "new"],
    ["Pick a hub (map)", "1 screen", "kept"],
    ["Scooter type", "1 screen", "new"],
    ["Plan, KM, review", "3 screens", "kept"],
    ["① KYC submit (2 min)", "1 screen", "moved"],
    ["② Pay + success", "2 screens", "kept"],
    ["KYC check in background", "3 screens", "new"],
    ["Pick up + ride", "4 screens", "new"],
    ["Status on home", "3 screens", "kept"],
    ["Loyalty", "4 screens", "new"],
];
const FIGMA_UI = {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
};

function FlowSection({
    label,
    after,
    steps,
}: {
    label: string;
    after?: boolean;
    steps: [string, string, Kind][];
}) {
    return (
        <div
            className={`grid gap-3.5 rounded-md border px-[18px] pt-3.5 pb-5 ${after ? "border-[#bfe7c9] bg-[#f3fbf5]" : "border-[#e2e2e2] bg-[#f5f5f5]"}`}
        >
            <span
                className={`w-fit rounded px-2 py-[3px] text-[11px] font-medium ${after ? "bg-[#14ae5c] text-white" : "bg-[#e6e6e6] text-[#1e1e1e]"}`}
            >
                {label}
            </span>
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-3">
                {steps.map(([name, sub, kind], i) => (
                    <li key={name + i} className="flex items-center gap-1.5">
                        <span
                            className="grid gap-[3px] rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                            style={{
                                boxShadow: `inset 0 0 0 ${kind === "kept" ? 1 : 1.5}px ${KIND[kind].stroke}, 0 1px 2px rgba(0,0,0,0.04)`,
                            }}
                        >
                            <span className="flex items-center gap-1.5">
                                <span className="text-[13px] font-medium text-[#1e1e1e]">
                                    {name}
                                </span>
                                {KIND[kind].tag && (
                                    <span
                                        className="rounded-[3px] px-[5px] py-px text-[9px] font-medium text-white"
                                        style={{ background: KIND[kind].tag![1] }}
                                    >
                                        {KIND[kind].tag![0]}
                                    </span>
                                )}
                            </span>
                            <span className="text-[11px] text-[#8c8c8c]">{sub}</span>
                        </span>
                        {i < steps.length - 1 && (
                            <svg aria-hidden="true" width="16" height="9" viewBox="0 0 16 9">
                                <path
                                    d="M1 4.5h13M10.5 1l3.5 3.5L10.5 8"
                                    fill="none"
                                    stroke="#0d99ff"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export function FlowCompare({ caption }: { caption?: string }) {
    return (
        <figure className="grid min-w-0 gap-3">
            <div className="grid gap-[18px]" style={FIGMA_UI}>
                <FlowSection label="Old app · 15 steps, 39 screens" steps={OLD_FLOW} />
                <FlowSection label="New app · 13 stages" after steps={NEW_FLOW} />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {(["kept", "new", "moved", "removed"] as Kind[]).map((k) => (
                        <span
                            key={k}
                            className="flex items-center gap-1.5 text-[11px] text-[#5c5c5c]"
                        >
                            <span
                                aria-hidden="true"
                                className="size-3 rounded-[3px] bg-white"
                                style={{ boxShadow: `inset 0 0 0 1.5px ${KIND[k].stroke}` }}
                            />
                            {k === "kept"
                                ? "Kept"
                                : KIND[k].tag![0] === "New"
                                  ? "New step"
                                  : KIND[k].tag![0]}
                        </span>
                    ))}
                </div>
            </div>
            {caption && (
                <figcaption className="printed text-[13px] leading-[20px] text-muted-foreground">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
