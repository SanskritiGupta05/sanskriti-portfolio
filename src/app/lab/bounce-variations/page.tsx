import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Bounce · variations", robots: { index: false } };

const ILL = "/assets/cases/bounce/v5/ill";
const RED = "#c8553b";

const ILLS: { k: string; w: number; h: number; name: string; when: string }[] = [
    { k: "sold-out", w: 600, h: 491, name: "Hub sold out", when: "No scooters left at this hub" },
    {
        k: "not-in-city",
        w: 606,
        h: 662,
        name: "Not in your city",
        when: "Outside Bengaluru and Delhi NCR",
    },
    { k: "charging", w: 937, h: 547, name: "Battery stations", when: "Swap and charge on the way" },
    { k: "rider", w: 668, h: 549, name: "Riding", when: "Plan active, out on deliveries" },
    { k: "hub", w: 863, h: 526, name: "Your hub", when: "Where to collect the scooter" },
    { k: "licence", w: 783, h: 518, name: "Licence approved", when: "Switch to high speed" },
    { k: "kyc-pending", w: 745, h: 515, name: "KYC in review", when: "Usually 2–4 hours" },
    { k: "kyc-approved", w: 706, h: 488, name: "KYC approved", when: "Ready to book" },
    {
        k: "kyc-rejected",
        w: 740,
        h: 512,
        name: "KYC not approved",
        when: "Says why, offers a re-upload",
    },
];
const ill = (k: string) => ILLS.find((i) => i.k === k)!;

const TAKEAWAYS: [string, string, string][] = [
    [
        "When you ask matters as much as what you ask.",
        "KYC asked for the same documents before and after. Moving it to just before paying turned a wall into a last step.",
        "When you ask",
    ],
    [
        "Fewer taps doesn't always mean better understanding.",
        "The extra scooter step cost one screen and made the licence rule impossible to miss.",
        "Fewer taps",
    ],
    [
        "Riders who read little need a different form, not less.",
        "A map, a picture, a chip or a number, never a paragraph.",
        "a different form",
    ],
    [
        "Push for launch data from day one.",
        "So the next round of decisions comes from riders, not only from principles, and open questions like KYC refunds get settled early.",
        "launch data",
    ],
    [
        "Make the case with screens, not words.",
        "The red concern was deferred. Next time I'd show a few screens side by side from the first week.",
        "screens, not words",
    ],
];

function Label({ n, title, note }: { n: string; title: string; note: string }) {
    return (
        <div className="mb-5 flex flex-wrap items-baseline gap-3">
            <span className="grid size-7 place-items-center rounded-full bg-[#1e1e1e] text-[12px] font-semibold text-white">
                {n}
            </span>
            <h3 className="font-serif text-[22px] text-head">{title}</h3>
            <span className="text-[13px] text-muted-foreground">{note}</span>
        </div>
    );
}

function Ill({ k, className = "" }: { k: string; className?: string }) {
    const i = ill(k);
    return (
        <Image
            src={`${ILL}/${k}.webp`}
            alt={i.name}
            width={i.w}
            height={i.h}
            unoptimized
            className={`h-auto w-full object-contain ${className}`}
        />
    );
}

function UiBento() {
    const tile = "skeu grid min-h-0 content-between gap-2 overflow-hidden rounded-2xl p-4";
    return (
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_200px] md:grid-rows-[190px_190px]">
            <div
                className={`${tile} md:row-span-2`}
                style={{ background: "linear-gradient(180deg,#fff,#fdf5f2)" }}
            >
                <Ill k="not-in-city" className="mx-auto max-h-[230px] w-auto" />
                <div>
                    <p className="font-serif text-[20px] text-head">Every state gets a picture</p>
                    <p className="text-[13px] text-muted-foreground">
                        So riders who read little still know what happened.
                    </p>
                </div>
            </div>
            {["sold-out", "licence", "kyc-approved", "kyc-rejected"].map((k) => (
                <div key={k} className={tile}>
                    <div className="grid min-h-0 place-items-center">
                        <Ill k={k} className="max-h-[120px] w-auto" />
                    </div>
                    <span className="text-[12px] font-semibold text-head">{ill(k).name}</span>
                </div>
            ))}
            <div className="skeu grid min-h-0 grid-rows-[auto_1fr] gap-2 overflow-hidden rounded-2xl p-3 md:col-start-4 md:row-span-2 md:row-start-1">
                <span
                    className="text-[11px] font-semibold tracking-[0.14em] uppercase"
                    style={{ color: RED }}
                >
                    Loyalty
                </span>
                <div className="min-h-0 overflow-hidden rounded-[14px] ring-1 ring-black/[0.08]">
                    <Image
                        src="/assets/cases/bounce/v2/new/loyalty.webp"
                        alt="Loyalty tiers"
                        width={660}
                        height={1434}
                        unoptimized
                        className="block h-auto w-full"
                    />
                </div>
            </div>
        </div>
    );
}

function UiMoments() {
    const rows: { k: string[]; title: string; line: string }[] = [
        {
            k: ["kyc-pending", "kyc-approved", "kyc-rejected"],
            title: "One family for KYC",
            line: "Pending, approved, not approved: the same ID card, a different badge, so the status reads before the words.",
        },
        {
            k: ["sold-out", "not-in-city"],
            title: "Dead ends with a way out",
            line: "Sold out and not in your city both lead with a picture, then one action.",
        },
        {
            k: ["licence", "charging"],
            title: "Moments worth celebrating",
            line: "Licence approved and battery stations get warmth, not just a tick.",
        },
    ];
    return (
        <div className="grid gap-3">
            {rows.map((r) => (
                <div
                    key={r.title}
                    className="skeu grid items-center gap-5 rounded-2xl p-5 md:grid-cols-[1.3fr_1fr]"
                >
                    <div className="grid grid-cols-3 gap-3">
                        {r.k.map((k) => (
                            <figure
                                key={k}
                                className="m-0 grid gap-1.5 rounded-xl bg-[#f8f8f8] p-3"
                            >
                                <Ill k={k} className="mx-auto max-h-[80px] w-auto" />
                                <figcaption className="text-center text-[11px] text-muted-foreground">
                                    {ill(k).name}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <div>
                        <p className="font-serif text-[20px] text-head">{r.title}</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                            {r.line}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function UiShelf() {
    return (
        <div className="grid gap-4">
            <div className="skeu overflow-hidden rounded-2xl p-5">
                <span
                    className="text-[11px] font-semibold tracking-[0.14em] uppercase"
                    style={{ color: RED }}
                >
                    Custom illustrations · 9 states
                </span>
                <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
                    {ILLS.map((i) => (
                        <figure key={i.k} className="m-0 grid w-[132px] shrink-0 gap-2">
                            <div className="grid aspect-square place-items-center rounded-full bg-[#fbf1ee] p-4">
                                <Ill k={i.k} />
                            </div>
                            <figcaption className="text-center">
                                <span className="block text-[12px] font-semibold text-head">
                                    {i.name}
                                </span>
                                <span className="block text-[10.5px] leading-snug text-muted-foreground">
                                    {i.when}
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
            <div className="skeu grid items-center gap-5 overflow-hidden rounded-2xl p-5 md:grid-cols-[1fr_1.1fr]">
                <Image
                    src={`${ILL}/loyalty.webp`}
                    alt="Loyalty: a rider on the road through Start, Cruise, Power and Nitro"
                    width={1080}
                    height={789}
                    unoptimized
                    className="h-auto w-full rounded-xl"
                />
                <div className="grid gap-3">
                    <span
                        className="text-[11px] font-semibold tracking-[0.14em] uppercase"
                        style={{ color: RED }}
                    >
                        Loyalty
                    </span>
                    <p className="font-serif text-[20px] text-head">A reason to keep riding</p>
                    <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
                        {["Start", "Cruise", "Power", "Nitro"].map((x, i, a) => (
                            <li key={x} className="flex items-center gap-1.5">
                                <span className="rounded-full border border-line bg-white px-3 py-1 text-[12px] font-semibold text-head">
                                    {x}
                                </span>
                                {i < a.length - 1 && (
                                    <span className="text-muted-foreground">→</span>
                                )}
                            </li>
                        ))}
                    </ol>
                    <p className="text-[13px] text-muted-foreground">
                        Rewards like extra kilometres, a gold top-up and a free day.
                    </p>
                </div>
            </div>
        </div>
    );
}

function TakeCards() {
    return (
        <ol className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
            {TAKEAWAYS.map(([a, b], i) => (
                <li
                    key={a}
                    className={`skeu grid content-start gap-3 rounded-2xl p-5 ${i === 4 ? "md:col-span-2" : ""}`}
                >
                    <span className="font-serif text-[40px] leading-none" style={{ color: RED }}>
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[20px] leading-snug text-head">{a}</span>
                    <span className="text-[13px] leading-relaxed text-muted-foreground">{b}</span>
                </li>
            ))}
        </ol>
    );
}

function TakeStatements() {
    return (
        <ol className="m-0 list-none p-0">
            {TAKEAWAYS.map(([a, b, key], i) => {
                const at = a.indexOf(key);
                return (
                    <li
                        key={a}
                        className="grid gap-2 border-t border-line py-6 md:grid-cols-[48px_1.2fr_1fr] md:gap-6"
                    >
                        <span
                            className="grid size-9 place-items-center rounded-full text-[13px] font-semibold text-white"
                            style={{ background: RED }}
                        >
                            {i + 1}
                        </span>
                        <span className="font-serif text-[24px] leading-[1.25] text-head">
                            {a.slice(0, at)}
                            <span style={{ color: RED }}>{key}</span>
                            {a.slice(at + key.length)}
                        </span>
                        <span className="text-[13px] leading-relaxed text-muted-foreground md:pt-1.5">
                            {b}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
}

function TakeNotes() {
    const tones = ["#fff6d8", "#fde9e3", "#e9f4ec", "#e8eefc", "#f3eafc"];
    const tilt = [-1.6, 1.2, -0.8, 1.6, -1.2];
    return (
        <ol className="m-0 grid list-none gap-5 p-2 md:grid-cols-3">
            {TAKEAWAYS.map(([a, b], i) => (
                <li
                    key={a}
                    className="relative grid content-start gap-2 rounded-[4px] px-5 pt-7 pb-5 shadow-[0_14px_24px_-16px_rgba(60,40,20,0.55)]"
                    style={{ background: tones[i], rotate: `${tilt[i]}deg` }}
                >
                    <span
                        aria-hidden="true"
                        className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 bg-white/70 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                    />
                    <span className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
                        NOTE {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[19px] leading-snug text-head">{a}</span>
                    <span className="text-[12.5px] leading-relaxed text-ink">{b}</span>
                </li>
            ))}
        </ol>
    );
}

export default function Variations() {
    const block = "rounded-[28px] bg-[#f5f5f5] p-5 sm:p-8 dark:bg-surface";
    return (
        <main className="mx-auto grid w-full max-w-[1000px] gap-16 px-6 py-16">
            <header className="grid gap-2">
                <span className="label">Bounce Daily · preview</span>
                <h1 className="font-serif text-[36px] text-head">Variations to pick from</h1>
                <p className="text-muted-foreground">
                    Two sections, three options each. Tell me which (or which mix) to use.
                </p>
            </header>

            <section className="grid gap-10">
                <h2 className="font-serif text-[28px] text-head">
                    The UI layer · &ldquo;Calm enough to read at a glance.&rdquo;
                </h2>
                <div className={block}>
                    <Label
                        n="A"
                        title="Bento"
                        note="one hero illustration, four states, the loyalty screen beside them"
                    />
                    <UiBento />
                </div>
                <div className={block}>
                    <Label
                        n="B"
                        title="Families"
                        note="illustrations grouped by what they do, each with one line of why"
                    />
                    <UiMoments />
                </div>
                <div className={block}>
                    <Label
                        n="C"
                        title="Shelf + tiers"
                        note="all nine states on a scrolling shelf, then loyalty as its own card"
                    />
                    <UiShelf />
                </div>
            </section>

            <section className="grid gap-10">
                <h2 className="font-serif text-[28px] text-head">What I&apos;m taking with me</h2>
                <div className={block}>
                    <Label
                        n="A"
                        title="Numbered cards"
                        note="big numerals, raised cards, the last one full width"
                    />
                    <TakeCards />
                </div>
                <div className="rounded-[28px] bg-white p-5 sm:p-8 dark:bg-surface">
                    <Label
                        n="B"
                        title="Statements"
                        note="one per row, the key words in red, the why beside it"
                    />
                    <TakeStatements />
                </div>
                <div className={block}>
                    <Label
                        n="C"
                        title="Paper notes"
                        note="taped notes in soft tones, in step with the site's paper feel"
                    />
                    <TakeNotes />
                </div>
            </section>
        </main>
    );
}
