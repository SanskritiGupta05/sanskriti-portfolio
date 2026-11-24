import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { hand, Pin, PinnedPhoto, printPhoto } from "./paper";
import paintingSetup from "../../../public/assets/about/painting-setup.jpg";
import sketchEren from "../../../public/assets/about/sketch-eren.jpg";
import sketchDemonSlayer from "../../../public/assets/about/sketch-demon-slayer.jpg";
import cssNotes from "../../../public/assets/about/css-notes.jpg";
import hacktoberfest from "../../../public/assets/about/hacktoberfest-talk.jpg";
import devfestScreen from "../../../public/assets/about/devfest-screen.jpg";
import devfestGroup from "../../../public/assets/about/devfest-group.jpg";
import devfestSelfie from "../../../public/assets/about/devfest-selfie.jpg";
import aohBanner from "../../../public/assets/about/aoh-banner.jpg";
import aohSwag from "../../../public/assets/about/aoh-swag.jpg";
import aohTalk from "../../../public/assets/about/aoh-talk.jpg";
import postmanBox from "../../../public/assets/about/postman-box.jpg";
import designareCard from "../../../public/assets/about/designare-card.jpg";
import designareBanner from "../../../public/assets/about/designare-banner.jpg";
import designareMics from "../../../public/assets/about/designare-mics.jpg";
import gdscLead from "../../../public/assets/about/gdsc-open-source-lead.jpg";
import cardProcess from "../../../public/assets/about/pokemon-card-process.jpg";
import cardSilver from "../../../public/assets/about/pokemon-card-silver.jpg";
import deskNow from "../../../public/assets/about/desk-now.jpg";

// The journey, told as pinned moments. All copy comes from Sanskriti's own notes and posts.

// one step: a number, a heading and the typed story
function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid content-start gap-3">
      <p className="label !text-[#c8553b]">{n}</p>
      <h3 className="font-serif text-h2m leading-tight text-head md:text-h2">{title}</h3>
      <div className="printed grid gap-3 text-base text-ink">{children}</div>
    </div>
  );
}

// a post of hers, rebuilt as a paper card (text copied word for word)
function Post({
  children,
  date,
  media,
  mediaAlt,
  className = "",
}: {
  children: React.ReactNode;
  date?: string;
  media?: StaticImageData;
  mediaAlt?: string;
  className?: string;
}) {
  return (
    <figure className={`skeu group relative rounded-xl p-4 text-sm ${className}`}>
      <Pin />
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-serif text-base text-head">Sanskriti Gupta</span>
        <span className="text-[#77716A]">@GuptaSanskritii</span>
      </div>
      <div className="grid gap-2 whitespace-pre-line text-ink">{children}</div>
      {media && (
        <Image
          src={media}
          alt={mediaAlt ?? ""}
          sizes="(min-width: 768px) 300px, 80vw"
          placeholder="blur"
          className={`mt-3 block h-auto w-full rounded-md ${printPhoto}`}
        />
      )}
      {date && <p className="mt-2 text-[#77716A]">{date}</p>}
    </figure>
  );
}

const workStops: { role: string; place: string; when: string; href?: string }[] = [
  { role: "Graphic design intern", place: "GeeksforGeeks", when: "May – Oct 2024", href: "/work/geeksforgeeks" },
  { role: "Freelance product designer", place: "Keploy", when: "Freelance", href: "/work/keploy" },
  { role: "Freelance designer", place: "Dualite", when: "Freelance", href: "/work/dualite" },
  { role: "Product designer, Bounce Daily", place: "DreamLaunch", when: "Jan – Oct 2025", href: "/work/bounce-daily" },
  { role: "Product designer", place: "AppX (YC'21)", when: "Nov 2025 – now" },
];

export function Journey() {
  return (
    <section aria-labelledby="journey" className="grid gap-20 pb-24 md:gap-28">
      <header className="grid gap-2 text-center">
        <p className="label">Journey</p>
        <h2 id="journey" className="font-serif text-h2m text-head md:text-h2">
          How I got <span className="font-worn">here</span>
        </h2>
      </header>

      {/* 01 · the kid who drew */}
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Step n="01" title="A computer at home">
          <p>
            My dad was the first in our family to get a computer, and he loved digital gadgets. That&apos;s
            where my interest in tech came from.
          </p>
          <p>
            I started with MS Paint and Photoshop. I was always the kid drawing, the one teachers loved and
            sent to drawing competitions. I never stopped.
          </p>
        </Step>
        <div className="relative mx-auto aspect-[10/9] w-full max-w-[420px]">
          <PinnedPhoto
            src={paintingSetup}
            alt="Sanskriti's painting table: brushes, paint pots, a sketchbook and a laptop showing Starry Night references"
            box="absolute left-[2%] top-[4%] w-[52%]"
            tilt="-rotate-[3deg]"
            caption="natural habitat"
          />
          <PinnedPhoto
            src={sketchEren}
            alt="Sanskriti's coloured-pencil drawing of an anime character with a sword"
            box="absolute right-[0%] top-[0%] w-[44%]"
            tilt="rotate-[4deg]"
          />
          <PinnedPhoto
            src={sketchDemonSlayer}
            alt="Sanskriti's pencil sketch of an anime character next to a red Demon Slayer logo"
            box="absolute right-[4%] top-[50%] w-[50%]"
            tilt="-rotate-[2deg]"
          />
        </div>
      </div>

      {/* 02 · learning how tech works */}
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="order-2 grid gap-6 md:order-1">
          <Post
            className="mx-auto w-full max-w-[20rem] -rotate-[1.5deg] md:mx-0 md:max-w-[21rem]"
            media={cssNotes}
            mediaAlt="A spiral notebook page of handwritten CSS notes"
            date="Oct 3, 2023"
          >
            {`It was literally soo dumb of me to make notes of CSS when I was learning frontend.

But we all start somewhere, I guess. 😌`}
          </Post>
          <Post className="mx-auto w-full max-w-[22rem] rotate-[1deg] md:mx-0 md:ml-10">
            {`The first ever blog I wrote on @hashnode crossed 1k+ views!🥹

I wrote this when I was in my first sem. However, the mentorship I received from this platform was amazing✨`}
            <span className="skeu-sunk mt-1 block rounded-md px-3 py-2">
              <span className="font-serif text-base text-head">How To Get Started With Programming</span>
              <span className="block text-[#77716A]">Hashnode · 8 min read · 1.0K views</span>
            </span>
          </Post>
        </div>
        <div className="order-1 md:order-2">
          <Step n="02" title="Curious about how it works">
            <p>
              I was amazed by how much was on the internet, and I wanted to know how tech works.
            </p>
            <p>
              So I joined Twitter, went to tech meetups, wrote blogs and did 100 Days of Code, mostly
              frontend. Yes, with handwritten CSS notes.
            </p>
          </Step>
        </div>
      </div>

      {/* 03 · showing up */}
      <div className="grid gap-10">
        <div className="mx-auto max-w-[36rem] text-center">
          <Step n="03" title="Showing up">
            <p>
              Meetups became my favourite thing: DevFest 2023 in New Delhi, design evenings at AOH (After
              Office Hours), Designare&apos;s Design Dialogue in Delhi, Postman&apos;s API Fundamentals Student Expert programme, and a talk on
              Hacktoberfest 2023 as Open Source Lead at GDSC IIMT.
            </p>
          </Step>
        </div>
        {/* the pinboard: tilted prints in loose columns (2 on phones, 4 on desktop) */}
        <div className="columns-2 gap-5 md:columns-4 md:gap-6 [&>figure]:mb-6">
          <PinnedPhoto
            src={devfestScreen}
            alt="Sanskriti in front of the DevFest 2023 New Delhi screen"
            box="relative mt-3 inline-block w-full"
            tilt="-rotate-[3deg]"
            caption="devfest '23, new delhi"
          />
          <PinnedPhoto
            src={devfestGroup}
            alt="A group photo behind the Google Developer Groups DevFest 2023 sign"
            box="relative mt-3 inline-block w-full"
            tilt="rotate-[2deg]"
          />
          <PinnedPhoto
            src={designareCard}
            alt="Sanskriti's trading-card style attendee pass from Designare's Design Dialogue, 11 Jan 2025"
            box="relative mt-3 inline-block w-full"
            tilt="rotate-[3deg]"
            caption="designare, jan '25"
          />
          <PinnedPhoto
            src={gdscLead}
            alt="Sanskriti from behind in a Google Developer Student Clubs T-shirt reading Open Source Lead, Sanskriti Gupta"
            box="relative mt-3 inline-block w-full"
            tilt="-rotate-[3deg]"
            caption="open source lead, gdsc"
          />
          <PinnedPhoto
            src={devfestSelfie}
            alt="A selfie with friends at DevFest 2023"
            box="relative mt-3 inline-block w-full"
            tilt="-rotate-[2deg]"
          />
          <PinnedPhoto
            src={aohBanner}
            alt="The After Office Hours welcome banner at a design event"
            box="relative mt-3 inline-block w-full"
            tilt="rotate-[3deg]"
            caption="after office hours"
          />
          <PinnedPhoto
            src={designareBanner}
            alt="Designare's Design Dialogue Delhi banner, 11 Jan 2025"
            box="relative mt-3 inline-block w-full"
            tilt="-rotate-[2deg]"
          />
          <PinnedPhoto
            src={aohTalk}
            alt="A speaker presenting 'The theory of everyday joy' at an AOH design event"
            box="relative mt-3 inline-block w-full"
            tilt="-rotate-[3deg]"
          />
          <PinnedPhoto
            src={designareMics}
            alt="Two people speaking into microphones at Designare's Design Dialogue"
            box="relative mt-3 inline-block w-full"
            tilt="rotate-[2deg]"
          />
          <PinnedPhoto
            src={aohSwag}
            alt="Summer of AOH illustrated cards, a bookmark and postcards from the event"
            box="relative mt-3 inline-block w-full"
            tilt="-rotate-[2deg]"
          />
          <PinnedPhoto
            src={postmanBox}
            alt="Postman API Fundamentals Student Expert swag: a notebook, pen, bottle and stickers"
            box="relative mt-3 inline-block w-full"
            tilt="rotate-[3deg]"
            caption="postman student expert"
          />
        </div>
        {/* the talk post sits under the board, so it never covers the photos */}
        <Post
          className="mx-auto w-full max-w-[24rem] -rotate-[1deg] md:-mt-4"
          media={hacktoberfest}
          mediaAlt="Sanskriti's Hacktoberfest presentation slide for GDSC IIMT"
        >
          {`🚀 Just wrapped up a session as a speaker about the @hacktoberfest 2023 event, hosted by the Google Developer Student Club of IIMT! 😊✨`}
        </Post>
      </div>

      {/* 04 · design, for real */}
      <div className="grid items-start gap-10 md:grid-cols-2">
        <Step n="04" title="Design, for real">
          <p>
            Interning at GeeksforGeeks, one of the biggest tech-education platforms, was a dream come true. I
            picked up design there, explored a lot of visual design, and got a really nice farewell.
          </p>
          <p>
            Then the sky was the limit: freelance work with Bangalore startups, a design studio, and now a
            YC-backed company.
          </p>
        </Step>
        {/* a side project from those days: the silver Pokémon card, from sketch to Figma */}
        <div className="relative mx-auto aspect-[10/7] w-full max-w-[420px] md:col-start-1">
          <PinnedPhoto
            src={cardProcess}
            alt="A hand-drawn design process sketch held in front of a laptop showing the silver Pokémon card case study in Figma"
            box="absolute left-[0%] top-[6%] w-[64%]"
            tilt="-rotate-[3deg]"
            caption="sketch first, then figma"
            sizes="(min-width: 768px) 270px, 60vw"
          />
          <PinnedPhoto
            src={cardSilver}
            alt="Sanskriti's silver holo Pokémon card design featuring Pikachu"
            box="absolute right-[2%] top-[0%] w-[34%]"
            tilt="rotate-[5deg]"
            caption="silver pokémon card"
            sizes="(min-width: 768px) 150px, 34vw"
          />
        </div>
        <ol className="skeu grid rounded-2xl px-5 py-2 md:col-start-2 md:row-span-2 md:row-start-1 md:self-start">
          {workStops.map((w, i) => {
            const row = (
              <>
                <span className="grid">
                  <span className="font-serif text-lg leading-snug text-head">{w.place}</span>
                  <span className="text-sm text-[#77716A]">{w.role}</span>
                </span>
                <span className="text-sm whitespace-nowrap text-ink">{w.when}</span>
              </>
            );
            return (
              <li key={w.place} className={i ? "border-t border-dashed border-line" : ""}>
                {w.href ? (
                  <Link
                    href={w.href}
                    className="flex items-center justify-between gap-4 py-3 underline-offset-4 hover:[&_.font-serif]:underline"
                  >
                    {row}
                  </Link>
                ) : (
                  <div className="flex items-center justify-between gap-4 py-3">{row}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* 05 · now */}
      <div className="mx-auto grid max-w-[36rem] gap-5 text-center">
        <Step n="05" title="Now I build too">
          <p>
            These days I design products and build ideas in code with AI. If I don&apos;t know something, I
            learn it.
          </p>
        </Step>
        <p
          className={`${hand.className} mx-auto w-fit -rotate-[2deg] rounded-md bg-[#2b2a28] px-4 py-2 text-base whitespace-nowrap text-white md:text-lg shadow-[0_10px_20px_-12px_rgba(0,0,0,0.6)]`}
        >
          38 contributions on November 19th.
        </p>
        <div className="relative mx-auto mt-4 w-[70%] max-w-[260px]">
          <PinnedPhoto
            src={deskNow}
            alt="Sanskriti's desk at night: a laptop running Claude, a monitor, yellow headphones and a stack of books"
            box="relative block w-full"
            tilt="rotate-[2deg]"
            caption="me + claude = a love affair"
          />
        </div>
      </div>
    </section>
  );
}
