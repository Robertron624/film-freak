/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': 'rgb(7, 15, 43)',
        'purple': 'rgb(27, 26, 85)',
        'light-purple': 'rgb(83, 92, 145)',
        'lighter-purple': 'rgb(146, 144, 195)', 
        'accent': 'rgb(216, 165, 87)',
      }
    },
  },
  plugins: [],
}

