"use client";

import { useEffect, useRef } from "react";

export function LazyVideo({
    src,
    poster,
    width,
    height,
    label,
}: {
    src: string;
    poster: string;
    width: number;
    height: number;
    label: string;
}) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const v = ref.current;
        if (!v) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    if (!v.src) v.src = src;
                    v.play().catch(() => {});
                } else if (v.src) {
                    v.pause();
                }
            },
            { rootMargin: "300px 0px" },
        );
        io.observe(v);
        return () => io.disconnect();
    }, [src]);

    return (
        <video
            ref={ref}
            poster={poster}
            width={width}
            height={height}
            muted
            loop
            playsInline
            preload="none"
            aria-label={label}
            className="block h-auto w-full"
            style={{ aspectRatio: `${width} / ${height}` }}
        />
    );
}
