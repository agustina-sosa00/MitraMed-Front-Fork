/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        small: "360px",
        mini: "390px", // @media (min-width: 300px)
        xs: "480px", // @media (min-width: 480px)
        sm: "640px", // @media (min-width: 640px)
        md: "768px", // @media (min-width: 768px)
        mx: "890px",
        lg: "1024px", // @media (min-width: 1024px)
        lg2: "1180px",
        lg3: "1280px",
        xg: "1440px",
        xxg: "1536px",
        xl: "1580px", // @media (min-width: 1280px)
        xxl: "1920px",
      },
      colors: {
        primaryGreen: "#518915",
        greenHover: "#3B690B",
        greenFocus: "#66AB1D",
        primaryBlue: "#022539",
        blueHover: "#01324E",
        lightGray: "#f1f1f1",
      },
      backgroundImage: {
        misturnos: "url('https://i.imgur.com/yb9cgvt.png')",
        perfil: "url('https://i.imgur.com/V4xSfb8.png')",
        // profesional: "url('https://i.imgur.com/ZuyE1U1.png')",
        profesional: "url('https://i.imgur.com/s1eeBP9.png')",
        // profesional: "url('https://i.imgur.com/Egqa5IF.png')",
      },
      boxShadow: {
        xg: "5px 5px 5px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
