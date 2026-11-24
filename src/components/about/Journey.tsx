import Link from "next/link";
import { Hi, PinnedPhoto } from "./paper";
import { Pixel, type PixelName } from "./pixel";
import { ToolMark } from "./ToolMark";
import paintingSetup from "../../../public/assets/about/painting-setup.jpg";
import sketchEren from "../../../public/assets/about/sketch-eren.jpg";
import sketchDemonSlayer from "../../../public/assets/about/sketch-demon-slayer.jpg";
import sketchLine from "../../../public/assets/about/sketch-line.jpg";
import tweetCss from "../../../public/assets/about/tweet-css-notes.png";
import tweetHashnode from "../../../public/assets/about/tweet-hashnode.png";
import tweetHacktoberfest from "../../../public/assets/about/tweet-hacktoberfest.png";
import gdscLead from "../../../public/assets/about/gdsc-open-source-lead.jpg";
import postmanBox from "../../../public/assets/about/postman-box.jpg";
import devfestScreen from "../../../public/assets/about/devfest-screen.jpg";
import devfestGroup from "../../../public/assets/about/devfest-group.jpg";
import devfestSelfie from "../../../public/assets/about/devfest-selfie.jpg";
import aohBanner from "../../../public/assets/about/aoh-banner.jpg";
import aohSwag from "../../../public/assets/about/aoh-swag.jpg";
import aohTalk from "../../../public/assets/about/aoh-talk.jpg";
import designareCard from "../../../public/assets/about/designare-card.jpg";
import designareBanner from "../../../public/assets/about/designare-banner.jpg";
import designareMics from "../../../public/assets/about/designare-mics.jpg";
import talkRoles from "../../../public/assets/about/talk-design-roles.jpg";
import talkRoles2 from "../../../public/assets/about/talk-design-roles-2.jpg";
import gfgLogoWall from "../../../public/assets/cases/gfg/office-logo-wall.webp";
import gfgSelfie from "../../../public/assets/cases/gfg/office-selfie.webp";
import gfgCake from "../../../public/assets/cases/gfg/office-farewell-cake.webp";
import cardProcess from "../../../public/assets/about/pokemon-card-process.jpg";
import cardSilver from "../../../public/assets/about/pokemon-card-silver.jpg";
import keploySwag from "../../../public/assets/about/keploy-swag.jpg";
import githubDay from "../../../public/assets/about/github-contributions.jpg";
import deskNow from "../../../public/assets/about/desk-now.jpg";
import figurines from "../../../public/assets/about/desk-figurines.jpg";
import deskBooks from "../../../public/assets/about/desk-books.jpg";
import spiderVerse from "../../../public/assets/cases/spider-verse.webp";
import uxLaws from "../../../public/assets/cases/uxie.webp";
import littleLights from "../../../public/assets/cases/little-lights.webp";

// The journey, told as pinned moments with pixel icons and colourful highlights.
// All copy comes from Sanskriti's own notes and posts.

// one step: a number with its pixel icon, a heading and the typed story
function Step({
  n,
  icon,
  title,
  children,
  center = false,
}: {
  n: string;
  icon: PixelName;
  title: string;
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`grid content-start gap-3 ${center ? "justify-items-center text-center" : ""}`}
    >
      <p className="label flex items-center gap-2 !text-[#c8553b]">
        <Pixel name={icon} className="size-6" />
        {n}
      </p>
      <h3 className="font-serif text-h2m leading-tight text-head md:text-h2">
        {title}
      </h3>
      <div className="printed grid gap-3 text-base text-ink">{children}</div>
    </div>
  );
}

// a loose board of tilted prints in columns
const board = "relative mt-3 inline-block w-full";

const workStops: {
  role: string;
  place: string;
  when: string;
  href?: string;
}[] = [
  {
    role: "Graphic design intern",
    place: "GeeksforGeeks",
    when: "May – Oct 2024",
    href: "/work/geeksforgeeks",
  },
  {
    role: "Freelance product designer",
    place: "Keploy",
    when: "Freelance",
    href: "/work/keploy",
  },
  {
    role: "Freelance designer",
    place: "Dualite",
    when: "Freelance",
    href: "/work/dualite",
  },
  {
    role: "Product designer, Bounce Daily",
    place: "DreamLaunch",
    when: "Jan – Oct 2025",
    href: "/work/bounce-daily",
  },
  { role: "Product designer", place: "AppX (YC'21)", when: "Nov 2025 – now" },
];

// the things she has vibe-coded (same covers and links as the home page)
const builds = [
  {
    src: spiderVerse,
    alt: "Spider-Verse Interaction: a mystery card reveal",
    caption: "spider-verse cards",
    href: "/work/spider-verse",
  },
  {
    src: uxLaws,
    alt: "UX Laws, an app to learn design psychology",
    caption: "ux laws app",
    href: "/work/ux-laws",
  },
  {
    src: littleLights,
    alt: "Little Lights, a Diwali album experiment",
    caption: "little lights",
    href: "https://diwali-album.vercel.app/",
  },
];

export function Journey() {
  return (
    <section aria-labelledby="journey" className="grid gap-20 pb-24 md:gap-28">
      <header className="grid justify-items-center gap-2 text-center">
        <p className="label flex items-center gap-2">
          <Pixel name="sparkle" className="size-5" /> Journey{" "}
          <Pixel name="sparkle" className="size-5" />
        </p>
        <h2 id="journey" className="font-serif text-h2m text-head md:text-h2">
          How I got <span className="font-worn">here</span>
        </h2>
      </header>

      {/* 01 · the kid who drew */}
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Step n="01" icon="computer" title="A computer at home">
          <p>
            My dad was the{" "}
            <Hi c="yellow">first in our family to get a computer</Hi>{" "}
            <Pixel name="computer" />, and he loved digital gadgets. That&apos;s
            where my interest in tech came from.
          </p>
          <p>
            I started with MS Paint <Pixel name="palette" /> and Photoshop{" "}
            <ToolMark tool="photoshop" />. I was always{" "}
            <Hi c="pink">the kid drawing</Hi>, the one teachers loved and sent
            to drawing competitions. I never stopped. <Pixel name="pencil" />
          </p>
        </Step>
        <div className="relative mx-auto aspect-[10/12] w-full max-w-[420px]">
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
          <PinnedPhoto
            src={sketchLine}
            alt="Sanskriti's pen line drawing of a girl with flowing hair and roses, on paper lying on grass"
            box="absolute left-[4%] top-[61%] w-[34%]"
            tilt="rotate-[3deg]"
          />
        </div>
      </div>

      {/* 02 · the tech side: everything from her B.Tech years in one place */}
      <div className="grid gap-10">
        <div className="mx-auto max-w-[40rem]">
          <Step n="02" icon="code" title="Curious about how it works" center>
            <p>
              I was amazed by <Hi c="blue">how much was on the internet</Hi>,
              and I wanted to know how tech works.
            </p>
            <p>
              So I joined Twitter, went to tech meetups,{" "}
              <Hi c="green">wrote blogs</Hi> and did{" "}
              <Hi c="orange">100 Days of Code</Hi> <Pixel name="code" />, mostly
              frontend. Yes, with handwritten CSS notes.
            </p>
            <p>
              During my B.Tech in CSE I was the{" "}
              <Hi c="lilac">Open Source Lead at GDSC IIMT</Hi>{" "}
              <ToolMark tool="github" />, gave a talk on{" "}
              <Hi c="orange">Hacktoberfest 2023</Hi> <Pixel name="mic" />,
              became a Postman API Fundamentals Student Expert, and went to
              DevFest 2023 in New Delhi.
            </p>
          </Step>
        </div>
        {/* her own posts as screenshots (in colour), with the photos from those years */}
        <div className="columns-2 gap-5 md:columns-3 md:gap-7 [&>figure]:mb-6">
          <PinnedPhoto
            src={tweetCss}
            alt="Sanskriti's post: 'It was literally soo dumb of me to make notes of CSS when I was learning frontend. But we all start somewhere, I guess.' with a photo of her handwritten CSS notes, Oct 3, 2023"
            box={board}
            tilt="-rotate-[2deg]"
            keepColor
            sizes="(min-width: 768px) 260px, 45vw"
          />
          <PinnedPhoto
            src={gdscLead}
            alt="Sanskriti from behind in a Google Developer Student Clubs T-shirt reading Open Source Lead, Sanskriti Gupta"
            box={board}
            tilt="rotate-[2deg]"
            caption="open source lead, gdsc"
          />
          <PinnedPhoto
            src={tweetHacktoberfest}
            alt="Sanskriti's post: 'Just wrapped up a session as a speaker about the Hacktoberfest 2023 event, hosted by the Google Developer Student Club of IIMT!' with a screenshot of her presenting"
            box={board}
            tilt="rotate-[2deg]"
            keepColor
            sizes="(min-width: 768px) 260px, 45vw"
          />
          <PinnedPhoto
            src={postmanBox}
            alt="Postman API Fundamentals Student Expert swag: a notebook, pen, bottle and stickers"
            box={board}
            tilt="-rotate-[3deg]"
            caption="postman student expert"
          />
          <PinnedPhoto
            src={tweetHashnode}
            alt="Sanskriti's post: 'The first ever blog I wrote on Hashnode crossed 1k+ views! I wrote this when I was in my first sem.' with the blog card 'How To Get Started With Programming'"
            box={board}
            tilt="-rotate-[1deg]"
            keepColor
            sizes="(min-width: 768px) 260px, 45vw"
          />
          <PinnedPhoto
            src={devfestScreen}
            alt="Sanskriti in front of the DevFest 2023 New Delhi screen"
            box={board}
            tilt="rotate-[3deg]"
            caption="devfest '23, new delhi"
          />
        </div>
      </div>

      {/* 03 · design meetups */}
      <div className="grid gap-10">
        <div className="mx-auto max-w-[40rem]">
          <Step n="03" icon="heart" title="Showing up" center>
            <p>
              Then <Hi c="pink">design meetups</Hi> became my favourite thing:
              evenings at <Hi c="yellow">AOH (After Office Hours)</Hi>,{" "}
              <Hi c="blue">Designare&apos;s Design Dialogue</Hi> in Delhi, and
              DevFest 2023 in New Delhi. <Pixel name="sparkle" />
            </p>
          </Step>
        </div>
        <div className="columns-2 gap-5 md:columns-4 md:gap-6 [&>figure]:mb-6">
          <PinnedPhoto
            src={devfestGroup}
            alt="A group photo behind the Google Developer Groups DevFest 2023 sign"
            box={board}
            tilt="-rotate-[2deg]"
          />
          <PinnedPhoto
            src={aohBanner}
            alt="The After Office Hours welcome banner at a design event"
            box={board}
            tilt="rotate-[3deg]"
            caption="after office hours"
          />
          <PinnedPhoto
            src={designareCard}
            alt="Sanskriti's trading-card style attendee pass from Designare's Design Dialogue, 11 Jan 2025"
            box={board}
            tilt="rotate-[3deg]"
            caption="designare, jan '25"
          />
          <PinnedPhoto
            src={talkRoles}
            alt="A speaker at a design meetup presenting a chart titled 'Design roles have plateaued'"
            box={board}
            tilt="rotate-[2deg]"
          />
          <PinnedPhoto
            src={devfestSelfie}
            alt="A selfie with friends at DevFest 2023"
            box={board}
            tilt="-rotate-[2deg]"
          />
          <PinnedPhoto
            src={designareBanner}
            alt="Designare's Design Dialogue Delhi banner, 11 Jan 2025"
            box={board}
            tilt="-rotate-[2deg]"
          />
          <PinnedPhoto
            src={aohTalk}
            alt="A speaker presenting 'The theory of everyday joy' at an AOH design event"
            box={board}
            tilt="-rotate-[3deg]"
          />
          <PinnedPhoto
            src={designareMics}
            alt="Two people speaking into microphones at Designare's Design Dialogue"
            box={board}
            tilt="rotate-[2deg]"
          />
          <PinnedPhoto
            src={aohSwag}
            alt="Summer of AOH illustrated cards, a bookmark and postcards from the event"
            box={board}
            tilt="-rotate-[2deg]"
          />
          <PinnedPhoto
            src={talkRoles2}
            alt="The same speaker mid-talk in front of a slide about AI-powered systems and shipping small features"
            box={board}
            tilt="rotate-[2deg]"
          />
        </div>
      </div>

      {/* 04 · design, for real */}
      <div className="grid items-start gap-10 md:grid-cols-2">
        <Step n="04" icon="pencil" title="Design, for real">
          <p>
            Interning at <Hi c="green">GeeksforGeeks</Hi>, one of the biggest
            tech-education platforms, was <Hi c="yellow">a dream come true</Hi>.
            I picked up design there, explored a lot of visual design, and got a
            really nice farewell. <Pixel name="heart" />
          </p>
          <p>
            Then <Hi c="pink">the sky was the limit</Hi>: freelance work with
            Bangalore startups, a design studio, and now a YC-backed company.{" "}
            <Pixel name="sparkle" />
          </p>
        </Step>
        {/* a side project from those days (the silver Pokémon card, from sketch to Figma) and Keploy swag */}
        <div className="relative order-3 mx-auto aspect-[10/12] w-full max-w-[420px] md:order-none md:col-start-1">
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
          <PinnedPhoto
            src={keploySwag}
            alt="A black Keploy T-shirt and Keploy rabbit stickers next to a laptop"
            box="absolute left-[30%] top-[60%] w-[38%]"
            tilt="rotate-[2deg]"
            caption="keploy swag"
          />
        </div>
        <div className="order-2 grid gap-10 md:order-none md:col-start-2 md:row-span-2 md:row-start-1 md:self-start">
          {/* GeeksforGeeks days (the same office photos as the GFG case study) */}
          <div className="relative mx-auto aspect-[10/8] w-full max-w-[420px]">
            <PinnedPhoto
              src={gfgLogoWall}
              alt="The GeeksforGeeks logo wall at the office"
              box="absolute left-[2%] top-[4%] w-[30%]"
              tilt="-rotate-[3deg]"
              caption="geeksforgeeks"
              sizes="(min-width: 768px) 130px, 30vw"
            />
            <PinnedPhoto
              src={gfgSelfie}
              alt="A mirror selfie at the GeeksforGeeks office"
              box="absolute left-[35%] top-[0%] w-[30%]"
              tilt="rotate-[2deg]"
              sizes="(min-width: 768px) 130px, 30vw"
            />
            <PinnedPhoto
              src={gfgCake}
              alt="Sanskriti's farewell cake at GeeksforGeeks, with a Thank You topper"
              box="absolute right-[1%] top-[6%] w-[30%]"
              tilt="rotate-[4deg]"
              caption="the farewell"
              sizes="(min-width: 768px) 130px, 30vw"
            />
          </div>
          <ol className="skeu grid rounded-2xl px-5 py-2">
            {workStops.map((w, i) => {
              const row = (
                <>
                  <span className="grid">
                    <span className="font-serif text-lg leading-snug text-head">
                      {w.place}
                    </span>
                    <span className="text-sm text-[#77716A]">{w.role}</span>
                  </span>
                  <span className="text-sm whitespace-nowrap text-ink">
                    {w.when}
                  </span>
                </>
              );
              return (
                <li
                  key={w.place}
                  className={i ? "border-t border-dashed border-line" : ""}
                >
                  {w.href ? (
                    <Link
                      href={w.href}
                      className="flex items-center justify-between gap-4 py-3 underline-offset-4 hover:[&_.font-serif]:underline"
                    >
                      {row}
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between gap-4 py-3">
                      {row}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* 05 · now */}
      <div className="grid gap-10">
        <div className="mx-auto max-w-[40rem]">
          <Step n="05" icon="bot" title="Now I build too" center>
            <p>
              These days I design products and{" "}
              <Hi c="green">build ideas in code with AI</Hi>{" "}
              <span className="whitespace-nowrap"><Pixel name="bot" /> <ToolMark tool="claude" />:</span> a Spider-Verse
              card reveal, a UX Laws app, Little Lights for Diwali, and this
              very site.{" "}
              <Hi c="lilac">If I don&apos;t know something, I learn it.</Hi>
            </p>
          </Step>
        </div>
        {/* the desk where it happens */}
        <div className="grid grid-cols-2 items-start gap-x-5 gap-y-8 md:grid-cols-4 md:gap-x-6">
          <PinnedPhoto
            src={githubDay}
            alt="Sanskriti's GitHub contribution graph with the tooltip: 38 contributions on November 19th"
            box="relative mt-6 block w-full"
            tilt="-rotate-[3deg]"
            caption="38 in one day"
            keepColor
            sizes="(min-width: 768px) 200px, 45vw"
          />
          <PinnedPhoto
            src={deskNow}
            alt="Sanskriti's desk at night: a laptop running Claude, a monitor, yellow headphones and a stack of books"
            box="relative block w-full"
            tilt="rotate-[2deg]"
            caption="me + claude = a love affair"
            sizes="(min-width: 768px) 200px, 45vw"
          />
          <PinnedPhoto
            src={figurines}
            alt="Little Spider-Man, Harry Potter and Flash figurines lined up under the monitor"
            box="relative mt-4 block w-full"
            tilt="rotate-[3deg]"
            caption="desk crew"
            sizes="(min-width: 768px) 200px, 45vw"
          />
          <PinnedPhoto
            src={deskBooks}
            alt="A pen holder on a stack of books beside yellow headphones and the laptop"
            box="relative block w-full"
            tilt="-rotate-[2deg]"
            sizes="(min-width: 768px) 200px, 45vw"
          />
        </div>
        {/* what she has built: tap a print to open it */}
        <div className="grid grid-cols-2 items-start gap-x-5 gap-y-8 md:grid-cols-3 md:gap-x-8">
          {builds.map((b, i) => (
            <Link
              key={b.href}
              href={b.href}
              aria-label={`Open ${b.caption}`}
              className={`block ${i === 2 ? "col-span-2 mx-auto w-1/2 md:col-span-1 md:w-full" : ""}`}
            >
              <PinnedPhoto
                src={b.src}
                alt={b.alt}
                box="relative block w-full"
                tilt={i % 2 ? "rotate-[2deg]" : "-rotate-[2deg]"}
                caption={b.caption}
                sizes="(min-width: 768px) 260px, 45vw"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
