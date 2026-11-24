"use client";

import { useState } from "react";
import { SushiBelt } from "@/components/sushi/SushiBelt";
import { SocialNoren, type NorenVariant, type Social } from "@/components/sushi/SocialNoren";
import { SignOffSign, useTripFund, type Flourish } from "@/components/sushi/SignOff";
import { useTheme } from "@/components/ThemeProvider";

// Lab: the footer's "hire me" sign-off and socials on the noren, to compare before changing
// the real footer. Not linked from the site.
// Her picks so far: the shop-sign heading and noren B (crest swap). Now comparing small flourishes
// on the heading. X is from her tweet links in the codebase; LinkedIn and Instagram links are still to come.
const SOCIALS: Social[] = [
  { name: "X", href: "https://x.com/GuptaSanskritii", icon: "x" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Instagram", href: "#", icon: "instagram" },
];

const NOREN_OPTS: { id: NorenVariant; label: string }[] = [
  { id: "crest", label: "B · Crest swap (picked)" },
  { id: "part", label: "A · Part the curtain" },
  { id: "tags", label: "C · Wooden tags" },
  { id: "enter", label: "D · Peek inside" },
];
const FLOURISH_OPTS: { id: Flourish; label: string; note: string }[] = [
  { id: "swap", label: "1 · 日本旅行 swap", note: "Every few seconds “Japan trip.” softly blurs into 日本旅行 (nihon ryokō, “Japan trip”) and back, the same way your name swaps in the hero." },
  { id: "plane", label: "2 · Paper plane", note: "When the line scrolls into view, a tiny paper plane flies one dotted loop across it in the red scribble ink and parks at the end. Plays once." },
  { id: "stamp", label: "3 · 旅 stamp", note: "A round red passport-style stamp, 旅 (“trip”) · 2026, thumps down beside “Japan trip.” once when it comes into view." },
  { id: "fund", label: "4 · Trip fund", note: "A thin “Japan trip fund” meter under the line. Every sushi a visitor picks off the belt chips in its plate price (blue ¥100 … lacquer ¥500), with a little +¥ pop. Starts at ¥0 for each visitor." },
  { id: "none", label: "None", note: "The plain heading." },
];

function Pills<T extends string>({ value, set, opts }: { value: T; set: (v: T) => void; opts: { id: T; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => set(o.id)}
          className={`rounded-full px-3 py-1 text-sm ${value === o.id ? "skeu-red text-[#b4321f]" : "skeu text-ink"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function FooterSocialsLab() {
  const [noren, setNoren] = useState<NorenVariant>("crest");
  const [flourish, setFlourish] = useState<Flourish>("swap");
  const fund = useTripFund();
  const { night, setNight } = useTheme();
  return (
    <div className="mx-auto w-full max-w-[874px] px-6">
      <header className="grid gap-5 pt-12">
        <div className="grid gap-1.5">
          <span className="label">Lab · footer</span>
          <h1 className="font-serif text-h1m text-head md:text-h1">Hire me + socials on the noren</h1>
        </div>
        <div className="grid gap-2">
          <span className="label">Playful touch on the heading</span>
          <Pills value={flourish} set={setFlourish} opts={FLOURISH_OPTS} />
          <p className="max-w-[70ch] text-sm text-muted-foreground">{FLOURISH_OPTS.find((o) => o.id === flourish)?.note}</p>
        </div>
        <div className="grid gap-2">
          <span className="label">Noren interaction</span>
          <Pills value={noren} set={setNoren} opts={NOREN_OPTS} />
        </div>
        <button type="button" onClick={() => setNight(!night)} className="skeu w-fit rounded-full px-3 py-1 text-sm text-ink">
          {night ? "☀ Day" : "☾ Night"}
        </button>
      </header>

      <SushiBelt
        key={`${noren}-${flourish}`}
        noren={<SocialNoren variant={noren} socials={SOCIALS} />}
        above={<SignOffSign flourish={flourish} fund={fund} />}
        onPick={fund.add}
      />
    </div>
  );
}
