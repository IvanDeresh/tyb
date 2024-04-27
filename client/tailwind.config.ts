import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fromRight: {
          "0%": { transform: "translateX(120%)" },
          "100%": { transform: "translateX(0)" },
        },
        fromLeft: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(0)" },
        },
        fromDown: {
          "0%": { transform: "translateY(250%)" },
          "100%": { transform: "translateX(0)" },
        },
        fromTop: {
          "0%": { transform: "translateY(-250%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        fromRight: "fromRight 1s ease-in-out 1",
        fromLeft: "fromLeft 1s ease-in-out 1",
        fromDown: "fromDown 1s ease-in-out 1",
        fromTop: "fromTop 1s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
export default config;
