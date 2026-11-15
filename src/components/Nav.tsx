import Image from "next/image";
import Link from "next/link";
import { Clock } from "./Clock";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Playground", href: "#playground" },
];

export function Nav() {
  return (
    <header className="flex items-center gap-7 py-8">
      <Link href="/" className="group flex items-center gap-2.5 font-serif text-lg text-head">
        <Image src="/assets/stamp-s.png" alt="" width={30} height={32} className="-rotate-6 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110" priority />
        Sanskriti
      </Link>
      <nav className="flex gap-6">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="label !text-ink underline-offset-4 hover:underline">{l.label}</a>
        ))}
      </nav>
      <span className="label ml-auto">India · <Clock /></span>
    </header>
  );
}
