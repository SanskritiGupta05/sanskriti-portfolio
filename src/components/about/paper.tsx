import { Nothing_You_Could_Do } from "next/font/google";
import Image, { type StaticImageData } from "next/image";

export const hand = Nothing_You_Could_Do({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export const printPhoto =
    "transition duration-500 ease-out grayscale contrast-[1.05] group-hover:grayscale-0";

export function Pin() {
    return (
        <span
            aria-hidden="true"
            className="absolute -top-1.5 left-1/2 z-10 size-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f08a72,#c8553b_55%,#8f3524)] shadow-[0_2px_3px_rgba(60,20,10,0.45)]"
        />
    );
}

export function PinnedPhoto({
    src,
    alt,
    box,
    tilt,
    caption,
    sizes = "(min-width: 768px) 220px, 40vw",
    keepColor = false,
}: {
    src: StaticImageData;
    alt: string;
    box: string;
    tilt: string;
    caption?: string;
    sizes?: string;
    keepColor?: boolean;
}) {
    return (
        <figure
            className={`group ${box} ${tilt} z-[5] bg-white p-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.15),0_10px_18px_-10px_rgba(40,30,20,0.5)] transition duration-500 ease-out hover:z-20 hover:scale-[1.1] hover:rotate-0 md:p-[5px]`}
        >
            <Pin />
            <Image
                src={src}
                alt={alt}
                sizes={sizes}
                placeholder="blur"
                className={`block h-auto w-full ${keepColor ? "" : printPhoto}`}
            />
            {caption && (
                <figcaption
                    className={`${hand.className} px-1 pt-1 text-center text-sm leading-tight text-[#2B2A28] md:text-base`}
                >
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

const HI = {
    yellow: "#ffe27a",
    pink: "#ffc2d1",
    blue: "#b9dcff",
    green: "#c4edb9",
    orange: "#ffcfa6",
    lilac: "#dcd0ff",
} as const;
export function Hi({ c = "yellow", children }: { c?: keyof typeof HI; children: React.ReactNode }) {
    return (
        <mark
            style={{ ["--hi" as string]: HI[c] }}
            className="box-decoration-clone bg-transparent bg-[linear-gradient(transparent_50%,var(--hi)_50%,var(--hi)_92%,transparent_92%)] px-[0.12em] text-inherit dark:bg-[linear-gradient(transparent_50%,color-mix(in_srgb,var(--hi)_35%,transparent)_50%,color-mix(in_srgb,var(--hi)_35%,transparent)_92%,transparent_92%)]"
        >
            {children}
        </mark>
    );
}
