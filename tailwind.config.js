module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        twitter: "#1da1f2",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
