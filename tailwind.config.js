export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#f8efe2',
        champagne: '#d4b483',
        sand: '#e5d6c2',
        blush: '#f3e7db',
        taupe: '#8e7d6b',
        cream: '#fff8f0'
      },
      boxShadow: {
        luxury: '0 35px 120px rgba(92, 76, 63, 0.16)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(255,255,255,0.88), transparent 30%), radial-gradient(circle at bottom right, rgba(212,180,131,0.14), transparent 18%), linear-gradient(180deg, #fffaf0 0%, #f7efe3 100%)'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
};
