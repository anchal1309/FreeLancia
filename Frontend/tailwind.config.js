/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pumice: '#d3d5d4',
        gunsmoke: '#818484',
        oxley: '#6fa28b',
        codgray: '#1b1b1b',
      },
      backgroundColor: {
        light: '#d3d5d4',
        dark: '#1b1b1b',
      },
      textColor: {
        light: '#818484',
        dark: '#d3d5d4',
      },
      borderColor: {
        light: '#1b1b1b',
        dark: '#818484',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}