/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0b1220',
          900: '#0f172a',
          800: '#16213a',
        },
        accent: {
          50: '#fdf4ea',
          100: '#f8e4c7',
          200: '#efc98a',
          300: '#e3ad55',
          400: '#d59632',
          500: '#c07f22',
          600: '#9c631a',
        },
        plum: {
          50: '#f6f1f7',
          100: '#e9dced',
          400: '#8a5a96',
          500: '#6f4178',
          600: '#593260',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(213,150,50,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(111,65,120,0.18), transparent 45%)',
      },
      boxShadow: {
        soft: '0 20px 60px -15px rgba(15, 23, 42, 0.25)',
        glow: '0 0 0 1px rgba(213,150,50,0.25), 0 20px 40px -10px rgba(213,150,50,0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
