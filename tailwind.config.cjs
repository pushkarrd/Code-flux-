/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#6366f1',
          600: '#4f46e5'
        },
        streak: '#f97316',
        xp: '#fbbf24'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        md: '12px'
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Mobile-first approach
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
        // Orientation
        'portrait': { 'raw': '(orientation: portrait)' },
        'landscape': { 'raw': '(orientation: landscape)' }
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-bottom))',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        'safe-top': 'env(safe-area-inset-top)'
      },
      minHeight: {
        'touch': '44px', // Minimum touch target size
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))'
      },
      minWidth: {
        'touch': '44px'
      },
      fontSize: {
        'responsive-sm': 'clamp(12px, 2.5vw, 14px)',
        'responsive-base': 'clamp(14px, 3vw, 16px)',
        'responsive-lg': 'clamp(16px, 3.5vw, 18px)',
        'responsive-xl': 'clamp(18px, 4vw, 20px)',
        'responsive-2xl': 'clamp(20px, 4.5vw, 24px)',
        'responsive-3xl': 'clamp(24px, 5vw, 30px)' 
      },
      maxWidth: {
        'mobile': '100%',
        'tablet': '768px',
        'desktop': '1200px'
      }
    }
  },
  plugins: [
    function ({ addUtilities, e, theme }) {
      const responsiveUtils = {
        '.touch-target': {
          '@apply min-h-touch min-w-touch': {}
        },
        '.safe-area-inset': {
          '@apply p-safe': {}
        },
        '.responsive-px': {
          '@apply px-4 sm:px-6 md:px-8 lg:px-12': {}
        },
        '.responsive-py': {
          '@apply py-3 sm:py-4 md:py-6 lg:py-8': {}
        },
        '.grid-responsive': {
          '@apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4': {}
        },
        '.flex-responsive': {
          '@apply flex flex-col sm:flex-row gap-4': {}
        }
      }
      addUtilities(responsiveUtils)
    }
  ],
}
