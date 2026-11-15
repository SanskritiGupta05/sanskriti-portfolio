"use client";

import { useState } from "react";
import { setAmbient } from "../../assets/scene/scene-audio.js";

// Ambient sound: a breeze with birdsong by day, crickets by night. Off until the visitor turns it on.
export function SoundToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => { setAmbient(!on); setOn(!on); }}
      className="label cursor-pointer !text-ink underline-offset-4 hover:underline"
    >
      Sound {on ? "on" : "off"}
    </button>
  );
}
