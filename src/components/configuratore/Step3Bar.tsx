// =====================================================================
// COMPONENTE — Step3Bar
// =====================================================================
// Posizione: src/components/configuratore/Step3Bar.tsx
//
// Step 3: slider drink per persona + checkbox barista opzionale.
// =====================================================================

'use client';

import type { ConfiguratoreState } from '@/types/configuratore';

interface Step3BarProps {
  state: ConfiguratoreState;
  update: (patch: Partial<ConfiguratoreState>) => void;
  config: {
    costoDrink: number;
    feeDrinkPercentuale: number;
    baristaCosto: number;
    drinkMin: number;
    drinkMax: number;
  };
  onAvanti: () => void;
  onIndietro: () => void;
}

export function Step3Bar({
  state,
  update,
  config,
  onAvanti,
  onIndietro,
}: Step3BarProps) {
  // Numero drink corrente (default da config se non settato)
  const drinkCorrente = state.drinkPerPersona;

  // Calcoli live
  const drinkTotali = state.numPersone
    ? drinkCorrente * state.numPersone
    : 0;
  const costoDrinkTotale = drinkTotali * config.costoDrink;
  const feeDrink = (costoDrinkTotale * config.feeDrinkPercentuale) / 100;
  const costoBar = costoDrinkTotale + feeDrink + (state.barista ? config.baristaCosto : 0);

  // Label intensità bar
  const intensitaBar = (() => {
    if (drinkCorrente <= 2) return { label: 'Bar leggero', emoji: '🍷' };
    if (drinkCorrente <= 4) return { label: 'Bar standard', emoji: '🥂' };
    if (drinkCorrente <= 6) return { label: 'Bar abbondante', emoji: '🍹' };
    return { label: 'Bar premium', emoji: '🎉' };
  })();

  return (
    <div className="space-y-8">
      {/* ── Slider drink per persona ── */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <label
            className="text-sm font-medium uppercase"
            style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
          >
            Quanti drink a persona?
          </label>
          <span
            className="font-display"
            style={{
              color: 'var(--gold-dark)',
              fontWeight: 600,
              fontSize: '1.5rem',
            }}
          >
            {drinkCorrente}
            <span
              className="font-body text-sm ml-1"
              style={{ color: 'var(--dark-soft)' }}
            >
              {drinkCorrente === 1 ? 'drink' : 'drink'}
            </span>
          </span>
        </div>

        <input
          type="range"
          min={config.drinkMin}
          max={config.drinkMax}
          step="1"
          value={drinkCorrente}
          onChange={(e) =>
            update({ drinkPerPersona: parseInt(e.target.value, 10) })
          }
          style={{
            ['--range-progress' as string]: `${
              ((drinkCorrente - config.drinkMin) /
                (config.drinkMax - config.drinkMin)) *
              100
            }%`,
          }}
        />

        <div
          className="flex justify-between text-xs mt-1.5"
          style={{ color: 'var(--dark-soft)', opacity: 0.6 }}
        >
          <span>{config.drinkMin}</span>
          <span>{Math.round((config.drinkMin + config.drinkMax) / 2)}</span>
          <span>{config.drinkMax}+</span>
        </div>

        {/* Intensità bar */}
        <div
          className="mt-3 flex items-center gap-2 text-sm"
          style={{ color: 'var(--dark-soft)' }}
        >
          <span style={{ fontSize: '1.1rem' }}>{intensitaBar.emoji}</span>
          <span>{intensitaBar.label}</span>
        </div>
      </div>

      {/* ── Riepilogo costo bar ── */}
      {state.numPersone && (
        <div
          className="p-4 rounded-lg space-y-2"
          style={{
            background: 'var(--gold-subtle)',
            border: '1px solid rgba(201, 162, 74, 0.2)',
          }}
        >
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--dark-soft)' }}>
              Drink totali ({state.numPersone} pax × {drinkCorrente})
            </span>
            <span style={{ color: 'var(--dark)' }}>
              {drinkTotali} drink
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--dark-soft)' }}>
              Costo bevande
            </span>
            <span style={{ color: 'var(--dark)' }}>
              €{Math.round(costoDrinkTotale).toLocaleString('it-IT')}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: 'var(--dark-soft)' }}>
              Gestione bar ({config.feeDrinkPercentuale}%)
            </span>
            <span style={{ color: 'var(--dark)' }}>
              €{Math.round(feeDrink).toLocaleString('it-IT')}
            </span>
          </div>
          {state.barista && (
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--dark-soft)' }}>Barista (5h)</span>
              <span style={{ color: 'var(--dark)' }}>
                €{config.baristaCosto}
              </span>
            </div>
          )}
          <div
            className="flex justify-between pt-2 mt-2"
            style={{ borderTop: '1px solid rgba(201, 162, 74, 0.2)' }}
          >
            <span
              style={{ color: 'var(--dark)', fontWeight: 500 }}
            >
              Totale bar
            </span>
            <span
              className="font-display"
              style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: '1.1rem' }}
            >
              €{Math.round(costoBar).toLocaleString('it-IT')}
            </span>
          </div>
        </div>
      )}

      {/* ── Checkbox barista ── */}
      <div>
        <label
          className="flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all"
          style={{
            background: state.barista ? 'var(--gold-subtle)' : 'var(--cream)',
            border: `1.5px solid ${
              state.barista ? 'var(--gold)' : 'rgba(201, 162, 74, 0.2)'
            }`,
          }}
        >
          <input
            type="checkbox"
            checked={state.barista}
            onChange={(e) => update({ barista: e.target.checked })}
            className="mt-0.5 w-5 h-5 cursor-pointer"
            style={{ accentColor: 'var(--gold)' }}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4
                className="font-medium"
                style={{ color: 'var(--dark)' }}
              >
                Aggiungi un barista professionista
              </h4>
              <span
                className="font-display text-sm"
                style={{ color: 'var(--gold-dark)', fontWeight: 600 }}
              >
                +€{config.baristaCosto}
              </span>
            </div>
            <p
              className="text-sm"
              style={{ color: 'var(--dark-soft)', fontWeight: 300 }}
            >
              5 ore di servizio · Cocktail e drink curati ad arte
            </p>
          </div>
        </label>
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
          className="button-primary"
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