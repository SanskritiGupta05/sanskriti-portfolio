"use client";

import { TOOLS, type Tool } from "@/components/Keyword";

// a real tool's app icon, shrunk to sit inline in a sentence
export function ToolMark({ tool }: { tool: Tool }) {
  return (
    <span
      role="img"
      aria-label={TOOLS[tool].name}
      className="mx-[0.1em] inline-block size-[22px] align-[-0.3em] [filter:none] [&>span]:origin-top-left [&>span]:scale-[0.55]"
    >
      {TOOLS[tool].icon}
    </span>
  );
}
