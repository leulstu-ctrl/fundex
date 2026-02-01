/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fn-bg': '#1a0b2e',
        'fn-purple': '#6b21a8', 
      },
    },
  },
  plugins: [],
}
