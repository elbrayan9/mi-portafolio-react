/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-color": "#1a1a1a",
        "terminal-bg": "#0d0d0d",
        "text-color": "#e0e0e0",
        "primary-color": "#33FF33",
        "secondary-color": "#888",
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          scaleIn: {
            "0%": { transform: "scale(0.9)", opacity: "0" },
            "100%": { transform: "scale(1)", opacity: "1" },
          },
        },
        animation: {
          fadeIn: "fadeIn 0.2s ease-out",
          scaleIn: "scaleIn 0.3s ease-out",
        },
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
