"use client";

import { useState } from "react";
import { SushiBelt } from "@/components/sushi/SushiBelt";
import { HireScene, type Social } from "@/components/sushi/HireScene";
import { useTheme } from "@/components/ThemeProvider";

// Lab: the new footer from Sanskriti's reference (hire-me line, Calendly button, pixel Sanskriti,
// the suitcase whose stickers are her socials, Mount Fuji), shown before it replaces the real footer.
// Not linked from the site. X is from her tweet links in the codebase; the Calendly, LinkedIn and
// Instagram links are still to come.
const CALENDLY = "#";
const STICKERS: Record<string, Social> = {
  cat: { name: "Instagram", href: "#", icon: "instagram" },
  torii: { name: "LinkedIn", href: "#", icon: "linkedin" },
  sakura: { name: "X", href: "https://x.com/GuptaSanskritii", icon: "x" },
};

export default function FooterLab() {
  const { night, setNight } = useTheme();
  const [pose, setPose] = useState<"chin" | "coffee">("coffee");
  return (
    <div className="mx-auto w-full max-w-[874px] px-6">
      <header className="flex items-center justify-between gap-4 pt-12 pb-8">
        <div className="grid gap-1.5">
          <span className="label">Lab · footer</span>
          <h1 className="font-serif text-h1m text-head md:text-h1">Hire-me footer</h1>
        </div>
        <div className="flex gap-2">
        {(["coffee", "chin"] as const).map((p) => (
          <button key={p} type="button" onClick={() => setPose(p)} className={`rounded-full px-3 py-1 text-sm ${pose === p ? "skeu-red text-[#b4321f]" : "skeu text-ink"}`}>
            {p === "coffee" ? "Home coffee pose" : "Chin-on-hands (from reference)"}
          </button>
        ))}
        <button type="button" onClick={() => setNight(!night)} className="skeu rounded-full px-3 py-1 text-sm text-ink">
          {night ? "☀ Day" : "☾ Night"}
        </button>
        </div>
      </header>
      <SushiBelt noren={null} branchTop={40} above={<HireScene calendly={CALENDLY} stickers={STICKERS} pose={pose} />} />
    </div>
  );
}
