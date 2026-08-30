import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import HashScroll from "@/components/providers/HashScroll";
import Preloader from "@/components/ui/Preloader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const texas = localFont({
  src: [
    { path: "../public/fonts/TexasChickenCondensed-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/TexasChickenCondensed-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/TexasChickenCondensed-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/TexasChickenCondensed-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/TexasChickenCondensed-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../public/fonts/TexasChickenCondensed-Heavy.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-texas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Texas Chicken — Hand-battered. Made fresh. Since 1952.",
  description:
    "Real Texas soul, served in 23 markets. Marinated, hand-breaded and fried fresh in every restaurant since 1952.",
  metadataBase: new URL("https://texaschicken.example"),
  openGraph: {
    title: "Texas Chicken — Bold flavor, worldwide",
    description: "Hand-battered chicken, fried fresh, since 1952.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={texas.variable}>
      <body suppressHydrationWarning>
        <Preloader />
        <ScrollProgress />
        <SmoothScroll>
          <HashScroll />
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
