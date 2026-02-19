/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          950: "rgb(7 10 14)",
          900: "rgb(10 14 20)",
          800: "rgb(15 20 30)",
        },
        glass: {
          1: "rgba(255,255,255,0.06)",
          2: "rgba(255,255,255,0.09)",
          border: "rgba(255,255,255,0.10)",
        },
        accent: {
          DEFAULT: "rgb(72 255 190)",
          soft: "rgba(72,255,190,0.12)",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(72,255,190,0.18), 0 20px 60px rgba(0,0,0,0.55)",
        soft: "0 20px 60px rgba(0,0,0,0.55)",
      },
      backdropBlur: {
        glass: "14px",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-40%)" },
          "100%": { transform: "translateX(140%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.35s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
