"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const MIN_WIDTH = 120;

function eligible(el: EventTarget | null): HTMLImageElement | null {
    if (!(el instanceof HTMLImageElement)) return null;
    if (!el.closest("article, header")) return null;
    if (el.closest("a, button, nav, [data-nozoom]")) return null;
    if (el.getBoundingClientRect().width < MIN_WIDTH) return null;
    return el;
}

function originalSrc(img: HTMLImageElement): string {
    const src = img.currentSrc || img.src;
    try {
        const u = new URL(src, window.location.href);
        if (u.pathname.startsWith("/_next/image")) return u.searchParams.get("url") ?? src;
    } catch {}
    return src;
}

export function ImageZoom() {
    const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
    const [actual, setActual] = useState(false);
    const [big, setBig] = useState(false);

    const close = useCallback(() => {
        setOpen(null);
        setActual(false);
    }, []);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const img = eligible(e.target);
            if (!img) return;
            e.preventDefault();
            setActual(false);
            setOpen({ src: originalSrc(img), alt: img.alt });
        };
        const onOver = (e: MouseEvent) => {
            const img = eligible(e.target);
            if (img) img.style.cursor = "zoom-in";
        };
        document.addEventListener("click", onClick);
        document.addEventListener("mouseover", onOver);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("mouseover", onOver);
        };
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [open, close]);

    if (!open) return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={open.alt || "Image, up close"}
            className={`fixed inset-0 z-[200] bg-[rgba(20,16,12,0.88)] backdrop-blur-sm ${actual ? "overflow-auto" : "grid place-items-center overflow-hidden"}`}
            onClick={close}
        >
            {/* eslint-disable-next-line @next/next/no-img-element -- the original file, at its real size */}
            <img
                src={open.src}
                alt={open.alt}
                onLoad={(e) => {
                    const im = e.currentTarget;
                    setBig(
                        im.naturalWidth > window.innerWidth * 0.95 ||
                            im.naturalHeight > window.innerHeight * 0.9,
                    );
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (big) setActual((a) => !a);
                    else close();
                }}
                className={
                    actual
                        ? "m-auto block max-w-none cursor-zoom-out p-4"
                        : `block max-h-[90vh] max-w-[95vw] object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${big ? "cursor-zoom-in" : "cursor-zoom-out"}`
                }
            />
            <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="fixed top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-xl leading-none text-black shadow-lg hover:bg-white"
            >
                ×
            </button>
            {big && (
                <span className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white">
                    {actual ? "Tap to fit the screen" : "Tap for full size"}
                </span>
            )}
        </div>,
        document.body,
    );
}
