/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      kanit: ["Kanit, sans-serif"],
    },
  },
  plugins: [({ addVariant }) => {
    addVariant("starting", "@starting-style");
  }],
};
