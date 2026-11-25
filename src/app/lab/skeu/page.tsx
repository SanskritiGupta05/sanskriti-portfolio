import Image from "next/image";
import type { ReactNode } from "react";

import { Mark } from "@/components/casestudy/Mark";

function Demo({
    n,
    title,
    note,
    children,
}: {
    n: string;
    title: string;
    note: string;
    children: ReactNode;
}) {
    return (
        <section className="grid gap-6">
            <div className="grid gap-1.5">
                <span className="label">Demo {n}</span>
                <h2 className="font-serif text-h2m text-head md:text-h2">{title}</h2>
                <p className="max-w-[62ch] text-sm text-muted-foreground">{note}</p>
            </div>
            {children}
        </section>
    );
}

function Tape({ className = "" }: { className?: string }) {
    return (
        <span
            aria-hidden="true"
            className={`absolute h-6 w-20 bg-[#f4c7bd]/80 shadow-[0_1px_1px_rgba(80,40,20,0.12)] ${className}`}
        />
    );
}

function Polaroid({
    src,
    alt,
    caption,
    tilt,
    className = "",
}: {
    src: string;
    alt: string;
    caption: string;
    tilt: number;
    className?: string;
}) {
    return (
        <figure
            className={`w-[200px] bg-[#fffdf8] p-2.5 pb-9 shadow-[0_1px_2px_rgba(60,40,20,0.12),0_18px_30px_-18px_rgba(60,40,20,0.45)] ${className}`}
            style={{ rotate: `${tilt}deg` }}
        >
            <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
            <Image
                src={src}
                alt={alt}
                width={390}
                height={868}
                className="h-[300px] w-full object-cover object-top grayscale-[35%] sepia-[18%]"
            />
            <figcaption className="absolute inset-x-0 bottom-2 text-center font-serif text-sm text-ink italic">
                {caption}
            </figcaption>
        </figure>
    );
}

function Phone({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="rounded-[42px] bg-[#1c1b19] p-[7px] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(0,0,0,0.25),0_30px_50px_-28px_rgba(60,40,20,0.6),0_10px_20px_-12px_rgba(60,40,20,0.3)]">
            <div className="overflow-hidden rounded-[35px] bg-white">
                <Image
                    src={src}
                    alt={alt}
                    width={449}
                    height={978}
                    className="h-[520px] w-[240px] object-cover object-top"
                />
            </div>
        </div>
    );
}

function Receipt({
    head,
    sub,
    lines,
    totals,
    foot,
    tilt,
    crumpled,
}: {
    head: string;
    sub: string;
    lines: string[];
    totals: [string, string][];
    foot: string;
    tilt: number;
    crumpled?: boolean;
}) {
    const zig =
        "radial-gradient(circle at 6px 0, transparent 5.5px, #000 6px) top left / 12px 51% repeat-x, radial-gradient(circle at 6px 100%, transparent 5.5px, #000 6px) bottom left / 12px 51% repeat-x";
    return (
        <div
            className="drop-shadow-[0_16px_18px_rgba(60,40,20,0.22)]"
            style={{ rotate: `${tilt}deg` }}
        >
            <div
                className="relative w-[250px] bg-[#fffdf8] px-5 pt-7 pb-8 font-mono text-[12.5px] leading-[1.7] text-ink"
                style={{
                    WebkitMask: zig,
                    mask: zig,
                    backgroundImage: crumpled
                        ? "linear-gradient(172deg, rgba(0,0,0,0.035) 0 18%, transparent 18% 40%, rgba(0,0,0,0.03) 40% 41%, transparent 41% 66%, rgba(0,0,0,0.04) 66% 67%, transparent 67%), linear-gradient(8deg, transparent 0 30%, rgba(0,0,0,0.03) 30% 31%, transparent 31% 78%, rgba(0,0,0,0.035) 78% 79%, transparent 79%)"
                        : undefined,
                }}
            >
                <p className="text-center font-bold tracking-[0.12em]">{head}</p>
                <p className="mb-3 text-center text-[11px] text-muted-foreground">{sub}</p>
                <p className="border-t border-dashed border-ink/40 pt-2" />
                {lines.map((l, i) => (
                    <p key={i} className="flex justify-between gap-3">
                        <span>{l}</span>
                        <span aria-hidden="true" className="text-muted-foreground">
                            ·
                        </span>
                    </p>
                ))}
                <p className="mt-2 border-t border-dashed border-ink/40 pt-2" />
                {totals.map(([k, v]) => (
                    <p key={k} className="flex justify-between gap-3 font-bold">
                        <span>{k}</span>
                        <span>{v}</span>
                    </p>
                ))}
                <p className="mt-4 text-center text-[11px] tracking-[0.14em] text-muted-foreground">
                    {foot}
                </p>
            </div>
        </div>
    );
}

export default function SkeuLab() {
    return (
        <main className="mx-auto w-full max-w-[874px] px-6 pt-16 pb-[75vh]">
            <span className="label">Lab · tactile ideas for the Bounce case study</span>
            <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
                Real Bounce content. Each demo is one idea; the case study would only use a few,
                where they carry meaning.
            </p>

            <div className="mt-20 grid gap-36">
                <Demo
                    n="1"
                    title="Old app as polaroids, new app in a phone"
                    note="The old screens are pinned to the page, a little crooked and faded, like evidence. The redesign stands upright in a clean phone. The before and after becomes physical."
                >
                    <div className="grid items-center gap-12 rounded-[28px] bg-[#f8f8f8] px-6 py-14 md:grid-cols-[1.2fr_1fr] md:px-12">
                        <div className="relative mx-auto h-[380px] w-[340px]">
                            <Polaroid
                                src="/assets/lab/skeu/old-plans.png"
                                alt="Old plan list"
                                caption="the old plans"
                                tilt={-6}
                                className="absolute top-4 left-0"
                            />
                            <Polaroid
                                src="/assets/lab/skeu/old-countdown.png"
                                alt="Old countdown after paying"
                                caption="after paying: a timer"
                                tilt={5}
                                className="absolute top-10 right-0"
                            />
                            <span className="skeu-sunk absolute -bottom-2 left-6 rounded-full px-3 py-1 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                                Before
                            </span>
                        </div>
                        <div className="relative mx-auto grid justify-items-center gap-4">
                            <Phone
                                src="/assets/lab/skeu/new-plan.png"
                                alt="Redesigned plan screen"
                            />
                            <span className="skeu-red rounded-full px-3 py-1 text-xs tracking-[0.12em] text-[#a8432d] uppercase">
                                After
                            </span>
                        </div>
                    </div>
                </Demo>

                <Demo
                    n="2"
                    title="The receipt for “18 screens”"
                    note="The old journey printed as a long, crumpled receipt, next to the short, neat one for the new journey. The number gets felt, not just read."
                >
                    <div className="flex flex-wrap items-start justify-center gap-14 rounded-[28px] bg-[#f8f8f8] px-6 py-14">
                        <Receipt
                            head="OLD APP"
                            sub="booking a scooter"
                            crumpled
                            tilt={-3}
                            lines={[
                                "Intro slides",
                                "Location access",
                                "Name and phone",
                                "OTP",
                                "Reference contact",
                                "Aadhaar number",
                                "Aadhaar photos",
                                "Driving licence",
                                "Selfie",
                                "Waiting for approval",
                            ]}
                            totals={[
                                ["Screens before a hub", "18"],
                                ["Scooters seen", "0"],
                                ["Prices seen", "0"],
                            ]}
                            foot="THANK YOU FOR WAITING"
                        />
                        <Receipt
                            head="NEW APP"
                            sub="booking a scooter"
                            tilt={2}
                            lines={[
                                "Splash",
                                "3 intro stories",
                                "Phone number",
                                "OTP",
                                "What's next: 3 steps",
                                "Allow location",
                            ]}
                            totals={[
                                ["Screens before a hub", "8"],
                                ["Documents asked", "0"],
                            ]}
                            foot="SEE IT FIRST"
                        />
                    </div>
                </Demo>

                <Demo
                    n="3"
                    title="A principle as a taped sticky note"
                    note="Instead of a formal callout box, the learning sits beside the paragraph like a note you'd stick on your desk."
                >
                    <div className="relative grid gap-6 md:grid-cols-[1fr_230px] md:items-start">
                        <p className="printed max-w-[60ch] text-pretty">
                            High-speed scooters need a driving licence; low-speed ones don&apos;t.
                            My first instinct was to save a tap: put a speed toggle on the plan
                            screen, and show a licence sheet when someone tapped high speed. I
                            tested it against the rule, and it didn&apos;t hold up. So the scooter
                            type became its own step, with the licence rule written on each option.
                        </p>
                        <div
                            className="relative w-fit max-w-[230px] bg-[#fff7dc] px-5 pt-7 pb-5 shadow-[0_10px_20px_-14px_rgba(80,60,20,0.5)] md:mt-6"
                            style={{ rotate: "2.5deg" }}
                        >
                            <Tape className="-top-3 left-1/2 -translate-x-1/2 rotate-[3deg]" />
                            <span className="label mb-1.5 block">What I learned</span>
                            <p className="font-serif text-xl leading-snug text-ink">
                                Fewer taps doesn&apos;t always mean better understanding.
                            </p>
                        </div>
                    </div>
                </Demo>

                <Demo
                    n="4"
                    title="Swoosh underlines and a baby spark"
                    note="Scroll this into the middle of the screen. A relaxed pen swoosh replaces the straight underline for facts, and a tiny spark pops in beside one moment. Circles and highlights stay as they are."
                >
                    <p className="printed max-w-[62ch] text-pretty">
                        I was{" "}
                        <Mark type="swoosh">
                            <Mark type="spark" order={1}>
                                the app&apos;s first UI designer
                            </Mark>
                        </Mark>
                        . Before me there was{" "}
                        <Mark type="highlight" order={1}>
                            no designer, no system and no shared way of doing things
                        </Mark>
                        . I redesigned the Android rider app end to end{" "}
                        <Mark type="circle" order={2}>
                            over 3 months
                        </Mark>
                        , working{" "}
                        <Mark type="swoosh" order={3}>
                            through DreamLaunch with the product manager
                        </Mark>
                        , for riders in{" "}
                        <Mark type="swoosh" order={4}>
                            Bengaluru and Delhi NCR
                        </Mark>
                        .
                    </p>
                </Demo>

                <Demo
                    n="5"
                    title="Soft, tactile pills"
                    note="The same gentle gradient, bright top edge and tiny shadow as the live page, for tags and badges."
                >
                    <div className="flex flex-wrap items-center gap-4 rounded-[28px] bg-[#f8f8f8] px-8 py-10">
                        <span className="skeu-sunk rounded-full px-3.5 py-1.5 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                            Before
                        </span>
                        <span className="skeu-red rounded-full px-3.5 py-1.5 text-xs tracking-[0.12em] text-[#a8432d] uppercase">
                            After
                        </span>
                        <span className="skeu rounded-full px-3.5 py-1.5 text-sm text-ink">
                            Android · 3 months
                        </span>
                        <span
                            className="rounded-full px-4 py-2 text-sm text-white"
                            style={{
                                background: "linear-gradient(180deg, #2c2a27, #161513)",
                                boxShadow:
                                    "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 0 1px rgba(0,0,0,0.4), 0 10px 18px -10px rgba(40,30,20,0.6)",
                            }}
                        >
                            ▶ Live on Google Play
                        </span>
                    </div>
                </Demo>
            </div>
        </main>
    );
}
