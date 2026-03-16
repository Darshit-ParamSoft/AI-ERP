/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        border: "#1f2937",
        background: "#0b0f1a",
        foreground: "#e5e7eb",
        primary: "#00f5ff",
        secondary: "#7c3aed",
        card: "#111827",
        muted: "#6b7280",
        ring: "#00f5ff",
        input: "#1f2937",
        accent: "#7c3aed",
        popover: "#111827",
      },
    },
  },

  plugins: [],
}