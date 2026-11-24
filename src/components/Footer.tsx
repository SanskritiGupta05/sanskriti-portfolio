import { SushiBelt } from "./sushi/SushiBelt";
import { HireScene, type Social } from "./sushi/HireScene";

// The site footer, from Sanskriti's reference: "One last thing · Hire me, so I can fund my dream
// Japan trip." with a Calendly button, pixel Sanskriti (her speech bubble cycles her socials), her
// suitcase whose stickers are her socials, Mount Fuji with a passing shinkansen, all over the sushi belt.
//
// Links: X is from her tweet links in the codebase; Calendly, LinkedIn and Instagram are the ones she
// sent (2026-11-24). Set any of them to null and the button turns into a plain label / that social
// drops out of the bubble and its sticker stays plain.
const CALENDLY: string | null = "https://calendly.com/sanskriti-g20905/30min";
const LINKEDIN: string | null = "https://www.linkedin.com/in/sanskritiguptaa/";
const INSTAGRAM: string | null = "https://www.instagram.com/sans.techh/";

const STICKERS: Record<string, Social> = {
  sakura: { name: "X", href: "https://x.com/GuptaSanskritii", icon: "x" },
  ...(LINKEDIN ? { torii: { name: "LinkedIn", href: LINKEDIN, icon: "linkedin" as const } } : {}),
  ...(INSTAGRAM ? { cat: { name: "Instagram", href: INSTAGRAM, icon: "instagram" as const } } : {}),
};

export function Footer() {
  return <SushiBelt noren={null} branchTop={40} above={<HireScene calendly={CALENDLY} stickers={STICKERS} />} />;
}
