/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Dashboard ke exact custom neon colors ko core state me inject kiya hai
      colors: {
        portalDark: '#020b14',
        accentCyan: '#00d2ff',
        accentGreen: '#00ff88',
        accentPurple: '#9d4edd',
        accentOrange: '#ff9f1c',
        accentBlue: '#0077b6',
      },
      // border-t-4 aur custom rules ko scanning safety dene ke liye configuration
      borderWidth: {
        '3': '3px',
        '4': '4px',
      }
    },
  },
  plugins: [],
}