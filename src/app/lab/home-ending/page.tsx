"use client";

import Image from "next/image";
import { useState } from "react";

// Local demo (not linked anywhere): four ways to end the home page between the Toolkit and the footer.
// Each option sits between a faded stub of the Toolkit and a faded stub of the footer, so the flow reads like the real page.
// Copy only uses facts already on the site (her role, the hero line, Neha Gupta's real Keploy testimonial).

const OPTIONS = [
    "A · Now strip",
    "B · One kind word",
    "C · Sign-off line",
    "D · End on the Toolkit",
];
const NOTES = [
    "Two or three live lines about what you're up to. Personal, and shows you're active. Easy to keep fresh.",
    "One real quote right before the hire-me ask. Builds trust exactly where it matters.",
    "A single quiet line in Redaction. Minimal and confident; the footer does the asking.",
    "No new section, just more breathing room so the page doesn't feel cut off.",
];

function Chip({
    children,
    tone = "#c8553b",
    bg = "#fbe9e3",
}: {
    children: React.ReactNode;
    tone?: string;
    bg?: string;
}) {
    return (
        <span
            className="label w-fit rounded-sm px-2.5 py-1"
            style={{ background: bg, color: tone }}
        >
            {children}
        </span>
    );
}

function ToolkitStub() {
    return (
        <div className="pointer-events-none grid gap-4 opacity-40">
            <Chip tone="#2b5f8c" bg="#e8f1f9">
                Toolkit
            </Chip>
            <div className="grid gap-4 border-t border-dashed border-line py-6 md:grid-cols-[140px_1fr]">
                <span className="label">Tech I know</span>
                <div className="flex gap-3">
                    {["#e44d26", "#264de4", "#f7df1e"].map((c) => (
                        <span
                            key={c}
                            className="size-10 rounded-[10px]"
                            style={{ background: c }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function FooterStub() {
    return (
        <div className="pointer-events-none grid justify-items-center gap-3 border-t border-line pt-14 text-center opacity-40">
            <span className="label">— One last thing —</span>
            <p className="font-serif text-h1m text-head md:text-h1">
                Hire me, so I can fund my dream <span className="text-[#c8553b]">Japan trip.</span>
            </p>
        </div>
    );
}

function NowStrip() {
    const rows: [string, React.ReactNode][] = [
        ["Designing", <>Product design at AppX (YC&apos;21), taking ideas from 0 to 1</>],
        ["Building", <>This portfolio, by hand, in Next.js and Tailwind</>],
        ["Exploring", <>AI-assisted development beyond the design canvas</>],
    ];
    return (
        <section className="grid gap-5">
            <div className="flex items-center gap-3">
                <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4caf50] opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-[#4caf50]" />
                </span>
                <Chip tone="#2e6b35" bg="#e6f3e7">
                    Right now
                </Chip>
            </div>
            <ul className="grid">
                {rows.map(([k, v]) => (
                    <li
                        key={k}
                        className="grid gap-1 border-t border-dashed border-line py-4 md:grid-cols-[140px_1fr] md:gap-6"
                    >
                        <span className="label pt-0.5">{k}</span>
                        <span className="text-base text-ink">{v}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function KindWord() {
    return (
        <section className="grid gap-6">
            <Chip tone="#b5651d" bg="#fdf0e2">
                Kind words
            </Chip>
            <figure className="grid gap-5 rounded-2xl border border-line bg-bg p-6 shadow-[0_10px_30px_-18px_rgba(60,40,20,0.35)] md:p-8">
                <span
                    className="font-serif text-[56px] leading-[0.5] text-[#F8904A]"
                    aria-hidden="true"
                >
                    &ldquo;
                </span>
                <blockquote className="font-serif text-h1m text-balance text-head md:text-h1">
                    Her ownership, reliability, and attention to detail make her someone I&apos;d
                    happily recommend to any product team.
                </blockquote>
                <figcaption className="flex items-center gap-3">
                    <Image
                        src="/assets/cases/keploy/neha-gupta.webp"
                        alt="Neha Gupta"
                        width={80}
                        height={80}
                        className="size-10 rounded-full object-cover"
                    />
                    <span className="grid">
                        <span className="text-sm text-head">Neha Gupta</span>
                        <span className="label !normal-case !tracking-normal">
                            Co-Founder, Keploy
                        </span>
                    </span>
                </figcaption>
            </figure>
        </section>
    );
}

function SignOff() {
    return (
        <section className="grid justify-items-center gap-4 py-10 text-center">
            <span className="label">That&apos;s the tour</span>
            <p className="max-w-[22ch] font-serif text-h2m text-balance text-head md:text-h2">
                Thanks for scrolling <span className="font-worn">all the way down.</span>
            </p>
            <span className="text-sm text-[var(--muted-ink)]">
                Designed in Figma, built by hand in Next.js.
            </span>
        </section>
    );
}

export default function HomeEndingLab() {
    const [i, setI] = useState(0);
    return (
        <main className="mx-auto grid w-full max-w-[874px] gap-10 px-6 py-14">
            <header className="grid gap-3">
                <span className="label">Lab · not linked on the site</span>
                <h1 className="font-serif text-h1 text-head">How should the home page end?</h1>
                <p className="max-w-[62ch] text-base">
                    Each option sits between the end of the Toolkit and the footer (both faded), so
                    you can feel the flow.
                </p>
            </header>
            <div className="sticky top-3 z-10 flex flex-wrap gap-2 rounded-2xl border border-line bg-bg/90 p-2 backdrop-blur">
                {OPTIONS.map((o, k) => (
                    <button
                        key={o}
                        type="button"
                        onClick={() => setI(k)}
                        className={`rounded-xl px-3.5 py-2 text-sm transition-colors ${k === i ? "bg-[var(--ink)] text-[var(--bg)]" : "hover:bg-black/5"}`}
                    >
                        {o}
                    </button>
                ))}
            </div>
            <p className="text-sm text-[var(--muted-ink)]">{NOTES[i]}</p>
            <div className="grid rounded-3xl border border-line bg-bg/60 px-5 py-10 md:px-10">
                <ToolkitStub />
                <div className={i === 3 ? "h-40" : "py-16"}>
                    {i === 0 && <NowStrip />}
                    {i === 1 && <KindWord />}
                    {i === 2 && <SignOff />}
                </div>
                <FooterStub />
            </div>
        </main>
    );
}
