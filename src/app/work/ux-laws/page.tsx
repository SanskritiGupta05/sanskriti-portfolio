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
import { Ticket } from "@/components/casestudy/pieces";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ToolRow } from "@/components/Tools";
import {
    Anatomy,
    AppMap,
    Beat,
    CategoryGrid,
    Clip,
    LawBehind,
    LoopChart,
    Reel,
    Screen,
    Screens,
} from "@/components/uxie/Uxie";

export const metadata: Metadata = {
    title: "UXie, UX laws made playful · Sanskriti",
    description:
        "Designing and building UXie: 106 UX laws in a deck you can swipe, recall, hear and play.",
};

function Shot({
    src,
    w,
    h,
    alt,
    caption,
}: {
    src: string;
    w: number;
    h: number;
    alt: string;
    caption?: string;
}) {
    return (
        <figure className="grid gap-2">
            <Image
                src={src}
                alt={alt}
                width={w}
                height={h}
                unoptimized
                className="block h-auto w-full"
            />
            {caption && <figcaption className="label">{caption}</figcaption>}
        </figure>
    );
}

const img = (name: string, w: number, h: number) => ({
    src: `/assets/cases/uxie/${name}.webp`,
    w,
    h,
});

const TOC: TocItem[] = [
    { id: "why", label: "The starting point" },
    { id: "sorting", label: "Organising 106 laws" },
    { id: "loop", label: "The core loop" },
    { id: "map", label: "The app map" },
    { id: "deck", label: "A deck, not a list" },
    { id: "illustrated", label: "Every law, illustrated" },
    { id: "recall", label: "Recall first" },
    { id: "page", label: "One law, one page" },
    { id: "listen", label: "Read it, or hear it" },
    { id: "play", label: "Then test it" },
    { id: "keep", label: "Saved & search" },
    { id: "figma", label: "From the Figma file" },
    { id: "details", label: "The small things" },
    { id: "next", label: "What's next" },
];

export default function UxLaws() {
    return (
        <div className="w-full [&_nav[aria-label=Contents]]:font-serif [&_nav[aria-label=Contents]_.label]:text-[15px] [&_nav[aria-label=Contents]_.label]:tracking-normal [&_nav[aria-label=Contents]_.label]:normal-case [&_nav[aria-label=Contents]_a]:text-[15px] [&_article>section>.label:first-child]:flex [&_article>section>.label:first-child]:items-center [&_article>section>.label:first-child]:gap-2.5 [&_article>section>.label:first-child]:font-mono [&_article>section>.label:first-child]:!text-[14px] [&_article>section>.label:first-child]:font-bold [&_article>section>.label:first-child]:!tracking-[0.14em] [&_article>section>.label:first-child]:!text-(--cs-accent) [&_article>section>.label:first-child]:before:content-[''] [&_article>section>.label:first-child]:before:size-[7px] [&_article>section>.label:first-child]:before:shrink-0 [&_article>section>.label:first-child]:before:rounded-full [&_article>section>.label:first-child]:before:bg-(--cs-accent) [&_article>section>.label:first-child]:before:shadow-[0_0_0_3px_color-mix(in_srgb,var(--cs-accent)_35%,transparent)]">
            <div className="mx-auto max-w-[826px] px-6">
                <Nav />
            </div>

            <CaseStudyFrame
                layout="sheet"
                toc={TOC}
                header={
                    <header className="pt-6">
                        <Link
                            href="/work#vibe"
                            className="label !text-ink underline-offset-4 hover:underline"
                        >
                            ← All work
                        </Link>
                        <div className="mt-8 flex items-center gap-4">
                            <Image
                                src="/assets/cases/uxie/uxie-logo.webp"
                                alt="UXie logo"
                                width={1137}
                                height={1140}
                                sizes="64px"
                                className="size-16"
                            />
                            <span className="label">Personal project · Design + build</span>
                        </div>
                        <h1 className="mt-4 font-serif text-h2 text-head">UXie</h1>
                        <p className="mt-3 max-w-[30ch] font-worn text-h1 text-balance text-head">
                            106 UX laws, made playful. The psychology behind better design.
                        </p>
                        <div className="mt-8">
                            <Ticket
                                kicker="Personal project · Design + build"
                                text="An iOS app that turns UX laws into a deck of illustrated cards. Swipe through them, try to remember what you've learned, listen to an explanation or test yourself with a quick quiz."
                                meta={[
                                    { k: "My role", v: "Product Design & Development" },
                                    { k: "Platform", v: "iOS · SwiftUI" },
                                    { k: "Content", v: "106 UX laws · 8 categories" },
                                ]}
                            />
                        </div>
                        <div className="mt-8">
                            <ToolRow tools={["figma", "claude", "xcode"]} />
                        </div>
                        <div className="mt-10">
                            <Reel />
                        </div>
                    </header>
                }
            >
                <Section
                    id="why"
                    label="The starting point"
                    title="I kept reading UX laws. I kept forgetting them."
                >
                    <P>
                        Hick&apos;s Law, the Zeigarnik Effect, the Peak-End Rule. Every designer
                        comes across these names, usually as a long list on a website or a poster on
                        a wall. You read them, save them, and then quietly forget them right when
                        you need one.
                    </P>
                    <P>
                        I wanted something I could carry around and spend a few minutes with. Not
                        another reference to search, but a little deck to play with.
                    </P>
                    <P>So I started building UXie.</P>
                    <Note label="The brief" tilt={-1.5}>
                        Make it feel like a game of cards, not a textbook. Every law gets a picture,
                        a plain-language explanation and a way to test yourself.
                    </Note>
                </Section>

                <Section
                    id="sorting"
                    label="Organising 106 laws"
                    title="First, 106 laws had to fit into eight drawers."
                >
                    <P>
                        A flat list of 106 was the very thing I wanted to escape. So the first real
                        design work was sorting.
                    </P>
                    <P>
                        I grouped the laws by the questions they answer for a designer: what do
                        people notice, what do they remember, what do they trust, what brings them
                        back? That gave me eight categories, each with a one-line description.
                    </P>
                    <CategoryGrid />
                    <P>
                        Many laws answer more than one question. That&apos;s why some ideas
                        naturally connect across categories.
                    </P>
                    <LawBehind name="Chunking">
                        Grouping related information into smaller, meaningful sets makes a large
                        collection easier to approach. Instead of starting with 106 individual laws,
                        users can start with eight familiar categories.
                    </LawBehind>
                </Section>

                <Section
                    id="loop"
                    label="The core loop"
                    title="See it. Try to remember it. Learn it. Test it."
                >
                    <P>
                        Before drawing screens, I wrote down how a law should travel from
                        &ldquo;never heard of it&rdquo; to &ldquo;I can use this.&rdquo; Each step
                        became part of the app, and each one leads into the next.
                    </P>
                    <LoopChart />
                    <P>
                        The idea was to make learning feel like a small loop rather than a one-way
                        reading experience.
                    </P>
                </Section>

                <Section
                    id="map"
                    label="The app map"
                    title="Four ways in, and they all lead to the same page."
                >
                    <P>
                        From the home deck, users can dive into a category, jump into a quiz, open
                        their saved laws or search for something specific. However they arrive, they
                        land on the same law page, so there&apos;s always one place to get right.
                    </P>
                    <AppMap />
                </Section>

                <Section id="deck" label="Decision 01" title="A deck, not a list.">
                    <Beat clip="explore" label="Recording · exploring the deck">
                        <P>
                            The home screen is a stack of category cards you can swipe through. Each
                            one has its own colour and illustration. It makes 106 laws feel like
                            eight friendly places to explore instead of a wall of text.
                        </P>
                        <P>
                            Inside a category, the laws sit in a grid of cards that you can drag in
                            any direction. It never runs out, like a table covered in flashcards.
                        </P>
                        <LawBehind name="Hick's Law">
                            Too many choices can make decisions harder. Starting with eight
                            categories gives users a more manageable way into the collection before
                            they explore individual laws.
                        </LawBehind>
                    </Beat>
                    <Screens
                        items={[
                            ["home", "Home deck"],
                            ["home-focused", "A category in focus"],
                            ["category", "Inside a category"],
                        ]}
                    />
                </Section>

                <Section
                    id="illustrated"
                    label="Decision 02"
                    title="Every law gets its own picture."
                >
                    <P>
                        A name like &ldquo;Serial Position Effect&rdquo; is hard to hold on to. A
                        picture of it is much easier.
                    </P>
                    <P>
                        I drew a flat illustration for every one of the 106 laws, then varied each
                        card&apos;s colour and composition. The illustrations give each concept
                        something visual to hold on to, while the category colour tells you where it
                        belongs before you read a word.
                    </P>
                    <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
                        <Shot
                            {...img("perception-six-cards", 1600, 1367)}
                            alt="Six Attention & Perception law cards"
                            caption="Attention & Perception"
                        />
                        <Shot
                            {...img("decisions-six-cards", 1600, 1367)}
                            alt="Six Decisions & Choice law cards"
                            caption="Decisions & Choice, the biggest drawer"
                        />
                        <Shot
                            {...img("memory-three-cards", 1600, 683)}
                            alt="Memory & Recall law cards"
                            caption="Memory & Recall"
                        />
                        <Shot
                            {...img("social-four-cards", 1600, 512)}
                            alt="Social Influence law cards"
                            caption="Social Influence"
                        />
                    </div>
                    <LawBehind name="Visual Anchors">
                        A visual cue gives users another way to recognise a concept, rather than
                        relying on its name alone.
                    </LawBehind>
                </Section>

                <Section id="recall" label="Decision 03" title="Ask before you tell.">
                    <Beat clip="recall" label="Recording · think you remember?">
                        <P>
                            Tapping a card doesn&apos;t open the answer straight away. It asks,
                            &ldquo;Think you remember?&rdquo; first, and you flip the card to check.
                        </P>
                        <P>
                            Trying to recall something, even when you get it wrong, makes it stick
                            far better than simply rereading it.
                        </P>
                        <LawBehind name="Testing Effect">
                            Actively trying to retrieve information helps reinforce learning. The
                            card makes that attempt part of the interaction, rather than giving away
                            the answer immediately.
                        </LawBehind>
                    </Beat>
                    <Screens
                        items={[
                            ["recall", "The question side"],
                            ["revealed", "Flipped"],
                        ]}
                    />
                </Section>

                <Section
                    id="page"
                    label="Decision 04"
                    title="One law, one page, always in the same order."
                >
                    <P>
                        Every law page has the same anatomy, so after two or three, you know exactly
                        where to look. It starts with the idea in one sentence and gets deeper as
                        you scroll, so a quick look and a long read both work.
                    </P>
                    <Anatomy />
                    <LawBehind name="Consistency">
                        Keeping the same structure across all 106 pages means users don&apos;t have
                        to figure out a new layout every time they open a law.
                    </LawBehind>
                </Section>

                <Section id="listen" label="Decision 05" title="Read it, or hear it.">
                    <Beat clip="read" label="Recording · read-aloud">
                        <P>
                            Some people learn better by listening, and sometimes your eyes are busy.
                            Every law can be read aloud, with each word highlighting as it&apos;s
                            spoken.
                        </P>
                        <P>
                            Tap any word to jump there, skip ten seconds either way, or change the
                            speed.
                        </P>
                        <LawBehind
                            label="The design thinking"
                            name="Multiple ways to consume information"
                        >
                            The reading experience stays the same, but users can choose how they
                            want to move through it.
                        </LawBehind>
                    </Beat>
                    <Screens
                        items={[
                            ["read", "Reading"],
                            ["listen", "Listening"],
                        ]}
                    />
                </Section>

                <Section id="play" label="Decision 06" title="Then put it to the test.">
                    <Beat clip="play" label="Recording · a round of Play">
                        <P>
                            Play is a quick five-question quiz. Every answer gets an instant
                            &ldquo;Correct!&rdquo; or &ldquo;Not quite!&rdquo;, and a
                            &ldquo;Why?&rdquo; so a wrong answer still teaches you something.
                        </P>
                        <P>At the end you see your score and the laws worth another look.</P>
                        <LawBehind name="Testing Effect">
                            A quiz turns learning into an active attempt to remember. The instant
                            explanation also gives users a chance to understand what they missed.
                        </LawBehind>
                    </Beat>
                    <Screens
                        items={[
                            ["play-intro", "Start"],
                            ["play-q", "A question"],
                            ["play-correct", "Correct!"],
                            ["play-wrong", "Not quite!"],
                            ["play-results", "Results"],
                        ]}
                    />
                    <div className="max-w-[520px]">
                        <Shot
                            {...img("quiz-captions-aligned", 1010, 700)}
                            alt="Quiz answer feedback states"
                            caption="Answer feedback, lined up in Figma"
                        />
                    </div>
                </Section>

                <Section
                    id="keep"
                    label="Decision 07"
                    title="Keep the ones you like. Find any of them fast."
                >
                    <P>
                        Bookmark a law and file it into folders, so the ones you keep reaching for
                        are always one tap away.
                    </P>
                    <P>
                        And when you already know the law you want, search gets you there without
                        browsing the whole deck.
                    </P>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Clip src="saved" label="Recording · saved" />
                        <Screen name="saved" caption="Saved" />
                        <Clip src="search" label="Recording · search" />
                        <Screen name="search" caption="Search" />
                    </div>
                    <LawBehind name="Recognition over Recall">
                        Saved laws and search make it easier to return to something you&apos;ve
                        already discovered, without having to remember where it was.
                    </LawBehind>
                </Section>

                <Section
                    id="figma"
                    label="From the Figma file"
                    title="Every flow, laid out end to end."
                >
                    <P>
                        I designed the app in Figma first and kept every flow on one board, from the
                        home deck through reading, listening, search and play, down to the
                        components they share.
                    </P>
                    <P>
                        It was my map while building. Having everything laid out together made it
                        easier to see how one interaction connected to the next.
                    </P>
                    <Shot
                        {...img("flowboard", 1547, 2400)}
                        alt="The full flow board from the UX laws Figma file"
                        caption="One law, every flow, from the Figma file"
                    />
                </Section>

                <Section id="details" label="The small things" title="Room for everyone.">
                    <P>
                        Text scales up for anyone who needs it larger, and the screens work with
                        VoiceOver.
                    </P>
                    <P>
                        A dark mode is also in progress, with the illustrations and category colours
                        finding their way into a different setting.
                    </P>
                    <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
                        <Shot
                            {...img("accessibility-preview", 1266, 934)}
                            alt="Larger text preview"
                            caption="Larger text"
                        />
                        <Shot
                            {...img("dark-mode-preview", 1600, 838)}
                            alt="Dark mode preview"
                            caption="Dark mode, in progress"
                        />
                    </div>
                </Section>

                <Section id="next" label="What's next">
                    <P>
                        I built UXie in SwiftUI myself, so every decision above had to work beyond
                        the Figma file. The 106 vector illustrations, the endless card grid, a
                        read-aloud that keeps pace word by word, and the little interactions all had
                        to come together in a working app.
                    </P>
                    <P>
                        I&apos;m still refining dark mode and getting the experience ready for more
                        people to use.
                    </P>
                    <Quote>The best way to learn UX laws is to start designing with them.</Quote>
                    <Link
                        href="/work#vibe"
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
