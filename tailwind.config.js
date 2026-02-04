/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8D5524',
        'primary-dark': '#6B3F1A',
        'primary-light': '#A66B2E',
        beige: '#F5E9DA',
        'brown-soft': '#E6D4C1',
        'brown-medium': '#B8956F',
        // Colores específicos para las clases personalizadas
        '8D5524': '#8D5524',
        '6B3F1A': '#6B3F1A'
      }
    },
  },
  plugins: [],
}
