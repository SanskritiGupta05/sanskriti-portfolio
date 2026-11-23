import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CaseStudyFrame, P, Quote, type TocItem } from "@/components/casestudy/Margin";
import { MetaBar, PlayStoreButton, Squiggle, Stats } from "@/components/casestudy/bounce";
import { BeforeAfter, Canvas, Chapter, JourneyFlip, KycSpots, Pill, Row, Step, Testimonial, Wide } from "@/components/casestudy/bounceStory";
import { Mark } from "@/components/casestudy/Mark";

// the case study reads in a clean grotesk; Redaction stays for the big titles and quotes
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });

export const metadata: Metadata = {
  title: "Bounce Daily · Sanskriti",
  description: "Redesigning the Bounce Daily rider app, from finding a scooter to staying on the road.",
};

// Bounce Daily case study, v4: a first-person story (style reference: priyabhatt.in/acciojob).
// Copy follows the v4 story in her Figma file (page "Case study · web page", frame 1312:9945).
// Facts and rules live in docs/bounce-daily-case-study-notes.md: decisions are hers, the product manager
// is never named, and no numbers beyond the real ones. Key phrases carry scroll scribbles (Mark):
// swoosh = facts, circle = numbers, highlight = lines that hurt, spark = one moment.
// Revamped screens (Android status bars) are in public/assets/cases/bounce/v4, old ones in v2/old.

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The problem" },
  { id: "how", label: "How I worked" },
  { id: "goal", label: "The goal" },
  { id: "move", label: "The big move" },
  { id: "journey", label: "The journey", match: ["journey", "j1", "j2", "j3", "j4", "j5", "j6"] },
  { id: "wrong", label: "When things go wrong" },
  { id: "ui", label: "The UI layer" },
  { id: "real", label: "Making it real" },
  { id: "impact", label: "Impact and learnings" },
];

export default function BounceDaily() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[826px] px-6">
        <Nav />
      </div>

      <CaseStudyFrame
        layout="sheet"
        contentClassName={`${hanken.className} ${hanken.variable} [&_.printed]:[filter:none] [&_.printed]:[text-shadow:none] [&_.printed]:[-webkit-text-stroke:0]`}
        toc={TOC}
        header={
          <header>
            <Link href="/#work" className="label !text-ink underline-offset-4 hover:underline">
              ← All work
            </Link>
            <div className="relative mt-8">
              <Image
                src="/assets/cases/bounce/overview.svg"
                alt=""
                width={203}
                height={167}
                className="pointer-events-none absolute -top-6 right-0 hidden h-auto w-44 lg:block"
                aria-hidden="true"
              />
              <span className="label tracking-[0.18em]">Case study · 2025</span>
              <h1 className="mt-3 font-serif text-[clamp(44px,6vw,72px)] leading-[1.02] text-head">Bounce Daily</h1>
              <p className="mt-4 max-w-[30ch] font-serif text-[clamp(22px,2.4vw,30px)] leading-snug text-balance text-head">
                Redesigning the rider experience, from <Squiggle marks={false}>finding a scooter</Squiggle> to staying on the road.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <PlayStoreButton />
                <Pill kind="plain">Android</Pill>
                <Pill kind="plain">First UI designer</Pill>
              </div>
            </div>
            <div className="mt-8">
              <MetaBar role="Product Designer" duration="3 months" partners="A product manager, via DreamLaunch" />
            </div>
            <div className="mt-10">
              <Canvas>
                <Row
                  width={176}
                  items={[
                    { k: "v4/intro-1", alt: "Welcome screen with a map of scooters near you", label: "Welcome" },
                    { k: "v4/hub-map", alt: "Hubs on a map, nearest first", label: "Pick a hub" },
                    { k: "v4/plan", alt: "Plan list, each plan priced per day", label: "Choose a plan" },
                    { k: "v4/home-active", alt: "Home with the active booking card", label: "Home · riding" },
                  ]}
                />
              </Canvas>
            </div>
            <div className="mt-10">
              <Stats
                items={[
                  { n: "18", l: "screens of forms in the old app before a rider saw a hub" },
                  { n: "~270", l: "screens explored across the redesign" },
                  { n: "8", l: "unhappy paths designed, none a dead end" },
                  { n: "3 mo", l: "to ship on Android. Live on Google Play" },
                ]}
              />
            </div>
          </header>
        }
      >
        {/* 01 */}
        <Chapter id="overview" name="Overview" takeaway="“A scooter isn't just a vehicle when your income depends on it.”">
          <P>
            Bounce Daily rents EV scooters by the day, week or month to delivery and gig riders in <Mark type="swoosh">Bengaluru and Delhi NCR</Mark>. A
            rider picks a hub, chooses a scooter and a plan, gets verified, pays, and rides to work every day. For them, a sold-out hub or an expired
            plan isn&apos;t an inconvenience. <Mark type="highlight" order={1}>It&apos;s a day without earnings.</Mark>
          </P>
          <P>
            I was{" "}
            <Mark type="swoosh">
              <Mark type="spark" order={1}>
                the app&apos;s first UI designer
              </Mark>
            </Mark>
            . Before me there was <Mark type="highlight" order={1}>no designer, no system and no shared way of doing things</Mark>. I redesigned the
            Android rider app end to end <Mark type="circle" order={2}>over 3 months</Mark>, working{" "}
            <Mark type="swoosh" order={3}>through DreamLaunch with the product manager</Mark>.
          </P>
        </Chapter>

        {/* 02 */}
        <Chapter id="problem" name="The problem" takeaway="An app that asked for everything before it gave anything.">
          <P>
            When the product manager brought me the project, the app did its job on paper. Riders could sign up, find a hub and pay. But they were
            leaving, and he came with the business concerns behind it: <Mark type="highlight">riders dropping off at plans</Mark>, documents demanded up
            front, and a rider base that reads little.
          </P>
          <P>
            Going through it myself made the reasons obvious. A new rider went through <Mark type="circle">15 steps and 39 screens</Mark> to book a
            scooter. The first 18 were forms, OTPs, documents, a selfie and a wait for approval, all{" "}
            <Mark type="swoosh" order={1}>before seeing a hub, a scooter or a price</Mark>. Nobody had shown them anything worth finishing yet.
          </P>
          <Canvas caption="Three of the 18 screens a rider filled in before seeing a single hub.">
            <div className="grid min-w-0 gap-4">
              <Pill kind="before">Old app</Pill>
              <div className="min-w-0">
                <Row
                  width={170}
                  items={[
                    { k: "old/name-phone", alt: "Old sign-up: name and phone form" },
                    { k: "old/aadhaar-number", alt: "Old sign-up: Aadhaar number" },
                    { k: "old/selfie", alt: "Old sign-up: selfie" },
                  ]}
                />
              </div>
            </div>
          </Canvas>
          <P>
            Riders who made it through met plans laid out as <Mark type="box">near-identical boxes of four numbers</Mark> each, and after paying, the app
            showed a countdown and little else. When it hit zero, it simply said <Mark type="highlight" order={1}>time had run out</Mark>.
          </P>
        </Chapter>

        {/* 03 */}
        <Chapter id="how" name="How I worked" takeaway="No research team. Just the old app, walked screen by screen, and a lot of UX principles.">
          <P>
            I want to be honest about how this project ran. <Mark type="swoosh">I didn&apos;t run user interviews</Mark>, and this was{" "}
            <Mark type="highlight" order={1}>before the AI boom</Mark>, so there was no shortcut for research. What I had was the live app. I took
            screenshots, then went through every flow myself, the way a rider would, and mapped the whole old journey end to end.
          </P>
          <P>
            From there I explored <Mark type="circle">around 270 screens</Mark>. I reviewed directions with the product manager on regular calls, and kept
            only what I could defend with <Mark type="swoosh" order={1}>a principle I could explain in a sentence</Mark>. Category apps like Yulu were a
            useful reference for what riders already knew.
          </P>
        </Chapter>

        {/* 04 */}
        <Chapter id="goal" name="The goal" takeaway="Everything visible, nothing overwhelming.">
          <P>
            Many riders have low literacy. They want every detail before they commit, but <Mark type="highlight">they won&apos;t read a paragraph to find it</Mark>.
            Putting everything on one screen overwhelms them; hiding it loses them. So every screen had one rule: show only what this step needs, as a
            map, a picture, a chip or a number, and answer three questions.
          </P>
          <div className="flex flex-wrap gap-3">
            {["Where am I?", "What's happening?", "What do I do next?"].map((q) => (
              <span key={q} className="skeu rounded-full px-4 py-2 font-serif text-lg text-head">
                {q}
              </span>
            ))}
          </div>
          <P>
            We designed for <Mark type="swoosh">Android first</Mark>. Many riders come from lower-income backgrounds, and Android phones are what they can
            afford and already use every day. So the screens had to work on affordable phones, for people who read little, often on the move between
            deliveries.
          </P>
          <P>
            Some things were fixed. KYC is mandatory, because hub staff check it before handing over a scooter. High-speed scooters need a driving licence
            and low-speed ones don&apos;t. And there was no research budget, no design system and <Mark type="circle">3 months</Mark> to ship. The goal was
            to put <Mark type="swoosh" order={1}>value before effort</Mark> inside those limits, and leave a foundation the next designer could build on.
          </P>
        </Chapter>

        {/* 05 */}
        <Chapter id="move" name="The big move" takeaway="Before touching a single screen, I changed the order.">
          <P>
            The old app asked for effort first, forms and documents and a wait, and showed value last. The new journey flips that. Riders{" "}
            <Mark type="swoosh">discover hubs, choose a scooter and a plan, and only then verify and pay</Mark>. Every decision that follows comes from this
            one change.
          </P>
          <JourneyFlip />
        </Chapter>

        {/* 06 */}
        <Chapter id="journey" name="The journey" takeaway="The new journey, in the order a rider meets it.">
          <P>Here is the thinking behind each step.</P>

          <div className="mt-6 grid min-w-0 gap-24">
            <Step id="j1" n={1} name="Onboarding" takeaway="Let riders look before they commit.">
              <P>
                The old app opened with three slides, one of them a block of text explaining the steps, and then went straight into forms. A rider who
                wasn&apos;t sure yet had no reason to keep going, and a rider who reads little had no way to get the gist.
              </P>
              <P>
                I replaced the slides with three illustrated screens: scooters on a map near you, real riders talking about Bounce, and what a plan
                includes. Sign-up shrank from <Mark type="circle">seven form steps to two screens</Mark>: a phone number and an OTP. People trust what looks
                cared for, and for someone who reads little,{" "}
                <Mark type="swoosh" order={1}>a picture and a familiar face say more than a paragraph</Mark> ever could.
              </P>
              <BeforeAfter
                width={168}
                before={[{ k: "old/intro-1", alt: "Old intro slide" }]}
                after={[
                  { k: "v4/intro-1", alt: "New intro: scooters on a map near you" },
                  { k: "v4/intro-2", alt: "New intro: real riders talking about Bounce" },
                  { k: "v4/intro-3", alt: "New intro: what a plan includes" },
                ]}
              />
            </Step>

            <Step id="j2" n={2} name="Finding a hub" takeaway="Riders don't think in hub names. They think, “Where's the closest scooter?”">
              <P>
                The old app gave riders a list of hubs by name, with the details on a second screen. To find the right one, they had to{" "}
                <Mark type="highlight">read names and addresses and work out the distance themselves</Mark>.
              </P>
              <P>
                Riders spend their day in map apps, so <Mark type="swoosh">a map is a screen they already know how to read</Mark>. The new hub screen opens
                on the nearest hub, with distance and scooters available right on the card. Before it, a short screen explains why we need location, with
                “Enter my area instead” for riders who&apos;d rather not share it. The same hub card comes back on the payment success screen and on home,
                so riders recognise their hub everywhere.
              </P>
              <BeforeAfter
                width={180}
                before={[{ k: "old/hubs", alt: "Old hub list by name" }]}
                after={[
                  { k: "v4/location", alt: "Allow location, with Enter my area instead" },
                  { k: "v4/hub-map", alt: "Hub map opening on the nearest hub" },
                ]}
              />
            </Step>

            <Step id="j3" n={3} name="Choosing a scooter" takeaway="The licence rule had to be impossible to miss.">
              <P>
                High-speed scooters need a driving licence; low-speed ones don&apos;t. My first instinct was to save a tap: put a speed toggle on the plan
                screen, and show a licence sheet when someone tapped high speed. I designed that, then tested it against the rule, and{" "}
                <Mark type="highlight">it didn&apos;t hold up</Mark>. The licence only appeared if you tapped, and riders were choosing a scooter and a plan at
                the same time.
              </P>
              <P>
                So the scooter type became its own step, with the licence rule written on each option, and the toggle stayed on the plan screen for anyone
                who changes their mind. It cost one extra screen, and taught me that{" "}
                <Mark type="swoosh" order={1}>
                  <Mark type="spark" order={2}>
                    fewer taps doesn&apos;t always mean better understanding
                  </Mark>
                </Mark>
                .
              </P>
              <P>
                On the plan screen, the toggle carries the rule too. Each side has a second line with an icon: a green tick and “No licence” for low speed,
                an amber card and “Licence needed” for high speed. Riders get the meaning from <Mark type="swoosh">the colour and the icon before they read a word</Mark>,
                and the words are still there for anyone who needs them.
              </P>
              <Canvas caption="Scooter type as its own step, the speed toggle with the licence rule on each side, and the sheet riders see when they switch to high speed.">
                <Row
                  width={180}
                  items={[
                    { k: "v4/scooter", alt: "Choose your scooter: high and low speed, licence rule on each" },
                    { k: "v4/plan", alt: "Plan screen with the speed toggle" },
                    { k: "v4/switch-sheet", alt: "Switch to high speed sheet" },
                  ]}
                />
              </Canvas>
              <P>
                I explored <Mark type="circle">five versions of the scooter card</Mark>, three combined scooter-and-plan screens and two versions of the
                switch sheet before it settled. Switching later works the same way: mid-rental, moving from low to high speed only checks the licence,
                moving from high to low needs no documents, and the swap happens at a hub.
              </P>
            </Step>

            <Step id="j4" n={4} name="Choosing a plan" takeaway="Plans riders can compare without doing maths.">
              <P>
                In the old app, every plan sat in a near-identical box with four numbers: a price, a deposit, a price per km and a km limit. Comparing two
                plans meant <Mark type="highlight">reading and remembering eight numbers</Mark>, and that&apos;s exactly where many riders left.
              </P>
              <P>
                I gave each screen one decision, and each plan <Mark type="swoosh">one number to compare: its price per day</Mark>. Kilometres moved into
                their own step, and a review screen came before paying. The fewer things you ask someone to weigh at once, the faster and surer they
                decide.
              </P>
              <BeforeAfter
                width={190}
                before={[{ k: "old/plans", alt: "Old plans: boxes of four numbers each" }]}
                after={[{ k: "v4/plan", alt: "New plans: price per day first" }]}
              />
            </Step>

            <Step id="j5" n={5} name="Verifying and paying" takeaway="Where KYC goes: the question that took the longest.">
              <P>
                KYC couldn&apos;t be removed, because hub staff check it before they hand over a scooter. So the question was never whether to ask for
                documents. <Mark type="swoosh">It was when.</Mark> I mapped every place it could sit.
              </P>
              <KycSpots />
              <P>
                It took <Mark type="circle">three rounds</Mark> to settle. The first, approve then pay, left riders waiting mid-booking. The second, pay
                first, risked refunds and riders turned away at pick-up. The third was the hybrid. Riders now{" "}
                <Mark type="swoosh" order={1}>submit KYC right before paying, in about two minutes</Mark>, and verification happens in the background. It
                reads as one checkout, “2 steps to book”, and asks for less than before: Aadhaar and a selfie, and a licence only for high speed. A short
                “step 1 of 2” right before paying feels like the finish line, not a wall. For riders in a hurry there&apos;s a quiet “Do KYC later”: they
                can pay, but home tells them they can&apos;t collect until it&apos;s done.
              </P>
              <Canvas caption="Checkout lists every charge before paying, and the success screen tells riders exactly which hub to go to.">
                <Row
                  width={190}
                  items={[
                    { k: "v4/pay", alt: "Confirm and pay with a full price breakdown" },
                    { k: "v4/pay-success", alt: "Payment successful with the hub card" },
                  ]}
                />
              </Canvas>
              <P>
                After submitting, riders never have to guess. Home shows an account status card with three steps, Submitted, In review and Approved, one
                line on what&apos;s happening and one action. If a document is rejected, the card says why and offers to re-upload it. What used to be{" "}
                <Mark type="swoosh">a seven-step sign-up wall became a three-step checklist</Mark>.
              </P>
              <Canvas caption="KYC in review, not approved with the reason and a fix, and approved with the next step.">
                <Row
                  width={176}
                  items={[
                    { k: "v4/kyc-review", alt: "Home: KYC in review" },
                    { k: "v4/kyc-rejected", alt: "Home: KYC not approved, with the reason" },
                    { k: "v4/kyc-approved", alt: "Home: KYC approved" },
                  ]}
                />
              </Canvas>
            </Step>

            <Step id="j6" n={6} name="After paying" takeaway="The app remembers, so the rider doesn't have to.">
              <P>
                After paying, the old app showed a countdown. Riders had to{" "}
                <Mark type="highlight">work out for themselves what was going on</Mark> with their KYC, their plan, their kilometres and their dues.
              </P>
              <P>
                I replaced the timer with <Mark type="swoosh">one booking card on home that changes with the rider&apos;s stage</Mark>: KYC in review, ready
                to collect, riding, plan ending, plan ended. Every state shows one next step. One small rule came out of a lot of back and forth: Renew and
                Top up never swap places, and Renew leads unless kilometres are the problem, because an ended plan locks the scooter. Until the ride
                starts, a small tracker shows how far along the rider is: paid, KYC, picked up, riding.
              </P>
              <BeforeAfter
                width={170}
                before={[{ k: "old/time-remaining", alt: "Old home: a countdown" }]}
                after={[
                  { k: "v4/home-collect", alt: "Home: ready to collect" },
                  { k: "v4/home-ready", alt: "Home: ready to ride" },
                  { k: "v4/home-active", alt: "Home: active plan" },
                ]}
              />
              <P>
                The same card warns riders before things run out. When a plan is about to end or kilometres are running low, a sheet says so with the best
                plan to renew or a top-up, and when dues are pending, they&apos;re itemised and explained before the next trip.
              </P>
              <Canvas caption="Plan ending soon, plan ended, kilometres running low, and dues explained.">
                <Row
                  width={168}
                  items={[
                    { k: "v4/home-ending", alt: "Plan ending in 20 hours" },
                    { k: "v4/home-ended", alt: "Plan ended, scooter locked" },
                    { k: "v4/home-km-low", alt: "Only 18 km left" },
                    { k: "v4/dues", alt: "Dues itemised and explained" },
                  ]}
                />
              </Canvas>
            </Step>
          </div>
        </Chapter>

        {/* 07 */}
        <Chapter id="wrong" name="When things go wrong" takeaway="A sold-out hub isn't an edge case for the rider it happens to.">
          <P>
            Beyond the happy path, I designed <Mark type="circle">eight scenarios</Mark>: a sold-out hub, a city we don&apos;t serve yet, a failed
            payment, KYC not approved, a plan ending and ended, kilometres running low and used up, and dues before a new trip. In the old app, most of
            them <Mark type="highlight" order={1}>ended in a toast or a timer running out</Mark>.
          </P>
          <P>
            Now each one says what went wrong in plain words, shows an illustration instead of a paragraph, and gives{" "}
            <Mark type="swoosh">one clear way forward</Mark>. A sold-out hub points to nearby hubs that do have scooters. A rejected document explains why,
            and lets the rider fix it.
          </P>
          <Canvas caption="Hub sold out, not in your city yet, payment failed, and KYC not approved, each with one next step.">
            <Row
              width={168}
              items={[
                { k: "v4/hub-sold-out", alt: "Hub sold out, with nearby hubs" },
                { k: "v4/city-unavailable", alt: "Not in your city yet" },
                { k: "v4/pay-fails", alt: "Payment didn't go through" },
                { k: "v4/kyc-rejected", alt: "KYC not approved, with the fix" },
              ]}
            />
          </Canvas>
        </Chapter>

        {/* 08 */}
        <Chapter id="ui" name="The UI layer" takeaway="Calm enough to read at a glance.">
          <P>
            I built <Mark type="swoosh">the app&apos;s first design system</Mark> as I went: tokens, 16 text styles and 14 shared components, so a pattern
            learned once works on every screen. Custom illustrations carry availability, verification and service states, so riders don&apos;t have to
            rely on text. A loyalty programme with four tiers, Start, Cruise, Power and Nitro, gives riders a reason to keep riding, with rewards like
            extra kilometres.
          </P>
          <P>
            Early on, I flagged that the app used red for everything: buttons, headers, icons and cards.{" "}
            <Mark type="highlight">When everything shouts, nothing does.</Mark> We prioritised the flows first, and the system now keeps{" "}
            <Mark type="circle" order={1}>one red action per screen</Mark>.
          </P>
          <Canvas caption="The illustration set, and the loyalty tiers that give riders a reason to keep riding.">
            <div className="grid items-start gap-6 sm:grid-cols-[1fr_auto]">
              <div className="overflow-hidden rounded-[20px] bg-white ring-1 ring-black/[0.05]">
                <Image
                  src="/assets/cases/bounce/v4/illustrations.webp"
                  alt="Custom illustrations for availability, verification and service states"
                  width={1389}
                  height={1577}
                  sizes="(min-width: 1100px) 560px, 100vw"
                  className="block h-auto w-full"
                />
              </div>
              <div className="mx-auto w-[200px] overflow-hidden rounded-[22px] bg-white shadow-[0_1px_2px_rgba(60,40,20,0.08),0_24px_40px_-22px_rgba(60,40,20,0.5)] ring-1 ring-black/[0.06]">
                <Image src="/assets/cases/bounce/v4/loyalty.webp" alt="Loyalty screen with four tiers" width={328} height={1400} sizes="400px" className="block h-auto w-full" />
              </div>
            </div>
          </Canvas>
        </Chapter>

        {/* 09 */}
        <Chapter id="real" name="Making it real" takeaway="Every screen connected, every state accounted for.">
          <P>
            <Mark type="swoosh">I handled the developer handoffs myself.</Mark> Before handing anything over, I mapped every screen of the new app and
            connected them, so the developers could see the whole journey, including every branch where something goes wrong. Each screen went over with
            its states and the shared components it was built from, so <Mark type="highlight" order={1}>what shipped matched what was designed</Mark>.
          </P>
          <Wide
            src="/assets/cases/bounce/v4/flow-map.webp"
            w={3200}
            h={1673}
            alt="The new app flow map: every screen connected, with unhappy paths branching off the main journey"
            caption="The new app flow map: every screen, connected, with the unhappy paths branching off the main journey. Opens full size."
          />
        </Chapter>

        {/* 10 */}
        <Chapter id="impact" name="Impact and learnings" takeaway="Shipped on Android in 3 months, and it moved the numbers that mattered.">
          <P>
            The revamp shipped and is <Mark type="swoosh">live on the Play Store</Mark>, rated <Mark type="circle" order={1}>4.8</Mark> with over a lakh
            downloads. After launch, the team saw <Mark type="highlight" order={2}>noticeable improvements in rider onboarding and plan adoption</Mark>.
            The exact numbers stay with Bounce for business reasons, but those were the two places the redesign was meant to move: getting riders through
            the door, and getting them to commit to a plan.
          </P>
          <Testimonial by="Product Manager, Bounce Daily">
            Since our users are primarily gig and delivery riders, every interaction needed to be clear, trustworthy, and easy to understand. She quickly
            grasped these nuances and translated them into thoughtful user flows and intuitive interfaces. The redesign unlocked several new product
            capabilities, and we saw noticeable improvements in rider onboarding and plan adoption after launch.
          </Testimonial>
          <P>
            He later told me I&apos;d set <Mark type="swoosh">the first benchmark for every designer</Mark> who works on the app after me.
          </P>
          <P>
            If I did it again, I&apos;d push for launch data from day one, so the next round of decisions could come from riders and not only from
            principles. I&apos;d settle the KYC open questions earlier, like refunds if it fails after payment. And I&apos;d make the case for a calmer
            colour system with a few screens side by side, not an argument.
          </P>
          <P>
            The real thing I took from Bounce is that <Mark type="highlight">when you ask for something matters as much as what you ask for</Mark>. KYC
            asked for the same documents before and after the redesign. Moving it from the first minute to the moment just before paying turned a wall
            into a last step. And a rider who reads little doesn&apos;t need less information.{" "}
            <Mark type="swoosh" order={1}>They need it in a form they can take in at a glance.</Mark>
          </P>
          <div className="mt-6 grid gap-3 border-t border-line pt-10">
            <span className="label">Closing thought</span>
            <Quote>I started out simplifying a scooter rental app. I finished designing around the people who depend on it every day.</Quote>
          </div>
          <Link href="/#work" className="label mt-8 w-fit !text-ink underline-offset-4 hover:underline">
            ← Back to all work
          </Link>
        </Chapter>
      </CaseStudyFrame>

      <div className="mx-auto max-w-[826px]">
        <Footer />
      </div>
    </div>
  );
}
