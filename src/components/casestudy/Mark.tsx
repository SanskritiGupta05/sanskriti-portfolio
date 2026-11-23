"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { annotate } from "rough-notation";

// A key phrase in a case study paragraph, marked with a hand-drawn scribble.
// The scribble draws itself in while the phrase sits in the reading band of the screen (the middle
// of the viewport) and fades away once it scrolls out, up or down. So only what's being read is
// marked and the page stays clean. `order` staggers several marks in one paragraph, like a pen
// moving along the line. Colours come from --scribble / --scribble-fill so night mode works.
//   circle / highlight / underline / box / bracket: rough-notation
//   swoosh: one relaxed pen stroke under each line, with a small flick at the end
//   spark: a tiny four-point doodle that pops in just after the phrase
//   marker: a thin, see-through highlighter band along the lower part of each line, like a real marker
type Kind = "highlight" | "underline" | "circle" | "box" | "bracket" | "swoosh" | "spark" | "marker";
type Annotation = ReturnType<typeof annotate>;
type Drawn = { svg: SVGSVGElement; remove: () => void };

const NS = "http://www.w3.org/2000/svg";

// our own scribbles (swoosh, spark), drawn into an SVG laid over the paragraph
function drawOwn(el: HTMLElement, type: "swoosh" | "spark" | "marker", color: string, animate: boolean): Drawn | null {
  const host = el.parentElement?.closest("p, li, blockquote, figcaption, div") as HTMLElement | null;
  if (!host) return null;
  if (getComputedStyle(host).position === "static") host.style.position = "relative";
  const hr = host.getBoundingClientRect();
  const rects = Array.from(el.getClientRects());
  if (!rects.length) return null;
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("aria-hidden", "true");
  Object.assign(svg.style, { position: "absolute", left: "0", top: "0", width: `${hr.width}px`, height: `${hr.height}px`, overflow: "visible", pointerEvents: "none", transition: "opacity 380ms ease" });
  const paths: SVGPathElement[] = [];
  if (type === "marker") {
    // one soft band per line, sitting low on the words with a hint of a hand-drawn slope
    svg.style.mixBlendMode = "multiply";
    rects.forEach((r) => {
      const x0 = r.left - hr.left - 1;
      const x1 = r.right - hr.left + 1;
      const y = r.bottom - hr.top - 6;
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", `M ${x0} ${y + 0.8} L ${x1} ${y - 0.8}`);
      paths.push(p);
    });
  } else if (type === "swoosh") {
    rects.forEach((r, i) => {
      const x0 = r.left - hr.left - 2;
      const x1 = r.right - hr.left + 2;
      const y = r.bottom - hr.top + 3;
      const w = x1 - x0;
      const last = i === rects.length - 1;
      const d = `M ${x0} ${y + 1} C ${x0 + w * 0.3} ${y + 4.5}, ${x0 + w * 0.65} ${y + 0.5}, ${x1} ${y - 1}` + (last ? ` q 5 -1.5 7 -6` : "");
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", d);
      paths.push(p);
    });
  } else {
    const r = rects[rects.length - 1];
    const cx = r.right - hr.left + 9;
    const cy = r.top - hr.top + 2;
    const s = 6.5;
    const p = document.createElementNS(NS, "path");
    // a little hand-drawn four-point spark, plus a tiny dot
    p.setAttribute("d", `M ${cx} ${cy - s} Q ${cx + 1} ${cy - 1} ${cx + s} ${cy} Q ${cx + 1} ${cy + 1} ${cx} ${cy + s} Q ${cx - 1} ${cy + 1} ${cx - s} ${cy} Q ${cx - 1} ${cy - 1} ${cx} ${cy - s} Z M ${cx + s + 4} ${cy - s - 2} l 0.1 0.1`);
    paths.push(p);
  }
  paths.forEach((p, i) => {
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", color);
    p.setAttribute("stroke-width", type === "spark" ? "1.6" : type === "marker" ? "8" : "1.9");
    if (type === "marker") p.setAttribute("stroke-opacity", "0.55");
    p.setAttribute("stroke-linecap", "round");
    p.setAttribute("stroke-linejoin", "round");
    svg.appendChild(p);
    if (!animate) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
    p.style.transition = `stroke-dashoffset ${type === "spark" ? 420 : 560}ms cubic-bezier(0.3, 0.7, 0.2, 1) ${i * 220}ms`;
  });
  if (type === "spark") {
    svg.style.transformOrigin = `${rects[rects.length - 1].right - hr.left + 9}px ${rects[rects.length - 1].top - hr.top + 2}px`;
    if (animate) {
      svg.style.transform = "scale(0.4) rotate(-25deg)";
      svg.style.transition = "opacity 380ms ease, transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1)";
    }
  }
  host.appendChild(svg);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      if (type === "spark") svg.style.transform = "scale(1) rotate(0deg)";
    }),
  );
  return { svg, remove: () => svg.remove() };
}

export function Mark({ children, type = "underline", order = 0 }: { children: ReactNode; type?: Kind; order?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ann: Annotation | null = null;
    let own: Drawn | null = null;
    let showT: number | undefined;
    let hideT: number | undefined;
    const svgOf = () => own?.svg ?? (ann as unknown as { _svg?: SVGSVGElement } | null)?._svg;
    const drawn = () => !!(ann || own);

    const show = () => {
      window.clearTimeout(hideT);
      window.clearTimeout(showT);
      if (drawn()) {
        const svg = svgOf();
        if (svg) svg.style.opacity = "1";
        return;
      }
      showT = window.setTimeout(() => {
        // read the ink from the marked text, so a page can tint its own marks (e.g. Keploy orange); defaults come from :root
        const css = getComputedStyle(el);
        const stroke = css.getPropertyValue("--scribble").trim() || "#c8553b";
        const fill = css.getPropertyValue("--scribble-fill").trim() || "#f4c7bd";
        if (type === "swoosh" || type === "spark") {
          own = drawOwn(el, type, stroke, !reduce);
          return;
        }
        if (type === "marker") {
          own = drawOwn(el, type, fill, !reduce);
          return;
        }
        ann = annotate(el, {
          type,
          color: type === "highlight" ? fill : stroke,
          strokeWidth: type === "highlight" ? 1 : 1.7,
          padding: type === "circle" ? [4, 10] : type === "box" ? [2, 5] : type === "highlight" ? [0, 2] : 2,
          iterations: type === "circle" || type === "box" ? 2 : 1,
          multiline: type !== "circle",
          brackets: type === "bracket" ? ["left"] : undefined,
          animate: !reduce,
          animationDuration: type === "highlight" ? 800 : 650,
        });
        ann.show();
        const svg = svgOf();
        if (svg) {
          svg.style.transition = "opacity 380ms ease";
          if (type === "highlight") svg.style.mixBlendMode = "multiply";
        }
      }, order * 170);
    };

    const hide = () => {
      window.clearTimeout(showT);
      if (!drawn()) return;
      const svg = svgOf();
      if (svg) svg.style.opacity = "0";
      hideT = window.setTimeout(() => {
        ann?.remove();
        own?.remove();
        ann = null;
        own = null;
      }, reduce ? 0 : 400);
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? show() : hide()), { rootMargin: "-26% 0px -30% 0px" });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(showT);
      window.clearTimeout(hideT);
      ann?.remove();
      own?.remove();
    };
  }, [type, order]);

  return (
    <span ref={ref} className="mark">
      {children}
    </span>
  );
}
