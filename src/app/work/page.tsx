import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PaperStack } from "@/components/PaperStack";
import { CaseStudies } from "@/components/CaseStudies";
import { VibeProjects } from "@/components/VibeProjects";
import { EarlyCareer } from "@/components/EarlyCareer";

export const metadata: Metadata = {
  title: "Work · Sanskriti",
  description: "Primary case studies, vibe-coded projects and early career work by Sanskriti.",
};

// The Work page: all three tiers, each on its own clipped paper sheet (the same paperclip
// slide-in as the home page). The home page shows only the first two; early career lives here.
const TIERS = [
  { id: "primary", label: "Primary case studies" },
  { id: "vibe", label: "Vibe-coded projects" },
  { id: "early", label: "Early career" },
];

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-[874px] px-6">
      <PaperStack
        hero={
          <>
            <Nav />
            <main className="pt-10 pb-28 text-center">
              <span className="label">Work</span>
              {/* intro line from her Framer "Selected case studies" section */}
              <h1 className="mx-auto mt-3 max-w-[22ch] font-serif text-h2m text-balance text-head md:text-h2">
                End-to-end product work, from early ideas and messy problems to polished, shipped experiences.
              </h1>
              <ol className="mt-10 flex flex-wrap justify-center gap-3">
                {TIERS.map((t, i) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="skeu inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-ink hover:-translate-y-0.5">
                      <span className="text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </main>
          </>
        }
        sheets={[
          {
            id: "primary",
            content: (
              <div className="mx-auto w-full max-w-[874px] px-6 pb-24">
                <CaseStudies />
              </div>
            ),
          },
          {
            id: "vibe",
            content: (
              <div className="mx-auto w-full max-w-[874px] px-6 pb-24">
                <VibeProjects />
              </div>
            ),
          },
          {
            id: "early",
            content: (
              <div className="mx-auto w-full max-w-[874px] px-6">
                <EarlyCareer />
                <Footer />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
