/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5966FF', // Indigo - Main brand color
          50: '#F5F6FF',
          100: '#E8EAFF',
          200: '#C9CFFF', // Lavender Mist
          300: '#9BA3FF',
          400: '#7A84FF',
          500: '#5966FF', // Indigo
          600: '#4A55E6',
          700: '#3C46CC', // Deep Indigo (Dark Mode Primary)
          800: '#3139B3',
          900: '#252B99',
        },
        background: {
          DEFAULT: '#FAFAFF', // Cloud White
          soft: '#F1F1F6', // Soft Slate
          dark: '#0F0F19', // Dark Charcoal
        },
        neutral: {
          DEFAULT: '#8C8C9E', // Warm Gray
          50: '#F5F5F7',
          100: '#E8E8EB',
          200: '#D1D1D6',
          300: '#B5B5BD',
          400: '#8C8C9E', // Warm Gray
          500: '#6E6E7F',
          600: '#525260',
          700: '#3D3D47',
          800: '#29292F',
          900: '#1A1A1F',
        },
        accent: {
          DEFAULT: '#FFC857', // Gold Highlight
          50: '#FFF9E6',
          100: '#FFF2CC',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFC857', // Gold Highlight
          500: '#FFB833',
          600: '#FFA500',
          700: '#E69400',
          800: '#CC8300',
          900: '#B37200',
        },
        // Dark mode colors
        dark: {
          primary: '#3C46CC', // Deep Indigo
          background: '#0F0F19', // Dark Charcoal
        },
      },
    },
  },
  plugins: [],
}

