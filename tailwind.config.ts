import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      gold: '#C9A24A',
      'gold-light': '#E6C97A',
      blue: '#2F4A5A',
      dark: '#2B2B2B',
      beige: '#F2E6CF',
      white: '#ffffff',
      transparent: 'transparent',
    },
    fontFamily: {
      display: ['Playfair Display', 'serif'],
      body: ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config