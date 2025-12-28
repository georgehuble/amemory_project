/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}", "./src/*/.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#8246FB',
        darkBlack: '#050810',
        primaryGrey: '#8B919E',
        secondarygrey:'#747B8B',
        tertiaryGrey:'#E3E5E8',
      },
      fontFamily: {
        primary: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      container: {
        center: true, 
        padding:'1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1236px',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".paddingSection": {
          paddingTop: "40px",
          paddingBottom: "40px",
        },
        "@screen sm": {
          ".paddingSection": {
            paddingTop: "40px",
            paddingBottom: "40px",
          },
        },
        "@screen md": {
          ".paddingSection": {
            paddingTop: "80px",
            paddingBottom: "80px",
          },
        },
        "@screen lg": {
          ".paddingSection": {
            paddingTop: "120px",
            paddingBottom: "120px",
          },
        },
        "@screen xl": {
          ".paddingSection": {
            paddingTop: "120px",
            paddingBottom: "120px",
          },
        },
      });
    },
  ],
};
