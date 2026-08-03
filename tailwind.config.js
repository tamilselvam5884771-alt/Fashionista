/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      colors: {
        'royal-purple': '#5B2C91',
        'champagne-gold': '#D4AF37',
        lavender: '#E6E0F8',
        'rose-gold': '#B76E79',
        'soft-grey': '#F5F5F7',
      },
    },
  },
  plugins: [],
}
