/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueZ: "#2E5BCC",
        blueX: "#336AEA",
        orange: "#FFA500",
        blueGray: "#ADD8E6",
        darkPurple: "#463c58",
        cyan: "#00FFFF",
        darkGray: "#2E2E2E",
        purpleX: "#1D212C",
        deepBlue: "#27355c",
        darkGreen: "#152925",
        plainGreen: "#2E5BCC",
        XGreen: "#219452",
        X2Green: "#626362",
        offWhite: "#fffffe",
        blueBlack: "#11141b",
        colorZ: "#13161d",
      },
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
        ubuntu: ['"Ubuntu Sans"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        disappear: "disappear 0.5s ease-in-out forwards",
      },
      keyframes: {
        disappear: {
          "0%": {
            // transform: "translateY(0)",
            opacity: 1,
          },
          "50%": {
            opacity: 0.5,
          },
          "100%": {
            transform: "translateY(-30%)",
            opacity: 0,
            display: "none",
          },
        },
      },
    },
  },
  plugins: [],
};
