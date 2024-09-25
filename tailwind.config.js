/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        billabong: ["Billabong", "cursive"], // Custom font 'Billabong'
      },
    },
  },
  plugins: [],
};
