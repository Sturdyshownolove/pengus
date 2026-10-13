/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B5FEF',
          50: '#EEF0FF',
          100: '#DCDFFF',
          500: '#5B5FEF',
          600: '#4B4FE0',
          700: '#3A3DC0'
        },
        secondary: '#6CCBFF',
        success: '#34C759',
        warning: '#FFB020'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      }
    },
  },
  plugins: [],
}
