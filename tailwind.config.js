/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00C4CC',
          light: '#33D4DB',
          dark: '#00A4AB',
        },
        secondary: {
          DEFAULT: '#5925A1',
          light: '#7B3FC2',
          dark: '#3D1A75',
        },
        accent: {
          DEFAULT: '#A87CFA',
          light: '#C4A2FF',
          dark: '#8B5FE6',
        },
        midnight: '#1A0B2E',
      },
      fontFamily: {
        sans: ['Inter', 'Onest', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'marquee': 'marquee var(--duration, 40s) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration, 40s) linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 196, 204, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 196, 204, 0.6)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap, 1.5rem)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap, 1.5rem)))' },
        },
      },
    },
  },
  plugins: [],
};
