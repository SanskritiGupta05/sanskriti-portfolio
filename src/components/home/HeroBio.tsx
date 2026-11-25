import { Keyword } from "@/components/Keyword";

import { AppXBadge } from "./AppXBadge";

export function HeroBio() {
    return (
        <p className="printed max-w-[62ch] text-base text-pretty">
            Currently a product designer at <AppXBadge />. I work across{" "}
            <Keyword tools={["figma", "photoshop", "illustrator"]}>visual design</Keyword>,{" "}
            <Keyword tools={["figjam", "cursor", "flow"]}>UX</Keyword> and{" "}
            <Keyword tools={["jitter", "figmaMotion", "claude"]}>motion</Keyword>, helping startups
            take ideas from 0 to 1. With a background in computer science, I&apos;m also exploring{" "}
            <Keyword tools={["claude", "cursorAI", "github", "xcode", "vscode"]}>
                AI-assisted development
            </Keyword>{" "}
            and building things beyond the design canvas.
        </p>
    );
}
