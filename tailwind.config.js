import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter var", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      ...defaultTheme.screens,
      "3xl": "1920px",
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animation-delay"),
  ],
}
