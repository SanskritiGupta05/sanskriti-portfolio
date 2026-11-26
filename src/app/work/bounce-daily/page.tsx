import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Benchmark, FeatureTestimonial, MarkerBand, OutcomeCards } from "@/components/casestudy/bounceOutcome";
import { Footer } from "@/components/Footer";
import { CaseStudyFrame, type TocItem } from "@/components/casestudy/Margin";
import {
  BigStats,
  Body,
  Cards,
  Decision,
  Eyebrow,
  Facts,
  Fig,
  FlowCompare,
  PlayLink,
  RiderCard,
  Section,
  Solution,
  Tags,
} from "@/components/casestudy/bounceStory";
import { Mark } from "@/components/casestudy/Mark";
import { KycFlowScreens } from "@/components/casestudy/kycFlow";
import { TakeStatements, UiBento } from "@/components/casestudy/uiLayer";
import { HubMergeFigma } from "@/components/casestudy/HubMergeFigma";
import {
  CheckoutStory,
  RideStory,
  RenewStory,
  KycCardsStory,
  PlansStory,
  ScooterStory,
} from "@/components/casestudy/bounceAnims";
import {
  CreditCard,
  House,
  ListChecks,
  Palette,
  Repeat,
  Sparkles,
} from "lucide-react";

// a key fact inside body text: bold, in the heading ink
function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-bold text-head">{children}</strong>;
}

// short pointers with a small red bullet, in the body type
function Pointers({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((it, i) => (
        <li
          key={i}
          className="printed flex gap-3 text-[16px] leading-[26px] text-ink"
        >
          <span
            aria-hidden="true"
            className="mt-[10px] size-1.5 shrink-0 rounded-full bg-[#c8553b]"
          />
          <span className="min-w-0">{it}</span>
        </li>
      ))}
    </ul>
  );
}

export const metadata: Metadata = {
  title: "Bounce Daily · Sanskriti",
  description:
    "From a document wall to a rider journey: redesigning the Bounce Daily rider app.",
};

// Bounce Daily case study v5. Mirrors her Figma frame "Bounce Daily · case study v5 (Qmentis structure)"
// (file eJ4fYjVQ…, page "Case study · web page", frame 1337:10605); outline in docs/bounce-daily-case-study-v5.md.
// Change the Figma first, then mirror it here. Decisions are hers; Aum is named only in the Team fact.

const TOC: TocItem[] = [
  { id: "context", label: "Context" },
  { id: "challenge", label: "The challenge" },
  { id: "rider", label: "The rider" },
  { id: "move", label: "The big move" },
  {
    id: "solution",
    label: "The solution",
    sub: [
      { id: "s1", label: "#1 Look first" },
      { id: "s2", label: "#2 Choose" },
      { id: "s3", label: "#3 Book" },
      { id: "s4", label: "#4 Ride and renew" },
    ],
  },
  {
    id: "decisions",
    label: "Design decisions",
    sub: [
      { id: "d1", label: "#1 Scooter type gets its own step" },
      { id: "d2", label: "#2 Map first, nearest hub first" },
      { id: "d3", label: "#3 KYC just before paying" },
      { id: "d4", label: "#4 KYC status on home" },
      { id: "d5", label: "#5 Dues and renewals up front" },
      { id: "more", label: "More calls, at a glance" },
    ],
  },
  { id: "errors", label: "Error states" },
  { id: "edge", label: "Edge cases" },
  { id: "ui", label: "The UI layer" },
  { id: "real", label: "Making it real" },
  { id: "learnings", label: "Learnings" },
];

export default function BounceDaily() {
  return (
    // the contents list is in Redaction, like every header on this page
    <div className="w-full [&_nav[aria-label=Contents]]:font-serif [&_nav[aria-label=Contents]_.label]:text-[15px] [&_nav[aria-label=Contents]_.label]:tracking-normal [&_nav[aria-label=Contents]_.label]:normal-case [&_nav[aria-label=Contents]_a]:text-[15px]">
      <div className="mx-auto max-w-[826px] px-6">
        <Nav />
      </div>

      <CaseStudyFrame
        layout="sheet"
        contentClassName="[&_.printed]:[filter:none] [&_.printed]:[text-shadow:none] [&_.printed]:[-webkit-text-stroke:0] [&_.label]:font-serif [&_.label]:text-[16px] [&_.label]:leading-snug [&_.label]:tracking-normal [&_.label]:normal-case"
        toc={TOC}
        header={
          <header>
            <Link
              href="/#work"
              className="label !text-ink underline-offset-4 hover:underline"
            >
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
              <span className="label">Case study · 2025</span>
              <div className="mt-3">
                <Tags items={["Shipped", "Consumer app", "Android"]} />
              </div>
              <h1 className="mt-4 font-serif text-[clamp(44px,6vw,72px)] leading-[1.02] text-head">
                Bounce Daily
              </h1>
              <p className="mt-4 max-w-[720px] font-serif text-[clamp(19px,1.9vw,22px)] leading-[1.4] text-pretty text-muted-foreground">
                Redesigning an EV scooter rental app for delivery riders, so
                they see hubs, scooters and prices before the app asks anything
                of them.
              </p>
            </div>
            <div className="mt-8">
              <Facts
                items={[
                  { k: "Company", v: "DreamLaunch · Client: Bounce Daily" },
                  {
                    k: "Team",
                    v: (
                      <span className="inline-flex flex-wrap items-center">
                        Aum Vats (PM @
                        <Image
                          src="/assets/cases/bounce/bounce-daily-logo.svg"
                          alt="Bounce Daily"
                          width={77}
                          height={67}
                          className="mx-1 inline-block h-[22px] w-auto"
                        />
                        ) · Developers
                      </span>
                    ),
                    sub: "My role: product designer, the app's first UI designer, dev handoffs",
                  },
                  { k: "Timeline", v: "3 months, 2025" },
                  {
                    k: "Platform",
                    v: (
                      <span className="inline-flex flex-wrap items-center gap-x-2.5">
                        Android rider app
                        <span
                          aria-hidden="true"
                          className="text-muted-foreground"
                        >
                          ·
                        </span>
                        <span className="text-[16px] text-muted-foreground">
                          <PlayLink />
                        </span>
                      </span>
                    ),
                  },
                ]}
              />
            </div>
            <div className="mt-10">
              <Image
                src="/assets/cases/bounce/v5/hero.webp"
                alt="Three redesigned screens: Welcome to Bounce Daily, Pick a hub near you, and Select your plan"
                width={1792}
                height={1024}
                priority
                sizes="(min-width: 1100px) 900px, 100vw"
                className="block h-auto w-full rounded-[20px]"
                unoptimized
              />
            </div>
          </header>
        }
      >
        <Section
          id="context"
          eyebrow="Context"
          headline="The app asked for everything before it gave anything."
          size="lg"
        >
          <Body>
            Bounce Daily rents EV scooters by the day, week or month to delivery
            and gig riders in <B>Bengaluru and Delhi NCR</B>. A rider picks a
            hub, chooses a scooter and a plan, gets verified, pays, and rides to
            work every day. For them, a sold-out hub or an expired plan
            isn&apos;t an inconvenience.{" "}
            <Mark type="marker">It&apos;s a day without earnings.</Mark>
          </Body>
          <Body>
            The product manager came to me with the business concerns:{" "}
            <B>riders dropping off at plans</B>,{" "}
            <B>documents demanded up front</B>, and{" "}
            <B>a rider base that reads little</B>. I was{" "}
            <B>the app&apos;s first UI designer</B>. Before me there was{" "}
            <Mark type="marker" order={1}>
              no designer, no system and no shared way of doing things
            </Mark>
            .
          </Body>
          <BigStats
            items={[
              {
                n: "39",
                l: "screens to book a scooter in the old app, across 15 steps",
              },
              { n: "11", l: "KYC screens before a rider saw a single scooter" },
            ]}
          />
          <Fig
            name="old-signup"
            alt="Three old sign-up screens: account form, Aadhaar upload, and waiting for profile verification"
            caption="Three of the screens a rider filled in before seeing a single hub."
          />
        </Section>

        <Section
          id="challenge"
          eyebrow="The challenge"
          headline="Everything visible, nothing overwhelming."
          tone="red"
          size="lg"
        >
          <Body>
            <B>Many riders have low literacy.</B> They want every detail before
            they commit, but they won&apos;t read a paragraph to find it.
            Putting everything on one screen overwhelms them; hiding it loses
            them. Every iteration had to pass that test.
          </Body>
          <Body>
            We designed for Android first. Many riders come from lower-income
            backgrounds, and Android phones are what they can afford and already
            use every day, often on the move between deliveries.
          </Body>
          <div className="pt-2">
            <Cards
              items={[
                {
                  t: "KYC is mandatory",
                  l: "Hub staff check it before they hand over a scooter.",
                  tone: "blue",
                },
                {
                  t: "The licence rule",
                  l: "High-speed scooters need a driving licence; low-speed ones don't. A business rule, like every competitor's.",
                  tone: "amber",
                },
                {
                  t: "Research by hand",
                  l: "Before the AI boom. The Bounce team met riders at their hubs and in the office; I built on what they heard.",
                  tone: "green",
                },
                {
                  t: "3 months, no system",
                  l: "No design system and no earlier designer to build on.",
                  tone: "rose",
                },
              ]}
            />
          </div>
        </Section>

        <Section
          id="rider"
          eyebrow="The rider"
          headline="Riders don't read their way through an app. They glance at it between deliveries."
        >
          <RiderCard
            title="Delivery and gig riders"
            lines={[
              "Bengaluru and Delhi NCR",
              "Their income depends on the scooter",
              "On affordable Android phones",
              "Many read little, and want every detail",
            ]}
            questions={[
              "Where am I?",
              "What's happening?",
              "What do I do next?",
            ]}
          />
          <Eyebrow className="pt-4">How I worked</Eyebrow>
          <Pointers
            items={[
              <>
                <B>Talked to riders firsthand.</B> The product manager and the
                Bounce team visited the hubs where riders rent scooters and
                invited riders to their office, to hear{" "}
                <Mark type="marker">where the app was letting them down</Mark>.
              </>,
              <>
                <B>Walked the live app.</B> I built on those findings, took
                screenshots, went through every flow the way a rider would, and{" "}
                <Mark type="marker">
                  mapped the whole old journey end to end
                </Mark>
                .
              </>,
              <>
                <B>Explored around 270 screens,</B> and reviewed directions with
                the product manager on regular calls.
              </>,
              <>
                <B>Kept only what I could defend</B> with{" "}
                <Mark type="marker">
                  a principle I could explain in a sentence
                </Mark>
                .
              </>,
              <>
                <B>Used category apps like Yulu</B> as a reference for what
                riders already knew.
              </>,
              <>
                <B>All by hand,</B> before the AI boom.
              </>,
            ]}
          />
        </Section>

        <Section
          id="move"
          eyebrow="Insight to design"
          headline="Before touching a single screen, I changed the order."
        >
          <Body>
            The old app asked for effort first, forms and documents and a wait,
            and showed value last. The new journey flips that: riders discover
            hubs, choose a scooter and a plan, and only then verify and pay.
            Every decision that follows comes from this one change.
          </Body>
          <FlowCompare caption="The whole old journey vs the new one, step by step, with screen counts." />
        </Section>

        <Section
          id="solution"
          eyebrow="The solution"
          headline="Follow one rider, from first open to renewal."
        >
          <Body>
            Here is the new journey in the order a rider meets it. Each step
            shows only what that step needs, as a map, a picture, a chip or a
            number.
          </Body>
          <Solution
            id="s1"
            label="Solution #1 · Look first"
            title="Look before committing"
            fig="onboarding"
            alt="Before: the old how-it-works slide. After: three illustrated intro screens."
          >
            Three illustrated intros replace a wall of text: scooters on a map
            near you, real riders talking about Bounce, and what a plan
            includes. Sign-up is just a phone number and an OTP.
          </Solution>
          <Solution
            id="s2"
            label="Solution #2 · Choose"
            title="Choose without doing maths"
            figure={<PlansStory />}
          >
            Each screen asks one decision, and each plan leads with one number
            to compare: its price per day. Kilometres get their own step, and a
            review comes before paying.
          </Solution>
          <Solution
            id="s3"
            label="Solution #3 · Book"
            title="Book in two steps"
            figure={<CheckoutStory />}
          >
            KYC and payment read as one short checkout. Every charge is listed
            before paying, and the success screen tells riders exactly which hub
            to go to.
          </Solution>
          <Solution
            id="s4"
            label="Solution #4 · Ride and renew"
            title="Know where you stand, every day"
            figure={<RideStory />}
          >
            The old countdown is gone. One booking card on home changes with the
            rider&apos;s stage, and always shows one next step.
          </Solution>
        </Section>

        <section
          id="decisions"
          className="grid min-w-0 scroll-mt-16 gap-[72px]"
        >
          <div className="grid gap-5">
            <Eyebrow>Design decisions</Eyebrow>
            <h2 className="font-serif text-[28px] leading-[1.15] text-balance text-head md:text-[36px]">
              Every decision was judged against one test: can a rider who reads
              little get it at a glance?
            </h2>
          </div>

          <Decision
            id="d1"
            n={1}
            title="Scooter type gets its own step"
            principle="Fewer taps doesn't always mean better understanding."
            figure={<ScooterStory />}
            call={
              <>
                Scooter type is its own step, with the licence rule on every
                option. The toggle stays on the plan screen, with a tick for
                &quot;No licence&quot; and an amber card for &quot;Licence
                needed&quot;.
              </>
            }
          >
            My first instinct was to save a tap: a speed toggle on the plan
            screen, with a licence sheet when someone tapped high speed. I
            designed it, tested it against the licence rule, and it didn&apos;t
            hold up. The licence only showed if you tapped, and riders were
            choosing a scooter and a plan at once. I explored five scooter
            cards, three combined scooter-and-plan screens and two switch
            sheets.
          </Decision>

          <Decision
            id="d2"
            n={2}
            title="Map first, nearest hub first"
            principle="Riders think “where's the closest scooter?”, not in hub names."
            figure={<HubMergeFigma />}
            call={
              <>
                A short allow-location step explains why, with &quot;Enter my
                area instead&quot;. The map opens on the nearest hub with
                distance and scooters on the card, and the same hub card comes
                back after paying and on home.
              </>
            }
          >
            The old app listed hubs by name, with details on a second screen, so
            riders read addresses and worked out distance themselves. Riders
            live in map apps all day, so a map is a screen they already know how
            to read (Jakob&apos;s law).
          </Decision>

          <Decision
            id="d3"
            n={3}
            title="KYC just before paying"
            principle="When you ask matters as much as what you ask."
            fig="kyc-spots"
            extra={<KycFlowScreens />}
            alt="Five places KYC could sit on the journey. Ruled out: during sign-up, before choosing a hub, approved before paying, after paying. Chosen: submitted right before paying."
            call={
              <>
                Riders submit KYC right before paying, in about two minutes, and
                it&apos;s verified in the background. It asks for less than
                before: Aadhaar and a selfie, and a licence only for high speed.
                A quiet &quot;Do KYC later&quot; lets riders in a hurry pay
                first.
              </>
            }
          >
            KYC couldn&apos;t go: hub staff check it at pick-up. So the question
            was when. I mapped every place it could sit, and it took three
            rounds: approve-then-pay left riders waiting mid-booking, pay-first
            risked refunds and riders turned away, and the third was the hybrid.
          </Decision>

          <Decision
            id="d4"
            n={4}
            title="KYC status on home, one next step"
            principle="Riders should never have to guess what's happening."
            figure={<KycCardsStory />}
            call={
              <>
                A three-step checklist replaces the seven-step wall. Home shows
                Submitted, In review and Approved, one line on what&apos;s
                happening, and one action. A rejected document says why and
                offers to re-upload.
              </>
            }
          >
            The old app had a seven-step sign-up wall and then a wait screen.
            After submitting, riders couldn&apos;t tell whether they were done
            (visibility of system status).
          </Decision>

          <Decision
            id="d5"
            n={5}
            title="Dues and renewals up front"
            principle="The app remembers, so the rider doesn't have to."
            figure={<RenewStory />}
            call={
              <>
                Plan ending, plan ended and kilometres low appear on home with
                the best plan or top-up. Renew leads unless kilometres are the
                problem, and the two buttons never swap places. Dues are
                itemised and explained before the next trip.
              </>
            }
          >
            After paying, the old app showed a countdown and a bare list of
            dues. Riders had to remember dates and work out charges themselves
            (recognition over recall).
          </Decision>

          <div id="more" className="grid scroll-mt-16 gap-5">
            <Eyebrow>Also</Eyebrow>
            <h3 className="font-serif text-[24px] leading-[1.2] text-head md:text-[28px]">
              More calls, at a glance
            </h3>
            <Cards
              items={[
                {
                  k: "Onboarding",
                  icon: Sparkles,
                  t: "7 form steps became 2 screens",
                  l: "Splash, three illustrated intros, then phone and OTP. Pictures and real riders before any form (aesthetic-usability effect).",
                },
                {
                  k: "Plans",
                  icon: ListChecks,
                  t: "One price per day to compare",
                  l: "One decision per screen: scooter, plan, kilometres, review. Fewer options at once, faster decisions (Hick's law).",
                },
                {
                  k: "Pay",
                  icon: CreditCard,
                  t: "Every charge before paying",
                  l: "A full price breakdown with Bounce Shield and referral, and the success screen shows exactly which hub to visit (peak-end rule).",
                },
                {
                  k: "Home",
                  icon: House,
                  t: "Tracker only until the ride starts",
                  l: "Paid, KYC, picked up, riding. Once the ride starts, the card shows the plan and kilometres instead.",
                },
                {
                  k: "Switch scooter",
                  icon: Repeat,
                  t: "Mid-rental only, from home",
                  l: "An entry on home while the rental runs. Low to high checks only the licence; high to low needs no documents; the swap happens at a hub.",
                },
                {
                  k: "Colour",
                  icon: Palette,
                  t: "One red action per screen",
                  l: "I flagged early that red was on buttons, headers, icons and cards. We put flows first; the system now keeps red for the one action that matters.",
                },
              ]}
            />
          </div>
        </section>

        <Section
          id="errors"
          eyebrow="Error states"
          headline="A sold-out hub is a lost day for the rider it happens to."
        >
          <Body>
            Beyond the happy path I designed eight error states. In the old app
            most of them ended in a toast or a timer running out. Now each one
            says what went wrong in plain words and gives one clear way forward.
          </Body>
          <Fig
            name="error-states-v1"
            section
            alt="Eight error screens: hub sold out, not in your city, payment failed, KYC not approved, plan ended, dues before a trip, kilometres low, and licence not approved."
            caption="Hub sold out, not in your city yet, payment failed, KYC not approved, plan ended, dues before a trip, kilometres low, and a licence not approved on switch, each with one next step."
          />
        </Section>

        <Section
          id="edge"
          eyebrow="Edge cases"
          headline="Riders don't always take the path we drew."
        >
          <Body>
            Some riders won&apos;t share their location, some are in a hurry,
            and some want a faster scooter halfway through a rental. None of
            these is an error, so none of them should feel like one. Each one
            gets its own way through.
          </Body>
          <Fig
            name="edge-cases-v1"
            section
            alt="Five edge cases: no location shared, paid with KYC skipped, KYC in review, switching to a faster scooter mid-rental, and coming back after a plan ended."
            caption="Entering an area instead of sharing location, paying before KYC, waiting on a KYC review, switching to high speed mid-rental, and coming back after a plan ended."
          />
        </Section>

        <Section
          id="ui"
          eyebrow="The UI layer"
          headline="Calm enough to read at a glance."
        >
          <Body>
            Custom illustrations carry availability, verification and service
            states, so riders don&apos;t have to rely on text. A loyalty
            programme with four tiers, Start, Cruise, Power and Nitro, gives
            riders a reason to keep riding, with rewards like extra kilometres.
          </Body>
          <UiBento />
        </Section>

        <Section
          id="real"
          eyebrow="Making it real"
          headline="Every screen connected, every state accounted for."
        >
          <Body>
            I handled the developer handoffs myself. I mapped every screen of
            the new app and connected them, so developers could see the whole
            journey, including every branch where something goes wrong. Each
            screen went over with its states and the shared components it was
            built from.
          </Body>
          <Fig
            name="flow-map"
            href="/assets/cases/bounce/v5/flow-map-full.webp"
            alt="The new app flow map: every screen connected, with the unhappy paths branching off the main journey."
            caption="The new app flow map, with the unhappy paths branching off the main journey. Opens full size."
          />
        </Section>

        <Section
          id="learnings"
          eyebrow="Learnings and reflections"
          headline="Shipped on Android in 3 months."
        >
          {/* the product manager's testimonial (words and photo from her Framer testimonial card), in a warm
              featured card; then his benchmark line, and what shipped / what moved */}
          <FeatureTestimonial
            pull={
              <>
                She quickly grasped these nuances and translated them into{" "}
                <MarkerBand color="#fbe3da">thoughtful user flows and intuitive interfaces.</MarkerBand>
              </>
            }
            name="Aum Vats"
            role="Product Manager, Bounce Daily"
            photo="/assets/cases/bounce/aum-vats.webp"
            logo={{ src: "/assets/cases/bounce/bounce-daily-logo.svg", w: 77, h: 67, alt: "Bounce Daily" }}
          >
            Sanskriti redesigned the Bounce Daily Rider App from the ground up
            as our Product Designer. Since our users are primarily gig and
            delivery riders, every interaction needed to be clear, trustworthy,
            and easy to understand. She quickly grasped these nuances and
            translated them into thoughtful user flows and intuitive interfaces.
            The redesign unlocked several new product capabilities, and we saw
            noticeable improvements in rider onboarding and plan adoption after
            launch. I highly recommend working with her.
          </FeatureTestimonial>
          <Benchmark>
            He later told me I&apos;d set <MarkerBand>the first benchmark</MarkerBand> for every
            designer who works on the app after me.
          </Benchmark>
          <OutcomeCards />
          <h3 className="pt-6 font-serif text-[24px] leading-[1.2] text-head md:text-[28px]">
            What I&apos;m taking with me
          </h3>
          <TakeStatements
            items={[
              {
                a: "When you ask matters as much as what you ask.",
                key: "When you ask",
                b: "KYC asked for the same documents before and after. Moving it to just before paying turned a wall into a last step.",
              },
              {
                a: "Fewer taps doesn't always mean better understanding.",
                key: "Fewer taps",
                b: "The extra scooter step cost one screen and made the licence rule impossible to miss.",
              },
              {
                a: "Riders who read little need a different form, not less.",
                key: "a different form",
                b: "A map, a picture, a chip or a number, never a paragraph.",
              },
              {
                a: "Push for launch data from day one.",
                key: "launch data",
                b: "So the next round of decisions comes from riders, not only from principles, and open questions like KYC refunds get settled early.",
              },
              {
                a: "Make the case with screens, not words.",
                key: "screens, not words",
                b: "The red concern was deferred. Next time I'd show a few screens side by side from the first week.",
              },
            ]}
          />
          <div className="mt-4 grid gap-3 border-t border-line pt-8">
            <span className="label">Closing thought</span>
            <p className="font-serif text-[28px] leading-[1.25] text-balance text-head md:text-[34px]">
              I started out simplifying a scooter rental app. I finished
              designing around the people who depend on it every day.
            </p>
          </div>
          <Link
            href="/#work"
            className="label mt-8 w-fit !text-ink underline-offset-4 hover:underline"
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
