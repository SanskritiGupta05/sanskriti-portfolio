import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Ticket } from "@/components/casestudy/pieces";
import { CaseStudyFrame, Flow, Note, P, Quote, Section, Shot, type TocItem } from "@/components/casestudy/Margin";
import { Anatomy, AppMap, Beat, CategoryGrid, Clip, LoopChart, Reel, Screen, Screens } from "@/components/uxie/Uxie";

export const metadata: Metadata = {
  title: "UXie, UX laws made playful · Sanskriti",
  description: "Designing and building UXie: 106 UX laws in a deck you can swipe, recall, hear and play.",
};

// UXie case study. Recordings are Sanskriti's own screen captures of the app; screens are from her
// "UX laws iOS app" Figma file; illustrations are the redrawn in-app ones (never the early reference cards).
const img = (name: string, w: number, h: number) => ({ src: `/assets/cases/uxie/${name}.webp`, w, h });

const TOC: TocItem[] = [
  { id: "why", label: "Why I made it" },
  { id: "sorting", label: "Sorting 106 laws" },
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
    <div className="mx-auto w-full max-w-[1080px] px-6">
      <div className="mx-auto max-w-[826px]">
        <Nav />
      </div>

      <CaseStudyFrame
        toc={TOC}
        header={
          <header className="pt-6">
            <Link href="/#work" className="label !text-ink underline-offset-4 hover:underline">
              ← All work
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <Image src="/assets/cases/uxie/uxie-logo-no-lines.webp" alt="UXie logo" width={1266} height={1243} sizes="64px" className="size-16" />
              <span className="label">Vibe-coded project · iOS</span>
            </div>
            <h1 className="mt-4 font-serif text-h2 text-head">UXie</h1>
            <p className="mt-3 max-w-[30ch] font-worn text-h1 text-balance text-head">106 UX laws, made playful. The psychology behind better design.</p>
            <div className="mt-8">
              <Ticket
                kicker="Personal project · Admit one"
                text="An iPhone app that turns the laws of UX into a deck of illustrated cards you can swipe through, try to recall, read or listen to, and then test yourself on."
                meta={[
                  { k: "My role", v: "Design + build" },
                  { k: "Platform", v: "iOS, SwiftUI" },
                  { k: "Content", v: "106 laws · 8 categories" },
                ]}
              />
            </div>
            <div className="mt-10">
              <Reel />
            </div>
          </header>
        }
      >
        <Section id="why" label="Why I made it" title="I kept reading UX laws. I kept forgetting them.">
          <P>
            Hick&apos;s Law, the Zeigarnik Effect, the Peak-End Rule. Every designer meets these names, usually as a long list on a website or a poster on a wall. They make
            sense when you read them, and then they quietly slip away right when you&apos;re in a design review and need one.
          </P>
          <P>
            So I set myself a small brief: make the laws something you can carry around, open for two minutes and actually remember. Not a reference to search, a deck to
            play with.
          </P>
          <Note label="The brief, on a sticky note" tilt={-1.5}>
            Make it feel like a game of cards, not a textbook. Every law gets a picture, a plain sentence, and a way to test yourself.
          </Note>
        </Section>

        <Section id="sorting" label="Information architecture" title="First, 106 laws had to fit in eight drawers.">
          <P>
            A flat list of 106 is the problem I was trying to escape, so the first real design work was sorting. I grouped the laws by the question they answer for a
            designer: what do people notice, what do they remember, why do they trust, what brings them back. That gave eight categories, each with a one-line promise.
          </P>
          <P>
            Many laws answer more than one question (loss aversion is about decisions and motivation), so a law can live in several categories. That&apos;s why the counts
            below add up to more than 106.
          </P>
          <CategoryGrid />
        </Section>

        <Section id="loop" label="Flow chart" title="The whole app is one loop: see it, recall it, learn it, test it.">
          <P>
            Before drawing screens I wrote down how a law should travel from &ldquo;never heard of it&rdquo; to &ldquo;I can use this&rdquo;. Each step became a part of the
            app, and each one hands you to the next.
          </P>
          <LoopChart />
        </Section>

        <Section id="map" label="Flow chart" title="Four ways in, and they all lead to the same page.">
          <P>
            From the home deck you can dive into a category, jump into a quiz, open what you saved or search. However you arrive, you land on the law page, so that page
            got the most care.
          </P>
          <AppMap />
        </Section>

        <Section id="deck" label="Decision 01" title="A deck, not a list.">
          <Beat clip="explore" label="Recording · exploring the deck">
            <P>
              The home screen is a stack of category cards you swipe through, each with its colour and illustration. It makes 106 laws feel like eight friendly things
              instead of a wall of text, and swiping is a lot more fun than scrolling.
            </P>
            <P>Inside a category, the laws sit in a grid of cards that you can drag in any direction and it never runs out, like a table covered in flashcards.</P>
            <Flow steps={["Swipe the deck", "Pick a category", "Drag the card grid", "Tap a law"]} />
          </Beat>
          <Screens
            items={[
              ["home", "Home deck"],
              ["home-focused", "A category in focus"],
              ["category", "Inside a category"],
            ]}
          />
        </Section>

        <Section id="illustrated" label="Decision 02" title="Every law gets its own picture.">
          <P>
            A name like &ldquo;Serial Position Effect&rdquo; is hard to hold on to. A picture of it is much easier. I drew a flat illustration for every one of the 106
            laws, then retinted each set in its category colour so a card tells you where it belongs before you read a word.
          </P>
          <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
            <Shot {...img("perception-six-cards", 1600, 1367)} alt="Six Attention & Perception law cards" caption="Attention & Perception" />
            <Shot {...img("decisions-six-cards", 1600, 1367)} alt="Six Decisions & Choice law cards" caption="Decisions & Choice, the biggest drawer" />
            <Shot {...img("memory-three-cards", 1600, 683)} alt="Memory & Recall law cards" caption="Memory & Recall" />
            <Shot {...img("social-four-cards", 1600, 512)} alt="Social Influence law cards" caption="Social Influence" />
          </div>
        </Section>

        <Section id="recall" label="Decision 03" title="Ask before you tell.">
          <Beat clip="recall" label="Recording · think you remember?">
            <P>
              Tapping a card doesn&apos;t open the answer straight away. It asks &ldquo;Think you remember?&rdquo; first, and you flip the card to check. Trying to recall
              something, even when you get it wrong, makes it stick far better than re-reading it.
            </P>
            <Note label="Practising what it preaches" tilt={1.2}>
              The app uses its own Memory &amp; Recall laws on you.
            </Note>
          </Beat>
          <Screens
            items={[
              ["recall", "The question side"],
              ["revealed", "Flipped"],
            ]}
          />
        </Section>

        <Section id="page" label="Decision 04" title="One law, one page, always in the same order.">
          <P>
            Every law page has the same anatomy, so after two or three you know exactly where to look. It starts with the idea in one sentence and gets deeper as you
            scroll, so a quick look and a long read both work.
          </P>
          <Anatomy />
        </Section>

        <Section id="listen" label="Decision 05" title="Read it, or hear it.">
          <Beat clip="read" label="Recording · read-aloud">
            <P>
              Some people learn better by listening, and sometimes your eyes are busy. Every law can be read aloud, with each word highlighting as it&apos;s spoken. Tap any
              word to jump there, skip ten seconds either way, or change the speed.
            </P>
            <Flow steps={["Play", "Words highlight", "Tap a word to jump", "±10s", "Speed"]} />
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
              Play is a quick five-question quiz. Every answer gets an instant &ldquo;Correct!&rdquo; or &ldquo;Not quite!&rdquo;, and a &ldquo;Why?&rdquo; so a wrong answer
              still teaches you something. At the end you see your score and the laws worth another look.
            </P>
            <Flow steps={["Start", "5 questions", "Correct! / Not quite!", "Why?", "Your score"]} />
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
            <Shot {...img("quiz-captions-aligned", 1010, 700)} alt="Quiz answer feedback states" caption="Answer feedback, lined up in Figma" />
          </div>
        </Section>

        <Section id="keep" label="Decision 07" title="Keep the ones you like. Find any of them fast.">
          <P>
            Bookmark a law and file it into folders, so the ones you keep reaching for are always one tap away. And when you already know the law you want, search gets
            you there without browsing.
          </P>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Clip src="saved" label="Recording · saved" />
            <Screen name="saved" caption="Saved" />
            <Clip src="search" label="Recording · search" />
            <Screen name="search" caption="Search" />
          </div>
        </Section>

        <Section id="figma" label="From the Figma file" title="Every flow, laid out end to end.">
          <P>
            I designed the app in Figma first and kept one board with every flow in a row, from the home deck through reading, listening, search and play, down to the
            components they share. It was my map while building.
          </P>
          <Shot {...img("flowboard", 1547, 2400)} alt="The full flow board from the UX laws Figma file" caption="One law, every flow, from the Figma file" />
        </Section>

        <Section id="details" label="The small things" title="Room for everyone.">
          <P>
            Text scales up for people who need it larger, and the screens work with VoiceOver. A dark mode is on its way, with the illustrations and category colours
            retuned for the night.
          </P>
          <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
            <Shot {...img("accessibility-preview", 1266, 934)} alt="Larger text preview" caption="Larger text" />
            <Shot {...img("dark-mode-preview", 1600, 838)} alt="Dark mode preview" caption="Dark mode, in progress" />
          </div>
        </Section>

        <Section id="next" label="What's next">
          <P>
            I built UXie in SwiftUI myself, so every decision above had to survive being real: 106 vector illustrations, an endless card grid, a read-aloud that keeps
            pace word by word. Next up is finishing dark mode and getting it into people&apos;s hands.
          </P>
          <Quote>&ldquo;The best way to learn the laws of UX turned out to be designing with them.&rdquo;</Quote>
          <Link href="/#work" className="label mt-6 w-fit !text-ink underline-offset-4 hover:underline">
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
