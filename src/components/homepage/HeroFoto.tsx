// =====================================================================
// COMPONENTE — HeroFoto
// =====================================================================
// Posizione: src/components/homepage/HeroFoto.tsx
//
// Galleria foto laterale per l'hero della homepage.
// Cross-fade automatico ogni 5 secondi + leggero zoom Ken Burns.
//
// COME AGGIUNGERE FOTO:
// 1. Carica foto su Supabase Storage (bucket public)
// 2. Copia l'URL pubblico
// 3. Aggiungi un oggetto all'array FOTO_HERO sotto
//
// IMPORTANTE: foto idealmente 1600px lato lungo, formato webp/jpg q80
// =====================================================================

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ─── CONFIGURAZIONE FOTO ──────────────────────────────────────
// Aggiungi qui le tue foto. Ordine = ordine di rotazione.
const FOTO_HERO: Array<{
  url: string;
  alt: string;
}> = [
  // Sostituisci questi placeholder con i tuoi URL Supabase
  {
    url: 'https://coeauemtoodganzfygkn.supabase.co/storage/v1/object/sign/hero-foto/fotofuochi.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGFmMWQwNy00MzE2LTQwMTEtOGY1NC00YTNjMzlkOWE1YzQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJoZXJvLWZvdG8vZm90b2Z1b2NoaS5qcGciLCJpYXQiOjE3NzkwOTc4MDQsImV4cCI6MTgxMDYzMzgwNH0.yf9JY8F6DB8QPb_KDhNtnzjuNk8oOqGXaP5tqXDOhA8',
    alt: 'Foto di fuochi d\'artificio durante una festa all\'aperto',
  },
  {
    url: 'https://coeauemtoodganzfygkn.supabase.co/storage/v1/object/sign/hero-foto/tiziecheballano1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGFmMWQwNy00MzE2LTQwMTEtOGY1NC00YTNjMzlkOWE1YzQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJoZXJvLWZvdG8vdGl6aWVjaGViYWxsYW5vMS5qcGciLCJpYXQiOjE3NzkwOTc4MzUsImV4cCI6MTgxMDYzMzgzNX0.bDR5UkRI_WFYYSmFKGFAmsWQJhdW_pbKl2YM2G3BuIE',
    alt: 'Foto ragazze che ballano',
  },
  {
    url: 'https://coeauemtoodganzfygkn.supabase.co/storage/v1/object/sign/hero-foto/fototavolaallestita.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZGFmMWQwNy00MzE2LTQwMTEtOGY1NC00YTNjMzlkOWE1YzQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJoZXJvLWZvdG8vZm90b3Rhdm9sYWFsbGVzdGl0YS5qcGciLCJpYXQiOjE3NzkwOTc4NTIsImV4cCI6MTgxMDYzMzg1Mn0.L8WeiddB8WC8zUPEJrfWTFcYu7GDV-xabUD2LLgtZLg',
    alt: 'Foto di una tavola allestita per un evento, con decorazioni floreali e candele',
  },
];

// Tempo tra una foto e l'altra (millisecondi)
const INTERVALLO_MS = 5000;

// ─── COMPONENTE ───────────────────────────────────────────────

export function HeroFoto() {
  const [indiceCorrente, setIndiceCorrente] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotazione foto
  useEffect(() => {
    if (paused || FOTO_HERO.length <= 1) return;

    const timer = setInterval(() => {
      setIndiceCorrente((i) => (i + 1) % FOTO_HERO.length);
    }, INTERVALLO_MS);

    return () => clearInterval(timer);
  }, [paused]);

  // Pausa al click (toggle)
  const togglePausa = () => setPaused((p) => !p);

  // Cambio manuale via puntini
  const vaiAFoto = (idx: number) => {
    setIndiceCorrente(idx);
    // Resetta il timer ripartendo: setto paused brevemente e riprende
    setPaused(true);
    setTimeout(() => setPaused(false), 100);
  };

  if (FOTO_HERO.length === 0) return null;

  return (
    <div className="relative w-full max-w-xl mx-auto animate-fade-up">
      {/* ── Contenitore foto ── */}
      <div
        className="relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer"
        style={{
          boxShadow:
            '0 20px 60px rgba(43, 43, 43, 0.15), 0 4px 16px rgba(201, 162, 74, 0.1)',
          border: '1px solid rgba(201, 162, 74, 0.2)',
        }}
        onClick={togglePausa}
        aria-label={paused ? 'Riprendi rotazione foto' : 'Pausa rotazione foto'}
      >
        {/* Tutte le foto sovrapposte, opacity controlla quale è visibile */}
        {FOTO_HERO.map((foto, idx) => {
          const isActive = idx === indiceCorrente;
          return (
            <div
              key={foto.url}
              className="absolute inset-0 transition-opacity"
              style={{
                opacity: isActive ? 1 : 0,
                // Cross-fade da 1.2s (smooth)
                transitionDuration: '1200ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                // Z-index: foto attiva sopra, le altre sotto
                zIndex: isActive ? 2 : 1,
              }}
            >
              <div
                className="relative w-full h-full"
                style={{
                  // Ken Burns: leggero zoom (1.0 → 1.08) durante i 5s di visualizzazione
                  // L'animazione parte solo quando foto è attiva
                  animation: isActive && !paused
                    ? `kenBurns ${INTERVALLO_MS}ms ease-out forwards`
                    : 'none',
                }}
              >
                <Image
                  src={foto.url}
                  alt={foto.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 640px"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            </div>
          );
        })}

        {/* Overlay sottile dal basso per profondità */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(180deg, transparent 60%, rgba(43,43,43,0.08) 100%)',
          }}
        />

        {/* Indicatore pausa (visibile solo se in pausa) */}
        {paused && (
          <div
            className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md animate-fade-in"
            style={{
              background: 'rgba(255, 253, 248, 0.92)',
              color: 'var(--dark)',
              letterSpacing: '0.05em',
              border: '1px solid rgba(201, 162, 74, 0.3)',
            }}
          >
            ⏸ In pausa
          </div>
        )}
      </div>

      {/* ── Indicatori (puntini) ── */}
      {FOTO_HERO.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {FOTO_HERO.map((_, idx) => (
            <button
              key={idx}
              onClick={() => vaiAFoto(idx)}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === indiceCorrente ? '24px' : '8px',
                height: '8px',
                background:
                  idx === indiceCorrente
                    ? 'var(--gold)'
                    : 'rgba(201, 162, 74, 0.3)',
                cursor: 'pointer',
              }}
              aria-label={`Vai alla foto ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── Keyframes Ken Burns (inline per non aggiungere CSS globale) ── */}
      <style jsx>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.08) translate(-1%, -1%);
          }
        }
      `}</style>
    </div>
  );
}