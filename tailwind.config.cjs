/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "nm": "var(--nm)",
        "nm-inset": "var(--nm-inset)",
      },
      backgroundColor: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
      },
    },
  },
  plugins: [],
};
