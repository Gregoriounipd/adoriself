// =====================================================================
// PAGINA — /sale/[provincia]
// =====================================================================
// Posizione: src/app/sale/[provincia]/page.tsx
//
// PLACEHOLDER temporaneo. Nel prossimo turno costruiremo qui:
// - Hero della provincia
// - Filtri (capienza, tipo sala, prezzo)
// - Griglia SalaCard
// - Mappa interattiva (opzionale)
//
// Per ora, mostra un messaggio "in costruzione" per evitare 404
// quando l'utente clicca su una provincia attiva.
// =====================================================================

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProvinciaBySlug } from '@/lib/supabase/queries-province';

interface Props {
  params: Promise<{ provincia: string }>;
}

export default async function ProvinciaPage({ params }: Props) {
  const { provincia: slug } = await params;
  const provincia = await getProvinciaBySlug(slug);

  if (!provincia) {
    notFound();
  }

  if (!provincia.attiva) {
    // Sicurezza: non mostriamo pagina per province non attive
    notFound();
  }

  return (
    <main className="min-h-screen bg-pattern">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-gold"
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
          Torna alle città
        </Link>

        <div className="flex items-center gap-4 mb-6">
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
          }}
        >
          Le sale di {provincia.provincia}
        </h1>

        {provincia.descrizione_breve && (
          <p
            className="text-lg max-w-2xl mb-10"
            style={{ color: 'var(--dark-soft)', fontWeight: 300, lineHeight: 1.6 }}
          >
            {provincia.descrizione_breve}
          </p>
        )}

        <div
          className="brand-card-flat p-12 text-center"
          style={{ background: 'rgba(255, 253, 248, 0.6)' }}
        >
          <p
            className="text-sm uppercase mb-3"
            style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            In arrivo
          </p>
          <h2 className="font-display mb-4" style={{ fontSize: '1.75rem', fontWeight: 600 }}>
            Griglia sale in costruzione
          </h2>
          <p style={{ color: 'var(--dark-soft)' }}>
            Qui apparirà la griglia delle {provincia.num_sale_disponibili}{' '}
            {provincia.num_sale_disponibili === 1 ? 'sala disponibile' : 'sale disponibili'} a{' '}
            {provincia.provincia}.
            <br />
            La stiamo costruendo nel prossimo step.
          </p>
        </div>
      </div>
    </main>
  );
}