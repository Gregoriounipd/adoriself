// =====================================================================
// COMPONENTE — LightboxFoto
// =====================================================================
// Posizione: src/components/sale/LightboxFoto.tsx
//
// Modal full-screen per navigare la galleria foto di una sala.
// Apertura: click su foto della SalaCard
// Navigazione: frecce on-screen + tastiera (← → ESC)
// =====================================================================

'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface LightboxFotoProps {
  /** URL delle foto da mostrare */
  fotos: string[];
  /** Indice della foto iniziale */
  startIndex?: number;
  /** Nome sala per alt text */
  nomeSala: string;
  /** Callback chiusura */
  onClose: () => void;
}

export function LightboxFoto({
  fotos,
  startIndex = 0,
  nomeSala,
  onClose,
}: LightboxFotoProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // Navigazione
  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % fotos.length);
  }, [fotos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + fotos.length) % fotos.length);
  }, [fotos.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, onClose]);

  // Blocca lo scroll del body quando il lightbox è aperto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (fotos.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ background: 'rgba(43, 43, 43, 0.95)' }}
      onClick={onClose}
    >
      {/* Bottone chiudi */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          background: 'rgba(255, 253, 248, 0.1)',
          color: 'var(--cream)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 253, 248, 0.2)',
        }}
        aria-label="Chiudi galleria"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M4 4L14 14M14 4L4 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Contatore */}
      {fotos.length > 1 && (
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full text-sm"
          style={{
            background: 'rgba(255, 253, 248, 0.1)',
            color: 'var(--cream)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 253, 248, 0.15)',
          }}
        >
          {currentIndex + 1} / {fotos.length}
        </div>
      )}

      {/* Foto principale */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[85vh] mx-6 my-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={fotos[currentIndex]}
          alt={`${nomeSala} - foto ${currentIndex + 1}`}
          fill
          sizes="100vw"
          className="object-contain animate-scale-in"
          priority
        />
      </div>

      {/* Freccia precedente */}
      {fotos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: 'rgba(255, 253, 248, 0.15)',
            color: 'var(--cream)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 253, 248, 0.2)',
          }}
          aria-label="Foto precedente"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 4L6 10L12 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Freccia successiva */}
      {fotos.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: 'rgba(255, 253, 248, 0.15)',
            color: 'var(--cream)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 253, 248, 0.2)',
          }}
          aria-label="Foto successiva"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M8 4L14 10L8 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Hint tastiera */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs"
        style={{ color: 'rgba(255, 253, 248, 0.5)' }}
      >
        ← → per navigare · ESC per chiudere
      </div>
    </div>
  );
}