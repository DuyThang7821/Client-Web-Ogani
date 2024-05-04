/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts, tsx}",
  "./public/index.html"
],
  theme: {
    fontFamily: {
      main: ['Cairo', 'sans-serif'],
    },
    extend: {
      width:{
        main: '1213px'
      },
      backgroundColor: {
        main: '#ee3131'
      },
      colors:{
        main: "#ee3131",
        extra: '#7fad39'
      },
      gridRow:{
        'span-7': 'span 7 / span 7',
      },
      gridTemplateRows: {
        '10': 'repeat(10, minmax(0, 1fr)',
        'layout' : '200px minmax(900px, 1fr) 100px',
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(20px);",
            transform: "translateY(20px);",
          },
        },
      },

      animation: {
        "slide-top":
          "slide-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
