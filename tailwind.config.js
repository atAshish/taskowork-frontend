/* eslint-disable no-undef */
const withMT = require("@material-tailwind/react/utils/withMT");
 
// eslint-disable-next-line no-undef
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'neoin': 'inset 5px 5px 10px #cbced1, inset -5px -5px 10px #ffffff',
        'neoout': '5px 5px 10px #cbced1, -5px -5px 10px #ffffff',
      },
      colors: {
        'brand-red': '#ff0000',
        'brand-blue': '#0000ff',
        'brand-green': '#00ff00',
      },
      fontfamily:{
        'roboto':['Roboto','san-serif']
      }
    },
  },
  plugins: [],
});
