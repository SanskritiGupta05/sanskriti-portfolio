import { HomeHero } from "@/components/home/HomeHero";
import { VibeSheet } from "@/components/home/VibeSheet";
import { WorkSheet } from "@/components/home/WorkSheet";
import { PaperStack } from "@/components/PaperStack";

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-[874px] px-6">
            <PaperStack
                hero={<HomeHero />}
                sheets={[
                    { id: "work", content: <WorkSheet /> },
                    { id: "vibe", content: <VibeSheet /> },
                ]}
            />
        </div>
    );
}
