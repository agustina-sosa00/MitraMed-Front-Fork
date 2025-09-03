/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        xl: "1580px", // @media (min-width: 1280px)
      },
      colors: {
        green: "#518915",
        greenHover: "#66AB1D",
        greenFocus: "#91C955",
        blue: "#022539",
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
    },
  },
  plugins: [],
};
