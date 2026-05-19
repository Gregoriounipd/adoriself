// =====================================================================
// TIPI — CONFIGURATORE EVENTO (v2)
// =====================================================================
// Posizione: src/types/configuratore.ts
// SOSTITUISCI il file esistente.
//
// Aggiunge: allestimentoNessuno (flag per scelta "niente allestimento")
// Aggiorna: isStepCompletato per validare anche step 5
// =====================================================================

/** Tipi evento ammessi nel configuratore */
export type TipoEvento =
  | '18_anni'
  | 'laurea'
  | 'matrimonio'
  | 'compleanno'
  | 'anniversario'
  | 'aziendale';

export const TIPI_EVENTO_LABEL: Record<TipoEvento, string> = {
  '18_anni': '18° compleanno',
  laurea: 'Laurea',
  matrimonio: 'Matrimonio',
  compleanno: 'Compleanno',
  anniversario: 'Anniversario',
  aziendale: 'Evento aziendale',
};

export const TIPI_EVENTO_EMOJI: Record<TipoEvento, string> = {
  '18_anni': '🎂',
  laurea: '🎓',
  matrimonio: '💍',
  compleanno: '🎉',
  anniversario: '💝',
  aziendale: '💼',
};

/** Livelli catering */
export type LivelloCatering = 'base' | 'medio' | 'premium';

/** Livelli allestimento */
export type LivelloAllestimento = 'base' | 'medio' | 'premium' | null;

/**
 * Stato completo del configuratore.
 * Viene salvato in localStorage per persistere tra sessioni.
 */
export interface ConfiguratoreState {
  salaId: number;

  // Step 1: Evento
  tipoEvento: TipoEvento | null;
  numPersone: number | null;
  dataPreferita: string | null;
  dataAlternativa: string | null;

  // Step 2: Catering
  cateringLivello: LivelloCatering | null;
  cateringValorePerPersona: number | null;

  // Step 3: Bar
  drinkPerPersona: number;
  barista: boolean;

  // Step 4: DJ
  pacchettoDjId: number | null; // 0 = niente DJ esplicito

  // Step 5: Allestimento
  allestimentoLivello: LivelloAllestimento;
  /** True se l'utente ha esplicitamente scelto "niente allestimento" */
  allestimentoNessuno: boolean;

  // Navigation state
  stepAttivo: number;
  stepCompletati: number[];
}

export function creaStatoIniziale(salaId: number): ConfiguratoreState {
  return {
    salaId,
    tipoEvento: null,
    numPersone: null,
    dataPreferita: null,
    dataAlternativa: null,
    cateringLivello: null,
    cateringValorePerPersona: null,
    drinkPerPersona: 3,
    barista: false,
    pacchettoDjId: null,
    allestimentoLivello: null,
    allestimentoNessuno: false,
    stepAttivo: 1,
    stepCompletati: [],
  };
}

export function isStepCompletato(
  state: ConfiguratoreState,
  step: number
): boolean {
  switch (step) {
    case 1:
      return !!(state.tipoEvento && state.numPersone && state.dataPreferita);
    case 2:
      return !!(state.cateringLivello && state.cateringValorePerPersona);
    case 3:
      return state.drinkPerPersona > 0;
    case 4:
      // pacchettoDjId può essere 0 (niente DJ) o un id valido
      return state.pacchettoDjId !== null;
    case 5:
      // Allestimento: deve aver scelto un livello O esplicitamente "nessuno"
      return state.allestimentoLivello !== null || state.allestimentoNessuno;
    case 6:
      return [1, 2, 3, 4, 5].every((s) => isStepCompletato(state, s));
    default:
      return false;
  }
}