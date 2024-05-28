/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      desktop: "1440px",
      laptop: "1024px",
      tablet: "768px",
      mobile: "640px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-rubik)"],
        mono: ["var(--font-rubik)"],
      },
      boxShadow: {
        category: "0px 4px 4px rgba(40, 54, 109, 0.15)",
        input: "5px 5px 15px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        category: "5px 5px 10px rgba(40, 54, 109, 0.05)",
        empty: "5px 5px 35px rgba(40, 54, 109, 0.2)",
      },
    },
    container: {
      padding: "30px",
      center: true,
      screens: {
        desktop: "1440px",
      },
    },
  } ,
  plugins: [],
};
    
