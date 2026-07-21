/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#06182d', 900: '#0B2545', 800: '#12345b', 700: '#19456f' },
        gold: { 300: '#f0cf7a', 400: '#ddb65a', 500: '#c9972f' },
        ivory: '#f7f4ed',
        ink: '#182330',
        teal: '#2aa9a1'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: { lift: '0 20px 50px -28px rgba(6,24,45,.5)' },
      backgroundImage: {
        circuit: "linear-gradient(rgba(221,182,90,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(221,182,90,.08) 1px,transparent 1px)"
      }
    }
  },
  plugins: []
};
