module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        '645CF4': "#645CF4",
        'F5F5F5': "#F5F5F5",
        'F0F0F0': "#F0F0F0",
        'D8D8D8': "#D8D8D8",
        'BDBABA': "#BDBABA",
        'ACA9E721': "#ACA9E721",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], 
        robotoBold: ['RobotoBold', 'sans-serif']
      },
      spacing: {
        '1/3': '30%',
      }
    }
  },
  plugins: [],
};
