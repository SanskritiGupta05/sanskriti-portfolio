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
          <Link href="/work" className={link}>Work</Link>
          <Link href="/about" className={link}>About</Link>
        </div>
        <Link href="/" aria-label="Sanskriti, home" className="group">
          {/* a pre-sharpened copy at 4× its shown size, served as-is (Next's resizing made it soft) */}
          <Image src="/assets/stamp-s-nav.png" alt="" width={36} height={39} unoptimized className="-rotate-6 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110" priority />
        </Link>
        <div className="flex items-center justify-start gap-8">
          <Link href="/playground" className={link}>Playground</Link>
          <VisitorCount />
        </div>
      </nav>
    </header>
  );
}
