/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        'primarycolor' : '#4682B4',
        'dark-1' : '#222222',
        'gray-1': '#6a6a6a'
      },
      boxShadow: {
        'top-shadow': 'rgba(0, 0, 0, 0.2) 0px -3px 4px 0px',
      },

    },
  },
  plugins: [],
}