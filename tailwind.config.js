/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#0B0B2E',
          mid: '#12103A',
          light: '#1B184F',
          goldHighlight: '#3D2A1A',
          navy: '#0B0B2E',
          indigo: '#12103A',
        },
        accent: {
          purple: '#6B46C1',
          blue: '#3B82F6',
          gold: '#F2C14E'
        },
        text: {
          primary: '#F5F3FF',
          muted: '#B8B3D9'
        }
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'drift': 'drift 20s linear infinite',
        'falling-star': 'falling-star linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        drift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        'falling-star': {
          '0%': { transform: 'translate(0, 0)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translate(-100vw, 100vh)', opacity: 0 },
        }
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.25, 0.64, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionProperty: {
        'glass': 'transform, background-color, border-color, box-shadow, opacity',
        'transform-shadow': 'transform, box-shadow',
      }
    },
  },
  plugins: [],
}
