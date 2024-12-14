/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure this path matches your project structure
  theme: {
    extend: {
      screens: {
        "sm-330": "330px",
        "sm-430": "430px",
      },
      colors: {
        pacific: {
          100: "#E5F7FA",
          500: "#1CA9C9", // Original color
          600: "#168F8F", // Darker shade of pacific (you can adjust this value as needed)
          700: "#137676", // Even darker shade, for example
        },
      },
    },
  },
  plugins: [],
};

