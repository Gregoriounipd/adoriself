// =====================================================================
// COMPONENTE — Step2Catering
// =====================================================================
// Posizione: src/components/configuratore/Step2Catering.tsx
//
// Step 2: scelta livello catering (3 card) + slider €/persona dentro il range.
// Effetto decoy: card "Medio" badge "Più scelto" + preselezionato di default.
// =====================================================================

'use client';

import { useEffect } from 'react';
import type { ConfiguratoreState, LivelloCatering } from '@/types/configuratore';

interface Step2CateringProps {
  state: ConfiguratoreState;
  update: (patch: Partial<ConfiguratoreState>) => void;
  /** Range pricing dal config DB */
  ranges: {
    base: { min: number; max: number };
    medio: { min: number; max: number };
    premium: { min: number; max: number };
  };
  onAvanti: () => void;
  onIndietro: () => void;
}

const LIVELLI_INFO: Record<
  LivelloCatering,
  { label: string; desc: string; icon: string }
> = {
  base: {
    label: 'Base',
    desc: 'Finger food, buffet semplice, perfetto per eventi rilassati.',
    icon: '🍽️',
  },
  medio: {
    label: 'Medio',
    desc: 'Buffet ricco, primi e secondi, ideale per la maggior parte degli eventi.',
    icon: '🥂',
  },
  premium: {
    label: 'Premium',
    desc: 'Menu degustazione servito al tavolo, esperienza alta cucina.',
    icon: '⭐',
  },
};

export function Step2Catering({
  state,
  update,
  ranges,
  onAvanti,
  onIndietro,
}: Step2CateringProps) {
  // ─── PRESELEZIONE MEDIO al primo accesso ──────────────────────
  useEffect(() => {
    if (state.cateringLivello === null) {
      const valoreMedio = Math.round((ranges.medio.min + ranges.medio.max) / 2);
      update({
        cateringLivello: 'medio',
        cateringValorePerPersona: valoreMedio,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Cambia livello: aggiorna anche il valore al medio del range ──
  const cambiaLivello = (livello: LivelloCatering) => {
    const range = ranges[livello];
    const valoreMedio = Math.round((range.min + range.max) / 2);
    update({
      cateringLivello: livello,
      cateringValorePerPersona: valoreMedio,
    });
  };

  // ─── Slider valore ────────────────────────────────────────────
  const rangeAttuale = state.cateringLivello
    ? ranges[state.cateringLivello]
    : ranges.medio;

  const valoreCorrente =
    state.cateringValorePerPersona ??
    Math.round((rangeAttuale.min + rangeAttuale.max) / 2);

  const totaleCatering = state.numPersone
    ? valoreCorrente * state.numPersone
    : 0;

  // ─── Validazione ──────────────────────────────────────────────
  const isValid =
    state.cateringLivello !== null && state.cateringValorePerPersona !== null;

  return (
    <div className="space-y-8">
      {/* ── Selezione livello ── */}
      <div>
        <label
          className="block mb-3 text-sm font-medium uppercase"
          style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
        >
          Scegli il livello del catering
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['base', 'medio', 'premium'] as LivelloCatering[]).map((livello) => {
            const isSelected = state.cateringLivello === livello;
            const isMedio = livello === 'medio';
            const info = LIVELLI_INFO[livello];
            const range = ranges[livello];

            return (
              <button
                key={livello}
                type="button"
                onClick={() => cambiaLivello(livello)}
                className="relative p-5 rounded-lg text-left transition-all duration-200"
                style={{
                  background: isSelected ? 'var(--gold-subtle)' : 'var(--cream)',
                  border: `1.5px solid ${
                    isSelected ? 'var(--gold)' : 'rgba(201, 162, 74, 0.2)'
                  }`,
                  boxShadow: isSelected
                    ? '0 0 0 3px rgba(201, 162, 74, 0.1)'
                    : 'none',
                }}
              >
                {/* Badge "Più scelto" */}
                {isMedio && (
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                      color: 'var(--cream)',
                      letterSpacing: '0.05em',
                      boxShadow: '0 2px 6px rgba(201, 162, 74, 0.3)',
                    }}
                  >
                    ⭐ Più scelto
                  </div>
                )}

                <div className="text-2xl mb-2">{info.icon}</div>

                <h4
                  className="font-display mb-1"
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: isSelected ? 'var(--gold-dark)' : 'var(--dark)',
                  }}
                >
                  {info.label}
                </h4>

                <p
                  className="text-xs mb-3"
                  style={{ color: 'var(--dark-soft)', lineHeight: 1.5 }}
                >
                  {info.desc}
                </p>

                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--gold-dark)' }}
                >
                  €{range.min}-{range.max}{' '}
                  <span
                    style={{
                      color: 'var(--dark-soft)',
                      fontWeight: 300,
                      fontSize: '0.85em',
                    }}
                  >
                    /persona
                  </span>
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Slider €/persona ── */}
      {state.cateringLivello && (
        <div className="animate-fade-in">
          <div className="flex items-baseline justify-between mb-3">
            <label
              className="text-sm font-medium uppercase"
              style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
            >
              Quanto vuoi spendere a persona?
            </label>
            <span
              className="font-display"
              style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: '1.5rem' }}
            >
              €{valoreCorrente}
              <span
                className="font-body text-sm ml-1"
                style={{ color: 'var(--dark-soft)' }}
              >
                /persona
              </span>
            </span>
          </div>

          <input
            type="range"
            min={rangeAttuale.min}
            max={rangeAttuale.max}
            step="1"
            value={valoreCorrente}
            onChange={(e) =>
              update({ cateringValorePerPersona: parseInt(e.target.value, 10) })
            }
            style={{
              ['--range-progress' as string]: `${
                ((valoreCorrente - rangeAttuale.min) /
                  (rangeAttuale.max - rangeAttuale.min)) *
                100
              }%`,
            }}
          />

          <div
            className="flex justify-between text-xs mt-1.5"
            style={{ color: 'var(--dark-soft)', opacity: 0.6 }}
          >
            <span>€{rangeAttuale.min}</span>
            <span>€{rangeAttuale.max}</span>
          </div>

          {/* Totale catering */}
          {totaleCatering > 0 && (
            <div
              className="mt-4 p-3 rounded-lg text-sm flex items-center justify-between"
              style={{
                background: 'var(--gold-subtle)',
                border: '1px solid rgba(201, 162, 74, 0.2)',
              }}
            >
              <span style={{ color: 'var(--dark-soft)' }}>
                Stima catering per {state.numPersone} persone
              </span>
              <span
                className="font-display"
                style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: '1.1rem' }}
              >
                €{totaleCatering.toLocaleString('it-IT')}
              </span>
            </div>
          )}

          {/* Disclaimer */}
          <p
            className="mt-3 text-xs"
            style={{ color: 'var(--dark-soft)', opacity: 0.7, fontStyle: 'italic' }}
          >
            Il menù finale viene definito insieme nell'incontro conoscitivo.
          </p>
        </div>
      )}

      {/* ── Bottoni navigazione ── */}
      <div className="pt-4 flex justify-between gap-3">
        <button
          type="button"
          onClick={onIndietro}
          className="button-ghost flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 11L5 7L9 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Indietro
        </button>

        <button
          type="button"
          onClick={onAvanti}
          disabled={!isValid}
          className="button-primary disabled:opacity-40"
        >
          <span className="flex items-center gap-2">
            Avanti
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7H12M12 7L7 2M12 7L7 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}