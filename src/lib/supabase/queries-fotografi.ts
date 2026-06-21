// =====================================================================
// SUPABASE QUERIES — FOTOGRAFI
// =====================================================================
// Posizione: src/lib/supabase/queries-fotografi.ts
// =====================================================================

import { createClient } from '@/lib/supabase/server';
import type { PacchettoFotografo } from '@/types/servizio-singolo';

/**
 * Recupera tutti i pacchetti fotografo attivi dalla vista pubblica.
 */
export async function getPacchettiFotografo(): Promise<PacchettoFotografo[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('pacchetti_fotografo_pubblici')
    .select('*');

  if (error) {
    console.error('[getPacchettiFotografo] errore:', error.message);
    return [];
  }

  return (data ?? []) as PacchettoFotografo[];
}