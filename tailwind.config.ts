import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Sora", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", ""],
    },
    extend: {
      colors: {
        brand: {
          50: "#F4F1FF",
          100: "#E7DFFF",
          500: "#5B35D5",
          600: "#4B2FC3",
          700: "#2B0A7B",
          800: "#1C0752"
        },
        ink: "#111827",
        muted: "#6B7280",
        line: "#E5E7EB",
        bg: "#F6F7FB"
      },
      boxShadow: {
        card: "0 10px 25px rgba(17, 24, 39, 0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
} satisfies Config;
