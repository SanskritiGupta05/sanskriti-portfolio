import Image from "next/image";

import { Tamagotchi } from "./Tamagotchi";
import { ToolIcons, type ToolId } from "./Tools";

const PROJECTS: {
    name: string;
    line: string;
    tags: string[];
    img: string;
    href: string;
    tools: ToolId[];
}[] = [
    {
        name: "Spider-Verse Interaction",
        line: "What if a mystery card could come to life? An interactive Spider-Verse-inspired experiment with a little cinematic magic.",
        tags: ["Creative Coding", "AI"],
        tools: ["chatgpt", "figma", "cursor", "xcode"],
        img: "/assets/cases/spider-verse.webp",
        href: "/work/spider-verse",
    },
    {
        name: "UX Laws: Learn Design Psychology",
        line: "An interactive way to explore UX laws, understand the psychology behind better design and make it easier to remember.",
        tags: ["Learning Experience", "AI"],
        tools: ["figma", "claude", "xcode"],
        img: "/assets/cases/uxie.webp",
        href: "/work/ux-laws",
    },
    {
        name: "Little Lights",
        line: "A Diwali-inspired experiment exploring light, interaction and the joy of making something just for this occasion.",
        tags: ["Creative Experiment", "Diwali"],
        tools: ["figma", "claude"],
        img: "/assets/cases/little-lights.webp",
        href: "https://diwali-album.vercel.app/",
    },
];

export function VibeProjects() {
    return (
        <section aria-labelledby="vibe-title" className="pt-20">
            <div className="flex items-center gap-3">
                <span
                    aria-hidden="true"
                    className="grid h-8 w-10 -rotate-6 place-items-center rounded-md border border-[#ecd2b0] bg-[#fdf1df] font-mono text-sm text-[#9b6a3a] shadow-[0_3px_0_#ecd2b0]"
                >
                    {"</>"}
                </span>
                <span className="label rounded-sm bg-[#fdece6] px-2.5 py-1 !text-[#b53424]">
                    Vibe-coded projects
                </span>
            </div>
            <div className="relative mt-4 w-fit">
                <h2 id="vibe-title" className="font-serif text-h2m text-head italic md:text-h2">
                    Small ideas, big curiosities
                </h2>
                <Tamagotchi
                    className="absolute bottom-0 left-full ml-14 hidden md:block"
                    px={1.9}
                />
            </div>
            <p className="printed mt-4 text-pretty">
                Playful experiments, creative interactions and ideas I brought to life with code +
                AI.
            </p>

            <ul className="mt-10 grid gap-4">
                {PROJECTS.map((p) => {
                    const live = Boolean(p.href);
                    const Card = live ? "a" : "div";
                    return (
                        <li key={p.name}>
                            <Card
                                {...(live
                                    ? {
                                          href: p.href!,
                                          ...(p.href!.startsWith("http")
                                              ? { target: "_blank", rel: "noreferrer" }
                                              : {}),
                                      }
                                    : {})}
                                className="group flex flex-col gap-5 rounded-[20px] border border-line bg-bg p-3 text-head shadow-[0_18px_36px_-26px_rgba(60,40,20,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_44px_-26px_rgba(60,40,20,0.42)] sm:flex-row sm:items-stretch"
                            >
                                <span className="relative block aspect-[4/3] shrink-0 overflow-hidden rounded-[14px] sm:w-[240px]">
                                    <Image
                                        src={p.img}
                                        alt=""
                                        fill
                                        sizes="(min-width: 640px) 240px, 100vw"
                                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                                    />
                                </span>
                                <span className="flex flex-1 flex-col gap-3 py-1 pr-2">
                                    <span className="flex items-start justify-between gap-3">
                                        <span className="font-serif text-h1m leading-tight md:text-h1">
                                            {p.name}
                                        </span>
                                        {live && (
                                            <span
                                                aria-hidden="true"
                                                className="mt-1 text-base text-[#c8553b] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            >
                                                ↗
                                            </span>
                                        )}
                                    </span>
                                    <span className="printed max-w-[52ch] text-sm leading-relaxed">
                                        {p.line}
                                    </span>
                                    <span className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
                                        <span className="flex flex-wrap gap-2">
                                            {p.tags.map((t) => (
                                                <span
                                                    key={t}
                                                    className="rounded-full bg-[#fde7e1] px-3 py-1 text-sm text-[#b53424]"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </span>
                                        <ToolIcons tools={p.tools} />
                                    </span>
                                </span>
                            </Card>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
