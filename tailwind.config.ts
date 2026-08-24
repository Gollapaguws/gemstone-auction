import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FFF9E6",
          100: "#FFF0BF",
          200: "#FFE080",
          300: "#FFD040",
          400: "#F5C518",
          500: "#C9A84C",
          600: "#A8893D",
          700: "#876B2F",
          800: "#664E21",
          900: "#453214",
        },
        amber: {
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#D4A843",
          600: "#B8923A",
          700: "#9C7D31",
          800: "#806828",
          900: "#64531F",
        },
        earth: {
          50: "#F5F0EB",
          100: "#E6D9CC",
          200: "#CCBFA3",
          300: "#B3A57A",
          400: "#998C52",
          500: "#5C4033",
          600: "#4D3529",
          700: "#3E2A20",
          800: "#2F2017",
          900: "#20150E",
        },
        cream: {
          50: "#FEFDFB",
          100: "#FAF8F5",
          200: "#F5F0EB",
          300: "#EDE5DB",
          400: "#E0D5C7",
          500: "#D3C5B3",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #C9A84C 0%, #D4A843 50%, #F5C518 100%)",
        "gradient-dark": "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)",
        "gradient-earth": "linear-gradient(135deg, #5C4033 0%, #3E2A20 100%)",
      },
      animation: {
        "countdown-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
