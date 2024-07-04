/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        default: '"Montserrat", sans-serif',
      },
    },
  },
  daisyui: {
    themes: ["fantasy", "black"],
  },
  darkMode: ["class", '[data-theme="black"]'],
  plugins: [require("daisyui")],
};
