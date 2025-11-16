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
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
