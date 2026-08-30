import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Texas Chicken brand — single source of truth
        cream: {
          DEFAULT: "#faf6ef",
          200: "#f3ede1",
          300: "#e8dfcc",
        },
        paper: "#fffdf7",
        ink: {
          DEFAULT: "#2d2a26",
          800: "#3d3934",
          600: "#5a544c",
          400: "#8a8278",
        },
        tex: {
          yellow: "#f5b51e",
          yellow600: "#e0a30c",
          red: "#9a3324",
          red700: "#7a2719",
          red300: "#c4604f",
          orange: "#e15f02",
        },
        // Reference-site brand tokens (header / footer / app page parity)
        primary: {
          DEFAULT: "#B12028",
          700: "#8f1a20",
        },
        secondary: {
          DEFAULT: "#F4B118",
          700: "#d1b76c",
        },
        third: {
          DEFAULT: "#2d2926",
        },
      },
      fontFamily: {
        display: ['var(--font-texas)', "Oswald", "Arial Narrow", "sans-serif"],
        body: ['var(--font-texas)', "system-ui", "sans-serif"],
        texas: ['var(--font-texas)', "Oswald", "Arial Narrow", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.02em",
        caps: "0.08em",
      },
      lineHeight: {
        tight92: "0.92",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        inout: "cubic-bezier(0.65, 0, 0.35, 1)",
        pop: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      boxShadow: {
        pop: "0 16px 48px rgba(154, 51, 36, 0.18), 0 4px 12px rgba(45,42,38,0.10)",
        soft3: "0 10px 30px rgba(45,42,38,0.14), 0 2px 6px rgba(45,42,38,0.08)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
