import { Mascot } from "@/components/Mascot";
import { NameSwap } from "@/components/NameSwap";

export function HeroGreeting() {
    return (
        <div className="relative mx-auto w-fit">
            <div className="relative mx-auto mb-3 w-fit rounded-2xl border border-line bg-bg px-4 py-2 text-sm leading-5 text-ink shadow-[0_6px_14px_-9px_rgba(60,40,20,0.35)] md:absolute md:top-0 md:right-full md:mr-[-6px] md:mb-0">
                Hey, i&apos;m
                <br />
                <NameSwap />
                <span
                    aria-hidden="true"
                    className="absolute -bottom-[5px] left-1/2 size-2.5 -translate-x-1/2 rotate-45 border-r border-b border-line bg-bg md:right-6 md:left-auto md:translate-x-0"
                />
            </div>
            <Mascot start="coffee" className="mx-auto w-[168px]" />
        </div>
    );
}
