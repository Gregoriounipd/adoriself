// =====================================================================
// PAGINA — /sale/[provincia]
// =====================================================================
// Posizione: src/app/sale/[provincia]/page.tsx
//
// Pagina griglia sale di una provincia.
// SOSTITUISCE il placeholder precedente.
// =====================================================================

import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProvinciaBySlug } from '@/lib/supabase/queries-province';
import {
  getSaleByProvincia,
  getTipiSalaDistinti,
} from '@/lib/supabase/queries-sale';
import { SalaCard } from '@/components/sale/SalaCard';
import { FiltriSale } from '@/components/sale/FiltriSale';
import type { FiltriSala } from '@/types/sala';

interface PageProps {
  params: Promise<{ provincia: string }>;
  searchParams: Promise<{ tipo?: string; capienza?: string }>;
}

// ── Metadata dinamici per SEO ────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provincia: slug } = await params;
  const provincia = await getProvinciaBySlug(slug);

  if (!provincia) {
    return { title: 'Provincia non trovata' };
  }

  return {
    title: `Sale eventi a ${provincia.provincia} — Adori Self`,
    description:
      provincia.descrizione_breve ??
      `Scopri le migliori sale per eventi a ${provincia.provincia}. Prezzi trasparenti, prenotazione facile.`,
  };
}

// ── Pagina ────────────────────────────────────────────────────────
export default async function ProvinciaPage({ params, searchParams }: PageProps) {
  const { provincia: slug } = await params;
  const { tipo, capienza } = await searchParams;

  // Carica la provincia
  const provincia = await getProvinciaBySlug(slug);
  if (!provincia) notFound();
  if (!provincia.attiva) notFound();

  // Costruisci filtri dai search params
  const filtri: FiltriSala = {};
  if (tipo) filtri.tipoSala = tipo;
  if (capienza) {
    const cap = parseInt(capienza, 10);
    if (!isNaN(cap) && cap > 0) filtri.capienzaMin = cap;
  }

  // Carica sale + tipi disponibili in parallelo
  const [sale, tipiDisponibili] = await Promise.all([
    getSaleByProvincia(provincia.provincia, filtri),
    getTipiSalaDistinti(provincia.provincia),
  ]);

  return (
    <main className="min-h-screen bg-pattern">
      {/* ── Header sticky ─────────────────────────────────── */}
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
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}
            />
            <h1
              className="font-display text-xl"
              style={{ fontWeight: 600, color: 'var(--dark)', letterSpacing: '-0.01em' }}
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

      {/* ── Contenuto ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb + back */}
        <Link
          href="/#scegli-citta"
          className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-gold"
          style={{ color: 'var(--dark-soft)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 10.5L5.5 7L9 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Cambia città
        </Link>

        {/* Hero della provincia */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="divider-gold" />
            <p
              className="text-xs uppercase font-medium"
              style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
            >
              Sale a {provincia.provincia}
            </p>
          </div>

          <h1
            className="font-display mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Le sale di {provincia.provincia}
          </h1>

          {provincia.descrizione_breve && (
            <p
              className="text-lg max-w-2xl"
              style={{
                color: 'var(--dark-soft)',
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {provincia.descrizione_breve}
            </p>
          )}
        </div>

        {/* Filtri (solo se ci sono sale) */}
        {sale.length > 0 || tipo || capienza ? (
          <FiltriSale
            tipiDisponibili={tipiDisponibili}
            totaleRisultati={sale.length}
          />
        ) : null}

        {/* Griglia sale o empty state */}
        {sale.length === 0 ? (
          <EmptyState
            hasFiltri={!!(tipo || capienza)}
            provinciaNome={provincia.provincia}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sale.map((sala, idx) => (
              <SalaCard key={sala.id} sala={sala} index={idx} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// ── Empty state component ────────────────────────────────────────

function EmptyState({
  hasFiltri,
  provinciaNome,
}: {
  hasFiltri: boolean;
  provinciaNome: string;
}) {
  if (hasFiltri) {
    return (
      <div
        className="brand-card-flat p-12 text-center"
        style={{ background: 'rgba(255, 253, 248, 0.6)' }}
      >
        <div
          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{
            background: 'var(--gold-subtle)',
            border: '1px solid rgba(201, 162, 74, 0.3)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="var(--gold-dark)" strokeWidth="2" />
            <path d="M21 21L16 16" stroke="var(--gold-dark)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="font-display mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
          Nessuna sala trovata con questi filtri
        </h2>
        <p className="mb-6" style={{ color: 'var(--dark-soft)' }}>
          Prova a rimuovere qualche filtro per vedere più opzioni.
        </p>
        <Link
          href={`/sale/${provinciaNome.toLowerCase()}`}
          className="text-sm underline"
          style={{ color: 'var(--gold-dark)' }}
        >
          Rimuovi tutti i filtri
        </Link>
      </div>
    );
  }

  return (
    <div
      className="brand-card-flat p-12 text-center"
      style={{ background: 'rgba(255, 253, 248, 0.6)' }}
    >
      <p
        className="text-sm uppercase mb-3"
        style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
      >
        Stiamo aggiungendo sale
      </p>
      <h2 className="font-display mb-4" style={{ fontSize: '1.75rem', fontWeight: 600 }}>
        Sale a {provinciaNome} in arrivo
      </h2>
      <p style={{ color: 'var(--dark-soft)' }}>
        Stiamo selezionando le migliori location di {provinciaNome}.
        <br />
        Torna a trovarci presto!
      </p>
    </div>
  );
}