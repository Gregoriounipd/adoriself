// =====================================================================
// COMPONENTE — StickyPriceBar
// =====================================================================
// Posizione: src/components/configuratore/StickyPriceBar.tsx
//
// Bottom bar sticky che mostra la stima prezzo in tempo reale.
// Appare solo quando il primo step è completato (num persone definito).
// =====================================================================

'use client';

interface StickyPriceBarProps {
  /** Mostrare o no la barra */
  visible: boolean;
  /** Prezzo stimato (€). Null se non ancora calcolato */
  prezzoStimato: number | null;
  /** Etichetta sotto il prezzo (es. "stima evento", "completa configurazione") */
  etichetta?: string;
  /** Cosa fa il bottone destro */
  ctaLabel: string;
  /** Click sul bottone destro */
  onCtaClick: () => void;
  /** Disabilita il bottone */
  ctaDisabled?: boolean;
}

export function StickyPriceBar({
  visible,
  prezzoStimato,
  etichetta = 'stima evento',
  ctaLabel,
  onCtaClick,
  ctaDisabled = false,
}: StickyPriceBarProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 animate-fade-up"
      style={{
        background: 'rgba(255, 253, 248, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(201, 162, 74, 0.25)',
        boxShadow: '0 -4px 24px rgba(43, 43, 43, 0.08)',
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Prezzo */}
        <div>
          <p
            className="text-xs uppercase"
            style={{
              color: 'var(--dark-soft)',
              letterSpacing: '0.1em',
              opacity: 0.7,
            }}
          >
            {etichetta}
          </p>
          {prezzoStimato !== null ? (
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: 600,
                color: 'var(--gold-dark)',
                lineHeight: 1,
              }}
            >
              €{prezzoStimato.toLocaleString('it-IT')}
            </p>
          ) : (
            <p
              className="font-display"
              style={{
                fontSize: '1.5rem',
                fontWeight: 500,
                color: 'var(--dark-soft)',
                lineHeight: 1,
                fontStyle: 'italic',
              }}
            >
              ...
            </p>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onCtaClick}
          disabled={ctaDisabled}
          className="button-primary disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          <span className="flex items-center gap-2">
            {ctaLabel}
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