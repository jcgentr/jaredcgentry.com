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
      gridTemplateColumns: {
        "10": "repeat(10, minmax(0, 1fr))",
        "36": "repeat(36, minmax(0, 1fr))",
        "52": "repeat(52, minmax(0, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
