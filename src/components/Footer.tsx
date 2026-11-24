import { SushiBelt } from "./sushi/SushiBelt";
import { HireScene, type Social } from "./sushi/HireScene";

// The site footer, from Sanskriti's reference: "One last thing · Hire me, so I can fund my dream
// Japan trip." with a Calendly button, pixel Sanskriti (her speech bubble cycles her socials), her
// suitcase whose stickers are her socials, Mount Fuji with a passing shinkansen, all over the sushi belt.
//
// Links: only real ones go live. X is from her tweet links in the codebase. Calendly, LinkedIn and
// Instagram are still to come: until then the button shows but isn't a link, and those two socials
// are left out of the bubble and their stickers stay plain.
const CALENDLY: string | null = null;
const LINKEDIN: string | null = null;
const INSTAGRAM: string | null = null;

const STICKERS: Record<string, Social> = {
  sakura: { name: "X", href: "https://x.com/GuptaSanskritii", icon: "x" },
  ...(LINKEDIN ? { torii: { name: "LinkedIn", href: LINKEDIN, icon: "linkedin" as const } } : {}),
  ...(INSTAGRAM ? { cat: { name: "Instagram", href: INSTAGRAM, icon: "instagram" as const } } : {}),
};

export function Footer() {
  return <SushiBelt noren={null} branchTop={40} above={<HireScene calendly={CALENDLY} stickers={STICKERS} />} />;
}
