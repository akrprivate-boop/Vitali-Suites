/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./config/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury palette — change these to re-theme the whole site.
        gold: {
          DEFAULT: "#c9a35e",
          light: "#e0c98a",
          dark: "#a8843f",
        },
        ink: {
          DEFAULT: "#0e0f12",
          soft: "#16181d",
          muted: "#23262e",
        },
        cream: "#f6f1e7",
      },
      fontFamily: {
        // Loaded in app/layout.js via next/font
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(0,0,0,0.35)",
        glow: "0 0 0 1px rgba(201,163,94,0.25), 0 20px 60px -20px rgba(201,163,94,0.35)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg,#e0c98a 0%,#c9a35e 50%,#a8843f 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
