module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/index.css",
  ],
  theme: {
    extend: {
      screens: {
        'mb': { 'max': '450px' }, // 모바일 버전 400px 이하
      }
    },
  },
  plugins: [],
}