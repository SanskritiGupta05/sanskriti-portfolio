import Image from "next/image";
import type { ReactNode } from "react";

const RED = "#c8553b";

export function FeatureTestimonial({
    pull,
    children,
    name,
    role,
    photo,
    logo,
}: {
    pull: ReactNode;
    children: ReactNode;
    name: string;
    role: string;
    photo: string;
    logo: { src: string; w: number; h: number; alt: string };
}) {
    return (
        <figure
            className="relative m-0 grid gap-x-10 gap-y-6 rounded-3xl p-6 sm:p-10 md:grid-cols-[1fr_230px] dark:bg-none dark:bg-surface"
            style={{
                background: "linear-gradient(180deg, #fffdfb 0%, #fdf6f2 100%)",
                boxShadow:
                    "inset 0 1px 0 #fff, 0 0 0 1px rgba(200,85,59,0.1), 0 20px 40px -28px rgba(120,60,40,0.35)",
            }}
        >
            <div className="grid content-start gap-5">
                <span
                    aria-hidden="true"
                    className="block h-8 font-serif text-[72px] leading-[0.85]"
                    style={{ color: RED }}
                >
                    &ldquo;
                </span>
                <blockquote className="m-0">
                    <p className="max-w-[24ch] font-serif text-[26px] leading-[1.25] text-balance text-head sm:text-[32px]">
                        {pull}
                    </p>
                </blockquote>
                <p className="printed m-0 max-w-[62ch] text-[14px] leading-[1.75] text-ink">
                    {children}
                </p>
            </div>
            <figcaption className="skeu grid content-start gap-3 self-start rounded-2xl p-4 md:mt-12">
                <span className="flex items-center gap-3">
                    <Image
                        src={photo}
                        alt={name}
                        width={320}
                        height={320}
                        unoptimized
                        className="size-12 rounded-full object-cover ring-2 ring-white shadow-[0_4px_10px_-4px_rgba(60,40,20,0.4)]"
                    />
                    <span className="grid">
                        <span className="font-serif text-lg leading-tight text-head">{name}</span>
                        <span className="text-[12px] leading-snug text-muted-foreground">
                            {role}
                        </span>
                    </span>
                </span>
                <span className="flex items-center justify-between border-t border-dashed border-line pt-3">
                    <span className="text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                        Worked together
                    </span>
                    <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.w}
                        height={logo.h}
                        unoptimized
                        className="h-7 w-auto"
                    />
                </span>
            </figcaption>
        </figure>
    );
}

export function Benchmark({ children }: { children: ReactNode }) {
    return (
        <div
            className="flex items-start gap-4 rounded-2xl border-l-[3px] bg-[#fff8ec] px-5 py-4 sm:px-6 dark:bg-surface"
            style={{ borderColor: "#e0a43a" }}
        >
            <span
                aria-hidden="true"
                className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#fbe7c2] text-[18px] shadow-[inset_0_1px_0_#fff,0_0_0_1px_rgba(224,164,58,0.35)]"
            >
                ★
            </span>
            <p className="m-0 font-serif text-[20px] leading-[1.4] text-head italic sm:text-[22px]">
                {children}
            </p>
        </div>
    );
}

export function MarkerBand({
    children,
    color = "#f7d27e",
}: {
    children: ReactNode;
    color?: string;
}) {
    return (
        <span
            className="box-decoration-clone px-0.5"
            style={{
                backgroundImage: `linear-gradient(transparent 58%, ${color} 58%, ${color} 92%, transparent 92%)`,
            }}
        >
            {children}
        </span>
    );
}

const PLAY = (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0">
        <path d="M4.5 2.6 13.4 12l-8.9 9.4c-.3-.2-.5-.6-.5-1V3.6c0-.4.2-.8.5-1Z" fill="#00D7FE" />
        <path d="m16.4 9-3 3 3 3 3.4-1.9c1-.6 1-1.6 0-2.2L16.4 9Z" fill="#FFCE00" />
        <path d="M13.4 12 4.5 21.4c.3.2.8.2 1.2 0L16.4 15l-3-3Z" fill="#FF3A44" />
        <path d="M4.5 2.6c.4-.2.8-.2 1.2 0L16.4 9l-3 3-8.9-9.4Z" fill="#00F076" />
    </svg>
);

export function OutcomeCards() {
    const label = "text-[12px] font-semibold tracking-[0.14em] uppercase";
    const tile =
        "rounded-xl bg-[#f8f8f8] px-3 py-2.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] dark:bg-surface";
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <div className="skeu flex flex-col gap-4 rounded-2xl p-[22px]">
                <span className={label} style={{ color: RED }}>
                    Shipped
                </span>
                <dl className="m-0 grid grid-cols-3 gap-2">
                    {[
                        ["4.8★", "rating"],
                        ["1L+", "downloads"],
                        ["3 mo", "to ship"],
                    ].map(([n, l]) => (
                        <div key={l} className={`${tile} grid gap-0.5`}>
                            <dt className="font-serif text-[26px] leading-none text-head">{n}</dt>
                            <dd className="m-0 text-[11px] text-muted-foreground">{l}</dd>
                        </div>
                    ))}
                </dl>
                <a
                    href="https://play.google.com/store/apps/details?id=com.bouncedaily.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 transition-colors hover:bg-[#f8f8f8] dark:hover:bg-surface"
                >
                    {PLAY}
                    <span className="grid leading-tight">
                        <span className="font-serif text-[16px] text-head">
                            Bounce Daily · EV Bike Rental
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                            Live on Google Play
                        </span>
                    </span>
                    <span aria-hidden="true" className="ml-auto text-muted-foreground">
                        ↗
                    </span>
                </a>
            </div>
            <div className="skeu flex flex-col gap-4 rounded-2xl p-[22px]">
                <span className={label} style={{ color: RED }}>
                    After launch
                </span>
                <ul className="m-0 grid list-none gap-2 p-0">
                    {["Rider onboarding", "Plan adoption"].map((x) => (
                        <li key={x} className={`${tile} flex items-center justify-between`}>
                            <span className="font-serif text-[18px] text-head">{x}</span>
                            <span className="rounded-full bg-[#e8f6ec] px-2 py-0.5 text-[11px] font-semibold text-[#14794a]">
                                ↑ improved
                            </span>
                        </li>
                    ))}
                </ul>
                <span className="mt-auto text-[12px] leading-snug text-muted-foreground">
                    The two places the redesign was meant to move. Exact numbers stay with Bounce.
                </span>
            </div>
        </div>
    );
}
