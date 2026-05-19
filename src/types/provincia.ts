// =====================================================================
// TIPI — PROVINCE
// =====================================================================
// Posizione: src/types/provincia.ts
//
// Tipi TypeScript per le province e gli stati correlati.
// =====================================================================

/**
 * Provincia letta dalla vista pubblica province_pubbliche.
 * Contiene info di visualizzazione + conteggio sale live.
 */
export interface Provincia {
  provincia: string;
  slug: string;
  attiva: boolean;
  ordine: number;
  descrizione_breve: string | null;
  foto_url: string | null;
  data_apertura_prevista: string | null;
  num_sale_disponibili: number;
}

/**
 * Risultato della server action per notificami.
 */
export type NotifyResult =
  | { success: true; alreadyRegistered: boolean }
  | { success: false; error: string };