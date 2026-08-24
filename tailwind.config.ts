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
          50: "#FFFDE7",
          100: "#FFF9C4",
          200: "#FFF59D",
          300: "#FFF176",
          400: "#EDED3B",
          500: "#EDED3B",
          600: "#D4D435",
          700: "#BABA2F",
          800: "#A0A029",
          900: "#868623",
        },
        dark: {
          50: "#4A4A4A",
          100: "#3A3A3A",
          200: "#2B2C30",
          300: "#262729",
          400: "#1E1F22",
          500: "#1A1A1A",
          600: "#141618",
          700: "#0E0F11",
          800: "#0A0A0B",
          900: "#050505",
        },
        cream: {
          50: "#FFFFFF",
          100: "#F7F7F7",
          200: "#F0F0F0",
          300: "#E8E8E8",
          400: "#E0E0E0",
          500: "#D8D8D8",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Hind", "sans-serif"],
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #EDED3B 0%, #D4D435 50%, #BABA2F 100%)",
        "gradient-dark": "linear-gradient(135deg, #2B2C30 0%, #262729 100%)",
        "gradient-earth": "linear-gradient(135deg, #2B2C30 0%, #3A3A3A 100%)",
      },
      animation: {
        "countdown-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
