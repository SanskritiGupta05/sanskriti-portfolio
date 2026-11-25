"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { KANJI, PRIMARY, VIBE } from "./data";

export function CasesContents() {
    const [on, setOn] = useState<number | null>(null);
    return (
        <div className="grid gap-20">
            <div>
                <div className="mb-4 flex items-baseline justify-between">
                    <span className="label">目次 · Case studies</span>
                    <span className="label">{PRIMARY.length.toString().padStart(2, "0")}</span>
                </div>
                <ul className="border-t border-line" onMouseLeave={() => setOn(null)}>
                    {PRIMARY.map((p, i) => (
                        <li
                            key={p.name}
                            onMouseEnter={() => setOn(i)}
                            className={`relative border-b border-line transition-opacity duration-300 ${on !== null && on !== i ? "opacity-30" : ""}`}
                        >
                            <a
                                href="#"
                                className="grid grid-cols-[56px_1fr_auto] items-baseline gap-4 py-7"
                            >
                                <span className="font-jp text-lg font-light text-muted-foreground">
                                    {KANJI[i]}
                                </span>
                                <span className="grid gap-1.5">
                                    <span className="relative w-fit font-serif text-h1 text-head">
                                        {p.name}
                                        <Hanko show={on === i} />
                                    </span>
                                    <span className="printed text-sm text-muted-foreground">
                                        {p.line}
                                    </span>
                                </span>
                                <span className="label text-right">
                                    {p.role}
                                    <br />
                                    {p.year}
                                </span>
                            </a>
                            <AnimatePresence>
                                {on === i && (
                                    <div className="pointer-events-none absolute top-1/2 right-[230px] z-10 hidden -translate-y-1/2 md:block">
                                        {p.shots.map((s, k) => (
                                            <motion.div
                                                key={s.src}
                                                className="absolute top-0 right-0 w-[220px] overflow-hidden rounded-xl bg-bg p-1 shadow-[0_20px_40px_-20px_rgba(60,40,20,0.45)] ring-1 ring-line"
                                                style={{ translateY: "-50%" }}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.85,
                                                    rotate: 0,
                                                    x: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    rotate: k ? 7 : -5,
                                                    x: k ? 70 : -20,
                                                    y: k ? 18 : -6,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                    rotate: 0,
                                                    x: 0,
                                                    transition: { duration: 0.15 },
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 22,
                                                    delay: k * 0.05,
                                                }}
                                            >
                                                <Image
                                                    src={s.src}
                                                    alt=""
                                                    width={s.w}
                                                    height={s.h}
                                                    sizes="220px"
                                                    className="block h-auto w-full rounded-[9px]"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="mb-4 flex items-baseline justify-between">
                    <span className="label">弁当 · Vibe coded</span>
                    <span className="label">Hover to peek · click to try it live</span>
                </div>
                <div className="grid h-[380px] grid-cols-[1.4fr_1fr] grid-rows-2 gap-1.5 rounded-[22px] border border-line bg-surface p-1.5">
                    {VIBE.map((p, i) => (
                        <a
                            key={p.name}
                            href={p.live}
                            className={`group relative overflow-hidden rounded-[16px] border border-line bg-bg ${i === 0 ? "row-span-2" : ""}`}
                        >
                            <Image
                                src={p.shots[0].src}
                                alt=""
                                fill
                                sizes="500px"
                                className="object-cover opacity-45 grayscale transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
                            />
                            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-bg via-bg/90 to-transparent p-4 pt-10">
                                <span className="grid gap-0.5">
                                    <span className="font-serif text-lg text-head">{p.name}</span>
                                    <span className="printed text-sm text-muted-foreground">
                                        {p.line}
                                    </span>
                                </span>
                                <span className="label shrink-0 transition-transform group-hover:-translate-y-0.5">
                                    Live ↗
                                </span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Hanko({ show }: { show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.span
                    aria-hidden="true"
                    className="font-jp absolute top-1/2 -right-9 grid size-6 -translate-y-1/2 place-items-center rounded-[5px] border-[1.5px] border-[#c8402c] text-[12px] leading-none text-[#c8402c]"
                    initial={{ opacity: 0, scale: 1.6, rotate: -18 }}
                    animate={{ opacity: 0.9, scale: 1, rotate: -8 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                >
                    作
                </motion.span>
            )}
        </AnimatePresence>
    );
}
