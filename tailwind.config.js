/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#06182d', 900: '#0B2545', 800: '#12345b', 700: '#19456f' },
        gold: {
          300: 'rgb(var(--c-gold-300) / <alpha-value>)',
          400: 'rgb(var(--c-gold-400) / <alpha-value>)',
          500: 'rgb(var(--c-gold-500) / <alpha-value>)'
        },
        slate: { 600: '#334155' },
        ivory: '#ffffff',
        ink: '#182330',
        teal: '#2aa9a1'
      },
      fontFamily: {
        display: ['"Jost"', '-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        sans: ['"Atkinson Hyperlegible"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: { lift: '0 20px 50px -28px rgba(6,24,45,.5)' },
      backgroundImage: {
        circuit: "linear-gradient(rgba(221,182,90,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(221,182,90,.08) 1px,transparent 1px)"
      }
    }
  },
  plugins: []
};