"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { LazyVideo } from "./LazyVideo";

// The home page strip under the hero: Sanskriti's interaction videos (from the Playground)
// gliding past on their own, endlessly. Every card has the same height and its video's own
// width, in the site's white-mat frame. It never pauses (her call);
// with reduced motion it stays still and can be scrolled sideways instead.
const A = "/assets/playground";
const CLIPS = [
  // the two phone recordings are cropped to the screen only (no phone frame), same card as the rest
  { name: "spider-verse-screen", w: 538, h: 1244, alt: "A phone revealing a holographic Spider-Verse character card" },
  { name: "chat", w: 1458, h: 1414, alt: "A tutor chat interface with lively message animations" },
  { name: "pixel-buddy", w: 1920, h: 1150, alt: "A context-window meter with a tiny pixel buddy reacting while an agent works" },
  { name: "mood-screen", w: 670, h: 1436, alt: "A mood check-in app: turning a weather dial changes how the cloud feels" },
  { name: "folder", w: 720, h: 720, alt: "A file drawer whose coloured folders lift on hover" },
  { name: "loading", w: 1892, h: 1246, alt: "A 'Deploying' loading pill with an animated little icon" },
];

const SPEED = 40; // px per second
const GAP = 20;

function Strip({ h, copy }: { h: number; copy?: boolean }) {
  return (
    <div className="flex shrink-0" style={{ gap: GAP, paddingRight: GAP }} aria-hidden={copy || undefined}>
      {CLIPS.map((c) => {
        return (
          <div
            key={c.name}
            className="shrink-0 rounded-[18px] bg-bg p-1.5 shadow-[0_18px_40px_-24px_rgba(60,40,20,0.35)] ring-1 ring-line"
            style={{ width: Math.round(((h - 12) * c.w) / c.h) + 12 }}
          >
            <div className="overflow-hidden rounded-[13px]">
              <LazyVideo src={`${A}/${c.name}.mp4`} poster={`${A}/${c.name}-poster.jpg`} width={c.w} height={c.h} label={copy ? "" : c.alt} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function VideoCarousel() {
  // cards are 340px tall on desktop and 250px on phones
  const [height, setHeight] = useState(340);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 719px)");
    const set = () => setHeight(mq.matches ? 250 : 340);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const still = useReducedMotion();
  const x = useMotionValue(0);
  const track = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (still || !track.current) return;
    const half = track.current.scrollWidth / 2; // one full set of clips
    let next = x.get() - (SPEED * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  return (
    <div
      role="region"
      aria-label="Interaction videos"
      className={`relative -mx-6 block pt-6 pb-24 md:pb-32 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:mx-[calc(50%-50vw)] ${still ? "overflow-x-auto" : "overflow-hidden"}`}
    >
      <motion.div ref={track} className="flex w-max" style={{ x }}>
        <Strip h={height} />
        <Strip h={height} copy />
      </motion.div>
    </div>
  );
}
