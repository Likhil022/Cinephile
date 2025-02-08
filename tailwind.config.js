/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideUp: "slideUp 0.5s ease-in-out",
        bounceCustom: "bounceCustom 1.5s",
        borderColorChange: "borderColorChange 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceCustom: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        borderColorChange: {
          "0%": { borderColor: "#3b82f6" }, // Blue
          "33%": { borderColor: "#a855f7" }, // Purple
          "66%": { borderColor: "#ef4444" }, // Red
          "100%": { borderColor: "#3b82f6" },
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
