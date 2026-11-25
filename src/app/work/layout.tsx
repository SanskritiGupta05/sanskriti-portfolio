import { ImageZoom } from "@/components/casestudy/ImageZoom";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ImageZoom />
        </>
    );
}
