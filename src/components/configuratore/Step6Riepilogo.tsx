// =====================================================================
// COMPONENTE — Step6Riepilogo (v2 con form)
// =====================================================================
// Posizione: src/components/configuratore/Step6Riepilogo.tsx
// SOSTITUISCI il file esistente.
//
// Aggiunge: form contatto inline che appare al click su "Richiedi consulenza".
// =====================================================================

'use client';

import { useState } from 'react';
import type { ConfiguratoreState } from '@/types/configuratore';
import { TIPI_EVENTO_LABEL, TIPI_EVENTO_EMOJI } from '@/types/configuratore';
import type { CalcoloEvento } from '@/lib/calculator';
import type { Sala } from '@/types/sala';
import { FormContatto } from './FormContatto';

interface Step6RiepilogoProps {
  state: ConfiguratoreState;
  sala: Sala;
  calcolo: CalcoloEvento;
  onIndietro: () => void;
  /** Cleanup localStorage dopo invio successo */
  onLeadInviato?: () => void;
}

export function Step6Riepilogo({
  state,
  sala,
  calcolo,
  onIndietro,
  onLeadInviato,
}: Step6RiepilogoProps) {
  const [mostraForm, setMostraForm] = useState(false);

  const formatData = (iso: string | null): string => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatEuro = (n: number): string => `€${n.toLocaleString('it-IT')}`;

  return (
    <div className="space-y-6">
      {/* ── Header riepilogo evento ── */}
      <div
        className="p-5 rounded-xl"
        style={{
          background:
            'linear-gradient(135deg, var(--gold-subtle) 0%, rgba(201, 162, 74, 0.08) 100%)',
          border: '1px solid rgba(201, 162, 74, 0.25)',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="text-3xl flex-shrink-0 mt-1"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(201,162,74,0.2))' }}
          >
            {state.tipoEvento ? TIPI_EVENTO_EMOJI[state.tipoEvento] : '🎉'}
          </div>
          <div className="flex-1">
            <p
              className="text-xs uppercase mb-1"
              style={{ color: 'var(--gold-dark)', letterSpacing: '0.15em' }}
            >
              Il tuo evento
            </p>
            <h4
              className="font-display mb-1"
              style={{
                fontSize: '1.4rem',
                fontWeight: 600,
                color: 'var(--dark)',
                letterSpacing: '-0.01em',
              }}
            >
              {state.tipoEvento ? TIPI_EVENTO_LABEL[state.tipoEvento] : 'Evento'}{' '}
              a {sala.nome}
            </h4>
            <div
              className="flex flex-wrap gap-x-3 gap-y-1 text-sm"
              style={{ color: 'var(--dark-soft)' }}
            >
              <span>👥 {state.numPersone} persone</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>📅 {formatData(state.dataPreferita)}</span>
              {state.dataAlternativa && (
                <>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span style={{ opacity: 0.7 }}>
                    alternativa: {formatData(state.dataAlternativa)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── SEZIONE FORNITORI ── */}
      <SezioneCosti
        titolo="Fornitori"
        sottotitolo="Pagamento diretto al fornitore"
        icon="🏠"
        voci={calcolo.fornitori.voci.map((v) => ({
          nome: v.nome,
          dettaglio: v.dettaglio,
          valore: formatEuro(v.costo),
          stima: v.isStima,
        }))}
        subtotaleLabel="Subtotale fornitori"
        subtotaleValore={formatEuro(calcolo.fornitori.subtotale)}
        colore="blue"
      />

      {/* ── SEZIONE SERVIZI ADORI ── */}
      {calcolo.serviziAdori.voci.length > 0 && (
        <SezioneCosti
          titolo="Servizi Adoriself"
          sottotitolo="Allestimento, bar, gestione"
          icon="✨"
          voci={calcolo.serviziAdori.voci.map((v) => ({
            nome: v.nome,
            dettaglio: v.dettaglio,
            valore: formatEuro(v.costo),
          }))}
          subtotaleLabel="Subtotale servizi"
          subtotaleValore={formatEuro(calcolo.serviziAdori.subtotale)}
          colore="gold"
        />
      )}

      {/* ── SEZIONE CONSULENZA + IVA ── */}
      <div
        className="p-5 rounded-xl space-y-3"
        style={{
          background: 'var(--cream)',
          border: '1px solid rgba(201, 162, 74, 0.2)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontSize: '1.2rem' }}>📋</span>
          <h4
            className="font-display"
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--dark)',
            }}
          >
            Consulenza e IVA
          </h4>
        </div>

        <div className="space-y-2 text-sm">
          <RigaCosto
            label={`Consulenza Adoriself (${calcolo.consulenzaPct}%)`}
            valore={formatEuro(calcolo.consulenza)}
          />
          <p
            className="text-xs"
            style={{
              color: 'var(--dark-soft)',
              fontStyle: 'italic',
              opacity: 0.8,
            }}
          >
            Coordinamento fornitori, gestione operativa, planning evento
          </p>
          <RigaCosto label="IVA 22%" valore={formatEuro(calcolo.iva)} />
        </div>
      </div>

      {/* ── TOTALE FINALE ── */}
      <div
        className="p-6 rounded-2xl"
        style={{
          background:
            'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
          boxShadow: '0 8px 32px rgba(201, 162, 74, 0.3)',
        }}
      >
        <div className="flex items-baseline justify-between mb-2">
          <p
            className="text-xs uppercase font-medium"
            style={{
              color: 'rgba(255, 253, 248, 0.85)',
              letterSpacing: '0.2em',
            }}
          >
            Totale evento (stima)
          </p>
          <p
            className="text-xs"
            style={{ color: 'rgba(255, 253, 248, 0.7)' }}
          >
            tutto incluso
          </p>
        </div>
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 3.5rem)',
            fontWeight: 600,
            color: 'var(--cream)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {formatEuro(calcolo.totaleStimato)}
        </p>
        <div
          className="mt-4 pt-4 flex justify-between text-sm"
          style={{ borderTop: '1px solid rgba(255, 253, 248, 0.2)' }}
        >
          <span style={{ color: 'rgba(255, 253, 248, 0.85)' }}>
            di cui ad Adoriself
          </span>
          <span style={{ color: 'var(--cream)', fontWeight: 600 }}>
            {formatEuro(calcolo.totaleAdoriself)}
          </span>
        </div>
      </div>

      {/* ── DISCLAIMER TRASPARENZA ── */}
      <div
        className="p-4 rounded-lg text-sm space-y-2"
        style={{
          background: 'rgba(47, 74, 90, 0.04)',
          border: '1px solid rgba(47, 74, 90, 0.15)',
          color: 'var(--dark-soft)',
        }}
      >
        <p className="flex items-start gap-2">
          <span style={{ fontSize: '1.1rem' }}>ℹ️</span>
          <span style={{ lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--dark)' }}>Prezzi indicativi.</strong>{' '}
            I fornitori (sala, catering, DJ) vengono pagati direttamente da te.
            Le cifre indicate sono stime: il prezzo finale si conferma nella
            consulenza gratuita, dove valutiamo insieme tutti i dettagli.
          </span>
        </p>
        <p className="flex items-start gap-2 pt-1">
          <span style={{ fontSize: '1.1rem' }}>💼</span>
          <span style={{ lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--dark)' }}>IVA</strong> calcolata su
            servizi Adoriself e consulenza (modello consulenza professionale).
          </span>
        </p>
      </div>

      {/* ── FORM CONTATTO (toggle on click) ── */}
      {mostraForm ? (
        <div
          className="p-5 rounded-2xl"
          style={{
            background: 'var(--cream)',
            border: '1.5px solid var(--gold)',
            boxShadow: '0 8px 32px rgba(201, 162, 74, 0.15)',
          }}
        >
          <FormContatto
            state={state}
            calcolo={calcolo}
            salaId={sala.id}
            salaNome={sala.nome}
            onSuccess={onLeadInviato}
          />
        </div>
      ) : (
        /* ── Bottoni iniziali ── */
        <div className="pt-2 flex flex-col sm:flex-row justify-between gap-3">
          <button
            type="button"
            onClick={onIndietro}
            className="button-ghost flex items-center justify-center gap-2"
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
            Modifica
          </button>

          <button
            type="button"
            onClick={() => setMostraForm(true)}
            className="button-primary"
          >
            <span className="flex items-center justify-center gap-2">
              Richiedi consulenza gratuita
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
      )}

      {/* Bottone "modifica" anche con form aperto */}
      {mostraForm && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setMostraForm(false)}
            className="text-xs underline"
            style={{ color: 'var(--dark-soft)' }}
          >
            ← Modifica configurazione
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Sotto-componenti ───────────────────────────────────────────

interface SezioneCostiProps {
  titolo: string;
  sottotitolo: string;
  icon: string;
  voci: Array<{
    nome: string;
    dettaglio?: string;
    valore: string;
    stima?: boolean;
  }>;
  subtotaleLabel: string;
  subtotaleValore: string;
  colore: 'gold' | 'blue';
}

function SezioneCosti({
  titolo,
  sottotitolo,
  icon,
  voci,
  subtotaleLabel,
  subtotaleValore,
  colore,
}: SezioneCostiProps) {
  const accent =
    colore === 'gold' ? 'rgba(201, 162, 74, 0.2)' : 'rgba(47, 74, 90, 0.2)';

  return (
    <div
      className="p-5 rounded-xl"
      style={{ background: 'var(--cream)', border: `1px solid ${accent}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.2rem' }}>{icon}</span>
          <div>
            <h4
              className="font-display"
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--dark)',
                lineHeight: 1.2,
              }}
            >
              {titolo}
            </h4>
            <p
              className="text-xs"
              style={{ color: 'var(--dark-soft)', opacity: 0.7 }}
            >
              {sottotitolo}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {voci.map((v, i) => (
          <div key={i}>
            <RigaCosto label={v.nome} valore={v.valore} stima={v.stima} />
            {v.dettaglio && (
              <p
                className="text-xs ml-1"
                style={{
                  color: 'var(--dark-soft)',
                  opacity: 0.7,
                  fontStyle: 'italic',
                }}
              >
                {v.dettaglio}
              </p>
            )}
          </div>
        ))}
      </div>

      <div
        className="flex justify-between mt-3 pt-3"
        style={{ borderTop: `1px solid ${accent}` }}
      >
        <span style={{ color: 'var(--dark)', fontWeight: 500 }}>
          {subtotaleLabel}
        </span>
        <span
          className="font-display"
          style={{
            color: 'var(--gold-dark)',
            fontWeight: 600,
            fontSize: '1.1rem',
          }}
        >
          {subtotaleValore}
        </span>
      </div>
    </div>
  );
}

function RigaCosto({
  label,
  valore,
  stima,
}: {
  label: string;
  valore: string;
  stima?: boolean;
}) {
  return (
    <div className="flex justify-between items-baseline">
      <span style={{ color: 'var(--dark-soft)' }}>
        {label}
        {stima && (
          <span
            className="text-xs ml-1 px-1.5 py-0.5 rounded"
            style={{
              background: 'rgba(218, 165, 32, 0.1)',
              color: 'var(--gold-dark)',
            }}
          >
            stima
          </span>
        )}
      </span>
      <span style={{ color: 'var(--dark)' }}>{valore}</span>
    </div>
  );
}