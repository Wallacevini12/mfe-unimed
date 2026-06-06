/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        unimed: {
          green:  '#00843D',
          teal:   '#00A878',
          dark:   '#005C2B',
          light:  '#E8F5EE',
          accent: '#F0A500',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
