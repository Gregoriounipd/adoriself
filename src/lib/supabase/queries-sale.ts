// =====================================================================
// SUPABASE QUERIES — SALE
// =====================================================================
// Posizione: src/lib/supabase/queries-sale.ts
//
// Funzioni helper per leggere le sale dal database.
// =====================================================================

import { createClient } from '@/lib/supabase/server';
import type { Sala, FiltriSala } from '@/types/sala';

/**
 * Recupera tutte le sale pubblicate di una provincia, con filtri opzionali.
 * 
 * @param provincia - Nome provincia (es. "Padova")
 * @param filtri - Filtri opzionali (tipo sala, capienza)
 */
export async function getSaleByProvincia(
  provincia: string,
  filtri?: FiltriSala
): Promise<Sala[]> {
  const supabase = await createClient();

  // Query base con filtri provincia + ordine per priorità
  let query = supabase
    .from('sale_pubbliche')
    .select('*')
    .eq('provincia', provincia)
    .order('priorita_ordine', { ascending: true })
    .order('nome', { ascending: true });

  // Filtro tipo sala (se presente)
  if (filtri?.tipoSala) {
    query = query.eq('tipo_sala', filtri.tipoSala);
  }

  // Filtri capienza (se presenti)
  // Cerchiamo nelle sale con capienza_totale dentro il range
  if (filtri?.capienzaMin !== undefined) {
    query = query.gte('capienza_totale', filtri.capienzaMin);
  }
  if (filtri?.capienzaMax !== undefined) {
    query = query.lte('capienza_totale', filtri.capienzaMax);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[getSaleByProvincia] errore:', error.message);
    return [];
  }

  return (data ?? []) as Sala[];
}

/**
 * Recupera una singola sala per slug. Usata in /sale/[slug].
 */
export async function getSalaBySlug(slug: string): Promise<Sala | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('sale_pubbliche')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('[getSalaBySlug] errore:', error.message);
    }
    return null;
  }

  return data as Sala;
}

/**
 * Recupera i tipi di sala distinti presenti in una provincia.
 * Serve per popolare il dropdown filtro "Tipo sala".
 */
export async function getTipiSalaDistinti(provincia: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('sale_pubbliche')
    .select('tipo_sala')
    .eq('provincia', provincia)
    .not('tipo_sala', 'is', null);

  if (error) {
    console.error('[getTipiSalaDistinti] errore:', error.message);
    return [];
  }

  // Estrai valori unici
  const tipi = new Set<string>();
  for (const row of data ?? []) {
    if (row.tipo_sala) tipi.add(row.tipo_sala);
  }

  return Array.from(tipi).sort();
}