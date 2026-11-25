import { HireScene, type Social } from "./sushi/HireScene";
import { SushiBelt } from "./sushi/SushiBelt";

const CALENDLY: string | null = "https://calendly.com/sanskriti-g20905/30min";
const LINKEDIN: string | null = "https://www.linkedin.com/in/sanskritiguptaa/";
const INSTAGRAM: string | null = "https://www.instagram.com/sans.techh/";

const STICKERS: Record<string, Social> = {
    sakura: { name: "X", href: "https://x.com/GuptaSanskritii", icon: "x" },
    ...(LINKEDIN ? { torii: { name: "LinkedIn", href: LINKEDIN, icon: "linkedin" as const } } : {}),
    ...(INSTAGRAM
        ? { cat: { name: "Instagram", href: INSTAGRAM, icon: "instagram" as const } }
        : {}),
};

export function Footer() {
    return (
        <SushiBelt
            noren={null}
            branchTop={120}
            above={<HireScene calendly={CALENDLY} stickers={STICKERS} />}
        />
    );
}
