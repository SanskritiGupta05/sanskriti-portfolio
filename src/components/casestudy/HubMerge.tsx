"use client";

import { useEffect, useRef, useState } from "react";
import { mountHubMerge } from "./hubMergeEngine";

// The old hub list and hub detail merging into one screen, then callouts on what got better.
// Plays once when scrolled into view; the 980×640 stage scales down to fit the column.
const W = 980;
const H = 640;

export function HubMerge() {
    const wrap = useRef<HTMLDivElement>(null);
    const stage = useRef<HTMLDivElement>(null);
    const ctl = useRef<ReturnType<typeof mountHubMerge> | null>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!stage.current || !wrap.current) return;
        const c = mountHubMerge(stage.current);
        ctl.current = c;
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / W)));
        ro.observe(wrap.current);
        let played = false;
        const io = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting || played) return;
                played = true;
                io.disconnect();
                if (reduce) c.showEnd();
                else c.preload().then(() => c.play());
            },
            { threshold: 0.45 },
        );
        io.observe(wrap.current);
        return () => {
            io.disconnect();
            ro.disconnect();
            c.destroy();
        };
    }, []);

    return (
        <figure className="hm grid gap-3">
            <style>{CSS}</style>
            <div
                ref={wrap}
                className="w-full overflow-hidden rounded-[16px] border border-line bg-surface/40"
                style={{ height: H * scale + 32 }}
            >
                <div
                    ref={stage}
                    className="hm-stage"
                    style={{ transform: `scale(${scale})` }}
                    aria-label="Animation: the old hub list and hub detail screens merge into one new screen"
                    role="img"
                />
            </div>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <button
                    type="button"
                    onClick={() => ctl.current?.play()}
                    className="rounded-full border border-line bg-bg px-3 py-1 text-sm text-head transition hover:bg-surface"
                >
                    ↺ Replay
                </button>
                <span className="label flex items-center gap-1.5">
                    <i className="hm-kind hm-ux">UX</i> how it works
                </span>
                <span className="label flex items-center gap-1.5">
                    <i className="hm-kind hm-ui">UI</i> how it looks
                </span>
            </figcaption>
        </figure>
    );
}

const CSS = `
.hm-stage { position: relative; width: ${W}px; height: ${H}px; margin: 16px 0 0 0; transform-origin: 0 0; color: var(--head); font-family: var(--font-hanken), "Hanken Grotesk", -apple-system, system-ui, sans-serif; }
.hm-phone { position: absolute; border-radius: 22px; overflow: hidden; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 12px 32px rgba(0,0,0,.08); will-change: transform, opacity; }
.hm-phone img { display: block; width: 100%; height: 100%; }
.hm-ghost { background: color-mix(in srgb, var(--line) 60%, transparent); box-shadow: none; }
.hm-cap { position: absolute; top: 4px; display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 600; color: var(--head); white-space: nowrap; will-change: transform, opacity; }
.hm-stamp { font-style: normal; font-size: 10.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 4px 8px; border-radius: 999px; line-height: 1; }
.hm-before { color: #5E5A54; background: #E6E2DB; }
.hm-after { color: #fff; background: #D42B31; }
.hm-arrow { position: absolute; top: 318px; left: 616px; font-size: 22px; color: var(--muted-foreground); }
.hm-piece { position: absolute; overflow: hidden; border-radius: 6px; transform-origin: 0 0; will-change: transform, opacity; pointer-events: none; opacity: 0; }
.hm-layer { position: absolute; inset: 0; background-repeat: no-repeat; }
.hm-hl { position: absolute; border: 1.5px solid #D42B31; border-radius: 8px; opacity: 0; pointer-events: none; }
.hm-tag { position: absolute; transform: translate(0, -100%); margin-top: -4px; font-size: 11px; font-weight: 600; color: #fff; background: #D42B31; padding: 2px 7px; border-radius: 20px; white-space: nowrap; opacity: 0; pointer-events: none; }
.hm-tag.hm-right { transform: none; margin-top: 0; }
.hm-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
.hm-callout { position: absolute; width: 236px; opacity: 0; will-change: transform, opacity; }
.hm-callout b { display: block; font-size: 15px; font-weight: 600; line-height: 1.3; color: var(--head); }
.hm-callout span { display: block; margin-top: 3px; font-size: 13px; line-height: 1.4; color: var(--muted-foreground); }
.hm-left { text-align: right; }
.hm-kind { display: inline-block; font-style: normal; font-size: 10px; font-weight: 700; letter-spacing: .06em; padding: 1px 6px; border-radius: 6px; margin: 0 6px; vertical-align: 2px; }
.hm-ux { color: #D42B31; background: #FBE9EA; }
.hm-ui { color: #2F5BD3; background: #E8EEFC; }
figcaption .hm-kind { margin: 0; }
.hm-zoom { margin-top: 8px; border-radius: 8px; background-repeat: no-repeat; box-shadow: 0 0 0 1px var(--line), 0 4px 12px rgba(0,0,0,.06); }
.hm-left .hm-zoom { margin-left: auto; }
`;
