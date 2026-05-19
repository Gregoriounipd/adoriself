// =====================================================================
// HELPER — Loader config pricing
// =====================================================================
// Posizione: src/lib/load-pricing-config.ts
//
// Carica i valori pricing da config_pricing_pubblico e li espone in
// formato strutturato pronto per il calculator.
// =====================================================================

import { createClient } from '@/lib/supabase/server';

export interface ConfigPricing {
  cateringRanges: {
    base: { min: number; max: number };
    medio: { min: number; max: number };
    premium: { min: number; max: number };
  };
  costoDrink: number;
  feeDrinkPercentuale: number;
  baristaCosto: number;
  drinkDefault: number;
  drinkMin: number;
  drinkMax: number;
  allestimentoBase: number;
  allestimentoMedio: number;
  allestimentoPremium: number;
  ivaAliquota: number;
  variabilitaFornitoriPct: number;
  personeMinimo: number;
  personeMassimo: number;
}

export interface FeeScaglione {
  subtotaleFinoA: number;
  feePercentuale: number;
  ordine: number;
}

/**
 * Carica config_pricing dalla vista pubblica e la struttura.
 */
export async function loadPricingConfig(): Promise<ConfigPricing> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('config_pricing_pubblico')
    .select('chiave, valore');

  if (error || !data) {
    console.error('[loadPricingConfig] errore:', error?.message);
    throw new Error('Impossibile caricare config pricing');
  }

  // Trasforma array in mappa chiave→valore
  const map = new Map<string, number>();
  for (const row of data) {
    map.set(row.chiave as string, Number(row.valore));
  }

  const get = (key: string, fallback = 0): number => map.get(key) ?? fallback;

  return {
    cateringRanges: {
      base: { min: get('catering_base_min', 7), max: get('catering_base_max', 9) },
      medio: { min: get('catering_medio_min', 10), max: get('catering_medio_max', 20) },
      premium: { min: get('catering_premium_min', 20), max: get('catering_premium_max', 30) },
    },
    costoDrink: get('beverage_costo_drink', 3),
    feeDrinkPercentuale: get('beverage_fee_percentuale', 10),
    baristaCosto: get('beverage_barista_costo', 90),
    drinkDefault: get('beverage_drink_default', 3),
    drinkMin: get('beverage_drink_min_per_persona', 1),
    drinkMax: get('beverage_drink_max_per_persona', 8),
    allestimentoBase: get('allestimento_base', 330),
    allestimentoMedio: get('allestimento_medio', 450),
    allestimentoPremium: get('allestimento_premium', 600),
    ivaAliquota: get('iva_aliquota_default', 22),
    variabilitaFornitoriPct: get('stima_fornitori_variabilita_pct', 15),
    personeMinimo: get('persone_minimo', 10),
    personeMassimo: get('persone_massimo', 500),
  };
}

/**
 * Carica gli scaglioni della fee Adoriself.
 */
export async function loadFeeScaglioni(): Promise<FeeScaglione[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('fee_scaglioni_pubblici')
    .select('subtotale_fino_a, fee_percentuale, ordine')
    .order('ordine', { ascending: true });

  if (error || !data) {
    console.error('[loadFeeScaglioni] errore:', error?.message);
    // Fallback: scaglioni di default
    return [
      { subtotaleFinoA: 1500, feePercentuale: 20, ordine: 1 },
      { subtotaleFinoA: 3000, feePercentuale: 18, ordine: 2 },
      { subtotaleFinoA: 5000, feePercentuale: 16, ordine: 3 },
      { subtotaleFinoA: 10000, feePercentuale: 14, ordine: 4 },
      { subtotaleFinoA: 99999, feePercentuale: 12, ordine: 5 },
    ];
  }

  return data.map((s: any) => ({
    subtotaleFinoA: Number(s.subtotale_fino_a),
    feePercentuale: Number(s.fee_percentuale),
    ordine: Number(s.ordine),
  }));
}