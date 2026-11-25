import Image from "next/image";

const ILL = "/assets/cases/bounce/v5/ill";
const RED = "#c8553b";

const ILLS: Record<string, { w: number; h: number; name: string }> = {
    "not-in-city": { w: 606, h: 662, name: "Not in your city" },
    "sold-out": { w: 600, h: 491, name: "Hub sold out" },
    charging: { w: 937, h: 547, name: "Battery stations" },
    rider: { w: 668, h: 549, name: "Riding" },
    hub: { w: 863, h: 526, name: "Your hub" },
    licence: { w: 783, h: 518, name: "Licence approved" },
    "kyc-pending": { w: 745, h: 515, name: "KYC in review" },
    "kyc-approved": { w: 706, h: 488, name: "KYC approved" },
    "kyc-rejected": { w: 740, h: 512, name: "KYC not approved" },
    loyalty: { w: 1080, h: 789, name: "Loyalty" },
};

function Ill({ k, className = "" }: { k: string; className?: string }) {
    const i = ILLS[k];
    return (
        <Image
            src={`${ILL}/${k}.webp`}
            alt={i.name}
            width={i.w}
            height={i.h}
            unoptimized
            className={`h-auto object-contain ${className}`}
        />
    );
}

const SMALL = [
    "sold-out",
    "charging",
    "rider",
    "hub",
    "licence",
    "kyc-pending",
    "kyc-approved",
    "kyc-rejected",
];

export function UiBento() {
    const tile = "skeu grid min-h-0 grid-rows-[1fr_auto] gap-2 overflow-hidden rounded-2xl p-3.5";
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:grid-rows-[160px_160px_160px]">
            <div
                className={`${tile} col-span-2 sm:col-span-3 lg:col-span-1 lg:row-span-3`}
                style={{ background: "linear-gradient(180deg,#fff,#fdf5f2)" }}
            >
                <div className="grid min-h-0 place-items-center">
                    <Ill k="not-in-city" className="max-h-[260px] w-auto" />
                </div>
                <div>
                    <p className="font-serif text-[19px] leading-tight text-head">
                        Every state gets a picture
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
                        So riders who read little still know what happened.
                    </p>
                </div>
            </div>
            {SMALL.map((k) => (
                <div key={k} className={tile}>
                    <div className="grid min-h-0 place-items-center">
                        <Ill k={k} className="max-h-[96px] w-auto max-w-full" />
                    </div>
                    <span className="text-[11.5px] font-semibold text-head">{ILLS[k].name}</span>
                </div>
            ))}
            <div className={`${tile} col-span-2 sm:col-span-3 lg:col-span-1`}>
                <div className="grid min-h-0 place-items-center overflow-hidden rounded-xl">
                    <Ill k="loyalty" className="max-h-[96px] w-auto max-w-full" />
                </div>
                <span className="text-[11.5px] font-semibold text-head">Loyalty tiers</span>
            </div>
        </div>
    );
}

export function TakeStatements({ items }: { items: { a: string; key: string; b: string }[] }) {
    return (
        <ol className="m-0 list-none p-0">
            {items.map(({ a, key, b }, i) => {
                const at = a.indexOf(key);
                return (
                    <li
                        key={a}
                        className="grid gap-2 border-t border-line py-6 md:grid-cols-[44px_1.25fr_1fr] md:gap-6"
                    >
                        <span
                            className="grid size-8 place-items-center rounded-full text-[12px] font-semibold text-white"
                            style={{ background: RED }}
                        >
                            {i + 1}
                        </span>
                        <span className="font-serif text-[22px] leading-[1.25] text-head md:text-[24px]">
                            {at >= 0 ? (
                                <>
                                    {a.slice(0, at)}
                                    <span style={{ color: RED }}>{key}</span>
                                    {a.slice(at + key.length)}
                                </>
                            ) : (
                                a
                            )}
                        </span>
                        <span className="printed text-[13.5px] leading-relaxed text-muted-foreground md:pt-1.5">
                            {b}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
}
