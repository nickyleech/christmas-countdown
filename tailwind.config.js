/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        christmas: ['"Mountains of Christmas"', 'cursive'],
        display: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 6s linear infinite',
        'colon-pulse': 'colon-pulse 1s ease-in-out infinite',
        'progress-fill': 'progress-fill 1.5s ease-out forwards',
        'tick-pop': 'tick-pop 0.3s ease-out',
        'quote-fade-in': 'quote-fade-in 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
