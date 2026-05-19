// =====================================================================
// SUPABASE QUERIES — PROVINCE
// =====================================================================
// Posizione: src/lib/supabase/queries-province.ts
//
// Funzioni helper per leggere le province dal database.
// Usate nei Server Components (eseguono server-side).
// =====================================================================

import { createClient } from '@/lib/supabase/server';
import type { Provincia } from '@/types/provincia';

/**
 * Recupera tutte le province (attive + in arrivo) dalla vista pubblica.
 * Già ordinate per il campo "ordine" (Padova prima, ecc.).
 */
export async function getProvincePubbliche(): Promise<Provincia[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('province_pubbliche')
    .select('*');

  if (error) {
    console.error('[getProvincePubbliche] errore:', error.message);
    return [];
  }

  return (data ?? []) as Provincia[];
}

/**
 * Recupera una singola provincia per slug.
 * Usata nella pagina /sale/[provincia] per validare lo slug.
 */
export async function getProvinciaBySlug(slug: string): Promise<Provincia | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('province_pubbliche')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    // Se non trovato, error.code = 'PGRST116' (single() ha 0 risultati)
    if (error.code !== 'PGRST116') {
      console.error('[getProvinciaBySlug] errore:', error.message);
    }
    return null;
  }

  return data as Provincia;
}