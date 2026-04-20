import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
}

export default config