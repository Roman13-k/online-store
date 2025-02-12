const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        first: ["Rubik", "sans-serif"],
        second: ["Montserrat", "sans-serif"],
        third: ["IBM Plex Sans", "sans-serif"],
      },
      colors: {
        black: "#121212",
        grey: {
          DEFAULT: "#f5f5f7",
          f5f7: "#e1e1e1",
          e9: "#e9e9e9",
          "e9-70": "rgba(233, 233, 233, 0.7)",
          d9: "#d9d9d9",
          "promo2-bkgd": "#dddcd7",
          price: "#939394",
        },
        white: "#ffffff",
        yellow: "#ffc806",
        colar: "#f8dbd4",
        orange: {
          main: "#f35935",
          secondary: "#d43814",
          tertiary: "#ffc2b4",
        },
        red: "#f90707",
        blue: "#105caa",
        "light-green": "#a9e1c0",
      },
      boxShadow: {
        normal: "0 2px 4px 0 rgba(18, 18, 18, 0.25)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
