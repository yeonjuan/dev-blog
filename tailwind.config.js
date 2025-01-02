/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./website/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        NotoSansKR: ["Noto Sans KR"],
      },
    },
  },
  plugins: [],
}