/*src/components/ConfiguratorStep.tsx*/
'use client';

import React from 'react';
import { EventConfig, EVENT_TYPES, LOCATIONS } from '@/lib/pricing';

interface ConfiguratorStepProps {
  config: EventConfig;
  setConfig: (config: EventConfig) => void;
  step: number;
}

/* ── Icone SVG leggere ─────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const cateringDetails: Record<string, { icon: string; desc: string; price: number }> = {
  base:    { icon: '◇', desc: 'Buffet semplice, bevande incluse',       price: 15 },
  medio:   { icon: '◈', desc: 'Menù curato, vini selezionati',          price: 25 },
  premium: { icon: '◆', desc: 'Chef privato, servizio al tavolo',       price: 40 },
};

const extraServices = [
  {
    key: 'fotografo' as keyof EventConfig,
    title: 'Fotografo professionista',
    desc: 'Reportage completo della serata',
    price: '€ 200',
  },
  {
    key: 'allestimento' as keyof EventConfig,
    title: 'Allestimento floreale',
    desc: 'Composizioni su misura per il tuo evento',
    price: '€ 250',
  },
];

/* ── Intestazione step riutilizzabile ──────────────────────── */
function StepHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p
        className="text-xs uppercase mb-2"
        style={{ color: 'var(--gold)', letterSpacing: '0.22em', fontWeight: 500 }}
      >
        {label}
      </p>
      <h2
        className="font-display"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.2 }}
      >
        {title}
      </h2>
      <div className="divider-gold mt-4" />
    </div>
  );
}

/* ── Card di selezione generica ────────────────────────────── */
function SelectCard({
  selected,
  onClick,
  children,
  className = '',
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl transition-all duration-200 ${className}`}
      style={{
        border: selected
          ? '1.5px solid var(--gold)'
          : '1.5px solid rgba(201,162,74,0.22)',
        background: selected
          ? 'linear-gradient(135deg, rgba(201,162,74,0.08) 0%, rgba(201,162,74,0.04) 100%)'
          : 'var(--cream)',
        boxShadow: selected ? '0 4px 20px rgba(201,162,74,0.15)' : 'none',
        transform: selected ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      {children}
    </button>
  );
}

export function ConfiguratorStep({ config, setConfig, step }: ConfiguratorStepProps) {
  const updateConfig = (updates: Partial<EventConfig>) => {
    setConfig({ ...config, ...updates });
  };

  switch (step) {

    /* ── Step 1: Tipo evento ── */
    case 1:
      return (
        <div>
          <StepHeader label="Passo 1 di 6" title="Che tipo di evento stai organizzando?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EVENT_TYPES.map(type => {
              const selected = config.tipo_evento === type;
              return (
                <SelectCard key={type} selected={selected} onClick={() => updateConfig({ tipo_evento: type })}>
                  <div className="flex items-center justify-between px-5 py-4">
                    <span
                      className="font-medium"
                      style={{ color: selected ? 'var(--gold-dark)' : 'var(--dark)', fontSize: '0.9375rem' }}
                    >
                      {type}
                    </span>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        border: selected ? '1.5px solid var(--gold)' : '1.5px solid rgba(201,162,74,0.3)',
                        background: selected ? 'var(--gold)' : 'transparent',
                        color: 'white',
                      }}
                    >
                      {selected && <CheckIcon />}
                    </div>
                  </div>
                </SelectCard>
              );
            })}
          </div>
        </div>
      );

    /* ── Step 2: Numero persone ── */
    case 2:
      return (
        <div>
          <StepHeader label="Passo 2 di 6" title="Quante persone parteciperanno?" />

          {/* Display numero */}
          <div
            className="rounded-xl p-8 mb-6 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(201,162,74,0.07) 0%, rgba(47,74,90,0.04) 100%)',
              border: '1px solid rgba(201,162,74,0.18)',
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: 'clamp(4rem, 10vw, 6rem)',
                fontWeight: 300,
                color: 'var(--gold)',
                lineHeight: 1,
                fontStyle: 'italic',
              }}
            >
              {config.num_persone}
            </span>
            <p
              className="mt-2 text-sm uppercase tracking-widest"
              style={{ color: 'rgba(43,43,43,0.45)', letterSpacing: '0.18em' }}
            >
              ospiti
            </p>
          </div>

          {/* Slider */}
          <div className="mb-6 px-1">
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={config.num_persone}
              onChange={e => updateConfig({ num_persone: parseInt(e.target.value) })}
              style={{
                '--range-progress': `${((config.num_persone - 10) / 490) * 100}%`,
              } as React.CSSProperties}
            />
            <div
              className="flex justify-between mt-2 text-xs"
              style={{ color: 'rgba(43,43,43,0.35)', fontWeight: 300 }}
            >
              <span>10</span>
              <span>500</span>
            </div>
          </div>

          {/* Quick select */}
          <div className="flex gap-2 flex-wrap">
            {[25, 50, 100, 150, 200, 300].map(val => (
              <button
                key={val}
                onClick={() => updateConfig({ num_persone: val })}
                className="transition-all duration-150"
                style={{
                  padding: '6px 16px',
                  borderRadius: '99px',
                  border: config.num_persone === val
                    ? '1.5px solid var(--gold)'
                    : '1.5px solid rgba(201,162,74,0.25)',
                  background: config.num_persone === val ? 'var(--gold-subtle)' : 'transparent',
                  color: config.num_persone === val ? 'var(--gold-dark)' : 'rgba(43,43,43,0.6)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                }}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      );

    /* ── Step 3: Location ── */
    case 3:
      return (
        <div>
          <StepHeader label="Passo 3 di 6" title="Dove vuoi organizzare l'evento?" />
          <div className="space-y-3">
            {LOCATIONS.map(loc => {
              const selected = config.location === loc.value;
              return (
                <SelectCard key={loc.value} selected={selected} onClick={() => updateConfig({ location: loc.value })}>
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          border: selected ? '1.5px solid var(--gold)' : '1.5px solid rgba(201,162,74,0.3)',
                          background: selected ? 'var(--gold)' : 'transparent',
                          color: 'white',
                        }}
                      >
                        {selected && <CheckIcon />}
                      </div>
                      <span
                        className="font-medium"
                        style={{ color: selected ? 'var(--gold-dark)' : 'var(--dark)', fontSize: '0.9375rem' }}
                      >
                        {loc.name}
                      </span>
                    </div>
                    <span
                      className="font-display"
                      style={{
                        color: selected ? 'var(--gold)' : 'rgba(43,43,43,0.45)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      € {loc.price.toLocaleString('it-IT')}
                    </span>
                  </div>
                </SelectCard>
              );
            })}
          </div>
        </div>
      );

    /* ── Step 4: Catering ── */
    case 4:
      return (
        <div>
          <StepHeader label="Passo 4 di 6" title="Quale catering preferisci?" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['base', 'medio', 'premium'] as const).map(level => {
              const selected = config.catering === level;
              const details = cateringDetails[level];
              return (
                <SelectCard key={level} selected={selected} onClick={() => updateConfig({ catering: level })}>
                  <div className="p-6 text-center">
                    {/* Selezione indicator */}
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200"
                      style={{
                        border: selected ? '1.5px solid var(--gold)' : '1.5px solid rgba(201,162,74,0.25)',
                        background: selected ? 'var(--gold)' : 'transparent',
                        color: 'white',
                      }}
                    >
                      {selected && <CheckIcon />}
                    </div>

                    <p
                      className="font-display capitalize mb-1"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: selected ? 'var(--gold-dark)' : 'var(--dark)',
                      }}
                    >
                      {level}
                    </p>

                    <p
                      className="text-xs mb-4"
                      style={{ color: 'rgba(43,43,43,0.5)', fontWeight: 300, lineHeight: 1.5 }}
                    >
                      {details.desc}
                    </p>

                    <div
                      className="font-display"
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: selected ? 'var(--gold)' : 'rgba(43,43,43,0.4)',
                      }}
                    >
                      € {details.price}
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'rgba(43,43,43,0.35)', letterSpacing: '0.06em' }}>
                      A PERSONA
                    </p>
                  </div>
                </SelectCard>
              );
            })}
          </div>
        </div>
      );

    /* ── Step 5: DJ ── */
    case 5:
      return (
        <div>
          <StepHeader label="Passo 5 di 6" title="Vuoi un DJ per la serata?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sì */}
            <SelectCard selected={config.dj} onClick={() => updateConfig({ dj: true })}>
              <div className="p-7 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: config.dj ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'rgba(201,162,74,0.1)',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="4" stroke={config.dj ? 'white' : 'var(--gold)'} strokeWidth="1.5"/>
                    <circle cx="10" cy="10" r="8" stroke={config.dj ? 'white' : 'var(--gold)'} strokeWidth="1" strokeDasharray="3 2"/>
                  </svg>
                </div>
                <p className="font-display font-semibold mb-1" style={{ color: config.dj ? 'var(--gold-dark)' : 'var(--dark)', fontSize: '1.1rem' }}>
                  Sì, aggiungi DJ
                </p>
                <p className="text-sm" style={{ color: 'rgba(43,43,43,0.5)', fontWeight: 300 }}>
                  + € 400
                </p>
              </div>
            </SelectCard>

            {/* No */}
            <SelectCard selected={!config.dj} onClick={() => updateConfig({ dj: false })}>
              <div className="p-7 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: !config.dj ? 'rgba(47,74,90,0.12)' : 'rgba(201,162,74,0.06)',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 10h8" stroke={!config.dj ? 'var(--blue)' : 'rgba(43,43,43,0.3)'} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p
                  className="font-display font-semibold mb-1"
                  style={{ color: !config.dj ? 'var(--blue)' : 'rgba(43,43,43,0.5)', fontSize: '1.1rem' }}
                >
                  No, grazie
                </p>
                <p className="text-sm" style={{ color: 'rgba(43,43,43,0.35)', fontWeight: 300 }}>
                  Musica in sottofondo
                </p>
              </div>
            </SelectCard>
          </div>
        </div>
      );

    /* ── Step 6: Extra ── */
    case 6:
      return (
        <div>
          <StepHeader label="Passo 6 di 6" title="Servizi aggiuntivi" />
          <p className="mb-6 text-sm" style={{ color: 'rgba(43,43,43,0.5)', fontWeight: 300 }}>
            Aggiungi i servizi che rendono il tuo evento indimenticabile.
          </p>
          <div className="space-y-4">
            {extraServices.map(service => {
              const checked = config[service.key] as boolean;
              return (
                <button
                  key={service.key}
                  onClick={() => updateConfig({ [service.key]: !checked })}
                  className="w-full text-left transition-all duration-200"
                  style={{
                    border: checked
                      ? '1.5px solid var(--gold)'
                      : '1.5px solid rgba(201,162,74,0.22)',
                    background: checked
                      ? 'linear-gradient(135deg, rgba(201,162,74,0.07) 0%, rgba(201,162,74,0.03) 100%)'
                      : 'var(--cream)',
                    borderRadius: '12px',
                    boxShadow: checked ? '0 4px 20px rgba(201,162,74,0.12)' : 'none',
                    transform: checked ? 'translateY(-1px)' : 'translateY(0)',
                  }}
                >
                  <div className="flex items-center gap-4 px-5 py-4">
                    {/* Checkbox custom */}
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        border: checked ? '1.5px solid var(--gold)' : '1.5px solid rgba(201,162,74,0.3)',
                        background: checked ? 'var(--gold)' : 'transparent',
                        color: 'white',
                        borderRadius: '5px',
                      }}
                    >
                      {checked && <CheckIcon />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="font-medium"
                        style={{
                          color: checked ? 'var(--gold-dark)' : 'var(--dark)',
                          fontSize: '0.9375rem',
                        }}
                      >
                        {service.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(43,43,43,0.45)', fontWeight: 300 }}>
                        {service.desc}
                      </p>
                    </div>

                    <span
                      className="font-display flex-shrink-0"
                      style={{
                        color: checked ? 'var(--gold)' : 'rgba(43,43,43,0.4)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {service.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );

    default:
      return null;
  }
}