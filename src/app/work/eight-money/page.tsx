import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CaseStudyFrame, P, Quote, Section, type TocItem } from "@/components/casestudy/Margin";
import { Ticket } from "@/components/casestudy/pieces";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
    title: "eight.money · Sanskriti",
    description:
        "Designing eight.money from 0 to 1: one place to see, use and optimise your cards and wallets.",
};

const img = (name: string, h: number, w = 1600) => ({
    src: `/assets/cases/eight/${name}.webp`,
    w,
    h,
});

function Shot({ src, w, h, alt }: { src: string; w: number; h: number; alt: string }) {
    return (
        <Image
            src={src}
            alt={alt}
            width={w}
            height={h}
            unoptimized
            className="block h-auto w-full"
        />
    );
}

const TOC: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "onboarding", label: "Onboarding" },
    { id: "home", label: "Home screen" },
    { id: "balance", label: "Total balance" },
    { id: "wallet", label: "Open wallet" },
    { id: "history", label: "Transaction history" },
    { id: "analytics", label: "Dashboard analytics" },
    { id: "bills", label: "Bill payments" },
    { id: "kyc", label: "KYC" },
    { id: "pin", label: "Change PIN" },
    { id: "web", label: "Web design" },
    { id: "decks", label: "Pitch decks" },
    { id: "closing", label: "Closing thought" },
];

const FLOWS: [string, string, string, ReturnType<typeof img>[]][] = [
    [
        "onboarding",
        "Onboarding experience",
        "Custom visual assets and walkthroughs to introduce new users.",
        [img("onboarding", 630)],
    ],
    [
        "home",
        "Home screen",
        "Central hub for the user's financial overview.",
        [img("home-1", 1167), img("home-2", 752), img("home-3", 696)],
    ],
    [
        "balance",
        "Total balance flow",
        "Visual breakdown of funds across wallets and cards.",
        [img("balance", 1424)],
    ],
    [
        "wallet",
        "Open wallet UI",
        "Quick access to virtual and physical card details.",
        [img("wallet", 660)],
    ],
    [
        "history",
        "Transaction history",
        "Clean, filterable history view with smart categorisation.",
        [img("history", 696)],
    ],
    [
        "analytics",
        "Dashboard analytics",
        "Reward summaries, spend trends, and real-time charts.",
        [img("analytics", 2748)],
    ],
    [
        "bills",
        "Bill payments",
        "Seamless bill management and recurring payment setup.",
        [img("bills", 909)],
    ],
    ["kyc", "KYC screens", "Regulatory-compliant identity verification UX.", [img("kyc", 756)]],
    ["pin", "Change PIN flow", "Secure and intuitive PIN management.", [img("pin", 1225)]],
];

export default function EightMoney() {
    return (
        <div className="w-full [&_nav[aria-label=Contents]]:font-serif [&_nav[aria-label=Contents]_.label]:text-[15px] [&_nav[aria-label=Contents]_.label]:tracking-normal [&_nav[aria-label=Contents]_.label]:normal-case [&_nav[aria-label=Contents]_a]:text-[15px] [&_article>section>.label:first-child]:flex [&_article>section>.label:first-child]:items-center [&_article>section>.label:first-child]:gap-2.5 [&_article>section>.label:first-child]:font-mono [&_article>section>.label:first-child]:!text-[14px] [&_article>section>.label:first-child]:font-bold [&_article>section>.label:first-child]:!tracking-[0.14em] [&_article>section>.label:first-child]:!text-(--cs-accent) [&_article>section>.label:first-child]:before:content-[''] [&_article>section>.label:first-child]:before:size-[7px] [&_article>section>.label:first-child]:before:shrink-0 [&_article>section>.label:first-child]:before:rounded-full [&_article>section>.label:first-child]:before:bg-(--cs-accent) [&_article>section>.label:first-child]:before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--cs-accent)_35%,transparent)]">
            <div className="mx-auto max-w-[826px] px-6">
                <Nav />
            </div>

            <CaseStudyFrame
                layout="sheet"
                accent="#7040E0"
                toc={TOC}
                header={
                    <header className="pt-6">
                        <Link
                            href="/work#primary"
                            className="label !text-ink underline-offset-4 hover:underline"
                        >
                            ← All work
                        </Link>
                        <span className="label mt-8 block">Case study · 0 → 1</span>
                        <h1 className="mt-3 font-serif text-h2 text-head">eight.money</h1>
                        <p className="mt-3 max-w-[34ch] font-worn text-h1 text-balance text-head">
                            Unifying how people spend, save and benefit from the cards they already
                            have.
                        </p>
                        <div className="mt-8">
                            <Ticket
                                kicker="Fintech app, 0 → 1"
                                text="The payments landscape is rapidly changing. eight.money sits at the intersection of unbundling and rebundling financial services, connecting users to their existing financial tools in an optimised way."
                                meta={[
                                    { k: "My role", v: "Product Designer" },
                                    { k: "Duration", v: "3 months" },
                                    { k: "Scope", v: "0 → 1 product, web, pitch decks" },
                                ]}
                            />
                        </div>
                        <div className="mt-10">
                            <Shot {...img("hero", 1181)} alt="eight.money app" />
                        </div>
                        <dl className="mt-10 grid gap-4 sm:grid-cols-2">
                            {[
                                [
                                    "What is it?",
                                    "eight.money unifies and optimises how people spend, save and benefit from the cards and wallets they already have.",
                                ],
                                [
                                    "Who's it for?",
                                    "People juggling multiple cards, wallets and reward programs who want one place to see, use and optimise all of it.",
                                ],
                                [
                                    "My role",
                                    "I designed the eight.money app from 0 to 1: core flows, interface patterns, system states and components, alongside the marketing site and investor pitch decks.",
                                ],
                                [
                                    "The build",
                                    "I designed the home experience, wallet and balance flows, transaction history, analytics, rewards, bill payments, KYC and account security.",
                                ],
                            ].map(([q, a]) => (
                                <div key={q} className="skeu rounded-2xl p-5">
                                    <dt className="label">{q}</dt>
                                    <dd className="printed mt-2 text-sm leading-relaxed">{a}</dd>
                                </div>
                            ))}
                        </dl>
                    </header>
                }
            >
                <Section
                    id="overview"
                    label="Overview"
                    title="One place to see, use and optimise every card and wallet."
                >
                    <P>
                        eight.money unifies and optimises how you spend, save, and benefit from your
                        cards, simplifying your financial journey and maximising your savings.
                    </P>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Shot {...img("intro-1", 582, 906)} alt="eight.money, a first look" />
                        <Shot {...img("intro-2", 582, 906)} alt="eight.money, a second look" />
                    </div>
                </Section>

                {FLOWS.map(([id, title, line, shots]) => (
                    <Section key={id} id={id} label="Product flow" title={title}>
                        <P>{line}</P>
                        {shots.map((s) => (
                            <Shot key={s.src} {...s} alt={title} />
                        ))}
                    </Section>
                ))}

                <Section
                    id="web"
                    label="Web design"
                    title="A landing page that builds trust and drives early access."
                >
                    <P>
                        Designed a marketing landing page to communicate eight.money&apos;s value
                        proposition, build trust, and drive early access sign-ups.
                    </P>
                    <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
                        <Shot {...img("web-1", 2841)} alt="eight.money landing page" />
                        <Shot {...img("web-2", 1526)} alt="eight.money landing page, details" />
                    </div>
                </Section>

                <Section
                    id="decks"
                    label="Pitch decks (confidential)"
                    title="Storytelling for investors."
                >
                    <P>
                        Collaborated with the founding team to design high-impact investor decks,
                        combining storytelling with clean visuals to reflect the brand&apos;s
                        credibility.
                    </P>
                    <Shot {...img("decks", 915)} alt="Pitch deck slides" />
                </Section>

                <Section id="closing" label="Closing thought">
                    <Quote>
                        “I started this project thinking about how to design a finance app. I
                        finished it thinking about how to design the one screen someone opens first
                        thing in the morning to ask: where do I stand?”
                    </Quote>
                    <Link
                        href="/work#primary"
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
