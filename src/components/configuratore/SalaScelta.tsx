// =====================================================================
// COMPONENTE — SalaScelta
// =====================================================================
// Posizione: src/components/configuratore/SalaScelta.tsx
//
// Card riepilogo della sala scelta in alto al configuratore.
// Mostra: foto, nome, città, capienza. Link "cambia sala" per tornare.
// =====================================================================

import Link from 'next/link';
import Image from 'next/image';
import type { Sala } from '@/types/sala';
import { formatCapienza, formatTipoSala } from '@/types/sala';

interface SalaSceltaProps {
  sala: Sala;
}

export function SalaScelta({ sala }: SalaSceltaProps) {
  const foto =
    (sala.galleria_urls && sala.galleria_urls[0]) ||
    sala.foto_copertina_url ||
    null;

  // Slug provincia per il link "torna indietro"
  const provinciaSlug = sala.provincia.toLowerCase();

  return (
    <div
      className="rounded-2xl overflow-hidden mb-8"
      style={{
        background: 'var(--cream)',
        border: '1px solid rgba(201, 162, 74, 0.2)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Foto */}
        <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 bg-beige-light">
          {foto ? (
            <Image
              src={foto}
              alt={sala.nome}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, var(--beige-warm) 0%, var(--beige) 100%)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.3 }}>
                <path
                  d="M6 36V12C6 9.79 7.79 8 10 8H38C40.21 8 42 9.79 42 12V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36Z"
                  stroke="var(--gold-dark)"
                  strokeWidth="2"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <p
              className="text-xs uppercase mb-1"
              style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}
            >
              Stai configurando per
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--dark)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              {sala.nome}
            </h2>

            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm"
              style={{ color: 'var(--dark-soft)' }}
            >
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 11C8 8.5 10 7 10 4.5C10 2.5 8 1 6 1S2 2.5 2 4.5C2 7 4 8.5 6 11Z"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <circle cx="6" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1" />
                </svg>
                {sala.citta}
              </span>

              {sala.capienza_totale && (
                <>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{formatCapienza(sala)}</span>
                </>
              )}

              {sala.tipo_sala && (
                <>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{formatTipoSala(sala.tipo_sala)}</span>
                </>
              )}
            </div>
          </div>

          {/* Cambia sala */}
          <Link
            href={`/sale/${provinciaSlug}`}
            className="inline-flex items-center gap-1 text-sm mt-3 transition-colors hover:text-gold"
            style={{ color: 'var(--dark-soft)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M8 9L5 6L8 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Cambia sala
          </Link>
        </div>
      </div>
    </div>
  );
}