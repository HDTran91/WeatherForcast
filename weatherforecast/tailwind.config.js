module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseTemp: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        fadeScale: {
          '0%': { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 1s ease-out forwards',
        pulseTemp: 'pulseTemp 2s infinite ease-in-out',
        shimmer: 'shimmer 2s linear infinite',
        typing: 'typing 4s steps(30, end) 1 normal both',
        fadeScale: 'fadeScale 0.6s ease-out forwards',
      },
    },
  },

 fontFamily: {
  sans: ['"Segoe UI"', 'Roboto', 'sans-serif'],
  },

  plugins: [],
};
