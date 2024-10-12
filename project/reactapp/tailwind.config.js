/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'phone': '481px',
      // phone screen
      'tablet': '640px',
      // =>tablet screen @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => laptop screen @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => desktop @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}