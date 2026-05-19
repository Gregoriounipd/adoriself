// =====================================================================
// TIPI — SALE
// =====================================================================
// Posizione: src/types/sala.ts
//
// Tipi TypeScript per le sale e dati correlati.
// =====================================================================

/**
 * Sala letta dalla vista pubblica sale_pubbliche.
 * Contiene SOLO i campi sicuri da esporre al cliente.
 */
export interface Sala {
  id: number;
  nome: string;
  citta: string;
  provincia: string;
  indirizzo: string | null;
  lat: number | null;
  lng: number | null;

  // Capienze
  capienza_interna: number | null;
  capienza_esterna: number | null;
  capienza_totale: number | null;

  // Prezzi
  prezzo_base: number | null;
  prezzo_da: number | null;
  prezzo_a: number | null;
  prezzo_note: string | null;

  // Caratterizzazione
  tipo_sala: string | null;
  atmosfera: string[] | null;
  descrizione: string | null;

  // Dotazioni
  ha_cucina: boolean | null;
  ha_frigo: boolean | null;
  ha_freezer: boolean | null;
  ha_impianto_audio: boolean | null;
  ha_impianto_luci: boolean | null;
  ha_parcheggio: boolean | null;
  ha_giardino: boolean | null;
  ha_riscaldamento: boolean | null;
  ha_aria_condizionata: boolean | null;
  ha_guardaroba: boolean | null;
  num_bagni: number | null;

  // Logistica
  pulizie_incluse: boolean | null;
  gestione_rifiuti: string | null;
  tipi_evento_adatti: string[] | null;

  // Foto
  galleria_urls: string[] | null;
  foto_copertina_url: string | null;

  // SEO/URL
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;

  // Visualizzazione
  in_evidenza: boolean | null;
  priorita_ordine: number | null;

  // Orari
  orario_apertura: string | null;
  orario_chiusura: string | null;
  ore_evento_max: number | null;
}

/**
 * Filtri applicabili alla griglia sale.
 */
export interface FiltriSala {
  tipoSala?: string;          // filtro per tipo (villa, agriturismo...)
  capienzaMin?: number;       // capienza minima
  capienzaMax?: number;       // capienza massima
}

/**
 * Tipi sala validi (per dropdown filtro).
 */
export const TIPI_SALA_LABEL: Record<string, string> = {
  villa_storica: 'Villa storica',
  cascina_agriturismo: 'Cascina / Agriturismo',
  barchessa: 'Barchessa',
  showroom_loft: 'Showroom / Loft',
  parco_outdoor: 'Parco / Outdoor',
  sala_moderna: 'Sala moderna',
  ristorante: 'Ristorante',
};

/**
 * Helper per formattare il prezzo "da X €" o range.
 */
export function formatPrezzoSala(sala: Sala): string {
  if (sala.prezzo_da && sala.prezzo_a) {
    return `€${sala.prezzo_da} - €${sala.prezzo_a}`;
  }
  if (sala.prezzo_base) {
    return `da €${sala.prezzo_base}`;
  }
  return 'Prezzo su richiesta';
}

/**
 * Helper per formattare capienza.
 */
export function formatCapienza(sala: Sala): string {
  const totale = sala.capienza_totale ?? sala.capienza_interna;
  if (!totale) return 'Capienza variabile';
  return `fino a ${totale} persone`;
}

/**
 * Helper per label del tipo sala.
 */
export function formatTipoSala(tipo: string | null): string {
  if (!tipo) return 'Sala eventi';
  return TIPI_SALA_LABEL[tipo] ?? tipo;
}