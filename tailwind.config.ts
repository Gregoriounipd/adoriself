// =====================================================================
// TAILWIND CONFIG — ADORISELF
// =====================================================================
// Combina:
// - Colori brand (gold, beige, blue) accessibili come bg-gold, text-beige
// - Colori shadcn (primary, secondary, accent...) collegati al brand
// - Tutti i colori standard Tailwind (per non rompere shadcn)
// - Font Cormorant Garamond (display) + DM Sans (body)
// - Border radius e animazioni shadcn
// =====================================================================

import type { Config } from 'tailwindcss';

const config: Config = {
  // Dark mode disabilitato (puoi attivarlo dopo)
  darkMode: ['class'],

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    // ⚠️ IMPORTANTE: usiamo "extend" per AGGIUNGERE colori senza sostituire
    // i colori standard di Tailwind (gray, slate, red, ecc.) che servono a shadcn.
    extend: {
      colors: {
        // ── COLORI BRAND ADORISELF ─────────────────────────────────
        // Usabili come: bg-gold, text-gold-light, border-beige, ecc.
        gold: {
          DEFAULT: '#C9A24A',
          light: '#E6C97A',
          dark: '#A07830',
          subtle: 'rgba(201, 162, 74, 0.08)',
        },
        beige: {
          DEFAULT: '#F2E6CF',
          warm: '#EDD9B8',
          light: '#FAF4EA',
        },
        cream: '#FFFDF8',
        blue: {
          DEFAULT: '#2F4A5A',
          deep: '#1A2E3A',
        },
        dark: {
          DEFAULT: '#2B2B2B',
          soft: '#3D3D3D',
        },

        // ── COLORI SHADCN (collegati alle CSS variables) ───────────
        // Questi sono i colori che usano i componenti shadcn (Button, Card, ecc.)
        // Sono mappati ai tuoi colori brand via globals.css
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      fontFamily: {
        // Display = titoli (h1, h2, h3) e elementi enfatizzati
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        // Body = paragrafi, UI, default
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        // Sans usato da shadcn (lo facciamo puntare a DM Sans)
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
      },

      boxShadow: {
        gold: '0 4px 24px rgba(201, 162, 74, 0.15)',
        'gold-lg': '0 8px 32px rgba(201, 162, 74, 0.30)',
        soft: '0 2px 16px rgba(43, 43, 43, 0.08)',
        card: '0 8px 40px rgba(43, 43, 43, 0.10)',
        'card-hover': '0 12px 48px rgba(43, 43, 43, 0.14)',
      },
    },
  },

  plugins: [
    // Plugin animazioni shadcn (necessario per accordion, dropdown, ecc.)
    require('tailwindcss-animate'),
  ],
};

export default config;