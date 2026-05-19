// =====================================================================
// CALCULATOR — Stima evento
// =====================================================================
// Posizione: src/lib/calculator.ts
//
// Calcola il prezzo totale dell'evento in base allo stato configuratore.
// Logica: fornitori + servizi Adori + consulenza + IVA.
// =====================================================================

import type { ConfiguratoreState } from '@/types/configuratore';
import type { Sala } from '@/types/sala';
import type { ConfigPricing, FeeScaglione } from './load-pricing-config';

export interface PacchettoDj {
  id: number;
  nome: string;
  costo: number;
}

export interface VoceCosto {
  nome: string;
  costo: number;
  dettaglio?: string;
  isStima?: boolean;
}

export interface CalcoloEvento {
  // Sezioni
  fornitori: {
    voci: VoceCosto[];
    subtotale: number;
  };
  serviziAdori: {
    voci: VoceCosto[];
    subtotale: number;
  };

  // Subtotale completo (per scaglione fee)
  subtotaleEvento: number;

  // Consulenza
  consulenzaPct: number;
  consulenza: number;

  // IVA
  iva: number;

  // Totali finali
  totaleAdoriself: number;        // ciò che paga ad Adori
  totaleStimato: number;          // tutto incluso (Adori + fornitori)
}

/**
 * Trova lo scaglione applicabile per un dato subtotale.
 */
function trovaScaglione(
  subtotale: number,
  scaglioni: FeeScaglione[]
): FeeScaglione {
  const ordinati = [...scaglioni].sort((a, b) => a.ordine - b.ordine);
  return (
    ordinati.find((s) => subtotale <= s.subtotaleFinoA) ??
    ordinati[ordinati.length - 1]
  );
}

const round = (n: number) => Math.round(n);

/**
 * Calcola la stima evento.
 * Restituisce null se mancano dati base (numero persone, ecc.).
 */
export function calcolaEvento(
  state: ConfiguratoreState,
  sala: Sala,
  config: ConfigPricing,
  scaglioni: FeeScaglione[],
  pacchettoDj: PacchettoDj | null
): CalcoloEvento | null {
  // Validazione minima
  if (!state.numPersone) return null;

  const persone = state.numPersone;

  // ─── FORNITORI ────────────────────────────────────────────────
  const fornitoriVoci: VoceCosto[] = [];

  // Sala
  if (sala.prezzo_base) {
    fornitoriVoci.push({
      nome: 'Sala',
      costo: sala.prezzo_base,
      dettaglio: sala.nome,
      isStima: true,
    });
  }

  // Catering (solo se livello scelto)
  if (state.cateringLivello && state.cateringValorePerPersona) {
    const costoCatering = persone * state.cateringValorePerPersona;
    fornitoriVoci.push({
      nome: 'Catering',
      costo: costoCatering,
      dettaglio: `${persone} pax × €${state.cateringValorePerPersona}`,
      isStima: true,
    });
  }

  // DJ (solo se pacchetto scelto)
  if (pacchettoDj) {
    fornitoriVoci.push({
      nome: 'DJ',
      costo: pacchettoDj.costo,
      dettaglio: pacchettoDj.nome,
    });
  }

  const subtotaleFornitori = fornitoriVoci.reduce((s, v) => s + v.costo, 0);

  // ─── SERVIZI ADORI ────────────────────────────────────────────
  const serviziVoci: VoceCosto[] = [];

  // Bar (drink + fee 10% + eventuale barista)
  if (state.drinkPerPersona > 0) {
    const costoDrink = persone * state.drinkPerPersona * config.costoDrink;
    serviziVoci.push({
      nome: 'Open bar',
      costo: round(costoDrink),
      dettaglio: `${persone} pax × ${state.drinkPerPersona} drink × €${config.costoDrink}`,
    });

    const feeDrink = (costoDrink * config.feeDrinkPercentuale) / 100;
    serviziVoci.push({
      nome: 'Gestione bar',
      costo: round(feeDrink),
      dettaglio: `${config.feeDrinkPercentuale}% sul costo drink`,
    });
  }

  if (state.barista) {
    serviziVoci.push({
      nome: 'Barista',
      costo: config.baristaCosto,
      dettaglio: '5 ore di servizio',
    });
  }

  // Allestimento (solo se selezionato)
  if (state.allestimentoLivello) {
    const costoAllest = {
      base: config.allestimentoBase,
      medio: config.allestimentoMedio,
      premium: config.allestimentoPremium,
    }[state.allestimentoLivello];

    const labelAllest = {
      base: 'Base',
      medio: 'Medio',
      premium: 'Premium',
    }[state.allestimentoLivello];

    serviziVoci.push({
      nome: `Allestimento ${labelAllest}`,
      costo: costoAllest,
    });
  }

  const subtotaleServizi = serviziVoci.reduce((s, v) => s + v.costo, 0);

  // ─── CONSULENZA + IVA ─────────────────────────────────────────
  const subtotaleEvento = subtotaleFornitori + subtotaleServizi;
  const scaglione = trovaScaglione(subtotaleEvento, scaglioni);
  const consulenza = round((subtotaleEvento * scaglione.feePercentuale) / 100);

  // IVA su consulenza + servizi Adori (modello consulenza)
  const baseImponibileIva = consulenza + subtotaleServizi;
  const iva = round((baseImponibileIva * config.ivaAliquota) / 100);

  const totaleAdoriself = subtotaleServizi + consulenza + iva;
  const totaleStimato = subtotaleFornitori + totaleAdoriself;

  return {
    fornitori: {
      voci: fornitoriVoci,
      subtotale: round(subtotaleFornitori),
    },
    serviziAdori: {
      voci: serviziVoci,
      subtotale: round(subtotaleServizi),
    },
    subtotaleEvento: round(subtotaleEvento),
    consulenzaPct: scaglione.feePercentuale,
    consulenza,
    iva,
    totaleAdoriself: round(totaleAdoriself),
    totaleStimato: round(totaleStimato),
  };
}