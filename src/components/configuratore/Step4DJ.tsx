// =====================================================================
// COMPONENTE — Step4DJ
// =====================================================================
// Posizione: src/components/configuratore/Step4DJ.tsx
//
// Step 4: selezione pacchetto DJ (1+) + opzione "Niente DJ".
// =====================================================================

'use client';

import Image from 'next/image';
import type { ConfiguratoreState } from '@/types/configuratore';

export interface PacchettoDjItem {
  id: number;
  nome: string;
  descrizioneBreve: string | null;
  descrizione: string | null;
  oreIncluse: number;
  costo: number;
  fotoUrl: string | null;
  inEvidenza: boolean;
}

interface Step4DJProps {
  state: ConfiguratoreState;
  update: (patch: Partial<ConfiguratoreState>) => void;
  pacchetti: PacchettoDjItem[];
  onAvanti: () => void;
  onIndietro: () => void;
}

export function Step4DJ({
  state,
  update,
  pacchetti,
  onAvanti,
  onIndietro,
}: Step4DJProps) {
  // ID corrente: 0 significa "niente DJ"
  const nessunDj = state.pacchettoDjId === 0;

  return (
    <div className="space-y-6">
      <div>
        <label
          className="block mb-3 text-sm font-medium uppercase"
          style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
        >
          Scegli il DJ per il tuo evento
        </label>

        <div className="space-y-3">
          {/* ── Pacchetti DJ disponibili ── */}
          {pacchetti.map((pacchetto) => {
            const isSelected = state.pacchettoDjId === pacchetto.id;

            return (
              <button
                key={pacchetto.id}
                type="button"
                onClick={() => update({ pacchettoDjId: pacchetto.id })}
                className="w-full p-4 rounded-lg text-left transition-all duration-200 relative"
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
                {/* Badge "Più scelto" se in_evidenza */}
                {pacchetto.inEvidenza && (
                  <div
                    className="absolute -top-2 left-4 px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                      color: 'var(--cream)',
                      letterSpacing: '0.05em',
                      boxShadow: '0 2px 6px rgba(201, 162, 74, 0.3)',
                    }}
                  >
                    ⭐ Consigliato
                  </div>
                )}

                <div className="flex gap-4">
                  {/* Foto pacchetto */}
                  {pacchetto.fotoUrl && (
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-beige-light">
                      <Image
                        src={pacchetto.fotoUrl}
                        alt={pacchetto.nome}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4
                          className="font-display mb-1"
                          style={{
                            fontSize: '1.15rem',
                            fontWeight: 600,
                            color: isSelected ? 'var(--gold-dark)' : 'var(--dark)',
                          }}
                        >
                          {pacchetto.nome}
                        </h4>
                        {pacchetto.descrizioneBreve && (
                          <p
                            className="text-sm"
                            style={{ color: 'var(--dark-soft)', fontWeight: 300, lineHeight: 1.4 }}
                          >
                            {pacchetto.descrizioneBreve}
                          </p>
                        )}
                        <p
                          className="text-xs mt-2"
                          style={{ color: 'var(--dark-soft)', opacity: 0.7 }}
                        >
                          🕐 {pacchetto.oreIncluse} ore incluse
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p
                          className="font-display"
                          style={{
                            color: 'var(--gold-dark)',
                            fontWeight: 600,
                            fontSize: '1.25rem',
                          }}
                        >
                          €{pacchetto.costo}
                        </p>
                      </div>
                    </div>

                    {/* Dettagli espansi quando selezionato */}
                    {isSelected && pacchetto.descrizione && (
                      <div
                        className="mt-3 pt-3 text-xs animate-fade-in whitespace-pre-line"
                        style={{
                          borderTop: '1px solid rgba(201, 162, 74, 0.2)',
                          color: 'var(--dark-soft)',
                          lineHeight: 1.6,
                        }}
                      >
                        {pacchetto.descrizione}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}

          {/* ── Opzione "Niente DJ" ── */}
          <button
            type="button"
            onClick={() => update({ pacchettoDjId: 0 })}
            className="w-full p-4 rounded-lg text-left transition-all duration-200 flex items-center justify-between"
            style={{
              background: nessunDj ? 'var(--gold-subtle)' : 'var(--cream)',
              border: `1.5px dashed ${
                nessunDj ? 'var(--gold)' : 'rgba(43, 43, 43, 0.15)'
              }`,
              boxShadow: nessunDj
                ? '0 0 0 3px rgba(201, 162, 74, 0.1)'
                : 'none',
            }}
          >
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>🚫</span>
              <div>
                <h4
                  className="font-medium"
                  style={{ color: nessunDj ? 'var(--gold-dark)' : 'var(--dark)' }}
                >
                  Niente DJ
                </h4>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--dark-soft)' }}
                >
                  Mi occupo io della musica
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
          disabled={state.pacchettoDjId === null}
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