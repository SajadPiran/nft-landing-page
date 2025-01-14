/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  darkMode : 'class',

  theme: {

    extend: {

      colors : {

        'primary' : '#0F051D'
      },
      screens : {

        'sm' : '576px'
      }

    },

  },

  plugins: [],
}

