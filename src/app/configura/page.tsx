// =====================================================================
// PAGINA — /configura (versione 2)
// =====================================================================
// Posizione: src/app/configura/page.tsx
// SOSTITUISCI il file esistente.
//
// Carica in parallelo: sala + config pricing + scaglioni + pacchetti DJ.
// Passa tutto al ConfiguratoreUI.
// =====================================================================

import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ConfiguratoreUI } from '@/components/configuratore/ConfiguratoreUI';
import {
  loadPricingConfig,
  loadFeeScaglioni,
} from '@/lib/load-pricing-config';
import type { Sala } from '@/types/sala';
import type { PacchettoDjItem } from '@/components/configuratore/Step4DJ';

interface PageProps {
  searchParams: Promise<{ sala?: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ConfiguraPage({ searchParams }: PageProps) {
  const { sala: salaIdParam } = await searchParams;

  if (!salaIdParam) redirect('/');
  const salaId = parseInt(salaIdParam, 10);
  if (isNaN(salaId)) redirect('/');

  // ── Carica tutto in parallelo ─────────────────────────────────
  const supabase = await createClient();

  const [salaResult, configResult, scaglioniResult, djResult] =
    await Promise.all([
      supabase.from('sale_pubbliche').select('*').eq('id', salaId).single(),
      loadPricingConfig(),
      loadFeeScaglioni(),
      supabase.from('pacchetti_dj_pubblici').select('*'),
    ]);

  if (salaResult.error || !salaResult.data) notFound();
  const sala = salaResult.data as Sala;

  // Trasforma pacchetti DJ in formato UI
  const pacchettiDj: PacchettoDjItem[] = (djResult.data ?? []).map((p: any) => ({
    id: p.id,
    nome: p.nome,
    descrizioneBreve: p.descrizione_breve ?? null,
    descrizione: p.descrizione ?? null,
    oreIncluse: p.ore_incluse ?? 0,
    costo: p.costo,
    fotoUrl: p.foto_url ?? null,
    inEvidenza: p.in_evidenza ?? false,
  }));

  return (
    <main className="min-h-screen bg-pattern">
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(255, 253, 248, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201, 162, 74, 0.2)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm uppercase tracking-wider transition-colors hover:text-gold"
              style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <ConfiguratoreUI
        sala={sala}
        config={configResult}
        scaglioni={scaglioniResult}
        pacchettiDj={pacchettiDj}
      />
    </main>
  );
}