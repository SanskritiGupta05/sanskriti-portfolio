import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Ticket } from "@/components/casestudy/pieces";
import { CaseStudyFrame, Note, P, Quote, Section, type TocItem } from "@/components/casestudy/Margin";
import { Cast, FeelingCurve, LivePhone, OrbitDiagram, ProcessChart, RevealTimeline, STAGE, TemplateSwap } from "@/components/spider/Spider";

export const metadata: Metadata = {
  title: "Spider-Verse cards · Sanskriti",
  description: "What if the Spider-Verse chose you? Turning the thrill of opening a trading card pack into a web experience.",
};

// Spider-Verse cards, rebuilt from scratch in the margin-notes language. Story from Sanskriti's
// Framer case study; card data, colours and motion numbers read from the live site; stills captured from it.
const LIVE = "https://spider-verse-cards.netlify.app/";
const VIDEO = "https://x.com/GuptaSanskritii/status/2082887168863920342/video/1";

const TOC: TocItem[] = [
  { id: "spark", label: "The spark" },
  { id: "feeling", label: "Designing a feeling" },
  { id: "making", label: "How it was made" },
  { id: "ai", label: "Words first" },
  { id: "cards", label: "Template to card" },
  { id: "cast", label: "The cast" },
  { id: "reveal", label: "The reveal" },
  { id: "orbit", label: "Tuning the shuffle" },
  { id: "colour", label: "Your card, your colours" },
  { id: "response", label: "You liked it" },
  { id: "learned", label: "What I learned" },
];

export default function SpiderVerse() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-6">
      <div className="mx-auto max-w-[826px]">
        <Nav />
      </div>

      <CaseStudyFrame
        toc={TOC}
        header={
          <header className="pt-6">
            <Link href="/#vibe" className="label !text-ink underline-offset-4 hover:underline">
              ← All work
            </Link>
            <span className="label mt-8 block">Vibe-coded project · Web + iOS</span>
            <h1 className="mt-3 font-serif text-h2 text-head">Spider-Verse cards</h1>
            <p className="mt-3 max-w-[30ch] font-worn text-h1 text-balance text-head">What if the Spider-Verse chose you?</p>
            <div className="mt-8">
              <Ticket
                kicker="Personal experiment · Admit one"
                text="A playful side project that turns the thrill of opening a trading card pack into an interactive web experience. Designed in Figma, explored with ChatGPT, vibecoded in Cursor."
                meta={[
                  { k: "My role", v: "Design, prompts, build" },
                  { k: "Platform", v: "Web + iOS" },
                  { k: "Cards", v: "7 Spider-People, 7 Earths" },
                ]}
              />
            </div>
            {/* the three key moments, captured from the live site */}
            <div className="relative mt-10 overflow-hidden rounded-[22px] px-6 pt-10" style={{ background: STAGE }}>
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 55% 60% at 50% 70%, #E21B2233 0%, transparent 65%)" }}
              />
              <div className="relative mx-auto flex max-w-[620px] items-end justify-center gap-4">
                <LivePhone name="live-landing" alt="Landing: the Spider-Verse chooses you" className="w-[30%] translate-y-8 -rotate-3" />
                <LivePhone name="live-orbit" alt="The cards orbiting" className="z-10 w-[34%]" />
                <LivePhone name="live-reveal-miles" alt="The reveal: Miles Morales" className="w-[30%] translate-y-8 rotate-3" />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a href={LIVE} target="_blank" rel="noreferrer" className="rounded-full bg-[#e3342f] px-5 py-2.5 text-sm text-white transition hover:-translate-y-0.5">
                Reveal my spider ↗
              </a>
              <a href={VIDEO} target="_blank" rel="noreferrer" className="label !text-ink underline-offset-4 hover:underline">
                Watch the video on X ↗
              </a>
            </div>
          </header>
        }
      >
        <Section id="spark" label="The spark" title="It started with a childhood obsession.">
          <P>
            I grew up collecting trading cards. The best part was never the card itself. It was the few seconds before you saw it: the anticipation, the surprise, the joy of
            meeting a new character.
          </P>
          <Quote>I wanted to see if I could recreate that feeling on the web, with the Spider-Verse.</Quote>
        </Section>

        <Section id="feeling" label="Flow chart" title="I wasn't designing screens. I was designing a feeling.">
          <P>
            Before anything else I drew the shape of that feeling: a small spark when you open the pack, a long climb while you wait, a peak at the reveal, and the warm
            glow after. Each beat on the curve became a moment in the app.
          </P>
          <FeelingCurve />
          <Note label="The rule I kept coming back to" tilt={-1.2}>
            The wait is the product. Make it long enough to build suspense, short enough to keep you watching.
          </Note>
        </Section>

        <Section id="making" label="Flow chart" title="From a feeling to something you can hold.">
          <P>Each tool did one job. Words in ChatGPT, craft in Figma, motion in Cursor, and Capacitor to feel it in my hand.</P>
          <ProcessChart />
        </Section>

        <Section id="ai" label="Words first, not pixels" title="I asked ChatGPT for a skeleton, not a picture.">
          <P>
            I sketched the card skeleton myself and asked ChatGPT to turn it into a template I could fill in for each of my seven Spider-People: a type badge, an art slot, a
            name and subtitle, three stats and an Earth.
          </P>
          <div className="grid gap-3 rounded-3xl border border-line bg-surface/50 p-5">
            <span className="label">ChatGPT · Card templates</span>
            <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-head px-4 py-3 text-sm leading-relaxed text-bg">
              Can you make a trading card template inspired by Pokémon cards? Futuristic and holographic. Leave the character area empty, I&apos;ll add the art myself.
              Include space for name, type and powers.
            </p>
            <div className="flex max-w-[80%] gap-1.5 rounded-2xl rounded-bl-md border border-line bg-bg p-2.5">
              {["peter", "miles", "gwen", "miguel", "noir", "punk", "ham"].map((t) => (
                <Image key={t} src={`/assets/cases/spider/t-${t}.webp`} alt="" width={593} height={900} sizes="60px" className="h-auto w-[13%] rounded-[4px]" />
              ))}
            </div>
          </div>
          <Note label="The catch" tilt={1.2}>
            ChatGPT couldn&apos;t draw the actual Spider-Verse characters, because they&apos;re copyrighted. Every template came back with an empty art slot, so the heroes were up
            to me.
          </Note>
        </Section>

        <Section id="cards" label="In Figma" title="Same structure, seven personalities.">
          <P>
            I brought the templates into Figma and made each one mine: character art blended into the frame, a name and subtitle, an Earth and a number, stat bars, and one
            colour story per card. Flip between the two to see what changed.
          </P>
          <TemplateSwap />
        </Section>

        <Section id="cast" label="The cast" title="Seven Spider-People, each with a line to take home.">
          <P>
            Every card got two accent colours and a short quote you see under it when it&apos;s revealed, so getting a card feels like getting a message. Pick one, and hover
            it to see the holographic tilt.
          </P>
          <Cast />
        </Section>

        <Section id="reveal" label="Flow chart" title="The reveal, beat by beat.">
          <P>
            Static cards looked good, but I wanted the reveal to feel like ripping open a pack. I vibecoded it in Cursor, describing the feeling and tuning the motion
            until the wait felt right. Here is the whole sequence with the timings it ended up with.
          </P>
          <RevealTimeline />
        </Section>

        <Section id="orbit" label="Tuning the shuffle" title="A good shuffle needs depth, a breath and a slow finish.">
          <P>
            A flat carousel felt like a slideshow. What made it feel like a magical deck was depth: cards travel on a wide, flat ellipse across three lanes, so they pass in
            front of and behind each other. The ring gently breathes, the spin ramps up over 620ms, starts slowing after 55% of the orbit and coasts to a stop before one card
            is pulled out.
          </P>
          <OrbitDiagram />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["5.8s", "of orbit before the pick. The longest beat, on purpose."],
              ["3 lanes", "of depth, so cards weave like a real shuffle."],
              ["0.94", "coast decay, so the deck settles instead of stopping dead."],
            ].map(([n, d]) => (
              <div key={n} className="rounded-2xl border border-line bg-bg p-5">
                <span className="block font-worn text-h2 text-[#c8402c]">{n}</span>
                <span className="printed mt-1 block text-sm">{d}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="colour" label="A detail I love" title="The whole screen takes on your card's colours.">
          <P>
            When your card arrives, the light behind it shifts to that card&apos;s two accents. Miles gets electric blue and red, Spider-Punk gets acid green. It makes every
            reveal feel like it was made for you.
          </P>
          <div className="grid grid-cols-2 gap-4 sm:max-w-[520px]">
            <figure className="grid gap-2">
              <LivePhone name="live-reveal-miles" alt="Miles Morales revealed, in blue and red light" />
              <figcaption className="label">Miles · #3BC4FF + #E21B22</figcaption>
            </figure>
            <figure className="grid gap-2">
              <LivePhone name="live-reveal-punk" alt="Spider-Punk revealed, in green and gold light" />
              <figcaption className="label">Punk · #C8FF2E + #FF2A2A</figcaption>
            </figure>
          </div>
        </Section>

        <Section id="response" label="P.S." title="You liked it.">
          <P>I shared it on X just to see what people thought. The response was way more heartwarming than I expected.</P>
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
          <a href={VIDEO} target="_blank" rel="noreferrer" className="group grid gap-3 rounded-2xl border border-line bg-bg p-5 transition hover:-translate-y-1">
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
        </Section>

        <Section id="learned" label="What I learned">
          <ol className="grid gap-4">
            {[
              ["Design the feeling before the screen.", "The emotion curve made every motion decision easier to judge."],
              ["Waiting can be the best part.", "The longest beat in the flow is the one people remember."],
              ["AI is a great collaborator, not the designer.", "ChatGPT gave me structure; the characters, colours and timing had to come from me."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[32px_1fr] items-baseline gap-2 border-b border-dashed border-line pb-4">
                <span className="label !text-[#c8402c]">0{i + 1}</span>
                <span>
                  <span className="block font-serif text-lg text-head">{t}</span>
                  <span className="printed text-sm">{d}</span>
                </span>
              </li>
            ))}
          </ol>
          <Quote>&ldquo;Small experiment, big love.&rdquo;</Quote>
          <div className="flex flex-wrap items-center gap-4">
            <a href={LIVE} target="_blank" rel="noreferrer" className="rounded-full bg-[#e3342f] px-5 py-2.5 text-sm text-white transition hover:-translate-y-0.5">
              Ready to meet your spider? ↗
            </a>
            <Link href="/#vibe" className="label !text-ink underline-offset-4 hover:underline">
              ← Back to all work
            </Link>
          </div>
        </Section>
      </CaseStudyFrame>

      <div className="mx-auto max-w-[826px]">
        <Footer />
      </div>
    </div>
  );
}
