// =====================================================================
// SERVER ACTION — Crea Lead (v2 - senza Google Calendar)
// =====================================================================
// Posizione: src/lib/actions/crea-lead.ts
// SOSTITUISCI il file esistente.
//
// Modifiche rispetto a v1:
// - Rimossa chiamata a createCalendarEvent
// - Rimosso UPDATE data_call_prenotata
// - Rimosso import google-calendar (non più necessario)
// =====================================================================

'use server';

import { headers } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendLeadEmail } from '@/lib/email';
import type { ConfiguratoreState } from '@/types/configuratore';
import { TIPI_EVENTO_LABEL } from '@/types/configuratore';
import type { CalcoloEvento } from '@/lib/calculator';

// ─── Tipi ─────────────────────────────────────────────────────

export interface DatiContatto {
  nome: string;
  email: string;
  telefono: string;
  privacy: boolean;
}

export type CreaLeadResult =
  | { success: true; leadId: number }
  | { success: false; error: string };

// ─── Validazione ──────────────────────────────────────────────

function validaContatto(dati: DatiContatto): string | null {
  const nome = dati.nome.trim();
  if (nome.length < 2) {
    return 'Inserisci nome e cognome';
  }

  const email = dati.email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Inserisci una email valida';
  }

  const telefono = dati.telefono.trim().replace(/\s/g, '');
  const telefonoRegex = /^(\+?[0-9]{2})?[0-9]{8,13}$/;
  if (!telefonoRegex.test(telefono)) {
    return 'Inserisci un numero di telefono valido';
  }

  if (!dati.privacy) {
    return "Devi accettare l'informativa privacy per procedere";
  }

  return null;
}

// ─── Helper: costruisce breakdown JSON per DB ─────────────────

function buildBreakdownJson(
  state: ConfiguratoreState,
  calcolo: CalcoloEvento,
  salaNome: string
): Record<string, any> {
  return {
    configurazione: {
      tipo_evento: state.tipoEvento,
      tipo_evento_label: state.tipoEvento
        ? TIPI_EVENTO_LABEL[state.tipoEvento]
        : null,
      num_persone: state.numPersone,
      data_preferita: state.dataPreferita,
      data_alternativa: state.dataAlternativa,
      sala_nome: salaNome,
    },
    fornitori: {
      voci: calcolo.fornitori.voci,
      subtotale: calcolo.fornitori.subtotale,
    },
    servizi_adori: {
      voci: calcolo.serviziAdori.voci,
      subtotale: calcolo.serviziAdori.subtotale,
    },
    consulenza: {
      percentuale: calcolo.consulenzaPct,
      importo: calcolo.consulenza,
    },
    iva: calcolo.iva,
    totale_adoriself: calcolo.totaleAdoriself,
    totale_stimato: calcolo.totaleStimato,
    scelte_utente: {
      catering: {
        livello: state.cateringLivello,
        valore_per_persona: state.cateringValorePerPersona,
      },
      bar: {
        drink_per_persona: state.drinkPerPersona,
        barista: state.barista,
      },
      dj: {
        pacchetto_id: state.pacchettoDjId,
      },
      allestimento: {
        livello: state.allestimentoLivello,
        nessuno: state.allestimentoNessuno,
      },
    },
  };
}

// ─── SERVER ACTION PRINCIPALE ─────────────────────────────────

export async function creaLeadAction(args: {
  contatto: DatiContatto;
  state: ConfiguratoreState;
  calcolo: CalcoloEvento;
  salaId: number;
  salaNome: string;
}): Promise<CreaLeadResult> {
  // 1) Validazione
  const errore = validaContatto(args.contatto);
  if (errore) {
    return { success: false, error: errore };
  }

  // 2) Cattura ip + user-agent (anti-spam / audit)
  let ipAddress: string | null = null;
  let userAgent: string | null = null;
  try {
    const hdrs = await headers();
    ipAddress =
      hdrs.get('x-forwarded-for')?.split(',')[0].trim() ??
      hdrs.get('x-real-ip') ??
      null;
    userAgent = hdrs.get('user-agent');
  } catch {
    // headers non disponibili in alcuni contesti, OK
  }

  // 3) Costruisci breakdown JSON
  const breakdown = buildBreakdownJson(
    args.state,
    args.calcolo,
    args.salaNome
  );

  // 4) Salva in DB
  const supabase = createAdminClient();
  const { data: leadData, error: dbError } = await supabase
    .from('leads')
    .insert({
      nome: args.contatto.nome.trim(),
      email: args.contatto.email.trim().toLowerCase(),
      telefono: args.contatto.telefono.trim(),
      tipo_evento: args.state.tipoEvento,
      num_persone: args.state.numPersone,
      data_evento: args.state.dataPreferita,
      data_alternativa: args.state.dataAlternativa,
      prezzo_stimato: args.calcolo.totaleStimato,
      budget_min: Math.round(args.calcolo.totaleStimato * 0.9),
      budget_max: Math.round(args.calcolo.totaleStimato * 1.1),
      sala_id: args.salaId,
      breakdown_calcolo: breakdown,
      stato: 'nuovo',
      source: 'configuratore',
      configuratore_completato: true,
      ip_address: ipAddress,
      user_agent: userAgent,
    })
    .select('id')
    .single();

  if (dbError || !leadData) {
    console.error('[creaLeadAction] DB error:', dbError?.message);
    return {
      success: false,
      error: 'Errore durante il salvataggio. Riprova o contattaci direttamente.',
    };
  }

  const leadId = leadData.id as number;

  // 5) Email (Resend) — failure non blocca
  try {
    await sendLeadEmail(
      {
        nome: args.contatto.nome.trim(),
        email: args.contatto.email.trim().toLowerCase(),
        telefono: args.contatto.telefono.trim(),
      },
      {
        tipo_evento: args.state.tipoEvento
          ? TIPI_EVENTO_LABEL[args.state.tipoEvento]
          : 'Evento',
        num_persone: args.state.numPersone ?? 0,
        budget_min: Math.round(args.calcolo.totaleStimato * 0.9),
        budget_max: Math.round(args.calcolo.totaleStimato * 1.1),
      }
    );
  } catch (err) {
    console.error('[creaLeadAction] Email error (non-blocking):', err);
  }

  // NOTA: Google Calendar rimosso. Gli appuntamenti vengono prenotati
  // dall'utente sulla pagina /grazie tramite embed Cal.com.

  return { success: true, leadId };
}