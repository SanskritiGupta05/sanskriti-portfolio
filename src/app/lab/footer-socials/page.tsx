"use client";

import { useState } from "react";
import { SushiBelt } from "@/components/sushi/SushiBelt";
import { SocialNoren, type NorenVariant, type Social } from "@/components/sushi/SocialNoren";
import { SignOffClosing, SignOffSign, SignOffSlip, type SignOffVariant } from "@/components/sushi/SignOff";
import { useTheme } from "@/components/ThemeProvider";

// Lab: the footer's "hire me" sign-off and socials on the noren, to compare before changing
// the real footer. Not linked from the site.
// X is from her tweet links in the codebase; LinkedIn and Instagram links are still to come.
const SOCIALS: Social[] = [
  { name: "X", href: "https://x.com/GuptaSanskritii", icon: "x" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Instagram", href: "#", icon: "instagram" },
];

const NOREN_OPTS: { id: NorenVariant; label: string; note: string }[] = [
  { id: "part", label: "A · Part the curtain", note: "Hover a panel: it bunches aside like a hand pushing through, and the logo is in the doorway behind it." },
  { id: "crest", label: "B · Crest swap", note: "Hover a panel: it sways and the crest printed on it turns into the logo." },
  { id: "tags", label: "C · Wooden tags", note: "Hover the noren: a breeze lifts it and three wooden tags pop up on strings above the rod." },
  { id: "peek", label: "E · Mascot peek", note: "Hover a panel: pixel Sanskriti pops up over the rod above it and the crest turns into the logo. (Coffee-pose face for now; kimono / umbrella versions need reference images.)" },
  { id: "enter", label: "D · Peek inside", note: "Click the noren: the panels swing open onto a warm lit doorway with three round links." },
];
const SIGN_OPTS: { id: SignOffVariant; label: string; note: string }[] = [
  { id: "sign", label: "1 · Shop sign", note: "A heading in the empty space above the noren, between the cherry branches." },
  { id: "slip", label: "2 · Order slip", note: "A sushi-bar order slip pinned next to the noren: 1 × product designer, stamped HIRE ME." },
  { id: "closing", label: "3 · Closing line", note: "A quiet last line under the belt, where the page ends." },
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
  const [noren, setNoren] = useState<NorenVariant>("peek");
  const [sign, setSign] = useState<SignOffVariant>("sign");
  const { night, setNight } = useTheme();
  return (
    <div className="mx-auto w-full max-w-[874px] px-6">
      <header className="grid gap-5 pt-12">
        <div className="grid gap-1.5">
          <span className="label">Lab · footer</span>
          <h1 className="font-serif text-h1m text-head md:text-h1">Hire me + socials on the noren</h1>
        </div>
        <div className="grid gap-2">
          <span className="label">Noren interaction</span>
          <Pills value={noren} set={setNoren} opts={NOREN_OPTS} />
          <p className="text-sm text-muted-foreground">{NOREN_OPTS.find((o) => o.id === noren)?.note}</p>
        </div>
        <div className="grid gap-2">
          <span className="label">Hire me sign-off</span>
          <Pills value={sign} set={setSign} opts={SIGN_OPTS} />
          <p className="text-sm text-muted-foreground">{SIGN_OPTS.find((o) => o.id === sign)?.note}</p>
        </div>
        <button type="button" onClick={() => setNight(!night)} className="skeu w-fit rounded-full px-3 py-1 text-sm text-ink">
          {night ? "☀ Day" : "☾ Night"}
        </button>
      </header>

      <SushiBelt
        key={noren}
        noren={<SocialNoren variant={noren} socials={SOCIALS} />}
        above={sign === "sign" ? <SignOffSign /> : <div className="h-[116px]" />}
        aside={sign === "slip" ? <SignOffSlip /> : undefined}
        below={sign === "closing" ? <SignOffClosing /> : undefined}
      />
    </div>
  );
}
