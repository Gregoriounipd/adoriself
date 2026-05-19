// =====================================================================
// PAGINA — /grazie (v2 con Cal.com)
// =====================================================================
// Posizione: src/app/grazie/page.tsx
// SOSTITUISCI il file esistente.
//
// Aggiunge: embed Cal.com per prenotare la call subito dopo il lead.
// Recupera nome/email del lead dal DB per pre-compilare Cal.com.
// =====================================================================

import Link from 'next/link';
import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/admin';
import { CalcomEmbed } from '@/components/grazie/CalcomEmbed';

export const metadata: Metadata = {
  title: 'Richiesta ricevuta — Adoriself',
  description: 'La tua richiesta di consulenza è stata ricevuta.',
};

interface PageProps {
  searchParams: Promise<{ lead?: string }>;
}

export default async function GraziePage({ searchParams }: PageProps) {
  const { lead: leadIdParam } = await searchParams;
  const leadId = leadIdParam ? parseInt(leadIdParam, 10) : null;

  // ── Recupera dati lead per pre-compilare Cal.com ──────────────
  let nome: string | undefined;
  let email: string | undefined;
  let tipoEventoLabel: string | undefined;

  if (leadId && !isNaN(leadId)) {
    try {
      const supabase = createAdminClient();
      const { data } = await supabase
        .from('leads')
        .select('nome, email, breakdown_calcolo')
        .eq('id', leadId)
        .single();

      if (data) {
        nome = data.nome as string;
        email = data.email as string;
        // Estrai tipo evento dal breakdown JSON
        const breakdown = data.breakdown_calcolo as any;
        tipoEventoLabel = breakdown?.configurazione?.tipo_evento_label;
      }
    } catch (err) {
      // Se non riusciamo a leggere il lead, l'embed funziona comunque senza pre-fill
      console.warn('[GraziePage] errore lettura lead:', err);
    }
  }

  // Note pre-compilate per il form Cal.com
  const note = tipoEventoLabel
    ? `Consulenza per: ${tipoEventoLabel}. Riferimento richiesta #${leadId ?? '—'}`
    : `Consulenza Adoriself — Riferimento richiesta #${leadId ?? '—'}`;

  return (
    <main className="min-h-screen bg-pattern">
      {/* ── Header minimale ── */}
      <header
        style={{
          background: 'rgba(255, 253, 248, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201, 162, 74, 0.2)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-5 h-5 rotate-45 rounded-sm flex-shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              }}
            />
            <h1
              className="font-display text-xl"
              style={{
                fontWeight: 600,
                color: 'var(--dark)',
                letterSpacing: '-0.01em',
              }}
            >
              Adori Self
            </h1>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* ── Card conferma ── */}
        <div
          className="rounded-2xl p-8 md:p-12 text-center mb-10 animate-fade-up"
          style={{
            background: 'var(--cream)',
            border: '1px solid rgba(201, 162, 74, 0.25)',
            boxShadow: '0 12px 48px rgba(43, 43, 43, 0.08)',
          }}
        >
          {/* Icona check */}
          <div className="relative inline-block mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
              style={{
                background:
                  'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
                boxShadow: '0 8px 32px rgba(201, 162, 74, 0.35)',
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 44 44"
                fill="none"
                className="animate-scale-in"
              >
                <path
                  d="M10 22L18 30L34 14"
                  stroke="var(--cream)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(201, 162, 74, 0.2)',
                transform: 'scale(1.4)',
                top: 0, left: 0, right: 0, bottom: 0,
              }}
            />
          </div>

          <p
            className="text-xs uppercase mb-2 font-medium"
            style={{ color: 'var(--gold)', letterSpacing: '0.25em' }}
          >
            Richiesta ricevuta
          </p>

          <h1
            className="font-display mb-3"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--dark)',
            }}
          >
            Perfetto{nome ? `, ${nome.split(' ')[0]}` : ''}!
          </h1>

          <div className="divider-gold mx-auto mb-4" />

          <p
            className="text-base mb-2"
            style={{
              color: 'var(--dark-soft)',
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            La tua configurazione è stata salvata.
          </p>

          {leadId && (
            <p
              className="text-sm"
              style={{ color: 'var(--dark-soft)', opacity: 0.6 }}
            >
              Riferimento richiesta:{' '}
              <span
                className="font-mono"
                style={{ color: 'var(--gold-dark)', fontWeight: 500 }}
              >
                #{leadId}
              </span>
            </p>
          )}
        </div>

        {/* ── Sezione Cal.com: prenota la call ── */}
        <div className="mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="divider-gold" />
              <p
                className="text-xs uppercase font-medium"
                style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
              >
                Prossimo passo
              </p>
              <div className="divider-gold" />
            </div>

            <h2
              className="font-display mb-2"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: 'var(--dark)',
              }}
            >
              Prenota la tua consulenza gratuita
            </h2>

            <p
              className="text-base max-w-xl mx-auto"
              style={{
                color: 'var(--dark-soft)',
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Scegli il momento più comodo per te. Durante la call di 30 minuti
              definiamo insieme tutti i dettagli del tuo evento.
            </p>
          </div>

          {/* Embed Cal.com */}
          <CalcomEmbed nome={nome} email={email} note={note} />
        </div>

        {/* ── Info finale ── */}
        <div
          className="rounded-xl p-5 text-center mb-8"
          style={{
            background: 'rgba(47, 74, 90, 0.04)',
            border: '1px solid rgba(47, 74, 90, 0.15)',
          }}
        >
          <p
            className="text-sm"
            style={{ color: 'var(--dark-soft)', lineHeight: 1.6 }}
          >
            <strong style={{ color: 'var(--dark)' }}>
              Preferisci essere ricontattato?
            </strong>{' '}
            Nessun problema, ti chiamiamo entro 24 ore al numero che ci hai
            lasciato.
          </p>
        </div>

        {/* ── CTA torna home ── */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-gold"
            style={{ color: 'var(--dark-soft)' }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 12L1 7L5 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Torna alla home
          </Link>
        </div>

        {/* Footer minimale */}
        <p
          className="text-xs mt-12 text-center"
          style={{ color: 'var(--dark-soft)', opacity: 0.6, lineHeight: 1.5 }}
        >
          Per qualsiasi domanda scrivici a{' '}
          <a
            href="mailto:info@adoriself.it"
            className="underline"
            style={{ color: 'var(--gold-dark)' }}
          >
            info@adoriself.it
          </a>
        </p>
      </div>
    </main>
  );
}