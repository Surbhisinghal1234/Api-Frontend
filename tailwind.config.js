/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-one': 'linear-gradient(to right, #ff7e5f8c, #00800061)',
        'gradient-two': 'linear-gradient(to right, #0000ff57, #185a9d8f)',
        'custom-gradient-bg': 'linear-gradient(270deg, #DF8908 10%, #B415FF 100%)',

      },
     

    },
    container: {
      center: true,
      padding: '0rem',
      screens: {
        // sm: '600px',
        // md: '728px',
        // lg: '984px',
        // xl: '1240px',
        '2xl': '1596px',
      },
    },
  },
  plugins: [],
}

