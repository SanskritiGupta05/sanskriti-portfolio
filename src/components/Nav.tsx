import Image from "next/image";
import Link from "next/link";
import { VisitorCount } from "./VisitorCount";

const link = "label !text-ink underline-offset-4 hover:underline";

// Work · About · [stamp] · Playground · 👁 visitors, all centred, with the stamp logo in the middle.
export function Nav() {
  return (
    <header className="py-8">
      {/* three columns so the stamp sits exactly in the middle, whatever the widths either side */}
      <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-10">
        <div className="flex items-center justify-end gap-8">
          <a href="#work" className={link}>Work</a>
          <a href="#about" className={link}>About</a>
        </div>
        <Link href="/" aria-label="Sanskriti, home" className="group">
          <Image src="/assets/stamp-s.png" alt="" width={34} height={36} className="-rotate-6 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110" priority />
        </Link>
        <div className="flex items-center justify-start gap-8">
          <a href="#playground" className={link}>Playground</a>
          <VisitorCount />
        </div>
      </nav>
    </header>
  );
}
