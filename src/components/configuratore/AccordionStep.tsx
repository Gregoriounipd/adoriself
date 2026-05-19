// =====================================================================
// COMPONENTE — AccordionStep
// =====================================================================
// Posizione: src/components/configuratore/AccordionStep.tsx
//
// Wrapper visivo per ogni step del configuratore.
// Espandibile/collassabile, mostra stato (attivo, completato, in attesa).
// =====================================================================

'use client';

import { ReactNode } from 'react';

interface AccordionStepProps {
  numero: number;
  titolo: string;
  /** Step attivo (espanso) */
  attivo: boolean;
  /** Step completato (check verde) */
  completato: boolean;
  /** Riepilogo da mostrare quando collassato (es. "80 persone · 15 giugno") */
  riepilogo?: string;
  /** Click sul header → riapre lo step */
  onClick?: () => void;
  /** Disabilita interazione (step futuri non ancora sbloccati) */
  disabilitato?: boolean;
  children: ReactNode;
}

export function AccordionStep({
  numero,
  titolo,
  attivo,
  completato,
  riepilogo,
  onClick,
  disabilitato = false,
  children,
}: AccordionStepProps) {
  const canClick = !disabilitato && !attivo && onClick;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--cream)',
        border: `1px solid ${
          attivo ? 'rgba(201, 162, 74, 0.4)' : 'rgba(201, 162, 74, 0.18)'
        }`,
        boxShadow: attivo
          ? '0 8px 32px rgba(201, 162, 74, 0.12)'
          : 'var(--shadow-soft)',
      }}
    >
      {/* ── Header ── */}
      <button
        type="button"
        onClick={canClick ? onClick : undefined}
        disabled={!canClick}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left transition-colors"
        style={{
          cursor: canClick ? 'pointer' : 'default',
          opacity: disabilitato ? 0.5 : 1,
        }}
      >
        {/* Numero o check */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display text-sm transition-all duration-300"
          style={{
            background: completato
              ? 'var(--gold)'
              : attivo
                ? 'var(--gold-subtle)'
                : 'rgba(43, 43, 43, 0.05)',
            color: completato ? 'var(--cream)' : 'var(--dark)',
            border: `1.5px solid ${
              completato
                ? 'var(--gold-dark)'
                : attivo
                  ? 'var(--gold)'
                  : 'rgba(43, 43, 43, 0.1)'
            }`,
            fontWeight: 600,
          }}
        >
          {completato ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7L5.5 10.5L12 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            numero
          )}
        </div>

        {/* Titolo + riepilogo */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-display"
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--dark)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}
          >
            {titolo}
          </h3>
          {!attivo && riepilogo && (
            <p
              className="text-sm mt-1 truncate"
              style={{ color: 'var(--dark-soft)' }}
            >
              {riepilogo}
            </p>
          )}
        </div>

        {/* Icona stato (freccia) */}
        {!attivo && !disabilitato && (
          <div
            className="flex-shrink-0 transition-transform duration-300"
            style={{
              color: 'var(--gold)',
              transform: 'rotate(-90deg)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 5L7 8.5L10.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </button>

      {/* ── Body (espandibile) ── */}
      {attivo && (
        <div
          className="px-5 md:px-6 pb-6 pt-2 animate-fade-in"
          style={{ borderTop: '1px solid rgba(201, 162, 74, 0.12)' }}
        >
          <div className="pt-6">{children}</div>
        </div>
      )}
    </div>
  );
}