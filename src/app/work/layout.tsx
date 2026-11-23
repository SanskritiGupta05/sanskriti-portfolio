import { ImageZoom } from "@/components/casestudy/ImageZoom";

// Every /work/* page: tap a case study image to see it up close (see ImageZoom).
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ImageZoom />
    </>
  );
}
