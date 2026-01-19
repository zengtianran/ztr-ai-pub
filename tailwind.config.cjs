/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3186FF',
        'gradient-start': '#D6F7FF',
        'gradient-end': '#D4E7FB',
      }
    },
  },
  plugins: [],
}
