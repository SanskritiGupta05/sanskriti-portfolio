import type { Metadata } from "next";
import "@fontsource/redaction";
import "@fontsource/redaction-35";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Lantern } from "@/components/Lantern";

export const metadata: Metadata = {
  title: "Sanskriti",
  description: "Product designer who builds what she designs.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body className="relative min-h-screen">
        {/* the "Printed" ink filter for body text, used by the `printed` utility */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <filter id="ink-printed" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={0.6} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <ThemeProvider>
          <Lantern />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
