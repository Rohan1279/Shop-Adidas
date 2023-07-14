/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        nm: "var(--nm)",
        "nm-inset": "var(--nm-inset)",
      },
      backgroundColor: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shake: {
          "0%": { transform: "translate(1px, 1px) " },
          "10%": { transform: "translate(-1px, -1px) " },
          "20%": { transform: "translate(-1px, 0px) " },
          "30%": { transform: "translate(1px, 1px) " },
          "40%": { transform: "translate(1px, -1px) " },
          "50%": { transform: "translate(-1px, 1px) " },
          "60%": { transform: "translate(-1px, 1px) " },
          "70%": { transform: "translate(1px, 1px) " },
          "80%": { transform: "translate(-1px, -1px) " },
          "90%": { transform: "translate(1px, 1px) " },
          "100%": { transform: "translate(1px, -1px)" },
        },
        fadeOutTop: {
          "0%": {
            // -webkit-transform: translateY(0);
            transform: "translateY(0)",
            opacity: 1,
          },
          "100%": {
            // -webkit-transform: translateY(-50px);
            transform: "translateY(-50px)",
            opacity: 0,
            visibility: "hidden"
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out ",
        shake: "shake .5s ease-in-out ",
        fadeOutTop: "fadeOutTop 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
