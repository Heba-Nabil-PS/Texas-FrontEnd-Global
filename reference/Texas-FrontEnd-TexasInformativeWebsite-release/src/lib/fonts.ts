import localFont from "next/font/local";
import { Cairo } from "next/font/google";

export const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const mainFont = localFont({
  src: [
    {
      path: "../assets/fonts/TexasChickenCondensed-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/TexasChickenCondensed-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/TexasChickenCondensed-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/TexasChickenCondensed-Heavy.woff",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-texas",
});
