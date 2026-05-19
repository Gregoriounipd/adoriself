// =====================================================================
// COMPONENTE — FiltriSale
// =====================================================================
// Posizione: src/components/sale/FiltriSale.tsx
//
// Barra di filtri orizzontale sopra la griglia sale.
// Filtri: tipo sala (dropdown), capienza (range slider).
//
// I filtri sono gestiti via URL search params (?tipo=&capienza=)
// così sono bookmarkable e SEO-friendly.
// =====================================================================

'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { TIPI_SALA_LABEL } from '@/types/sala';

interface FiltriSaleProps {
  /** Tipi sala disponibili (calcolati dal server dalla query distinct) */
  tipiDisponibili: string[];
  /** Numero totale di risultati (per il contatore) */
  totaleRisultati: number;
}

export function FiltriSale({ tipiDisponibili, totaleRisultati }: FiltriSaleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Valori correnti dei filtri
  const tipoCorrente = searchParams.get('tipo') ?? '';
  const capienzaCorrente = parseInt(searchParams.get('capienza') ?? '0', 10);

  // Helper: aggiorna un singolo parametro URL
  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== '' && value !== '0') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [router, pathname, searchParams]
  );

  // Reset tutti i filtri
  const resetFiltri = () => {
    router.push(pathname);
  };

  // Flag: ci sono filtri attivi?
  const hasFiltriAttivi = tipoCorrente !== '' || capienzaCorrente > 0;

  return (
    <div
      className="sticky top-[73px] z-30 -mx-6 px-6 py-4 mb-8 backdrop-blur-md"
      style={{
        background: 'rgba(255, 253, 248, 0.85)',
        borderBottom: '1px solid rgba(201, 162, 74, 0.15)',
      }}
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Filtro: tipo sala */}
        <div className="flex flex-col gap-1">
          <label
            className="text-xs uppercase font-medium"
            style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
          >
            Tipologia
          </label>
          <select
            value={tipoCorrente}
            onChange={(e) => updateParam('tipo', e.target.value)}
            className="text-sm py-2 px-3 rounded-lg cursor-pointer transition-all"
            style={{
              border: '1.5px solid rgba(201, 162, 74, 0.25)',
              background: 'var(--cream)',
              color: 'var(--dark)',
              minWidth: '180px',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <option value="">Tutte le tipologie</option>
            {tipiDisponibili.map((tipo) => (
              <option key={tipo} value={tipo}>
                {TIPI_SALA_LABEL[tipo] ?? tipo}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro: capienza minima */}
        <div className="flex flex-col gap-1 min-w-[200px]">
          <label
            className="text-xs uppercase font-medium flex items-center justify-between"
            style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
          >
            <span>Capienza minima</span>
            <span style={{ color: 'var(--gold-dark)' }}>
              {capienzaCorrente > 0 ? `${capienzaCorrente}+ pax` : 'qualsiasi'}
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={capienzaCorrente}
            onChange={(e) => updateParam('capienza', e.target.value)}
            style={{
              ['--range-progress' as string]: `${(capienzaCorrente / 300) * 100}%`,
            }}
          />
        </div>

        {/* Contatore risultati */}
        <div className="ml-auto flex items-center gap-3">
          <p
            className="text-sm"
            style={{ color: 'var(--dark-soft)' }}
          >
            <span style={{ fontWeight: 600, color: 'var(--gold-dark)' }}>
              {totaleRisultati}
            </span>{' '}
            {totaleRisultati === 1 ? 'sala' : 'sale'}
          </p>

          {hasFiltriAttivi && (
            <button
              onClick={resetFiltri}
              className="text-xs underline transition-colors hover:text-gold-dark"
              style={{ color: 'var(--dark-soft)' }}
            >
              Rimuovi filtri
            </button>
          )}
        </div>
      </div>
    </div>
  );
}