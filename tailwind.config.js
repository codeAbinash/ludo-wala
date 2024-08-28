/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#153D4B',
        accent: '#F2A365',
        border: '#5D9FAD',
        bb: '#E3E882',
        b1: '#F9E920',
        b2: '#FBBF35',
        g1: '#123745',
        g2: '#317383',
        greenDefault: '#14FF00',
      },
    },
  },
  plugins: [],
}
