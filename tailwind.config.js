/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // light mode colors
        "accent-light": "#1fb6ff",
        "primary-light": "#1fb6ff",
        "secondary-light": "#1fb6ff",
        // dark mode colors
        "accent-dark": "#1fb6ff",
        "primary-dark": "#ffffff",
        "secondary-dark": "#fafafa",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      lineHeight: {
        base: "1.4",
      },
      boxShadow: {
        "elevation-1": "rgb(0 0 0 / 8%) 0px 4px 16px",
        "elevation-2": "rgb(0 0 0 / 14%) 0px 4px 16px",
        rounded: "1px 1px 16px rgba(0, 0, 0, .1)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
