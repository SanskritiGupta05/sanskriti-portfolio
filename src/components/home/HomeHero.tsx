import { Nav } from "@/components/Nav";
import { VideoCarousel } from "@/components/playground/VideoCarousel";

import { HeroSection } from "./HeroSection";

export function HomeHero() {
    return (
        <>
            <Nav />

            <main>
                <HeroSection />

                <VideoCarousel />
            </main>
        </>
    );
}
