/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'prime':'#34AF9D',
        'light':"#effaf8",
        'dark':"#257d70",
        'greyish':'#f7f8fa',
        'contrast':"#FF6B68"
        // 'second':'#4CCAB7',
        // 'light':'#e2f6f3',
        // 'lighter':"#e8f8f6",
      }
    },
    fontFamily:{
      poppins:["Poppins","sans-serif"],
      montserrat:["Montserrat","sans-serif"],
    }
  },
  plugins: [],
}

