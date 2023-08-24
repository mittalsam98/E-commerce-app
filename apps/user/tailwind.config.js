/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    minHeight: {
      screenSize: 'calc(100vh - 77px)',
      mobileScreenSize: 'calc(100vh - 102px)'
    },
    extend: {
      colors: {
        darkMode2: '#121212',
        darkMode: 'rgb(17 24 39)',
        darkMode3: '#19181F',
        primaryPurple: '#BB86FC',
        primary: '#8B5CF6',
        primaryLight: '#eee7fe',
        secondaryTeal: '#03DAC5',
        lightColor: '#E2E8F0',
        darkGray: '#2D3748',
        white: '#fff',
        black: '#000',
        danger: '#F44336'
      }
    }
  },
  darkMode: 'class',
  plugins: []
};
