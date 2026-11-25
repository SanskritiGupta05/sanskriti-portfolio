import type { Metadata } from "next";

import { AboutCollage } from "@/components/about/AboutCollage";
import { Journey } from "@/components/about/Journey";
import { OffScreen } from "@/components/about/OffScreen";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
    title: "About · Sanskriti",
    description:
        "Who Sanskriti is: the kid who drew, now a product designer who builds what she designs.",
};

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
        </div>
    );
}
