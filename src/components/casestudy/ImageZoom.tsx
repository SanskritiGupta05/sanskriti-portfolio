"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Tap any case study image to see it up close (her ask, for every case study).
// Mounted once by src/app/work/layout.tsx, so it works on every /work/* page without each page's
// image components knowing about it: it listens for clicks on images inside the case study
// (<article> or its <header>), skipping images inside links/buttons/nav and small ones (logos,
// avatars, icons). The viewer shows the original file (not Next's resized copy) fitted to the
// screen; tapping a large image toggles between "fit" and its real size, which you can then pan.
// Esc, the × button or a tap on the backdrop closes it.
// Other pages can mount it too: `within` picks where images open from, `minWidth` the smallest
// image that counts, and `fullSize={false}` drops the real-size mode (a tap on the image closes it,
// so phones never pan sideways). The About page uses it this way.

const MIN_WIDTH = 120; // rendered px; anything smaller is a logo or an icon

function eligible(
    el: EventTarget | null,
    within: string,
    minWidth: number,
): HTMLImageElement | null {
    if (!(el instanceof HTMLImageElement)) return null;
    if (!el.closest(within)) return null;
    if (el.closest("a, button, nav, [data-nozoom]")) return null;
    if (el.getBoundingClientRect().width < minWidth) return null;
    return el;
}

// the original file behind a next/image (unoptimized images already point at it)
function originalSrc(img: HTMLImageElement): string {
    const src = img.currentSrc || img.src;
    try {
        const u = new URL(src, window.location.href);
        if (u.pathname.startsWith("/_next/image")) return u.searchParams.get("url") ?? src;
    } catch {}
    return src;
}

export function ImageZoom({
    within = "article, header",
    minWidth = MIN_WIDTH,
    fullSize = true,
}: {
    within?: string;
    minWidth?: number;
    fullSize?: boolean;
} = {}) {
    const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
    const [actual, setActual] = useState(false);
    const [big, setBig] = useState(false);

    const close = useCallback(() => {
        setOpen(null);
        setActual(false);
    }, []);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const img = eligible(e.target, within, minWidth);
            if (!img) return;
            e.preventDefault();
            setActual(false);
            setOpen({ src: originalSrc(img), alt: img.alt });
        };
        // show a zoom cursor on the images that open
        const onOver = (e: MouseEvent) => {
            const img = eligible(e.target, within, minWidth);
            if (img) img.style.cursor = "zoom-in";
        };
        document.addEventListener("click", onClick);
        document.addEventListener("mouseover", onOver);
        return () => {
            document.removeEventListener("click", onClick);
            document.removeEventListener("mouseover", onOver);
        };
    }, [within, minWidth]);

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
                        fullSize &&
                            (im.naturalWidth > window.innerWidth * 0.95 ||
                                im.naturalHeight > window.innerHeight * 0.9),
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
