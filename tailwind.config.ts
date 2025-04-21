/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-Poppins)'],
        josefin: ['var(--font-Josefin)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // add others if needed
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        '1800px': '1800px',
        '1600px': '1600px',
        '1400px': '1400px',
        '1300px': '1300px',
        '1200px': '1200px',
        '800px': '800px',
        '400px': '400px',
      },
    },
  },
  plugins: [],
};


