import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#20171E",
        muted: "#52616A",
        linen: "#FAF7FB",
        lilac: {
          50: "#F8F3FA",
          100: "#EEE3F1",
          300: "#D4BADB",
          400: "#B795C1",
          600: "#80598E",
          700: "#5B356B",
          900: "#321B3B"
        },
        aqua: {
          50: "#EFFAF9",
          100: "#D7F1EE",
          400: "#60BFB6",
          700: "#2F7771",
          800: "#245F5B"
        }
      },
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Barlow Condensed", "Arial Narrow", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(50, 27, 59, 0.10)",
        card: "0 12px 36px rgba(50, 27, 59, 0.08)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    },
  },
  plugins: [],
};

export default config;
