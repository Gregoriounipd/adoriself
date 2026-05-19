// =====================================================================
// COMPONENTE — SalaCard (versione completa)
// =====================================================================
// Posizione: src/components/sale/SalaCard.tsx
//
// Card sala in stile Booking/Airbnb:
// - Carosello foto con frecce (se >1 foto)
// - Click sulla foto → Lightbox full-screen
// - Tag dinamici (capienza, tipo evento, feature)
// - CTA "Configura evento" → /configura?sala=ID
// =====================================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Sala } from '@/types/sala';
import {
  formatPrezzoSala,
  formatCapienza,
  formatTipoSala,
} from '@/types/sala';
import { getTagSala, getTagStyle } from '@/lib/sala-tags';
import { LightboxFoto } from './LightboxFoto';

interface SalaCardProps {
  sala: Sala;
  index?: number;
}

export function SalaCard({ sala, index = 0 }: SalaCardProps) {
  // ─── State carosello + lightbox ───────────────────────────────
  const [fotoIndex, setFotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ─── Gallery foto ─────────────────────────────────────────────
  // Priorità: galleria_urls (array), poi foto_copertina_url, poi nessuna
  const fotos: string[] = (() => {
    if (sala.galleria_urls && sala.galleria_urls.length > 0) {
      return sala.galleria_urls;
    }
    if (sala.foto_copertina_url) {
      return [sala.foto_copertina_url];
    }
    return [];
  })();

  const hasMultipleFotos = fotos.length > 1;
  const fotoCorrente = fotos[fotoIndex] ?? null;

  // ─── Tag dinamici ─────────────────────────────────────────────
  const tags = getTagSala(sala);

  // ─── URL configuratore ────────────────────────────────────────
  const configuraHref = `/configura?sala=${sala.id}`;

  // ─── Handlers ─────────────────────────────────────────────────
  const handleNextFoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFotoIndex((i) => (i + 1) % fotos.length);
  };

  const handlePrevFoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFotoIndex((i) => (i - 1 + fotos.length) % fotos.length);
  };

  const handleOpenLightbox = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fotos.length > 0) {
      setLightboxOpen(true);
    }
  };

  // ─── Render ───────────────────────────────────────────────────
  return (
    <>
      <article
        className="group h-full rounded-2xl overflow-hidden bg-cream transition-all duration-300 hover:shadow-card-hover animate-fade-up"
        style={{
          border: '1px solid rgba(201, 162, 74, 0.18)',
          boxShadow: 'var(--shadow-card)',
          animationDelay: `${0.05 + index * 0.04}s`,
        }}
      >
        {/* ─── FOTO con carousel ─────────────────────────── */}
        <div
          className="relative aspect-[4/3] overflow-hidden bg-beige-light cursor-pointer"
          onClick={handleOpenLightbox}
        >
          {fotoCorrente ? (
            <>
              <Image
                src={fotoCorrente}
                alt={sala.nome}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                key={fotoCorrente} // forza re-fade quando cambia foto
              />

              {/* Frecce carosello (solo se >1 foto) */}
              {hasMultipleFotos && (
                <>
                  <button
                    onClick={handlePrevFoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                    style={{
                      background: 'rgba(255, 253, 248, 0.95)',
                      color: 'var(--dark)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                    aria-label="Foto precedente"
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
                  </button>

                  <button
                    onClick={handleNextFoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                    style={{
                      background: 'rgba(255, 253, 248, 0.95)',
                      color: 'var(--dark)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                    aria-label="Foto successiva"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M5 3L9 7L5 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Indicatori puntini */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {fotos.map((_, i) => (
                      <div
                        key={i}
                        className="rounded-full transition-all duration-200"
                        style={{
                          width: i === fotoIndex ? '20px' : '6px',
                          height: '6px',
                          background:
                            i === fotoIndex
                              ? 'var(--cream)'
                              : 'rgba(255, 253, 248, 0.5)',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            // Placeholder se nessuna foto
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, var(--beige-warm) 0%, var(--beige) 100%)',
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                style={{ opacity: 0.3 }}
              >
                <path
                  d="M6 36V12C6 9.79 7.79 8 10 8H38C40.21 8 42 9.79 42 12V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36Z"
                  stroke="var(--gold-dark)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle
                  cx="16"
                  cy="20"
                  r="3"
                  stroke="var(--gold-dark)"
                  strokeWidth="2"
                />
                <path
                  d="M42 30L33 22L13 40"
                  stroke="var(--gold-dark)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* Badge tipo sala (basso destra sulla foto) */}
          {sala.tipo_sala && (
            <div
              className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md pointer-events-none"
              style={{
                background: 'rgba(255, 253, 248, 0.92)',
                color: 'var(--dark)',
                letterSpacing: '0.02em',
              }}
            >
              {formatTipoSala(sala.tipo_sala)}
            </div>
          )}
        </div>

        {/* ─── INFO SOTTO LA FOTO ───────────────────────── */}
        <div className="p-5">
          {/* Tag dinamici */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, i) => {
                const style = getTagStyle(tag.variant);
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: style.background,
                      color: style.color,
                      border: `1px solid ${style.border}`,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tag.icon && <span>{tag.icon}</span>}
                    <span>{tag.label}</span>
                  </span>
                );
              })}
            </div>
          )}

          {/* Nome sala */}
          <h3
            className="font-display mb-1 transition-colors group-hover:text-gold-dark"
            style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              lineHeight: 1.2,
              color: 'var(--dark)',
              letterSpacing: '-0.01em',
            }}
          >
            {sala.nome}
          </h3>

          {/* Città + capienza */}
          <div
            className="flex items-center gap-2 text-sm mb-4"
            style={{ color: 'var(--dark-soft)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 11C8 8.5 10 7 10 4.5C10 2.5 8 1 6 1S2 2.5 2 4.5C2 7 4 8.5 6 11Z"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="6" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span>{sala.citta}</span>
            {sala.capienza_totale && (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{formatCapienza(sala)}</span>
              </>
            )}
          </div>

          {/* Descrizione breve (se presente) */}
          {sala.descrizione && (
            <p
              className="text-sm mb-4 line-clamp-2"
              style={{
                color: 'var(--dark-soft)',
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              {sala.descrizione}
            </p>
          )}

          {/* Footer: prezzo + CTA Configura */}
          <div
            className="flex items-end justify-between pt-3"
            style={{ borderTop: '1px solid rgba(201, 162, 74, 0.15)' }}
          >
            <div>
              <p
                className="text-xs uppercase mb-1"
                style={{
                  color: 'var(--dark-soft)',
                  letterSpacing: '0.1em',
                  opacity: 0.7,
                }}
              >
                Prezzo sala
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--gold-dark)',
                  lineHeight: 1,
                }}
              >
                {formatPrezzoSala(sala)}
              </p>
            </div>

            {/* CTA Configura */}
            <Link
              href={configuraHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                color: 'var(--cream)',
                boxShadow: '0 2px 8px rgba(201, 162, 74, 0.3)',
                letterSpacing: '0.02em',
              }}
            >
              Configura
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7H12M12 7L7 2M12 7L7 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      {/* ─── LIGHTBOX ─────────────────────────────────── */}
      {lightboxOpen && (
        <LightboxFoto
          fotos={fotos}
          startIndex={fotoIndex}
          nomeSala={sala.nome}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}