// =====================================================================
// COMPONENTE — Step1Evento
// =====================================================================
// Posizione: src/components/configuratore/Step1Evento.tsx
//
// Primo step del configuratore: tipo evento, numero invitati, date.
// =====================================================================

'use client';

import { useMemo } from 'react';
import {
  type ConfiguratoreState,
  type TipoEvento,
  TIPI_EVENTO_LABEL,
  TIPI_EVENTO_EMOJI,
} from '@/types/configuratore';

interface Step1EventoProps {
  state: ConfiguratoreState;
  update: (patch: Partial<ConfiguratoreState>) => void;
  /** Capienza max della sala (per warning soft) */
  capienzaMax?: number | null;
  /** Callback quando l'utente clicca "Avanti" */
  onAvanti: () => void;
}

export function Step1Evento({
  state,
  update,
  capienzaMax,
  onAvanti,
}: Step1EventoProps) {
  // Data minima: oggi + 7 giorni
  const dataMinima = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  }, []);

  // Warning capienza: numero invitati > capienza sala
  const warningCapienza =
    capienzaMax && state.numPersone && state.numPersone > capienzaMax;

  // Validazione: tutti i campi obbligatori compilati?
  const isValid =
    state.tipoEvento !== null &&
    state.numPersone !== null &&
    state.numPersone >= 10 &&
    state.dataPreferita !== null;

  const tipiList = Object.keys(TIPI_EVENTO_LABEL) as TipoEvento[];

  return (
    <div className="space-y-8">
      {/* ── Tipo evento ── */}
      <div>
        <label
          className="block mb-3 text-sm font-medium uppercase"
          style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
        >
          Che evento stai organizzando?
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {tipiList.map((tipo) => {
            const isSelected = state.tipoEvento === tipo;
            return (
              <button
                key={tipo}
                type="button"
                onClick={() => update({ tipoEvento: tipo })}
                className="flex items-center gap-3 p-4 rounded-lg transition-all duration-200 text-left"
                style={{
                  background: isSelected ? 'var(--gold-subtle)' : 'var(--cream)',
                  border: `1.5px solid ${isSelected ? 'var(--gold)' : 'rgba(201, 162, 74, 0.2)'}`,
                  boxShadow: isSelected
                    ? '0 0 0 3px rgba(201, 162, 74, 0.1)'
                    : 'none',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>
                  {TIPI_EVENTO_EMOJI[tipo]}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isSelected ? 'var(--gold-dark)' : 'var(--dark)',
                  }}
                >
                  {TIPI_EVENTO_LABEL[tipo]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Numero invitati ── */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <label
            className="text-sm font-medium uppercase"
            style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
          >
            Quanti invitati?
          </label>
          {state.numPersone !== null && (
            <span
              className="font-display text-2xl"
              style={{ color: 'var(--gold-dark)', fontWeight: 600 }}
            >
              {state.numPersone}
              <span className="text-sm font-body ml-1" style={{ color: 'var(--dark-soft)' }}>
                persone
              </span>
            </span>
          )}
        </div>

        <input
          type="range"
          min="10"
          max="300"
          step="5"
          value={state.numPersone ?? 50}
          onChange={(e) =>
            update({ numPersone: parseInt(e.target.value, 10) })
          }
          style={{
            ['--range-progress' as string]: `${
              ((state.numPersone ?? 50 - 10) / 290) * 100
            }%`,
          }}
        />

        <div
          className="flex justify-between text-xs mt-1.5"
          style={{ color: 'var(--dark-soft)', opacity: 0.6 }}
        >
          <span>10</span>
          <span>150</span>
          <span>300+</span>
        </div>

        {/* Warning capienza soft */}
        {warningCapienza && (
          <div
            className="mt-4 p-3 rounded-lg text-sm flex items-start gap-2 animate-fade-in"
            style={{
              background: 'rgba(218, 165, 32, 0.08)',
              border: '1px solid rgba(218, 165, 32, 0.3)',
              color: 'var(--dark)',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>⚠️</span>
            <div>
              <p style={{ fontWeight: 500 }}>
                Capienza massima della sala: {capienzaMax} persone
              </p>
              <p
                className="mt-1"
                style={{ color: 'var(--dark-soft)', fontWeight: 300 }}
              >
                Continua pure — valuteremo insieme la fattibilità in fase di
                consulenza.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Data preferita ── */}
      <div>
        <label
          className="block mb-3 text-sm font-medium uppercase"
          style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
        >
          Data preferita
        </label>
        <input
          type="date"
          min={dataMinima}
          value={state.dataPreferita ?? ''}
          onChange={(e) => update({ dataPreferita: e.target.value || null })}
          className="w-full"
        />
        <p
          className="text-xs mt-1.5"
          style={{ color: 'var(--dark-soft)', opacity: 0.7 }}
        >
          Almeno 7 giorni da oggi
        </p>
      </div>

      {/* ── Data alternativa (opzionale) ── */}
      <div>
        <label
          className="block mb-3 text-sm font-medium uppercase"
          style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
        >
          Data alternativa{' '}
          <span style={{ opacity: 0.6, textTransform: 'none' }}>
            (opzionale)
          </span>
        </label>
        <input
          type="date"
          min={dataMinima}
          value={state.dataAlternativa ?? ''}
          onChange={(e) =>
            update({ dataAlternativa: e.target.value || null })
          }
          className="w-full"
        />
      </div>

      {/* ── Bottone avanti ── */}
      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={onAvanti}
          disabled={!isValid}
          className="button-primary disabled:opacity-40 disabled:cursor-not-allowed"
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