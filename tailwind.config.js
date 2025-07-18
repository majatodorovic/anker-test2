/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_pages/****/***/**/*.{js,ts,jsx,tsx}",
    "./_pages/***/**/*.{js,ts,jsx,tsx}",
    "./_pages/**/*.{js,ts,jsx,tsx}",
    "./_pages/*.{js,ts,jsx,tsx}",
    "./components/****/***/**/*.{js,ts,jsx,tsx}",
    "./components/***/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./_components/**/*.{js,ts,jsx,tsx}",
    "./app/****/***/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1440px",
        "3xl": "1680px",
        "4xl": "1920px",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
      },
      colors: {
        "croonus-1": "#F4F3EF",
        "croonus-2": "#030303",
        "croonus-3": "#eec0ad",
        "croonus-4": "#faf9f8",
        topHeader: "#f7f7f7",
        primary: "#00A7E1",
        secondary: "#EDEDED",
        lightGray: "#F7F8FA",
      },
      aspectRatio: {
        "2/3": "2/3",
      },
      boxShadow: {
        "white-glow-lg": "0px 0px 120px 120px rgba(255, 255, 255, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
