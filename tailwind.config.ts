import type { Config } from "tailwindcss";

export default {
  darkMode: "class",  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

        bgLight:"#f7f7f7",
        hoverBgLight : "#efefef",
        bgDark : "#181521",
        bgDark2 : "#2c283b",
        hoverBgDark2 : "#49435e",

        myText: "#9ca3af",
        myTextDark: "#8d8b95",



        myBorder : "#ebebeb",
        myBorderDark:"#ffffff17",

        bgTransparent:"#00000057",
        bgTransparentDark:"#0000009e"

      },
    },
  },
  plugins: [],
} satisfies Config;
