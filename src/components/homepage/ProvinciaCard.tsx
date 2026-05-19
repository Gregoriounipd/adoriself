// =====================================================================
// COMPONENTE — ProvinciaCard (versione con foto)
// =====================================================================
// Posizione: src/components/homepage/ProvinciaCard.tsx
//
// Stile "Booking.com": foto di sfondo, overlay scuro gradiente,
// testo bianco in primo piano. Hover con scale e ombra.
//
// Due stati:
// 1. ATTIVA: foto a colori, cliccabile, mostra numero sale
// 2. IN ARRIVO: foto desaturata, badge "in arrivo", form notify-me
// =====================================================================

'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notifyProvinciaAction } from '@/lib/actions/notify-province';
import type { Provincia } from '@/types/provincia';

interface ProvinciaCardProps {
  provincia: Provincia;
  index?: number;
}

export function ProvinciaCard({ provincia, index = 0 }: ProvinciaCardProps) {
  if (provincia.attiva) {
    return <CardAttiva provincia={provincia} index={index} />;
  }
  return <CardInArrivo provincia={provincia} index={index} />;
}

// ─── CARD ATTIVA ──────────────────────────────────────────────

function CardAttiva({ provincia, index }: { provincia: Provincia; index: number }) {
  const numSale = provincia.num_sale_disponibili;
  const labelSale = numSale === 1 ? 'sala disponibile' : 'sale disponibili';

  // Fallback se foto mancante: gradiente gold
  const hasFoto = !!provincia.foto_url;

  return (
    <Link
      href={`/sale/${provincia.slug}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      <div
        className="relative h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
        style={{
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Foto di sfondo */}
        {hasFoto ? (
          <Image
            src={provincia.foto_url!}
            alt={`Eventi a ${provincia.provincia}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={index < 3}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
            }}
          />
        )}

        {/* Overlay scuro gradiente dal basso */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.8) 100%)',
          }}
        />

        {/* Hover overlay gold extra */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(201, 162, 74, 0.15) 100%)',
          }}
        />

        {/* Contenuto in primo piano */}
        <div className="relative h-full p-6 md:p-7 flex flex-col justify-between text-white">
          {/* Top: nome provincia */}
          <div>
            <p
              className="text-xs uppercase mb-2 font-medium"
              style={{
                color: 'rgba(255, 253, 248, 0.85)',
                letterSpacing: '0.18em',
              }}
            >
              Veneto
            </p>
            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: 'var(--cream)',
                textShadow: '0 2px 12px rgba(0,0,0,0.3)',
              }}
            >
              {provincia.provincia}
            </h3>
          </div>

          {/* Bottom: contatore sale + freccia */}
          <div className="flex items-end justify-between">
            <div>
              <p
                className="font-display"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  lineHeight: 1,
                  color: 'var(--cream)',
                  textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                }}
              >
                {numSale}
              </p>
              <p
                className="text-xs uppercase mt-1"
                style={{
                  color: 'rgba(255, 253, 248, 0.85)',
                  letterSpacing: '0.12em',
                }}
              >
                {labelSale}
              </p>
            </div>

            {/* Freccia che si muove all'hover */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
              style={{
                background: 'var(--gold)',
                boxShadow: '0 4px 16px rgba(201, 162, 74, 0.4)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7H12M12 7L7 2M12 7L7 12"
                  stroke="var(--cream)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Descrizione sotto la card (non sopra l'immagine) */}
      {provincia.descrizione_breve && (
        <p
          className="text-sm mt-4 px-1 leading-relaxed transition-colors group-hover:text-gold-dark"
          style={{
            color: 'var(--dark-soft)',
            fontWeight: 300,
          }}
        >
          {provincia.descrizione_breve}
        </p>
      )}
    </Link>
  );
}

// ─── CARD IN ARRIVO ───────────────────────────────────────────

function CardInArrivo({ provincia, index }: { provincia: Provincia; index: number }) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'already' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [isPending, startTransition] = useTransition();

  const formatApertura = (dateStr: string | null): string => {
    if (!dateStr) return 'Prossimamente';
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('email', email);
    formData.append('provinciaSlug', provincia.slug);

    startTransition(async () => {
      const result = await notifyProvinciaAction(formData);

      if (result.success) {
        setStatus(result.alreadyRegistered ? 'already' : 'success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMsg(result.error);
      }
    });
  };

  const hasFoto = !!provincia.foto_url;

  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      {/* Card principale con foto desaturata */}
      <div
        className="relative h-72 md:h-80 rounded-2xl overflow-hidden"
        style={{
          boxShadow: '0 4px 16px rgba(43, 43, 43, 0.06)',
        }}
      >
        {/* Foto desaturata di sfondo */}
        {hasFoto ? (
          <Image
            src={provincia.foto_url!}
            alt={`Eventi a ${provincia.provincia} (in arrivo)`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            style={{ filter: 'grayscale(0.7) brightness(0.7)' }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(43, 43, 43, 0.4) 0%, rgba(43, 43, 43, 0.6) 100%)',
            }}
          />
        )}

        {/* Overlay scuro */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.75) 100%)',
          }}
        />

        {/* Contenuto */}
        <div className="relative h-full p-6 md:p-7 flex flex-col justify-between text-white">
          {/* Top: badge in arrivo */}
          <div className="flex items-start justify-between">
            <div>
              <p
                className="text-xs uppercase mb-2 font-medium"
                style={{
                  color: 'rgba(255, 253, 248, 0.7)',
                  letterSpacing: '0.18em',
                }}
              >
                Veneto
              </p>
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: 600,
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  color: 'rgba(255, 253, 248, 0.85)',
                  textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                }}
              >
                {provincia.provincia}
              </h3>
            </div>

            <span
              className="text-xs px-3 py-1 rounded-full uppercase font-medium backdrop-blur-md"
              style={{
                background: 'rgba(255, 253, 248, 0.18)',
                color: 'var(--cream)',
                letterSpacing: '0.1em',
                border: '1px solid rgba(255, 253, 248, 0.25)',
              }}
            >
              In arrivo
            </span>
          </div>

          {/* Bottom: data apertura */}
          <div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M5 2V3M11 2V3M3 6H13M4 4H12C12.5523 4 13 4.44772 13 5V12C13 12.5523 12.5523 13 12 13H4C3.44772 13 3 12.5523 3 12V5C3 4.44772 3.44772 4 4 4Z"
                  stroke="var(--gold-light)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p
                className="text-sm uppercase font-medium"
                style={{
                  color: 'var(--gold-light)',
                  letterSpacing: '0.1em',
                }}
              >
                {formatApertura(provincia.data_apertura_prevista)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form notify-me sotto la card */}
      <div className="mt-4 px-1">
        {/* Descrizione */}
        {provincia.descrizione_breve && (
          <p
            className="text-sm mb-4 leading-relaxed"
            style={{ color: 'var(--dark-soft)', fontWeight: 300 }}
          >
            {provincia.descrizione_breve}
          </p>
        )}

        {/* CTA / Form / Stati */}
        {!showForm && status === 'idle' && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full text-sm py-2.5 px-4 rounded-lg transition-all duration-200 hover:bg-gold-subtle border"
            style={{
              color: 'var(--gold-dark)',
              borderColor: 'rgba(201, 162, 74, 0.3)',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            Avvisami quando apriamo
          </button>
        )}

        {showForm && status === 'idle' && (
          <form onSubmit={handleSubmit} className="space-y-2 animate-fade-in">
            <input
              type="email"
              placeholder="La tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
              className="text-sm"
              style={{ padding: '0.5rem 0.75rem' }}
            />
            <button
              type="submit"
              disabled={isPending}
              className="w-full text-sm py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-60"
              style={{
                background: 'var(--gold)',
                color: 'var(--cream)',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              {isPending ? 'Invio...' : 'Avvisami'}
            </button>
          </form>
        )}

        {status === 'success' && (
          <div
            className="p-3 rounded-lg text-sm animate-fade-in"
            style={{
              background: 'var(--gold-subtle)',
              border: '1px solid rgba(201, 162, 74, 0.3)',
              color: 'var(--gold-dark)',
            }}
          >
            ✨ Perfetto! Ti scriveremo appena apriamo.
          </div>
        )}

        {status === 'already' && (
          <div
            className="p-3 rounded-lg text-sm animate-fade-in"
            style={{
              background: 'rgba(47, 74, 90, 0.06)',
              border: '1px solid rgba(47, 74, 90, 0.2)',
              color: 'var(--blue)',
            }}
          >
            Eri già registrato. A presto!
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-2 animate-fade-in">
            <div
              className="p-3 rounded-lg text-sm"
              style={{
                background: 'rgba(220, 38, 38, 0.06)',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                color: '#991B1B',
              }}
            >
              {errorMsg}
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="text-xs underline"
              style={{ color: 'var(--dark-soft)' }}
            >
              Riprova
            </button>
          </div>
        )}
      </div>
    </div>
  );
}