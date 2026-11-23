import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CaseStudyFrame, type TocItem } from "@/components/casestudy/Margin";
import {
  BigStats,
  Body,
  Cards,
  Chips,
  Decision,
  Eyebrow,
  Facts,
  Fig,
  PlayLink,
  QuoteCard,
  RiderCard,
  Section,
  Solution,
  Tags,
  Takeaways,
} from "@/components/casestudy/bounceStory";

export const metadata: Metadata = {
  title: "Bounce Daily · Sanskriti",
  description: "From a document wall to a rider journey: redesigning the Bounce Daily rider app.",
};

// Bounce Daily case study v5. Mirrors her Figma frame "Bounce Daily · case study v5 (Qmentis structure)"
// (file eJ4fYjVQ…, page "Case study · web page", frame 1337:10605); outline in docs/bounce-daily-case-study-v5.md.
// Change the Figma first, then mirror it here. Decisions are hers; Aum is named only in the Team fact.

const TOC: TocItem[] = [
  { id: "context", label: "Context" },
  { id: "challenge", label: "The challenge" },
  { id: "rider", label: "The rider" },
  { id: "move", label: "The big move" },
  { id: "solution", label: "The solution" },
  { id: "decisions", label: "Design decisions", match: ["decisions", "d1", "d2", "d3", "d4", "d5", "more"] },
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
              <span className="label">Case study · 2025</span>
              <div className="mt-3">
                <Tags items={["Shipped", "Consumer app", "Android"]} />
              </div>
              <h1 className="mt-4 font-serif text-[clamp(44px,6vw,72px)] leading-[1.02] text-head">Bounce Daily</h1>
              <p className="mt-4 max-w-[720px] font-serif text-[clamp(19px,1.9vw,22px)] leading-[1.4] text-pretty text-muted-foreground">
                Redesigning an EV scooter rental app for delivery riders, so they see hubs, scooters and prices before the app asks anything of
                them.
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
                        )
                      </span>
                    ),
                    sub: "My role: product designer, the app's first UI designer, dev handoffs",
                  },
                  { k: "Timeline", v: "3 months, 2025" },
                  { k: "Platform", v: "Android rider app", sub: <PlayLink /> },
                ]}
              />
            </div>
            <div className="mt-10">
              <Image
                src="/assets/cases/bounce/v4/figures/hero.webp"
                alt="Three redesigned screens: Welcome to Bounce Daily, Pick a hub near you, and Select your plan"
                width={1792}
                height={1024}
                priority
                sizes="(min-width: 1100px) 900px, 100vw"
                className="block h-auto w-full rounded-[20px]"
              />
            </div>
          </header>
        }
      >
        <Section id="context" eyebrow="Context" headline="The app asked for everything before it gave anything." size="lg">
          <Body>
            Bounce Daily rents EV scooters by the day, week or month to delivery and gig riders in Bengaluru and Delhi NCR. A rider picks a hub,
            chooses a scooter and a plan, gets verified, pays, and rides to work every day. For them, a sold-out hub or an expired plan isn&apos;t an
            inconvenience. It&apos;s a day without earnings.
          </Body>
          <Body>
            The product manager came to me with the business concerns: riders dropping off at plans, documents demanded up front, and a rider base
            that reads little. I was the app&apos;s first UI designer. Before me there was no designer, no system and no shared way of doing things.
          </Body>
          <BigStats
            items={[
              { n: "39", l: "screens to book a scooter in the old app, across 15 steps" },
              { n: "11", l: "KYC screens before a rider saw a single scooter" },
            ]}
          />
          <Fig
            name="old-signup"
            alt="Three old sign-up screens: account form, Aadhaar upload, and waiting for profile verification"
            caption="Three of the screens a rider filled in before seeing a single hub."
          />
        </Section>

        <Section id="challenge" eyebrow="The challenge" headline="Everything visible, nothing overwhelming." tone="red" size="lg">
          <Body>
            Many riders have low literacy. They want every detail before they commit, but they won&apos;t read a paragraph to find it. Putting
            everything on one screen overwhelms them; hiding it loses them. Every iteration had to pass that test.
          </Body>
          <Body>
            We designed for Android first. Many riders come from lower-income backgrounds, and Android phones are what they can afford and already use
            every day, often on the move between deliveries.
          </Body>
          <div className="pt-2">
            <Cards
              items={[
                { t: "KYC is mandatory", l: "Hub staff check it before they hand over a scooter." },
                { t: "The licence rule", l: "High-speed scooters need a driving licence; low-speed ones don't. A business rule, like every competitor's." },
                { t: "No research budget", l: "No interviews or analytics, and before the AI boom. Research was done by hand." },
                { t: "3 months, no system", l: "No design system and no earlier designer to build on." },
              ]}
            />
          </div>
        </Section>

        <Section id="rider" eyebrow="The rider" headline="Riders don't read their way through an app. They glance at it between deliveries.">
          <RiderCard
            title="Delivery and gig riders"
            lines={["Bengaluru and Delhi NCR", "Their income depends on the scooter", "On affordable Android phones", "Many read little, and want every detail"]}
            questions={["Where am I?", "What's happening?", "What do I do next?"]}
          />
          <Eyebrow className="pt-4">How I worked</Eyebrow>
          <Body>
            No research team. I took screenshots of the live app, went through every flow the way a rider would, and mapped the whole old journey end to
            end. This was before the AI boom, so there was no shortcut. From there I explored around 270 screens, reviewed directions with the product
            manager on regular calls, and kept only what I could defend with a principle I could explain in a sentence. Category apps like Yulu were a
            useful reference for what riders already knew.
          </Body>
        </Section>

        <Section id="move" eyebrow="Insight to design" headline="Before touching a single screen, I changed the order.">
          <Body>
            The old app asked for effort first, forms and documents and a wait, and showed value last. The new journey flips that: riders discover hubs,
            choose a scooter and a plan, and only then verify and pay. Every decision that follows comes from this one change.
          </Body>
          <Fig
            name="journey"
            alt="Old journey: Sign up, Details and documents, Wait, Find a hub, Choose a plan, Pay. New journey: Discover, Choose, Verify, Pay, Ride, Manage, Renew."
            caption="Old journey vs new journey. Green steps give the rider something; red steps ask for effort."
          />
        </Section>

        <Section id="solution" eyebrow="The solution" headline="Follow one rider, from first open to renewal.">
          <Body>
            Here is the new journey in the order a rider meets it. Each step shows only what that step needs, as a map, a picture, a chip or a number.
          </Body>
          <Solution label="Solution #1 · Look first" title="Look before committing" fig="onboarding" alt="Before: the old how-it-works slide. After: three illustrated intro screens.">
            Three illustrated intros replace a wall of text: scooters on a map near you, real riders talking about Bounce, and what a plan includes.
            Sign-up is just a phone number and an OTP.
          </Solution>
          <Solution label="Solution #2 · Choose" title="Choose without doing maths" fig="plans" alt="Before: old plan boxes with four numbers each. After: plan cards led by the price per day.">
            Each screen asks one decision, and each plan leads with one number to compare: its price per day. Kilometres get their own step, and a
            review comes before paying.
          </Solution>
          <Solution label="Solution #3 · Book" title="Book in two steps" fig="pay" alt="Confirm and pay with every charge listed, and the payment success screen with the hub card.">
            KYC and payment read as one short checkout. Every charge is listed before paying, and the success screen tells riders exactly which hub to
            go to.
          </Solution>
          <Solution label="Solution #4 · Ride and renew" title="Know where you stand, every day" fig="home" alt="Before: the old booking countdown. After: home with the booking card ready to collect, ready to ride, and active.">
            The old countdown is gone. One booking card on home changes with the rider&apos;s stage, and always shows one next step.
          </Solution>
        </Section>

        <section id="decisions" className="grid min-w-0 scroll-mt-16 gap-[72px]">
          <div className="grid gap-5">
            <Eyebrow>Design decisions</Eyebrow>
            <h2 className="font-serif text-[28px] leading-[1.15] text-balance text-head md:text-[36px]">
              Every decision was judged against one test: can a rider who reads little get it at a glance?
            </h2>
          </div>

          <Decision
            id="d1"
            n={1}
            title="Scooter type gets its own step"
            principle="Fewer taps doesn't always mean better understanding."
            fig="scooter"
            alt="The low and high speed toggle with the licence rule on each side, and the Switch to high speed sheet."
            call={
              <>
                Scooter type is its own step, with the licence rule on every option. The toggle stays on the plan screen, with a tick for &quot;No
                licence&quot; and an amber card for &quot;Licence needed&quot;.
              </>
            }
          >
            My first instinct was to save a tap: a speed toggle on the plan screen, with a licence sheet when someone tapped high speed. I designed it,
            tested it against the licence rule, and it didn&apos;t hold up. The licence only showed if you tapped, and riders were choosing a scooter and
            a plan at once. I explored five scooter cards, three combined scooter-and-plan screens and two switch sheets.
          </Decision>

          <Decision
            id="d2"
            n={2}
            title="Map first, nearest hub first"
            principle="Riders think “where's the closest scooter?”, not in hub names."
            fig="hubs"
            alt="Before: the old hub list. After: the allow-location screen and the hub map opening on the nearest hub."
            call={
              <>
                A short allow-location step explains why, with &quot;Enter my area instead&quot;. The map opens on the nearest hub with distance and
                scooters on the card, and the same hub card comes back after paying and on home.
              </>
            }
          >
            The old app listed hubs by name, with details on a second screen, so riders read addresses and worked out distance themselves. Riders live
            in map apps all day, so a map is a screen they already know how to read (Jakob&apos;s law).
          </Decision>

          <Decision
            id="d3"
            n={3}
            title="KYC just before paying"
            principle="When you ask matters as much as what you ask."
            fig="kyc-spots"
            alt="Five places KYC could sit on the journey. Ruled out: during sign-up, before choosing a hub, approved before paying, after paying. Chosen: submitted right before paying."
            call={
              <>
                Riders submit KYC right before paying, in about two minutes, and it&apos;s verified in the background. It asks for less than before:
                Aadhaar and a selfie, and a licence only for high speed. A quiet &quot;Do KYC later&quot; lets riders in a hurry pay first.
              </>
            }
          >
            KYC couldn&apos;t go: hub staff check it at pick-up. So the question was when. I mapped every place it could sit, and it took three rounds:
            approve-then-pay left riders waiting mid-booking, pay-first risked refunds and riders turned away, and the third was the hybrid.
          </Decision>

          <Decision
            id="d4"
            n={4}
            title="KYC status on home, one next step"
            principle="Riders should never have to guess what's happening."
            fig="kyc-status"
            alt="Home with the account status card: KYC in review, KYC not approved with the reason and a fix, and KYC approved."
            call={
              <>
                A three-step checklist replaces the seven-step wall. Home shows Submitted, In review and Approved, one line on what&apos;s happening, and
                one action. A rejected document says why and offers to re-upload.
              </>
            }
          >
            The old app had a seven-step sign-up wall and then a wait screen. After submitting, riders couldn&apos;t tell whether they were done
            (visibility of system status).
          </Decision>

          <Decision
            id="d5"
            n={5}
            title="Dues and renewals up front"
            principle="The app remembers, so the rider doesn't have to."
            fig="renewals"
            alt="Plan ending soon, plan ended, kilometres running low, and dues explained."
            call={
              <>
                Plan ending, plan ended and kilometres low appear on home with the best plan or top-up. Renew leads unless kilometres are the problem, and
                the two buttons never swap places. Dues are itemised and explained before the next trip.
              </>
            }
          >
            After paying, the old app showed a countdown and a bare list of dues. Riders had to remember dates and work out charges themselves
            (recognition over recall).
          </Decision>

          <div id="more" className="grid scroll-mt-16 gap-5">
            <Eyebrow>Also</Eyebrow>
            <h3 className="font-serif text-[24px] leading-[1.2] text-head md:text-[28px]">More calls, at a glance</h3>
            <Cards
              items={[
                { k: "Onboarding", t: "7 form steps became 2 screens", l: "Splash, three illustrated intros, then phone and OTP. Pictures and real riders before any form (aesthetic-usability effect)." },
                { k: "Plans", t: "One price per day to compare", l: "One decision per screen: scooter, plan, kilometres, review. Fewer options at once, faster decisions (Hick's law)." },
                { k: "Pay", t: "Every charge before paying", l: "A full price breakdown with Bounce Shield and referral, and the success screen shows exactly which hub to visit (peak-end rule)." },
                { k: "Home", t: "Tracker only until the ride starts", l: "Paid, KYC, picked up, riding. Once the ride starts, the card shows the plan and kilometres instead." },
                { k: "Switch scooter", t: "Mid-rental only, from home", l: "An entry on home while the rental runs. Low to high checks only the licence; high to low needs no documents; the swap happens at a hub." },
                { k: "Colour", t: "One red action per screen", l: "I flagged early that red was on buttons, headers, icons and cards. We put flows first; the system now keeps red for the one action that matters." },
                { k: "System", t: "Tokens, 16 text styles, 14 components", l: "The app's first design system, so a pattern learned once works on every screen, for the next designer too." },
              ]}
            />
          </div>
        </section>

        <Section id="edge" eyebrow="Edge cases" headline="A sold-out hub isn't an edge case for the rider it happens to.">
          <Body>
            Beyond the happy path I designed eight scenarios. In the old app most of them ended in a toast or a timer running out. Now each one says what
            went wrong in plain words, shows an illustration instead of a paragraph, and gives one clear way forward.
          </Body>
          <Chips items={["Hub sold out", "City not served", "Payment failed", "KYC not approved", "Plan ending", "Plan ended", "Kilometres low", "Dues before a trip"]} />
          <Fig
            name="errors"
            alt="Hub sold out, not in your city yet, payment failed, and KYC not approved, each with one next step."
            caption="Hub sold out, not in your city yet, payment failed, and KYC not approved, each with one next step."
          />
        </Section>

        <Section id="ui" eyebrow="The UI layer" headline="Calm enough to read at a glance.">
          <Body>
            Custom illustrations carry availability, verification and service states, so riders don&apos;t have to rely on text. A loyalty programme with
            four tiers, Start, Cruise, Power and Nitro, gives riders a reason to keep riding, with rewards like extra kilometres.
          </Body>
          <Fig name="ui-layer" alt="The custom illustration set, and the loyalty screen with four tiers." caption="The illustration set, and the loyalty tiers." />
        </Section>

        <Section id="real" eyebrow="Making it real" headline="Every screen connected, every state accounted for.">
          <Body>
            I handled the developer handoffs myself. I mapped every screen of the new app and connected them, so developers could see the whole journey,
            including every branch where something goes wrong. Each screen went over with its states and the shared components it was built from.
          </Body>
          <Fig
            name="flow-map"
            href="/assets/cases/bounce/v4/flow-map.webp"
            alt="The new app flow map: every screen connected, with the unhappy paths branching off the main journey."
            caption="The new app flow map, with the unhappy paths branching off the main journey. Opens full size."
          />
        </Section>

        <Section id="learnings" eyebrow="Learnings and reflections" headline="Shipped on Android in 3 months.">
          <QuoteCard by="Product Manager, Bounce Daily">
            Since our users are primarily gig and delivery riders, every interaction needed to be clear, trustworthy, and easy to understand. She quickly
            grasped these nuances and translated them into thoughtful user flows and intuitive interfaces. The redesign unlocked several new product
            capabilities, and we saw noticeable improvements in rider onboarding and plan adoption after launch.
          </QuoteCard>
          <Body>He later told me I&apos;d set the first benchmark for every designer who works on the app after me.</Body>
          <Cards
            items={[
              { k: "Shipped", l: "Live on the Play Store, rated 4.8 with over a lakh downloads." },
              { k: "After launch", l: "Noticeable improvements in rider onboarding and plan adoption, the two places the redesign was meant to move. Exact numbers stay with Bounce." },
            ]}
          />
          <h3 className="pt-6 font-serif text-[24px] leading-[1.2] text-head md:text-[28px]">What I&apos;m taking with me</h3>
          <Takeaways
            items={[
              ["When you ask matters as much as what you ask.", "KYC asked for the same documents before and after. Moving it to just before paying turned a wall into a last step."],
              ["Fewer taps doesn't always mean better understanding.", "The extra scooter step cost one screen and made the licence rule impossible to miss."],
              ["Riders who read little need a different form, not less.", "A map, a picture, a chip or a number, never a paragraph."],
              ["Push for launch data from day one.", "So the next round of decisions comes from riders, not only from principles, and open questions like KYC refunds get settled early."],
              ["Make the case with screens, not words.", "The red concern was deferred. Next time I'd show a few screens side by side from the first week."],
            ]}
          />
          <div className="mt-4 grid gap-3 border-t border-line pt-8">
            <span className="label">Closing thought</span>
            <p className="font-serif text-[28px] leading-[1.25] text-balance text-head md:text-[34px]">
              I started out simplifying a scooter rental app. I finished designing around the people who depend on it every day.
            </p>
          </div>
          <Link href="/#work" className="label mt-8 w-fit !text-ink underline-offset-4 hover:underline">
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
