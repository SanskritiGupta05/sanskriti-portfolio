import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CaseStudyFrame, P, type TocItem } from "@/components/casestudy/Margin";
import { MetaBar, PlayStoreButton, Squiggle } from "@/components/casestudy/bounce";
import { Chapter, Fig, Step, Testimonial, Tldr } from "@/components/casestudy/bounceStory";
import { Mark } from "@/components/casestudy/Mark";

export const metadata: Metadata = {
  title: "Bounce Daily · Sanskriti",
  description: "From a document wall to a rider journey: redesigning the Bounce Daily rider app.",
};

// Bounce Daily case study. This page follows her Figma v4 frame one to one (file eJ4fYjVQ…, page
// "Case study · web page", frame 1312:9945): same header, same words, same figures in the same order.
// Change the Figma first, then mirror it here. The only addition is the scroll scribbles she chose (Mark):
// swoosh = facts, circle = numbers, box, spark = one moment (highlighter fills removed at her ask).
// Figures are her composed canvases exported 2× into public/assets/cases/bounce/v4/fig.

// the nine contents entries from the Figma frame; "Making it real" lights up The UI layer's entry
const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "how", label: "How I worked" },
  { id: "goal", label: "The goal" },
  { id: "move", label: "The big move" },
  { id: "journey", label: "The journey", match: ["journey", "j1", "j2", "j3", "j4", "j5", "j6"] },
  { id: "wrong", label: "When things go wrong" },
  { id: "ui", label: "The UI layer", match: ["ui", "real"] },
  { id: "impact", label: "Impact" },
];

export default function BounceDaily() {
  return (
    // every header on this page is in Redaction (her ask): the small labels and the contents list too, in normal case
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
              <span className="label tracking-[0.18em]">Case study · 2025</span>
              <h1 className="mt-3 font-serif text-[clamp(44px,6vw,72px)] leading-[1.02] text-head">Bounce Daily</h1>
              <p className="mt-4 max-w-[30ch] font-serif text-[clamp(22px,2.4vw,30px)] leading-snug text-balance text-head">
                From a document wall to a <Squiggle marks={false}>rider journey</Squiggle>.
              </p>
              <PlayStoreButton className="mt-6" />
            </div>
            <div className="mt-8">
              <MetaBar
                role="Product Designer"
                duration="3 months"
                partners={
                  <span className="inline-flex flex-wrap items-center">
                    Aum Vats (PM @
                    <Image
                      src="/assets/cases/bounce/bounce-daily-logo.svg"
                      alt="Bounce Daily"
                      width={77}
                      height={67}
                      className="mx-1 inline-block h-[22px] w-auto drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]"
                    />
                    )
                  </span>
                }
              />
            </div>
            <div className="mt-10">
              <Image
                src="/assets/cases/bounce/v4/fig/hero.webp"
                alt="Three redesigned screens: Welcome to Bounce Daily, Pick a hub near you, and Select your plan"
                width={1792}
                height={1024}
                priority
                sizes="(min-width: 1100px) 900px, 100vw"
                className="block h-auto w-full rounded-[20px]"
              />
            </div>
            <div className="mt-10">
              <Tldr
                items={[
                  {
                    k: "The problem",
                    v: "Riders went through 18 screens of forms and documents before they saw a single hub, scooter or price, and many left at the plan screen.",
                  },
                  {
                    k: "What I did",
                    v: "Reordered the journey so riders discover and choose first and verify just before paying, then redesigned every step for riders who read little.",
                  },
                  {
                    k: "Who it's for",
                    v: "Delivery and gig riders who rent an EV scooter to earn. Many have low literacy, so a confusing screen costs them a day's work.",
                  },
                  {
                    k: "The result",
                    v: "Shipped on Android in 3 months. After launch the team saw noticeable improvements in rider onboarding and plan adoption (exact numbers are confidential).",
                  },
                ]}
              />
            </div>
          </header>
        }
      >
        <Chapter id="overview" name="Overview" lead="“A scooter isn't just a vehicle when your income depends on it.”">
          <P>
            Bounce Daily rents EV scooters by the day, week or month to delivery and gig riders in <Mark type="swoosh">Bengaluru and Delhi NCR</Mark>. A
            rider picks a hub, chooses a scooter and a plan, gets verified, pays, and rides to work every day. For them, a sold-out hub or an expired
            plan isn&apos;t an inconvenience. It&apos;s a day without earnings.
          </P>
          <P>
            I was{" "}
            <Mark type="swoosh">
              <Mark type="spark" order={1}>
                the app&apos;s first UI designer
              </Mark>
            </Mark>
            . Before me there was no designer, no system and no shared way of doing things. I redesigned the
            Android rider app end to end <Mark type="circle" order={2}>over 3 months</Mark>, working{" "}
            <Mark type="swoosh" order={3}>through DreamLaunch with the product manager</Mark>.
          </P>
        </Chapter>

        <Chapter id="problem" name="Problem" lead="An app that asked for everything before it gave anything.">
          <P>
            When the product manager brought me the project, the app did its job on paper. Riders could sign up, find a hub and pay. But they were
            leaving, and he came with the business concerns behind it: riders dropping off at plans, documents demanded up
            front, and a rider base that reads little.
          </P>
          <P>
            Going through it myself made the reasons obvious. A new rider went through <Mark type="circle">15 steps and 39 screens</Mark> to book a
            scooter. The first 18 were forms, OTPs, documents, a selfie and a wait for approval, all{" "}
            <Mark type="swoosh" order={1}>before seeing a hub, a scooter or a price</Mark>. Nobody had shown them anything worth finishing yet.
          </P>
          <Fig
            name="old-signup"
            h={1036}
            alt="Three old sign-up screens: account form, Aadhaar upload, and waiting for profile verification"
            caption="Three of the 18 screens a rider filled in before seeing a single hub."
          />
          <P>
            Riders who made it through met plans laid out as <Mark type="box">near-identical boxes of four numbers</Mark> each, and after paying, the app
            showed a countdown and little else. When it hit zero, it simply said time had run out.
          </P>
        </Chapter>

        <Chapter id="how" name="How I worked" lead="No research team. Just the old app, walked screen by screen, and a lot of UX principles.">
          <P>
            I want to be honest about how this project ran. <Mark type="swoosh">I didn&apos;t run user interviews</Mark>, and this was{" "}
            before the AI boom, so there was no shortcut for research. What I had was the live app. I took
            screenshots, then went through every flow myself, the way a rider would, and mapped the whole old journey end to end.
          </P>
          <P>
            From there I explored <Mark type="circle">around 270 screens</Mark>. I reviewed directions with the product manager on regular calls, and kept
            only what I could defend with <Mark type="swoosh" order={1}>a principle I could explain in a sentence</Mark>. Category apps like Yulu were a
            useful reference for what riders already knew.
          </P>
        </Chapter>

        <Chapter id="goal" name="The goal" lead="Everything visible, nothing overwhelming.">
          <P>
            Many riders have low literacy. They want every detail before they commit, but they won&apos;t read a paragraph to find it.
            Putting everything on one screen overwhelms them; hiding it loses them. So every screen had one rule: show only what this step needs, as a
            map, a picture, a chip or a number, and answer three questions. <Mark type="swoosh" order={1}>Where am I? What&apos;s happening? What do I do next?</Mark>
          </P>
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

        <Chapter id="move" name="The big move" lead="Before touching a single screen, I changed the order.">
          <P>
            The old app asked for effort first, forms and documents and a wait, and showed value last. The new journey flips that. Riders{" "}
            <Mark type="swoosh">discover hubs, choose a scooter and a plan, and only then verify and pay</Mark>. Every decision that follows comes from this
            one change.
          </P>
          <Fig
            name="journey"
            h={539}
            alt="Old journey: Sign up, Details and documents, Wait, Find a hub, Choose a plan, Pay. New journey: Discover, Choose, Verify, Pay, Ride, Manage, Renew. Green steps give the rider something, red steps ask the rider for effort."
          />
        </Chapter>

        <Chapter id="journey" name="The journey">
          <P>Here is the new journey in the order a rider meets it, and the thinking behind each step.</P>

          <div className="mt-6 grid min-w-0 gap-20">
            <Step id="j1" label="1. Onboarding" title="Let riders look before they commit.">
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
              <Fig name="onboarding" h={981} alt="Before: the old text-heavy how-it-works slide. After: three illustrated intro screens." />
            </Step>

            <Step id="j2" label="2. Finding a hub" title="Riders don't think in hub names. They think, “Where's the closest scooter?”">
              <P>
                The old app gave riders a list of hubs by name, with the details on a second screen. To find the right one, they had to{" "}
                read names and addresses and work out the distance themselves.
              </P>
              <P>
                Riders spend their day in map apps, so <Mark type="swoosh">a map is a screen they already know how to read</Mark>. The new hub screen opens
                on the nearest hub, with distance and scooters available right on the card. Before it, a short screen explains why we need location, with
                “Enter my area instead” for riders who&apos;d rather not share it. The same hub card comes back on the payment success screen and on home,
                so riders recognise their hub everywhere.
              </P>
              <Fig name="hubs" h={1063} alt="Before: the old hub list. After: the allow-location screen and the hub map opening on the nearest hub." />
            </Step>

            <Step id="j3" label="3. Choosing a scooter" title="The licence rule had to be impossible to miss.">
              <P>
                High-speed scooters need a driving licence; low-speed ones don&apos;t. My first instinct was to save a tap: put a speed toggle on the plan
                screen, and show a licence sheet when someone tapped high speed. I designed that, then tested it against the rule, and{" "}
                it didn&apos;t hold up. The licence only appeared if you tapped, and riders were choosing a scooter and a plan at
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
              <P>
                I explored <Mark type="circle">five versions of the scooter card</Mark>, three combined scooter-and-plan screens and two versions of the
                switch sheet before it settled. Switching later works the same way: mid-rental, moving from low to high speed only checks the licence,
                moving from high to low needs no documents, and the swap happens at a hub.
              </P>
              <Fig
                name="scooter"
                h={1056}
                alt="The low and high speed toggle with the licence rule on each side, and the Switch to high speed sheet."
                caption="The speed toggle with the licence rule on each side, and the sheet riders see when they switch to high speed."
              />
            </Step>

            <Step id="j4" label="4. Choosing a plan" title="Plans riders can compare without doing maths.">
              <P>
                In the old app, every plan sat in a near-identical box with four numbers: a price, a deposit, a price per km and a km limit. Comparing two
                plans meant reading and remembering eight numbers, and that&apos;s exactly where many riders left.
              </P>
              <P>
                I gave each screen one decision, and each plan <Mark type="swoosh">one number to compare: its price per day</Mark>. Kilometres moved into
                their own step, and a review screen came before paying. The fewer things you ask someone to weigh at once, the faster and surer they
                decide.
              </P>
              <Fig name="plans" h={1129} alt="Before: old plan boxes with four numbers each. After: plan cards led by the price per day." />
            </Step>

            <Step id="j5" label="5. Verifying and paying" title="Where KYC goes: the question that took the longest.">
              <P>
                KYC couldn&apos;t be removed, because hub staff check it before they hand over a scooter. So the question was never whether to ask for
                documents. <Mark type="swoosh">It was when.</Mark> I mapped every place it could sit. During sign-up was the old wall. Before choosing a hub,
                riders still hadn&apos;t seen what they&apos;d get. Approved before paying meant hours of waiting while the hub could sell out. After paying
                meant refunds and riders turned away at pick-up.
              </P>
              <Fig
                name="kyc-spots"
                h={780}
                alt="The journey Sign up, Find a hub, Choose a plan, Pay, Pick up, with five places KYC could sit. Ruled out: during sign-up, before choosing a hub, approved before paying, after paying. Chosen: submitted right before paying, about 2 minutes, no waiting. Every place KYC could sit on the journey, and why we ruled each one in or out."
              />
              <P>
                It took <Mark type="circle">three rounds</Mark> to settle. The first, approve then pay, left riders waiting mid-booking. The second, pay
                first, risked refunds and riders turned away at pick-up. The third was the hybrid. Riders now{" "}
                <Mark type="swoosh" order={1}>submit KYC right before paying, in about two minutes</Mark>, and verification happens in the background. It
                reads as one checkout, “2 steps to book”, and asks for less than before: Aadhaar and a selfie, and a licence only for high speed. A short
                “step 1 of 2” right before paying feels like the finish line, not a wall. For riders in a hurry there&apos;s a quiet “Do KYC later”: they
                can pay, but home tells them they can&apos;t collect until it&apos;s done.
              </P>
              <Fig
                name="pay"
                h={1046}
                alt="Confirm and pay with every charge listed, and the payment success screen with the hub card."
                caption="Checkout lists every charge before paying, and the success screen tells riders exactly which hub to go to."
              />
              <P>
                After submitting, riders never have to guess. Home shows an account status card with three steps, Submitted, In review and Approved, one
                line on what&apos;s happening (“Usually takes 2–4 hours”, “Fix 1 issue to continue”) and one action. If a document is rejected, the card
                says why and offers to re-upload it. What used to be <Mark type="swoosh">a seven-step sign-up wall became a three-step checklist</Mark>.
              </P>
              <Fig
                name="kyc-status"
                h={1056}
                alt="Home with the account status card: KYC in review, KYC not approved with the reason and a fix, and KYC approved."
                caption="KYC in review, not approved with the reason and a fix, and approved with the next step."
              />
            </Step>

            <Step id="j6" label="6. After paying" title="The app remembers, so the rider doesn't have to.">
              <P>
                After paying, the old app showed a countdown. Riders had to{" "}
                work out for themselves what was going on with their KYC, their plan, their kilometres and their dues.
              </P>
              <P>
                I replaced the timer with <Mark type="swoosh">one booking card on home that changes with the rider&apos;s stage</Mark>: KYC in review, ready
                to collect, riding, plan ending, plan ended. Every state shows one next step. One small rule came out of a lot of back and forth: Renew and
                Top up never swap places, and Renew leads unless kilometres are the problem, because an ended plan locks the scooter. Until the ride
                starts, a small tracker shows how far along the rider is: paid, KYC, picked up, riding.
              </P>
              <Fig name="home" h={983} alt="Before: the old booking countdown. After: home with the booking card ready to collect, ready to ride, and active." />
              <P>
                The same card warns riders before things run out. When a plan is about to end or kilometres are running low, a sheet says so with the best
                plan to renew or a top-up, and when dues are pending, they&apos;re itemised and explained before the next trip.
              </P>
              <Fig
                name="renewals"
                h={896}
                alt="Plan ending soon, plan ended, kilometres running low, and dues explained."
                caption="Plan ending soon, plan ended, kilometres running low, and dues explained."
              />
            </Step>
          </div>
        </Chapter>

        <Chapter id="wrong" name="When things go wrong" lead="A sold-out hub isn't an edge case for the rider it happens to.">
          <P>
            Beyond the happy path, I designed <Mark type="circle">eight scenarios</Mark>: a sold-out hub, a city we don&apos;t serve yet, a failed
            payment, KYC not approved, a plan ending and ended, kilometres running low and used up, and dues before a new trip. In the old app, most of
            them ended in a toast or a timer running out.
          </P>
          <P>
            Now each one says what went wrong in plain words, shows an illustration instead of a paragraph, and gives{" "}
            <Mark type="swoosh">one clear way forward</Mark>. A sold-out hub points to nearby hubs that do have scooters. A rejected document explains why,
            and lets the rider fix it.
          </P>
          <Fig
            name="errors"
            h={916}
            alt="Hub sold out, not in your city yet, payment failed, and KYC not approved, each with one next step."
            caption="Hub sold out, not in your city yet, payment failed, and KYC not approved, each with one next step."
          />
        </Chapter>

        <Chapter id="ui" name="The UI layer" lead="Calm enough to read at a glance.">
          <P>
            I built <Mark type="swoosh">the app&apos;s first design system</Mark> as I went: tokens, 16 text styles and 14 shared components, so a pattern
            learned once works on every screen. Custom illustrations carry availability, verification and service states, so riders don&apos;t have to
            rely on text. A loyalty programme with four tiers, Start, Cruise, Power and Nitro, gives riders a reason to keep riding, with rewards like
            extra kilometres.
          </P>
          <P>
            Early on, I flagged that the app used red for everything: buttons, headers, icons and cards.{" "}
            When everything shouts, nothing does. We prioritised the flows first, and the system now keeps{" "}
            <Mark type="circle" order={1}>one red action per screen</Mark>.
          </P>
          <Fig
            name="ui-layer"
            h={1216}
            alt="The custom illustration set, and the loyalty screen with the Start, Cruise, Power and Nitro tiers."
            caption="The illustration set, and the loyalty tiers that give riders a reason to keep riding."
          />
        </Chapter>

        <Chapter id="real" name="Making it real" lead="Every screen connected, every state accounted for.">
          <P>
            <Mark type="swoosh">I handled the developer handoffs myself.</Mark> Before handing anything over, I mapped every screen of the new app and
            connected them, so the developers could see the whole journey, including every branch where something goes wrong. Each screen went over with
            its states and the shared components it was built from, so what shipped matched what was designed.
          </P>
          <Fig
            name="flow-map"
            h={977}
            href="/assets/cases/bounce/v4/flow-map.webp"
            alt="The new app flow map: every screen connected, with the unhappy paths branching off the main journey."
            caption="The new app flow map: every screen, connected, with the unhappy paths branching off the main journey."
          />
        </Chapter>

        <Chapter id="impact" name="Impact and learnings" lead="Shipped on Android in 3 months, and it moved the numbers that mattered.">
          <P>
            The revamp shipped and is <Mark type="swoosh">live on the Play Store</Mark>, rated <Mark type="circle" order={1}>4.8</Mark> with over a lakh
            downloads. After launch, the team saw noticeable improvements in rider onboarding and plan adoption.
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
            The real thing I took from Bounce is that when you ask for something matters as much as what you ask for. KYC
            asked for the same documents before and after the redesign. Moving it from the first minute to the moment just before paying turned a wall
            into a last step. And a rider who reads little doesn&apos;t need less information.{" "}
            <Mark type="swoosh" order={1}>They need it in a form they can take in at a glance.</Mark>
          </P>
          <div className="mt-4 grid gap-3 border-t border-line pt-8">
            <span className="label">Closing thought</span>
            <p className="font-serif text-[28px] leading-[1.25] text-balance text-head md:text-[34px]">
              I started out simplifying a scooter rental app. I finished designing around the people who depend on it every day.
            </p>
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
