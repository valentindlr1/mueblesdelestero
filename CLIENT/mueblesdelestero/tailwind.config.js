/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
      "./src/components/**/*.{js,jsx,ts,tsx}",
      "./src/components/Admin/**/*.{js,jsx,ts,tsx}",
      "./src/App.jsx",
      "./src/main.jsx"
  ],
  theme: {
      extend: {},
      fontFamily: {
          Roboto: ["Roboto", "sans-serif"],
          Lilita: ["Lilita One", "cursive"],
          MyFont: ['"My Font"', "serif"],
      },
      backgroundImage: {},
      colors: {
          transparent: "transparent",
          current: "currentColor",
          white: "#ffffff",
          green: "#22c55e",
          gray: "#27272a",
          silver: "#e5e5e5",
          silverGray: "rgb(75 85 99)",
          red: "#e11d48",
      },
  },
  plugins: [
      require("tailwindcss"),
      require("autoprefixer"),
      require("postcss-nesting"),
  ],
};

