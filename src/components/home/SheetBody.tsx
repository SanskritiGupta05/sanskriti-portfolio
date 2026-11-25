import type { ReactNode } from "react";

export function SheetBody({
    className = "",
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={`mx-auto w-full max-w-[874px] px-6${className && ` ${className}`}`}>
            {children}
        </div>
    );
}
