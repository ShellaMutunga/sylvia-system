/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'farm-dark': '#0f172a',
        'farm-gold': '#fbbf24',
      }
    },
  },
  plugins: [],
}