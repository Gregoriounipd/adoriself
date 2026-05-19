// =====================================================================
// COMPONENTE — Step5Allestimento
// =====================================================================
// Posizione: src/components/configuratore/Step5Allestimento.tsx
//
// Step 5: scelta allestimento OBBLIGATORIA tra 3 livelli + "niente".
// Effetto decoy: card "Medio" badge "Più popolare" + preselezionato.
// =====================================================================

'use client';

import { useEffect } from 'react';
import type { ConfiguratoreState } from '@/types/configuratore';

interface Step5AllestimentoProps {
  state: ConfiguratoreState;
  update: (patch: Partial<ConfiguratoreState>) => void;
  costi: {
    base: number;
    medio: number;
    premium: number;
  };
  onAvanti: () => void;
  onIndietro: () => void;
}

const LIVELLI_INFO = {
  base: {
    label: 'Essenziale',
    desc: 'Palloncini, scritte e decorazioni base per dare il tocco festoso.',
    icon: '🎈',
    dettagli: [
      'Palloncini in tono',
      'Scritta evento personalizzata',
      'Allestimento entrata',
    ],
  },
  medio: {
    label: 'Curato',
    desc: 'Centrotavola, fiori freschi e luci ambient per un evento elegante.',
    icon: '✨',
    dettagli: [
      'Centrotavola con fiori',
      'Luci ambient',
      'Allestimento entrata premium',
      'Decorazione angolo foto',
    ],
  },
  premium: {
    label: 'Esclusivo',
    desc: 'Mise en place completa, decoratore in loco, atmosfera da cerimonia.',
    icon: '💎',
    dettagli: [
      'Mise en place professionale',
      'Fiori freschi premium',
      'Decoratore in loco',
      'Setup foto area',
      'Welcome corner',
    ],
  },
} as const;

export function Step5Allestimento({
  state,
  update,
  costi,
  onAvanti,
  onIndietro,
}: Step5AllestimentoProps) {
  // ─── PRESELEZIONE: "Medio" al primo accesso ──────────────────
  useEffect(() => {
    if (state.allestimentoLivello === null && !state.allestimentoNessuno) {
      update({ allestimentoLivello: 'medio', allestimentoNessuno: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid =
    state.allestimentoLivello !== null || state.allestimentoNessuno;

  const scegliLivello = (livello: 'base' | 'medio' | 'premium') => {
    update({
      allestimentoLivello: livello,
      allestimentoNessuno: false,
    });
  };

  const scegliNessuno = () => {
    update({
      allestimentoLivello: null,
      allestimentoNessuno: true,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          className="block mb-3 text-sm font-medium uppercase"
          style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
        >
          Allestimento per il tuo evento
        </label>

        {/* ── 3 card livelli ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {(['base', 'medio', 'premium'] as const).map((livello) => {
            const isSelected =
              !state.allestimentoNessuno &&
              state.allestimentoLivello === livello;
            const isMedio = livello === 'medio';
            const info = LIVELLI_INFO[livello];
            const costo = costi[livello];

            return (
              <button
                key={livello}
                type="button"
                onClick={() => scegliLivello(livello)}
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
                {/* Badge "Più popolare" */}
                {isMedio && (
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                      color: 'var(--cream)',
                      letterSpacing: '0.05em',
                      boxShadow: '0 2px 6px rgba(201, 162, 74, 0.3)',
                    }}
                  >
                    ⭐ Più popolare
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

                <ul
                  className="text-xs space-y-1 mb-3"
                  style={{ color: 'var(--dark-soft)' }}
                >
                  {info.dettagli.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span style={{ color: 'var(--gold)' }}>✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <p
                  className="font-display"
                  style={{
                    color: 'var(--gold-dark)',
                    fontWeight: 600,
                    fontSize: '1.25rem',
                  }}
                >
                  €{costo}
                </p>
              </button>
            );
          })}
        </div>

        {/* ── Opzione "Niente allestimento" ── */}
        <button
          type="button"
          onClick={scegliNessuno}
          className="w-full p-4 rounded-lg text-left transition-all duration-200 flex items-center justify-between"
          style={{
            background: state.allestimentoNessuno
              ? 'var(--gold-subtle)'
              : 'var(--cream)',
            border: `1.5px dashed ${
              state.allestimentoNessuno ? 'var(--gold)' : 'rgba(43, 43, 43, 0.15)'
            }`,
            boxShadow: state.allestimentoNessuno
              ? '0 0 0 3px rgba(201, 162, 74, 0.1)'
              : 'none',
          }}
        >
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>🚫</span>
            <div>
              <h4
                className="font-medium"
                style={{
                  color: state.allestimentoNessuno
                    ? 'var(--gold-dark)'
                    : 'var(--dark)',
                }}
              >
                Niente allestimento
              </h4>
              <p className="text-xs mt-0.5" style={{ color: 'var(--dark-soft)' }}>
                Mi occupo io di decorazioni e setup
              </p>
            </div>
          </div>
          <span
            className="font-display"
            style={{ color: 'var(--dark-soft)', fontWeight: 500 }}
          >
            €0
          </span>
        </button>
      </div>

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
            Vedi riepilogo
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