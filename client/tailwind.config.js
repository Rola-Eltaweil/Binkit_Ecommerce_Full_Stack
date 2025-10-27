/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#ffc929",
        "primary-200": "#ffbf00",
        "secondary-100": "#00b050",
        "secondary-200": "#0b1a78",
      },
    },
  },
  plugins: [],
};
