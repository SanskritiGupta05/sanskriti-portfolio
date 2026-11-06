import type { Metadata, Viewport } from "next";
import { DM_Mono, Inter, Klee_One, Shippori_Mincho, Yuji_Boku, Zen_Kaku_Gothic_New } from "next/font/google";
import { WASHI } from "@/lib/draw";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const mincho = Shippori_Mincho({ weight: ["500", "700"], subsets: ["latin"], variable: "--f-min", preload: false, display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--f-sans", display: "swap" });
const mono = DM_Mono({ weight: ["400"], subsets: ["latin"], variable: "--f-mono", display: "swap" });
const brush = Yuji_Boku({ weight: "400", subsets: ["latin"], variable: "--f-brush", preload: false, display: "swap" });
const hand = Klee_One({ weight: "400", subsets: ["latin"], variable: "--f-hand", preload: false, display: "swap" });
const kaku = Zen_Kaku_Gothic_New({ weight: ["500", "700"], subsets: ["latin"], variable: "--f-kaku", preload: false, display: "swap" });

export const metadata: Metadata = {
  title: "Sanskriti — product designer",
  description: "Product designer with a visual designer’s eye and a UX thinker’s habits. Japanese-inspired, vibe-coded portfolio.",
};

export const viewport: Viewport = {
  themeColor: [{ color: "#F7F7F7" }],
};

// Runs before paint so the lantern's last choice never flashes the wrong theme.
const themeScript = `try{var t=localStorage.getItem('kyo-theme');document.documentElement.dataset.theme=t==='night'?'night':'day'}catch(e){document.documentElement.dataset.theme='day'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="day" suppressHydrationWarning className={[mincho.variable, inter.variable, mono.variable, brush.variable, hand.variable, kaku.variable].join(" ")}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body style={{ ["--washi" as string]: WASHI }}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
