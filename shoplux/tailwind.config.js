const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    colors:{
      'midnight': '#D8F4E2',
      'purple': '#3f3cbb',
    }
   
  },
  plugins: [
    flowbite.plugin(),
  ],
  darkMode: 'class',
  theme: {
    extend: {}
  }
}


