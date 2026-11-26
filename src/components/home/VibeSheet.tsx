import { Footer } from "@/components/Footer";
import { BeyondWork } from "@/components/home/BeyondWork";
import { Toolkit } from "@/components/Toolkit";
import { VibeProjects } from "@/components/VibeProjects";

import { SheetBody } from "./SheetBody";

export function VibeSheet() {
    return (
        <SheetBody>
            <VibeProjects />
            <Toolkit />
            <BeyondWork />
            <Footer />
        </SheetBody>
    );
}
