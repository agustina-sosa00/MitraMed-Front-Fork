/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        small: '360px',
        mini: '390px', // @media (min-width: 300px)
        xs: '480px', // @media (min-width: 480px)
        sm: '640px', // @media (min-width: 640px)
        md: '768px', // @media (min-width: 768px)
        mx: '890px',
        lg: '1024px', // @media (min-width: 1024px)
        xl: '1280px', // @media (min-width: 1280px)
      },
    },
  },
  plugins: [],
};
