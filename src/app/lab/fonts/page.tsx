"use client";

import { useState } from "react";

// Local demo (not linked anywhere): which sans serif should carry case study body text?
// Headings stay Redaction, small labels stay Courier; only the reading text changes.

const OPTIONS = [
  { name: "Courier New (today)", family: '"Courier New", Courier, monospace', note: "What the case studies use now." },
  { name: "Public Sans", family: '"Public Sans", sans-serif', note: "The font on the Winterfell page. Plain, sturdy, very readable." },
  { name: "Inter", family: '"Inter", sans-serif', note: "Neutral and screen-first. Stays out of the way." },
  { name: "Geist", family: '"Geist", sans-serif', note: "Crisp and modern, slightly tighter." },
  { name: "IBM Plex Sans", family: '"IBM Plex Sans", sans-serif', note: "A bit of character; has a sister mono if Courier ever goes." },
  { name: "DM Sans", family: '"DM Sans", sans-serif', note: "Rounder and friendlier." },
  { name: "Figtree", family: '"Figtree", sans-serif', note: "Warm and open, easy on long paragraphs." },
];

const GOOGLE =
  "https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&family=Inter:wght@400;500;600&family=Geist:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=DM+Sans:wght@400;500;600&family=Figtree:wght@400;500;600&display=swap";

function Excerpt({ family, compact }: { family: string; compact?: boolean }) {
  const body = { fontFamily: family };
  return (
    <div className="grid gap-5">
      <span className="label font-mono">Design decision 01</span>
      <h2 className={`font-serif text-head ${compact ? "text-[24px] leading-[1.2]" : "text-[36px] leading-[1.15]"}`}>
        Scooter type gets its own step
      </h2>
      <p className="font-serif text-[20px] italic leading-[1.4] text-head">
        Fewer taps doesn&apos;t always mean better understanding.
      </p>
      <p style={body} className={compact ? "text-[15px] leading-[1.6]" : "text-[18px] leading-[1.65]"}>
        My first instinct was to save a tap: a speed toggle on the plan screen, with a licence sheet when
        someone tapped high speed. I designed it, tested it against the licence rule, and it didn&apos;t hold
        up. The licence only showed if you tapped, and riders were choosing a scooter and a plan at once.
      </p>
      {!compact && (
        <p style={body} className="text-[18px] leading-[1.65]">
          Each screen asks one decision, and each plan leads with one number to compare: its price per day.
          Kilometres get their own step, and a review comes before paying.
        </p>
      )}
      <div className="grid gap-2 rounded-xl border border-black/10 bg-black/[0.02] p-4 md:grid-cols-[88px_1fr]">
        <span className="font-mono text-[13px] tracking-[0.08em] text-[#c8553b]">THE CALL</span>
        <span style={body} className={compact ? "text-[14px] leading-[1.55]" : "text-[16px] leading-[1.6]"}>
          Scooter type is its own step, with the licence rule on every option. The toggle stays on the plan
          screen, with a tick for &quot;No licence&quot; and an amber card for &quot;Licence needed&quot;.
        </span>
      </div>
      {!compact && (
        <span style={body} className="text-[13px] leading-[1.5] text-[var(--muted-ink)]">
          Figure 3 · The first idea, then scooter type as its own step.
        </span>
      )}
    </div>
  );
}

export default function FontLab() {
  const [i, setI] = useState(1);
  return (
    <main className="mx-auto grid max-w-[1200px] gap-14 px-4 py-14 md:px-8">
      <link rel="stylesheet" href={GOOGLE} precedence="default" />
      <header className="grid gap-3">
        <span className="label font-mono">Font lab · not linked on the site</span>
        <h1 className="font-serif text-[36px] leading-[1.15] text-head">Which sans serif for case study text?</h1>
        <p className="max-w-[640px] text-[15px]">
          Headings stay Redaction and small labels stay Courier. Only the reading text changes. Pick one below
          to read it at real size, or scroll down to see all of them side by side.
        </p>
      </header>

      <section className="grid gap-6">
        <div className="sticky top-3 z-10 flex flex-wrap gap-2 rounded-2xl border border-black/10 bg-[var(--bg)]/90 p-2 backdrop-blur">
          {OPTIONS.map((o, k) => (
            <button
              key={o.name}
              type="button"
              onClick={() => setI(k)}
              style={{ fontFamily: o.family }}
              className={`rounded-xl px-3.5 py-2 text-[14px] transition-colors ${k === i ? "bg-[var(--ink)] text-[var(--bg)]" : "hover:bg-black/5"}`}
            >
              {o.name}
            </button>
          ))}
        </div>
        <p className="text-[13px] text-[var(--muted-ink)]">{OPTIONS[i].note}</p>
        <div className="rounded-3xl border border-black/[0.06] bg-white px-5 py-10 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:px-14 md:py-14">
          <div className="mx-auto max-w-[680px]">
            <Excerpt family={OPTIONS[i].family} />
          </div>
        </div>
      </section>

      <section className="grid gap-6">
        <h2 className="font-serif text-[24px] leading-[1.3] text-head">All side by side</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {OPTIONS.map((o) => (
            <div key={o.name} className="grid content-start gap-5 rounded-2xl border border-black/[0.06] bg-white p-6">
              <div className="grid gap-1 border-b border-black/[0.06] pb-4">
                <span style={{ fontFamily: o.family }} className="text-[17px] font-medium">
                  {o.name}
                </span>
                <span className="text-[12px] text-[var(--muted-ink)]">{o.note}</span>
              </div>
              <Excerpt family={o.family} compact />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
