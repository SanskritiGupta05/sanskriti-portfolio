import { FujiScene } from "./FujiScene";
import { SoundToggle } from "./SoundToggle";

export function Footer() {
  return (
    <footer className="pt-24 pb-12">
      <FujiScene />
      <div className="mt-10 grid gap-6">
        <h2 className="font-serif text-h2m text-head md:text-h2">
          Hire me, so I can fund my dream <span className="font-worn">Japan trip</span>.
        </h2>
        <p className="printed max-w-[52ch]">
          Click around the scene: the temple bell, the torii bell, the cherry trees, the birds and the lake all do something. Pull the lantern for night.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 transition-colors duration-700">
          <a href="#work" className="label !text-ink underline-offset-4 hover:underline">Work</a>
          <a href="#about" className="label !text-ink underline-offset-4 hover:underline">About</a>
          <a href="#playground" className="label !text-ink underline-offset-4 hover:underline">Playground</a>
          <SoundToggle />
          <span className="label ml-auto">Set in Redaction &amp; Courier New · © 2026 Sanskriti</span>
        </div>
      </div>
    </footer>
  );
}
