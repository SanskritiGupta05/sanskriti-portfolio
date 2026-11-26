import { SakuraButtonLink } from "@/components/ui/sakura-button";

import { HeroBio } from "./HeroBio";
import { HeroGreeting } from "./HeroGreeting";

export function HeroSection() {
    return (
        <section className="pt-4 pb-2 text-center">
            <HeroGreeting />
            <div className="mt-3 grid justify-items-center gap-4">
                <h1 className="font-serif text-h1m text-balance text-head md:-mx-16 md:text-h1">
                    Product Design is my craft. <br />
                    Engineering is my foundation.{" "}
                    <span className="font-worn">Curiosity is my compass.</span>
                </h1>
                <HeroBio />
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <SakuraButtonLink href="/Sanskriti_Gupta_Resume.pdf" target="_blank" rel="noopener noreferrer" finish="raised">
                        Résumé
                    </SakuraButtonLink>
                    <SakuraButtonLink href="/work" tone="paper" finish="raised">
                        See work
                    </SakuraButtonLink>
                </div>
            </div>
        </section>
    );
}
