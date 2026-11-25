"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { BOUNCE as B } from "./content";

export function LayoutChapters() {
    return (
        <div className="mx-auto grid max-w-[640px] gap-24 pt-12 text-center">
            <header className="grid justify-items-center gap-5">
                <Hanko>バ</Hanko>
                <span className="label">Case study · Bounce Daily · 2025</span>
                <h1 className="font-serif text-h2 text-balance text-head">{B.title}</h1>
                <p className="printed max-w-[56ch] text-pretty">{B.intro}</p>
                <dl className="mt-2 grid w-full grid-cols-3 border-y border-line py-4">
                    {B.meta.map((m) => (
                        <div key={m.k} className="grid gap-1">
                            <dt className="label">{m.k}</dt>
                            <dd className="font-serif text-lg text-head">{m.v}</dd>
                        </div>
                    ))}
                </dl>
            </header>

            <div className="relative -mx-[120px] aspect-[1600/966] overflow-hidden rounded-[20px]">
                <Image
                    src={B.hero}
                    alt="Bounce Daily redesigned screens"
                    fill
                    sizes="900px"
                    className="object-cover"
                />
            </div>

            <Chapter kanji="一" label="Overview">
                <p className="font-worn text-h2m text-head md:text-h2">“{B.quote}”</p>
                {B.overview.map((p) => (
                    <p key={p} className="printed text-pretty">
                        {p}
                    </p>
                ))}
            </Chapter>

            <Chapter kanji="二" label="The rider lifecycle">
                <p className="font-serif text-h1 text-balance text-head">{B.lifecycleIntro}</p>
                <ol className="relative -mx-[120px] mt-6 grid grid-cols-7">
                    <span
                        aria-hidden="true"
                        className="absolute top-[7px] right-[7%] left-[7%] h-px bg-ink/40"
                    />
                    {B.lifecycle.map((l) => (
                        <li key={l.stage} className="relative grid justify-items-center gap-2 px-1">
                            <span className="size-3.5 rounded-full border-2 border-bg bg-[#c8553b] ring-1 ring-[#c8553b]" />
                            <span className="label !text-head">{l.stage}</span>
                            <span className="printed text-sm">{l.q}</span>
                        </li>
                    ))}
                </ol>
                <div className="mt-6 grid grid-cols-3 gap-3">
                    {B.principle.qs.map((q, i) => (
                        <div
                            key={q}
                            className="grid justify-items-center gap-2 rounded-2xl border border-line p-4"
                        >
                            <span className="font-jp text-lg text-[#c8553b]">
                                {["何処", "何事", "次"][i]}
                            </span>
                            <span className="font-serif text-lg text-head">{q}</span>
                        </div>
                    ))}
                </div>
            </Chapter>

            <Chapter kanji="三" label={`${B.chapter.no} · ${B.chapter.name}`}>
                <p className="font-serif text-h1 text-balance text-head">{B.chapter.title}</p>
                <p className="printed text-pretty">{B.chapter.body}</p>
                <Compare before={B.chapter.before} after={B.chapter.after} />
                <p className="relative mx-auto max-w-[36ch] font-worn text-h1 text-head">
                    {B.chapter.shift}
                    <span className="absolute -right-10 -bottom-4">
                        <Hanko small>改</Hanko>
                    </span>
                </p>
            </Chapter>
        </div>
    );
}

function Chapter({
    kanji,
    label,
    children,
}: {
    kanji: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <section className="grid justify-items-center gap-6">
            <span
                aria-hidden="true"
                className="font-jp text-[96px] leading-none font-light text-[#e8d6c9]"
            >
                {kanji}
            </span>
            <span className="label -mt-2">{label}</span>
            {children}
        </section>
    );
}

function Hanko({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
    return (
        <span
            aria-hidden="true"
            className={`font-jp grid rotate-[-8deg] place-items-center rounded-[6px] border-2 border-[#c8402c] text-[#c8402c] opacity-90 ${small ? "size-9 text-lg" : "size-12 text-h1"}`}
        >
            {children}
        </span>
    );
}

function Compare({ before, after }: { before: string; after: string }) {
    const box = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState(50);
    const move = (clientX: number) => {
        const r = box.current?.getBoundingClientRect();
        if (r) setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
    };
    return (
        <div
            ref={box}
            className="relative -mx-[120px] aspect-[1600/892] cursor-ew-resize overflow-hidden rounded-[16px] border border-line select-none"
            onPointerMove={(e) => move(e.clientX)}
            onPointerDown={(e) => move(e.clientX)}
        >
            <Image src={after} alt="After" fill sizes="900px" className="object-cover" />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <Image src={before} alt="Before" fill sizes="900px" className="object-cover" />
            </div>
            <span className="absolute inset-y-0 w-0.5 bg-bg shadow" style={{ left: `${pos}%` }}>
                <span className="absolute top-1/2 left-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bg text-sm text-ink shadow">
                    ⇆
                </span>
            </span>
            <span className="label absolute top-3 left-3 rounded-full bg-bg/90 px-2 py-0.5">
                Before
            </span>
            <span className="label absolute top-3 right-3 rounded-full bg-bg/90 px-2 py-0.5">
                After
            </span>
        </div>
    );
}
