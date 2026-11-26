import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AboutCollage } from "@/components/about/AboutCollage";
import { Journey } from "@/components/about/Journey";
import { OffScreen } from "@/components/about/OffScreen";
import { ImageZoom } from "@/components/casestudy/ImageZoom";

export const metadata: Metadata = {
    title: "About · Sanskriti",
    description:
        "Who Sanskriti is: the kid who drew, now a product designer who builds what she designs.",
};

// The About page. More sections will follow the opening collage.
export default function AboutPage() {
    return (
        <div className="mx-auto w-full max-w-[874px] px-6">
            <Nav />
            <main>
                <AboutCollage />
                <Journey />
                <OffScreen />
            </main>
            <Footer />
            {/* tap any photo on the page to see it in a popup (same viewer as the case studies) */}
            <ImageZoom within="main" minWidth={60} fullSize={false} />
        </div>
    );
}
