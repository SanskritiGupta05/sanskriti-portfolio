"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Tap any Playground image or video to see it in a popup (her ask, desktop and phone).
// Mounted once by the Playground page; it listens for clicks on images and videos inside
// [data-lightbox], so the page's cards don't need to know about it. Looks and closes like the
// case study ImageZoom: dark blurred backdrop, the original file fitted to the screen, and Esc,
// the × button or a tap on the backdrop closes it. Videos play in the popup, looping, with
// controls so sound can be turned on (the Diwali album is "Sound ON!").

type Open = { kind: "img" | "video"; src: string; poster?: string; alt: string };

function target(el: EventTarget | null): HTMLImageElement | HTMLVideoElement | null {
    if (!(el instanceof HTMLImageElement || el instanceof HTMLVideoElement)) return null;
    if (!el.closest("[data-lightbox]")) return null;
    if (el.closest("a, button, nav")) return null;
    return el;
}

// the original file behind a next/image (unoptimized images already point at it)
function originalSrc(src: string): string {
    try {
        const u = new URL(src, window.location.href);
        if (u.pathname.startsWith("/_next/image")) return u.searchParams.get("url") ?? src;
    } catch {}
    return src;
}

export function Lightbox() {
    const [open, setOpen] = useState<Open | null>(null);
    const close = useCallback(() => setOpen(null), []);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const el = target(e.target);
            if (!el) return;
            e.preventDefault();
            if (el instanceof HTMLVideoElement) {
                // LazyVideo only sets src once it's near the screen; every clip's poster sits beside
                // it as <name>-poster.jpg, so the video file can be found from that too
                const src =
                    el.currentSrc || el.src || el.poster.replace(/-poster\.jpg$/, ".mp4") || "";
                if (!src) return;
                setOpen({
                    kind: "video",
                    src,
                    poster: el.poster,
                    alt: el.getAttribute("aria-label") ?? "",
                });
            } else {
                setOpen({ kind: "img", src: originalSrc(el.currentSrc || el.src), alt: el.alt });
            }
        };
        const onOver = (e: MouseEvent) => {
            const el = target(e.target);
            if (el) el.style.cursor = "zoom-in";
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

    const media =
        "block max-h-[88vh] max-w-[92vw] rounded-[14px] object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]";

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={open.alt || "Up close"}
            className="fixed inset-0 z-[200] grid cursor-zoom-out place-items-center overflow-hidden bg-[rgba(20,16,12,0.88)] backdrop-blur-sm"
            onClick={close}
        >
            {open.kind === "img" ? (
                // eslint-disable-next-line @next/next/no-img-element -- the original file, fitted to the screen
                <img
                    src={open.src}
                    alt={open.alt}
                    onClick={(e) => e.stopPropagation()}
                    className={`${media} cursor-default`}
                />
            ) : (
                <video
                    src={open.src}
                    poster={open.poster}
                    aria-label={open.alt}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    onClick={(e) => e.stopPropagation()}
                    className={`${media} cursor-default bg-black`}
                />
            )}
            <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="fixed top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-xl leading-none text-black shadow-lg hover:bg-white"
            >
                ×
            </button>
        </div>,
        document.body,
    );
}
