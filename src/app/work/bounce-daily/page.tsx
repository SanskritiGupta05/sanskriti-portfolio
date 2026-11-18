import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StageTabs, Ticket } from "@/components/casestudy/pieces";
import { BeforeAfter, CaseStudyFrame, Flow, Note, P, Quote, Section, Shot, type TocItem } from "@/components/casestudy/Margin";

export const metadata: Metadata = {
  title: "Bounce Daily · Sanskriti",
  description: "Redesigning the Bounce Daily rider app, from finding a scooter to staying on the road.",
};

// Bounce Daily case study, in the "margin notes" language. Copy and screens are from
// Sanskriti's Framer case study (/work/bouncedaily-redesign).
const img = (name: string, h: number) => ({ src: `/assets/cases/bounce/${name}.webp`, w: 1600, h });

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "inherited", label: "What I inherited" },
  { id: "lifecycle", label: "Rider lifecycle" },
  { id: "onboarding", label: "01 · Onboarding" },
  { id: "hubs", label: "02 · Hub discovery" },
  { id: "choosing", label: "03 · Choosing the ride" },
  { id: "payment", label: "04 · Payment" },
  { id: "states", label: "Designing for states" },
  { id: "switching", label: "Scooter switching" },
  { id: "loyalty", label: "Loyalty & rewards" },
  { id: "system", label: "Making it real" },
  { id: "visual", label: "Visual language" },
  { id: "changed", label: "What changed" },
  { id: "outcome", label: "Outcome" },
  { id: "learned", label: "What I learned" },
];

const LIFECYCLE = [
  { stage: "Discover", q: "Where can I find a scooter?" },
  { stage: "Choose", q: "Which scooter and plan works for me?" },
  { stage: "Pay", q: "What exactly am I paying for?" },
  { stage: "Verify", q: "Can I start riding?" },
  { stage: "Ride", q: "What is my current plan status?" },
  { stage: "Manage", q: "Do I need to take action?" },
  { stage: "Renew", q: "How do I stay on the road?" },
];

const CHANGED: [string, string][] = [
  ["List-first discovery", "Map-first discovery"],
  ["Fragmented booking", "Guided decision-making"],
  ["Unclear system states", "Status + clear next action"],
  ["Reactive experience", "Proactive alerts"],
  ["Inconsistent patterns", "Reusable design system"],
  ["Transaction-focused", "Retention & rewards"],
];

const OUTCOMES = [
  { t: "Clearer core journey", d: "From finding a scooter to understanding a plan and completing payment." },
  { t: "Better state visibility", d: "Across KYC, payments, availability, kilometres and subscription status." },
  { t: "Scalable foundation", d: "Reusable components and patterns improved consistency across the app." },
  { t: "New retention opportunities", d: "Proactive renewal experiences and a new loyalty and rewards system." },
];

const LEARNED = [
  {
    t: "The happy path is only a fraction of the product.",
    d: "The most important design work often started by asking: What happens if this doesn't work? Payment failure, rejected verification and sold-out scooters weren't secondary screens. For the rider experiencing them, they were the product.",
  },
  {
    t: "Clarity matters more when the product affects someone's livelihood.",
    d: "A confusing status wasn't just an interface problem. It could delay a rider's workday. That made explicit states and actionable next steps more important than visual novelty.",
  },
  {
    t: "A redesign should improve the system, not just the screens.",
    d: "Reusable patterns for statuses, cards, alerts and bottom sheets made the experience more consistent and gave future product work a stronger foundation.",
  },
];

export default function BounceDaily() {
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
            <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="label">Case study · 2025</span>
            </div>
            <h1 className="mt-3 font-serif text-h2 text-head">Bounce Daily</h1>
            <p className="mt-3 max-w-[34ch] font-worn text-h1 text-balance text-head">
              Redesigning the rider experience, from finding a scooter to staying on the road.
            </p>
            <div className="mt-8">
              <Ticket
                kicker="Rider app redesign · Admit one"
                text="A 2-month redesign of the Bounce Daily rider app, making critical journeys clearer for the delivery and gig workers who depend on them every day."
                meta={[
                  { k: "My role", v: "Product Designer" },
                  { k: "Duration", v: "2 months" },
                  { k: "Scope", v: "End-to-end redesign" },
                ]}
              />
            </div>
            <div className="mt-10">
              <Shot {...img("hero", 966)} alt="The redesigned Bounce Daily rider app" />
            </div>
            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                ["What is it?", "Bounce Daily is a scooter subscription platform that gives riders flexible access to two-wheelers."],
                ["Who's it for?", "Primarily delivery and gig workers who rely on a scooter to earn their daily income."],
                ["My role", "I redesigned the rider app end-to-end from core flows and interface patterns to system states, components and developer handoff."],
                ["The redesign", "I reworked discovery, scooter and plan selection, payments, KYC, active-plan management and retention experiences."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-line bg-bg p-5">
                  <dt className="label">{q}</dt>
                  <dd className="printed mt-2 text-sm leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </header>
        }
      >
        <Section id="overview" label="Overview">
          <Quote>“A scooter isn&apos;t just a vehicle when your income depends on it.”</Quote>
          <P>
            Bounce Daily is a scooter subscription platform used primarily by delivery and gig workers. For many riders, an unavailable scooter, an expired plan or a failed
            payment doesn&apos;t just mean a frustrating app experience, it can interrupt their workday.
          </P>
          <Image src="/assets/cases/bounce/overview.svg" alt="" width={203} height={167} className="h-auto w-40" />
          <P>
            That changed how I approached the redesign. The goal wasn&apos;t simply to make the app look better. It was to make every critical action easier to understand,
            complete and recover from.
          </P>
        </Section>

        <Section id="inherited" label="The experience I inherited" title="The product worked. But the experience had grown fragmented.">
          <P>
            As the product expanded, new flows and states had been added over time. Individually, many of them worked. Together, they made the rider experience harder to
            navigate.
          </P>
          <Shot {...img("a", 837)} alt="Problems in the old app: fragmented journeys, unclear system states, inconsistent visual patterns, high cognitive load" />
        </Section>

        <Section id="lifecycle" label="Before I go into the details…" title="The redesign changed how the rider moved through the entire product.">
          <BeforeAfter before={img("b", 892)} after={img("c", 892)} />
          <h3 className="mt-6 max-w-[34ch] font-serif text-h1 text-head">I stopped looking at the app as a collection of features. And started looking at it as a rider lifecycle.</h3>
          <StageTabs stages={LIFECYCLE} />
          <Note label="The principle">Each stage needed to answer three questions: Where am I? What is happening? What should I do next?</Note>
        </Section>

        <Section id="onboarding" label="01 / Onboarding" title="Setting expectations before asking riders to commit.">
          <P>The old experience moved riders into registration quickly, before clearly explaining what completing the journey would involve.</P>
          <Shot {...img("onb-1", 688)} alt="Onboarding, before" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Shot {...img("d", 1283)} alt="Onboarding, after" />
            <Shot {...img("e", 960)} alt="Getting started, after" />
          </div>
          <Note label="Design decision" tilt={1.2}>
            Show the journey before asking the rider to begin it.
          </Note>
        </Section>

        <Section id="hubs" label="02 / Hub discovery" title="From browsing hub names to finding the closest available scooter.">
          <P>
            The old experience was organised around the system&apos;s understanding of locations: a list of hubs. But riders don&apos;t think in hub names. They think,
            “Where is the closest scooter I can pick up?”
          </P>
          <BeforeAfter before={img("hub-before", 1613)} after={img("hub-after", 1346)} />
          <p className="label">Before: list-first discovery, limited context on the map; riders had to interpret distance & availability manually.</p>
          <Note label="The shift">If location drives the decision, the map should drive the experience.</Note>
        </Section>

        <Section id="choosing" label="03 / Choosing the ride" title="One decision at a time.">
          <P>Scooter details, plan information and pricing were distributed across different stages of the journey.</P>
          <Shot {...img("choose-1", 992)} alt="Choosing a scooter and plan, before" />
          <Quote>How do we help riders compare without making them remember?</Quote>
          <P>
            We restructured the flow to help riders easily compare scooters, understand plan differences, customise their ride, and review everything before payment.
          </P>
          <Shot {...img("choose-2", 971)} alt="Choosing a scooter and plan, after" />
          <Note label="Design principle used" tilt={1.2}>
            Don&apos;t make users remember information they can compare.
          </Note>
        </Section>

        <Section id="payment" label="04 / Payment" title="Making the final amount understandable before asking riders to pay.">
          <Shot {...img("pay-1", 1764)} alt="Payment, before and after" />
          <Note label="Design principle">Money-related screens should remove questions, not create them.</Note>
          <P>We focused on clarity, hierarchy and transparency to build trust at the final step.</P>
          <div className="grid gap-4 sm:grid-cols-2">
            <Shot {...img("pay-2", 1927)} alt="Payment details" />
            <Shot {...img("pay-3", 1380)} alt="Payment confirmation" />
          </div>
        </Section>

        <Section id="states" label="Beyond the happy path" title="But the happy path was only part of the product.">
          <P>What happens when payment fails, KYC is rejected, a scooter sells out, a plan expires, or kilometres run out?</P>
          <h3 className="mt-4 font-serif text-h1 text-head">Designing the states between the screens.</h3>
          <P>A status alone wasn&apos;t enough. Every state needed to explain what had happened, and what the rider should do next.</P>
          <div className="grid gap-4">
            <span className="label">KYC</span>
            <Flow steps={["Not started", "Uploading", "Submitted", "Approved / Rejected", "Retry"]} />
            <Shot {...img("kyc-1", 1580)} alt="KYC states" />
            <Shot {...img("kyc-2", 911)} alt="KYC states, continued" />
          </div>
          <div className="grid gap-4">
            <span className="label">Plan lifecycle</span>
            <Flow steps={["Active", "Expiring", "Expired"]} />
            <Shot {...img("plan", 1425)} alt="Plan lifecycle states" />
          </div>
          <div className="grid gap-4">
            <span className="label">Kilometres</span>
            <Flow steps={["Available", "Running low", "Exhausted"]} />
            <Shot {...img("km", 1425)} alt="Kilometre states" />
          </div>
        </Section>

        <Section id="switching" label="New capability · Scooter switching" title="Switching vehicles without making riders understand the complexity behind it.">
          <P>
            Eligibility could depend on scooter category, licence requirements, KYC status and vehicle availability. I turned those dependencies into one guided flow.
          </P>
          <Flow steps={["Compare", "Check eligibility", "Complete missing requirements", "Find a hub", "Switch"]} />
          <Shot {...img("switch", 1210)} alt="Scooter switching flow" />
        </Section>

        <Section id="loyalty" label="New capability · Loyalty & rewards" title="Designing beyond the transaction.">
          <P>
            The original experience focused on getting riders onto a scooter. Repeated usage created another opportunity: recognising and rewarding riders who continued
            using the service.
          </P>
          <Flow steps={["Bronze", "Silver", "Gold"]} />
          <Shot {...img("loyalty", 1953)} alt="Loyalty and rewards" />
        </Section>

        <Section id="system" label="Making it real" title="The screens changed. The system behind them did too.">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="grid gap-2">
              <span className="label">Before</span>
              <P>Different buttons. Different cards. Different state treatments. Different spacing and interaction patterns.</P>
            </div>
            <div className="text-right">
              <span className="block font-worn text-[64px] leading-none text-[#c8553b]">60+</span>
              <span className="label">Reusable components</span>
            </div>
          </div>
          <P>A reusable foundation for buttons, cards, forms, statuses, banners, alerts and bottom sheets.</P>
          <Shot src="/assets/cases/bounce/system.webp" w={1600} h={414} alt="Reusable components" />
        </Section>

        <Section id="visual" label="Visual language" title="A visual language for moments that needed more than just text.">
          <P>Custom illustrations helped communicate availability, verification, service states and promotions without relying entirely on copy.</P>
          <Shot {...img("illus", 1817)} alt="Custom illustrations" />
        </Section>

        <Section id="changed" label="So, what changed?" title="From functional flows to one connected rider journey.">
          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-[1fr_auto_1fr] border-b border-line bg-surface/60 px-5 py-2.5">
              <span className="label">Before</span>
              <span />
              <span className="label">After</span>
            </div>
            {CHANGED.map(([b, a]) => (
              <div key={b} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-line px-5 py-3.5 last:border-b-0">
                <span className="printed text-sm text-muted-foreground line-through decoration-[#c8553b]/50">{b}</span>
                <span aria-hidden="true" className="text-[#c8553b]">→</span>
                <span className="font-serif text-lg text-head">{a}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="outcome" label="Outcome" title="A clearer rider journey and a stronger foundation for the product to grow.">
          <div className="grid gap-4 sm:grid-cols-2">
            {OUTCOMES.map((o) => (
              <div key={o.t} className="rounded-2xl border border-line bg-bg p-5">
                <p className="font-serif text-lg text-head">{o.t}</p>
                <p className="printed mt-2 text-sm leading-relaxed">{o.d}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="learned" label="What I learned">
          <ol className="grid gap-8">
            {LEARNED.map((l, i) => (
              <li key={l.t} className="grid gap-2 sm:grid-cols-[48px_1fr]">
                <span className="font-worn text-h1 text-[#c8553b]">{String(i + 1).padStart(2, "0")}</span>
                <div className="grid gap-2">
                  <p className="font-serif text-h1 text-head">{l.t}</p>
                  <P>{l.d}</P>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-3 border-t border-line pt-10">
            <span className="label">Closing thought</span>
            <Quote>
              I started this redesign thinking about how to simplify a scooter rental app. I finished it thinking about how to design around the realities of the people who
              depend on it every day.
            </Quote>
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
