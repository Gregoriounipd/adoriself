// =====================================================================
// PAGINA — /servizio/[tipo]
// =====================================================================
// Posizione: src/app/servizio/[tipo]/page.tsx
//
// Pagina configuratore per servizio singolo.
// SCHELETRO (Turno 1): hero + tabs + placeholder.
// I 3 configuratori veri (allestimento, bar, fotografo) arrivano nel Turno 2.
// =====================================================================

import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { TabsServizi } from '@/components/homepage/TabsServizi';
import {
  TIPI_SERVIZIO_META,
  type TipoServizio,
} from '@/types/servizio-singolo';

interface PageProps {
  params: Promise<{ tipo: string }>;
}

const TIPI_VALIDI: TipoServizio[] = ['allestimento', 'bar', 'fotografo'];

function isTipoValido(t: string): t is TipoServizio {
  return TIPI_VALIDI.includes(t as TipoServizio);
}

// ─── Metadata SEO dinamici ───────────────────────────────────────
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tipo } = await params;
  if (!isTipoValido(tipo)) {
    return { title: 'Servizio non trovato' };
  }
  const meta = TIPI_SERVIZIO_META[tipo];
  return {
    title: `${meta.label} per il tuo evento — Adoriself`,
    description: `${meta.descrizione}. Prenota online il tuo servizio di ${meta.label.toLowerCase()} per eventi in Veneto.`,
  };
}

// ─── Pagina ──────────────────────────────────────────────────────
export default async function ServizioPage({ params }: PageProps) {
  const { tipo } = await params;
  if (!isTipoValido(tipo)) notFound();

  const meta = TIPI_SERVIZIO_META[tipo];

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
              href="/"
              className="text-sm uppercase tracking-wider transition-colors hover:text-gold"
              style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
            >
              Home
            </Link>
            <Link
              href="/come-funziona"
              className="text-sm uppercase tracking-wider transition-colors hover:text-gold"
              style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
            >
              Come funziona
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Tabs servizi ─────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pt-10 md:pt-12 flex justify-center md:justify-start animate-fade-up">
        <TabsServizi attivo={tipo} />
      </section>

      {/* ── Hero servizio ────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="flex items-center gap-4 mb-8 animate-fade-up">
          <div className="divider-gold" />
          <p
            className="text-xs uppercase font-medium"
            style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            Servizio singolo
          </p>
        </div>

        <div className="flex items-start gap-4 mb-8 animate-fade-up">
          <div
            className="text-5xl md:text-6xl flex-shrink-0"
            style={{ lineHeight: 1, marginTop: '0.5rem' }}
          >
            {meta.icon}
          </div>
          <div>
            <h1
              className="font-display mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {meta.label}
            </h1>
            <p
              className="text-lg"
              style={{
                color: 'var(--dark-soft)',
                fontWeight: 300,
                lineHeight: 1.6,
                maxWidth: '40rem',
              }}
            >
              {meta.descrizione}. Configura online, ricevi una stima trasparente,
              e ti chiamiamo entro 24 ore.
            </p>
          </div>
        </div>

        {/* ── Placeholder configuratore (Turno 2) ──────────────── */}
        <div
          className="brand-card-flat p-12 text-center animate-fade-up"
          style={{
            background: 'rgba(255, 253, 248, 0.7)',
            borderColor: 'rgba(201, 162, 74, 0.3)',
          }}
        >
          <p
            className="text-sm uppercase mb-3 font-medium"
            style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            🚧 In costruzione
          </p>
          <h2
            className="font-display mb-4"
            style={{ fontSize: '1.5rem', fontWeight: 600 }}
          >
            Configuratore in arrivo
          </h2>
          <p
            className="mb-8 max-w-md mx-auto"
            style={{ color: 'var(--dark-soft)', lineHeight: 1.6 }}
          >
            Stiamo finendo di costruire il configuratore per {meta.label.toLowerCase()}.
            <br />
            Nel frattempo, scrivici e ti rispondiamo subito.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="outline">Torna alla home</Button>
            </Link>
            <a href="mailto:info@adoriself.it">
              <Button>Scrivici</Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}