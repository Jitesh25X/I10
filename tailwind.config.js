/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct theme tokens requested
        'bg-void': 'rgb(var(--bg-void-rgb, 6 6 15) / <alpha-value>)',
        'bg-nebula-blue': 'rgb(var(--bg-nebula-blue-rgb, 43 61 250) / <alpha-value>)',
        'bg-nebula-violet': 'rgb(var(--bg-nebula-violet-rgb, 123 63 242) / <alpha-value>)',
        'accent-gold': 'rgb(var(--accent-gold-rgb, 232 184 75) / <alpha-value>)',
        'accent-gold-soft': 'rgb(var(--accent-gold-soft-rgb, 245 217 138) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary-rgb, 244 242 236) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted-rgb, 184 182 201) / <alpha-value>)',

        // Semantic aliases for sections and utilities
        void: 'rgb(var(--bg-void-rgb, 6 6 15) / <alpha-value>)',
        nebula: {
          blue: 'rgb(var(--bg-nebula-blue-rgb, 43 61 250) / <alpha-value>)',
          violet: 'rgb(var(--bg-nebula-violet-rgb, 123 63 242) / <alpha-value>)',
        },
        background: {
          DEFAULT: 'rgb(var(--bg-void-rgb, 6 6 15) / <alpha-value>)',
          void: 'rgb(var(--bg-void-rgb, 6 6 15) / <alpha-value>)',
          dark: 'rgb(var(--bg-void-rgb, 6 6 15) / <alpha-value>)',
          mid: '#0a0a1f',
          light: '#12122b',
          goldHighlight: '#261c10',
          navy: '#06060f',
          indigo: '#0a0a1f',
        },
        accent: {
          purple: 'rgb(var(--bg-nebula-violet-rgb, 123 63 242) / <alpha-value>)',
          violet: 'rgb(var(--bg-nebula-violet-rgb, 123 63 242) / <alpha-value>)',
          blue: 'rgb(var(--bg-nebula-blue-rgb, 43 61 250) / <alpha-value>)',
          gold: 'rgb(var(--accent-gold-rgb, 232 184 75) / <alpha-value>)',
          'gold-soft': 'rgb(var(--accent-gold-soft-rgb, 245 217 138) / <alpha-value>)',
          softGold: 'rgb(var(--accent-gold-soft-rgb, 245 217 138) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary-rgb, 244 242 236) / <alpha-value>)',
          muted: 'rgb(var(--text-muted-rgb, 184 182 201) / <alpha-value>)',
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
        'aurora-1': 'aurora-drift-1 26s ease-in-out infinite alternate',
        'aurora-2': 'aurora-drift-2 32s ease-in-out infinite alternate',
        'aurora-3': 'aurora-drift-3 28s ease-in-out infinite alternate',
        'aurora-4': 'aurora-drift-4 34s ease-in-out infinite alternate',
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
        },
        'aurora-drift-1': {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(-30deg) scale(1)' },
          '50%': { transform: 'translate3d(40px, 25px, 0) rotate(-26deg) scale(1.05)' },
          '100%': { transform: 'translate3d(-20px, 15px, 0) rotate(-33deg) scale(0.98)' },
        },
        'aurora-drift-2': {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(-40deg) scale(1)' },
          '50%': { transform: 'translate3d(-35px, 30px, 0) rotate(-36deg) scale(0.96)' },
          '100%': { transform: 'translate3d(20px, -20px, 0) rotate(-43deg) scale(1.04)' },
        },
        'aurora-drift-3': {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(-34deg) scale(1)' },
          '50%': { transform: 'translate3d(-30px, -25px, 0) rotate(-30deg) scale(1.05)' },
          '100%': { transform: 'translate3d(25px, 15px, 0) rotate(-37deg) scale(0.97)' },
        },
        'aurora-drift-4': {
          '0%': { transform: 'translate3d(0, 0, 0) rotate(32deg) scale(1)' },
          '50%': { transform: 'translate3d(35px, -20px, 0) rotate(36deg) scale(1.03)' },
          '100%': { transform: 'translate3d(-25px, 20px, 0) rotate(29deg) scale(0.97)' },
        },
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
