/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.js", "./*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#C7B6D7",
          200: "#AD96C7",
          300: "#9365B7",
          400: "#7944A6",
          500: "#5E2396",
          600: "#4C1B78",
          700: "#3A1459",
          800: "#280C3B",
          900: "#16061C",
        },
        brand:'#3A1459',
        secondary: {
          100: "#AFA7B1",
          200: "#998C9C",
          300: "#837187",
          400: "#6D566D",
          500: "#574D58",
          600: "#474143",
          700: "#37302E",
          800: "#26211A",
          900: "#16150F",
        },
        tertiary: {
          100: "#E0C1C6",
          200: "#D2A2A9",
          300: "#C4838C",
          400: "#B7646F",
          500: "#A94552",
          600: "#91373E",
          700: "#762B30",
          800: "#5C1F24",
          900: "#411318",
        },
        red: "#E43C4C",
        green: "#198745",
      },
      fontFamily: {
        Poppins: ["Poppins"],
        Inter: ["Inter"]
      }
    },
  },
  plugins: [],
}

