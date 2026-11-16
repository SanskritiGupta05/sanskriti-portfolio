"use client";

import { useEffect, useRef } from "react";
import { mountFujiScene } from "../../assets/scene/fuji-scene.js";
import { useTheme } from "./ThemeProvider";

type Scene = { setNight: (on: boolean, instant?: boolean) => void; destroy: () => void };

// The interactive pixel Fuji scene. It follows the site theme: night when the lantern is lit.
// Its edges melt into the page (transparent top, soft sides and bottom).
export function FujiScene({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene | null>(null);
  const { night } = useTheme();

  useEffect(() => {
    if (!canvas.current) return;
    scene.current = mountFujiScene(canvas.current, { night });
    return () => scene.current?.destroy();
    // mount once; night changes are handled below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { scene.current?.setNight(night); }, [night]);

  return (
    <canvas
      ref={canvas}
      aria-label="Pixel illustration of Mount Fuji with a lake, cherry trees, a torii gate, a temple and a pagoda. Click things to play."
      className={`block aspect-[440/170] h-auto w-full [image-rendering:pixelated] [filter:saturate(1.2)_brightness(1.05)] [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_34%,#000_94%,transparent_100%),linear-gradient(to_right,transparent_0%,#000_7%,#000_93%,transparent_100%)] ${className}`}
    />
  );
}
