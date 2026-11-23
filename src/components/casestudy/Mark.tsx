"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// A key phrase in a case study paragraph. It gets a soft highlighter stroke while it sits in the
// reading band of the screen (the middle of the viewport) and fades again once it scrolls out,
// in either direction. So only the part being read is marked, and the page stays clean.
// `order` staggers several marks in one paragraph, like a pen moving along the line.
export function Mark({ children, order = 0 }: { children: ReactNode; order?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "-28% 0px -32% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} data-on={on} className="mark" style={{ ["--mark-delay" as string]: `${order * 140}ms` }}>
      {children}
    </span>
  );
}
