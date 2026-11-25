import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CaseStudyFrame, P, Section, type TocItem } from "@/components/casestudy/Margin";
import { Ticket } from "@/components/casestudy/pieces";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
    title: "Dualite · Sanskriti",
    description:
        "Illustrations and marketing creatives for Dualite, an AI-powered full-stack development tool.",
};

const d = (name: string, w: number, h: number, alt: string) => ({
    src: `/assets/cases/dualite/${name}.webp`,
    w,
    h,
    alt,
});

const TOC: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "builder-fridays", label: "Builder Fridays" },
    { id: "podcast", label: "Design to Dev podcast" },
    { id: "posts", label: "Social posts" },
    { id: "thumbnails", label: "Video thumbnails" },
    { id: "campus", label: "Campus collab" },
    { id: "demos", label: "Product demos" },
];

type Pic = { src: string; w: number; h: number; alt: string };
function Shot({ src, w, h, alt }: Pic) {
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
function Row({ items, cols = "sm:grid-cols-2" }: { items: Pic[]; cols?: string }) {
    return (
        <div className={`grid items-start gap-4 ${cols}`}>
            {items.map((p) => (
                <Shot key={p.src} {...p} />
            ))}
        </div>
    );
}

export default function Dualite() {
    return (
        <div className="w-full [&_nav[aria-label=Contents]]:font-serif [&_nav[aria-label=Contents]_.label]:text-[15px] [&_nav[aria-label=Contents]_.label]:tracking-normal [&_nav[aria-label=Contents]_.label]:normal-case [&_nav[aria-label=Contents]_a]:text-[15px] [&_article>section>.label:first-child]:flex [&_article>section>.label:first-child]:items-center [&_article>section>.label:first-child]:gap-2.5 [&_article>section>.label:first-child]:font-mono [&_article>section>.label:first-child]:!text-[14px] [&_article>section>.label:first-child]:font-bold [&_article>section>.label:first-child]:!tracking-[0.14em] [&_article>section>.label:first-child]:!text-(--cs-accent) [&_article>section>.label:first-child]:before:content-[''] [&_article>section>.label:first-child]:before:size-[7px] [&_article>section>.label:first-child]:before:shrink-0 [&_article>section>.label:first-child]:before:rounded-full [&_article>section>.label:first-child]:before:bg-(--cs-accent) [&_article>section>.label:first-child]:before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--cs-accent)_35%,transparent)]">
            <div className="mx-auto max-w-[826px] px-6">
                <Nav />
            </div>

            <CaseStudyFrame
                layout="sheet"
                accent="#3A3A3A"
                toc={TOC}
                header={
                    <header>
                        <Link
                            href="/work#early"
                            className="label !text-ink underline-offset-4 hover:underline"
                        >
                            ← All work
                        </Link>
                        <span className="label mt-8 block">Early career · Freelance</span>
                        <h1 className="mt-3 font-serif text-h2 text-head">Dualite</h1>
                        <p className="mt-3 max-w-[34ch] font-worn text-h1 text-balance text-head">
                            Illustrations for the marketing team of an AI full-stack tool.
                        </p>
                        <div className="mt-8">
                            <Ticket
                                kicker="Freelance designer"
                                text="Dualite is an AI-powered full-stack development tool that turns plain-English prompts or design files into fully functional web and mobile applications."
                                meta={[
                                    { k: "My role", v: "Freelance Designer" },
                                    { k: "Duration", v: "3 months" },
                                    { k: "Scope", v: "Marketing illustrations" },
                                ]}
                            />
                        </div>
                        <div className="mt-10">
                            <Shot
                                src="/assets/cases/early-dualite.webp"
                                w={1800}
                                h={1253}
                                alt="Dualite Alpha is now launched"
                            />
                        </div>
                    </header>
                }
            >
                <Section id="overview" label="Overview">
                    <P>All of the illustration that I made for marketing team of Dualite.</P>
                    <div className="mx-auto w-full max-w-[460px]">
                        <Shot
                            {...d(
                                "alpha-launch",
                                2000,
                                3586,
                                "Dualite Alpha is now launched: the launch creative with the app",
                            )}
                        />
                    </div>
                </Section>

                <Section
                    id="builder-fridays"
                    label="Builder Fridays"
                    title="Episode creatives, in every size."
                >
                    <Shot
                        {...d(
                            "builder-fridays-banner",
                            2000,
                            1125,
                            "Builder Fridays, Episode 3: YouTube banner",
                        )}
                    />
                    <Row
                        items={[
                            d(
                                "builder-fridays-story",
                                1350,
                                2400,
                                "Builder Fridays, Episode 3: Instagram story",
                            ),
                            d(
                                "builder-fridays-post",
                                2000,
                                2113,
                                "Builder Fridays, Episode 3: post",
                            ),
                        ]}
                    />
                </Section>

                <Section id="podcast" label="Design to Dev: The Podcast" title="Podcast covers.">
                    <Row
                        cols="grid-cols-3"
                        items={[
                            d(
                                "podcast-70-30",
                                1350,
                                2400,
                                "Design to Dev podcast #03: 70-30 problem",
                            ),
                            d(
                                "podcast-developer",
                                1350,
                                2400,
                                "Design to Dev podcast #03: changing definition of a developer",
                            ),
                            d("podcast-pehchan", 1350, 2400, "Design to Dev podcast #03: pehchan"),
                        ]}
                    />
                </Section>

                <Section id="posts" label="Social posts" title="Concept to launch, Figma to code.">
                    <Row
                        items={[
                            d(
                                "post-concept-1",
                                1968,
                                1968,
                                "Move from concept to launch. Fast: developer illustration",
                            ),
                            d(
                                "post-concept-2",
                                1968,
                                1968,
                                "Move from concept to launch. Fast: code background",
                            ),
                            d(
                                "post-concept-3",
                                1968,
                                1968,
                                "Move from concept to launch. Fast: alpha app",
                            ),
                            d(
                                "post-concept-4",
                                1968,
                                1968,
                                "Move from concept to launch. Fast: wireframe to alpha",
                            ),
                            d(
                                "post-masterclass-zoom",
                                1968,
                                1968,
                                "Figma to Code Masterclass, live on Zoom",
                            ),
                            d(
                                "post-masterclass-meet",
                                1968,
                                1968,
                                "Figma to Code Masterclass, live on Google Meet",
                            ),
                        ]}
                    />
                </Section>

                <Section
                    id="thumbnails"
                    label="Video thumbnails"
                    title="Prompting, generative UI and more."
                >
                    {[
                        d("thumb-prompt", 2000, 1233, "How to prompt well?"),
                        d("thumb-figma-react", 2000, 1230, "Figma to React"),
                        d("thumb-generative-ui", 2000, 1233, "Introduction to generative UI"),
                        d("thumb-figma-flutter", 2000, 1228, "Figma to Flutter"),
                        d("thumb-figma-react-code", 2000, 1228, "Figma design to React code"),
                        d("thumb-figma-tailwind", 2000, 1228, "Figma to Tailwind"),
                        d("thumb-vs-bolt", 2000, 1091, "alpha vs bolt"),
                        d("thumb-vs-lovable", 2000, 1093, "alpha vs Lovable"),
                        d("thumb-vs-replit", 2000, 1091, "alpha vs Replit"),
                    ].map((p) => (
                        <Shot key={p.src} {...p} />
                    ))}
                </Section>

                <Section id="campus" label="Campus collab" title="A birthday gift for BITSians.">
                    <Row
                        items={[
                            d(
                                "bits-gift",
                                1920,
                                2400,
                                "Dualite x BITS: Rohan's gift to all the BITSians, with illustration",
                            ),
                            d(
                                "bits-signup",
                                1920,
                                2400,
                                "Dualite x BITS: Rohan's gift to all the BITSians, sign up now",
                            ),
                        ]}
                    />
                </Section>
                <Section id="demos" label="Product demos" title="Built with alpha.">
                    {[
                        d("demo-fintech", 1920, 1080, "FinTech app + React Native by alpha itself"),
                        d(
                            "demo-figma-import",
                            1920,
                            1080,
                            "Import your Figma file & integrate with alpha itself",
                        ),
                        d(
                            "demo-marketplace",
                            1920,
                            1080,
                            "Build end-to-end marketplace with alpha",
                        ),
                        d("demo-apis", 1920, 1080, "Integrating multiple APIs with alpha"),
                        d(
                            "demo-finance-dashboard",
                            1920,
                            1080,
                            "Build production grade finance dashboard with alpha",
                        ),
                        d("demo-no-code", 1920, 1080, "No code builder by alpha itself"),
                    ].map((p) => (
                        <Shot key={p.src} {...p} />
                    ))}
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
