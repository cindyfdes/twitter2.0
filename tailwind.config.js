module.exports = {
  content: ["./pages/*.{html,js,tsx}", "./components/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        twitter: "#1da1f2",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
