import { Footer } from "@/components/Footer";
import { VibeProjects } from "@/components/VibeProjects";

import { SheetBody } from "./SheetBody";

export function VibeSheet() {
    return (
        <SheetBody>
            <VibeProjects />
            <Footer />
        </SheetBody>
    );
}
