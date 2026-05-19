// =====================================================================
// HOMEPAGE — ADORISELF (v2 con hero split foto)
// =====================================================================
// Posizione: src/app/page.tsx
// SOSTITUISCI il file esistente.
//
// Cambia: hero ora in 2 colonne (testo sinistra, galleria foto destra).
// Tutto il resto (selezione città) resta invariato.
// =====================================================================

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SelezioneCitta } from '@/components/homepage/SelezioneCitta';
import { HeroFoto } from '@/components/homepage/HeroFoto';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-pattern">
      {/* ── Header ───────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(255, 253, 248, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201, 162, 74, 0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-5 h-5 rotate-45 rounded-sm flex-shrink-0 transition-transform group-hover:rotate-[60deg]"
              style={{
                background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              }}
            />
            <h1
              className="font-display text-xl"
              style={{
                fontWeight: 600,
                color: 'var(--dark)',
                letterSpacing: '-0.01em',
              }}
            >
              Adori Self
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#scegli-citta"
              className="text-sm uppercase tracking-wider transition-colors hover:text-gold"
              style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
            >
              Sale
            </Link>
            <Link
              href="/come-funziona"
              className="text-sm uppercase tracking-wider transition-colors hover:text-gold"
              style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
            >
              Come funziona
            </Link>
            <Link href="#scegli-citta">
              <Button>Inizia ora</Button>
            </Link>
          </nav>

          <button className="md:hidden">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Hero (split layout) ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Colonna sinistra: testo */}
          <div>
            <div className="flex items-center gap-4 mb-8 animate-fade-up">
              <div className="divider-gold" />
              <p
                className="text-xs uppercase font-medium"
                style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
              >
                Eventi in Veneto
              </p>
            </div>

            <h1
              className="font-display mb-8 animate-fade-up"
              style={{
                fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                animationDelay: '0.1s',
              }}
            >
              L&apos;evento perfetto,{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  background:
                    'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                senza pensieri
              </span>
            </h1>

            <p
              className="text-lg mb-10 max-w-xl animate-fade-up"
              style={{
                color: 'var(--dark-soft)',
                fontWeight: 300,
                lineHeight: 1.6,
                animationDelay: '0.2s',
              }}
            >
              Scegli tra le migliori sale del Veneto, configura il tuo pacchetto
              con prezzi trasparenti e lascia a noi il coordinamento di
              catering, DJ e allestimento.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href="#scegli-citta">
                <Button size="lg" className="w-full sm:w-auto">
                  Scegli la città
                </Button>
              </Link>
              <Link href="/come-funziona">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Come funziona
                </Button>
              </Link>
            </div>

            <div
              className="mt-12 flex items-center gap-3 animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 1.667L12.575 6.892L18.333 7.733L14.167 11.792L15.15 17.525L10 14.817L4.85 17.525L5.833 11.792L1.667 7.733L7.425 6.892L10 1.667Z"
                  fill="var(--gold)"
                  stroke="var(--gold-dark)"
                  strokeWidth="0.5"
                />
              </svg>
              <p className="text-sm" style={{ color: 'var(--dark-soft)' }}>
                Prezzi trasparenti, niente sorprese.{' '}
                <Link
                  href="/come-funziona"
                  className="underline"
                  style={{ color: 'var(--gold-dark)' }}
                >
                  Scopri come
                </Link>
              </p>
            </div>
          </div>

          {/* Colonna destra: galleria foto */}
          <div className="lg:pl-4">
            <HeroFoto />
          </div>
        </div>
      </section>

      {/* ── Selezione città ──────────────────────────────────── */}
      <SelezioneCitta />
    </main>
  );
}