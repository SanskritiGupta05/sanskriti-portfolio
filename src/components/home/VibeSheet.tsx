import { Footer } from "@/components/Footer";
import { Toolkit } from "@/components/Toolkit";
import { VibeProjects } from "@/components/VibeProjects";

import { SheetBody } from "./SheetBody";

export function VibeSheet() {
    return (
        <SheetBody>
            <VibeProjects />
            <Toolkit />
            <Footer />
        </SheetBody>
    );
}
