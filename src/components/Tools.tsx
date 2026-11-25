import Image from "next/image";

export type ToolId =
    "figma" | "claude" | "chatgpt" | "cursor" | "xcode" | "photoshop" | "illustrator";

export const TOOLS: Record<
    ToolId,
    { name: string; logo: string; w: number; h: number; invertDark?: boolean }
> = {
    figma: { name: "Figma", logo: "/assets/tools/figma.svg", w: 200, h: 300 },
    claude: { name: "Claude", logo: "/assets/tools/claude.svg", w: 24, h: 24 },
    chatgpt: { name: "ChatGPT", logo: "/assets/tools/chatgpt.svg", w: 24, h: 24, invertDark: true },
    cursor: { name: "Cursor", logo: "/assets/tools/cursor.svg", w: 24, h: 24 },
    xcode: { name: "Xcode", logo: "/assets/tools/xcode-tile.svg", w: 40, h: 40 },
    photoshop: { name: "Adobe Photoshop", logo: "/assets/tools/photoshop.svg", w: 240, h: 234 },
    illustrator: {
        name: "Adobe Illustrator",
        logo: "/assets/tools/illustrator.svg",
        w: 240,
        h: 234,
    },
};

function Logo({ id, className }: { id: ToolId; className: string }) {
    const t = TOOLS[id];
    return (
        <Image
            src={t.logo}
            alt=""
            width={t.w}
            height={t.h}
            unoptimized
            className={`${className} ${t.invertDark ? "dark:invert" : ""}`}
        />
    );
}

export function ToolRow({ tools, label = "Tools I used" }: { tools: ToolId[]; label?: string }) {
    return (
        <div>
            <span className="label">{label}</span>
            <ul className="mt-3 flex flex-wrap gap-3">
                {tools.map((id) => (
                    <li
                        key={id}
                        className="skeu flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5"
                    >
                        <Logo id={id} className="h-6 w-auto" />
                        <span className="text-sm text-head">{TOOLS[id].name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function ToolIcons({ tools }: { tools: ToolId[] }) {
    return (
        <span
            className="flex items-center gap-1.5"
            aria-label={`Made with ${tools.map((id) => TOOLS[id].name).join(", ")}`}
        >
            {tools.map((id) => (
                <span
                    key={id}
                    title={TOOLS[id].name}
                    className="skeu grid size-8 place-items-center rounded-lg"
                >
                    <Logo id={id} className="h-4 w-auto" />
                </span>
            ))}
        </span>
    );
}
