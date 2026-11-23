"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { annotate } from "rough-notation";

// A key phrase in a case study paragraph, marked with a hand-drawn scribble (rough-notation).
// The scribble draws itself in while the phrase sits in the reading band of the screen (the middle
// of the viewport) and fades away once it scrolls out, up or down. So only what's being read is
// marked and the page stays clean. `order` staggers several marks in one paragraph, like a pen
// moving along the line. Colours come from --scribble / --scribble-fill so night mode works.
type Kind = "highlight" | "underline" | "circle" | "box" | "bracket";
type Annotation = ReturnType<typeof annotate>;

export function Mark({ children, type = "underline", order = 0 }: { children: ReactNode; type?: Kind; order?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ann: Annotation | null = null;
    let showT: number | undefined;
    let hideT: number | undefined;
    const svgOf = () => (ann as unknown as { _svg?: SVGSVGElement } | null)?._svg;

    const show = () => {
      window.clearTimeout(hideT);
      window.clearTimeout(showT);
      if (ann) {
        const svg = svgOf();
        if (svg) svg.style.opacity = "1";
        return;
      }
      showT = window.setTimeout(() => {
        const css = getComputedStyle(document.documentElement);
        const stroke = css.getPropertyValue("--scribble").trim() || "#c8553b";
        const fill = css.getPropertyValue("--scribble-fill").trim() || "#f4c7bd";
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
      const svg = svgOf();
      if (!ann) return;
      if (svg) svg.style.opacity = "0";
      hideT = window.setTimeout(() => {
        ann?.remove();
        ann = null;
      }, reduce ? 0 : 400);
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? show() : hide()), { rootMargin: "-26% 0px -30% 0px" });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(showT);
      window.clearTimeout(hideT);
      ann?.remove();
    };
  }, [type, order]);

  return (
    <span ref={ref} className="mark">
      {children}
    </span>
  );
}
