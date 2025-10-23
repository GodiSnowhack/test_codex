module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        shark: {
          dark: '#0b0b0b',
          accent: '#ff3b30',
          accentBlue: '#3b82f6',
          accentOrange: '#fb923c'
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
