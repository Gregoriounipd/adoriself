// =====================================================================
// TIPI — SERVIZI SINGOLI
// =====================================================================
// Posizione: src/types/servizio-singolo.ts
//
// Tipi per i 3 servizi singoli: allestimento, bar, fotografo.
// =====================================================================

/** Tipi di servizio singolo disponibili */
export type TipoServizio = 'allestimento' | 'bar' | 'fotografo';

/** Metadati dei servizi (per UI navigation tabs) */
export const TIPI_SERVIZIO_META: Record<
  TipoServizio,
  { label: string; icon: string; descrizione: string; slug: string }
> = {
  allestimento: {
    label: 'Allestimento',
    icon: '✨',
    descrizione: 'Decorazioni, fiori, mise en place',
    slug: 'allestimento',
  },
  bar: {
    label: 'Bar e drink',
    icon: '🍸',
    descrizione: 'Open bar con barista professionista',
    slug: 'bar',
  },
  fotografo: {
    label: 'Fotografo',
    icon: '📷',
    descrizione: 'Reportage dell\'intera serata',
    slug: 'fotografo',
  },
};

/** Pacchetto fotografo dal DB */
export interface PacchettoFotografo {
  id: number;
  nome: string;
  slug: string;
  livello: 'base' | 'standard' | 'premium';
  descrizione: string | null;
  descrizione_breve: string | null;
  ore_incluse: number;
  costo: number;
  foto_url: string | null;
  galleria_urls: string[] | null;
  ordine: number;
  in_evidenza: boolean;
}

/** Stato configuratore servizio singolo */
export interface ServizioSingoloState {
  tipoServizio: TipoServizio;

  // Dati evento (sempre richiesti)
  numPersone: number | null;
  dataPreferita: string | null;
  dataAlternativa: string | null;
  haLocation: boolean | null;          // true = ho location, false = cerco
  cittaEvento: string | null;          // se cerca, quale città?
  indirizzoLocation: string | null;    // se ha location, dove?

  // Specifico per tipo (solo uno è popolato)
  allestimentoLivello: 'base' | 'medio' | 'premium' | null;
  drinkPerPersona: number;
  barista: boolean;
  pacchettoFotografoId: number | null;
}

export function creaStatoServizioIniziale(tipo: TipoServizio): ServizioSingoloState {
  return {
    tipoServizio: tipo,
    numPersone: null,
    dataPreferita: null,
    dataAlternativa: null,
    haLocation: null,
    cittaEvento: null,
    indirizzoLocation: null,
    allestimentoLivello: null,
    drinkPerPersona: 3,
    barista: false,
    pacchettoFotografoId: null,
  };
}