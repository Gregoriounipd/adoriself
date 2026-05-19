// =====================================================================
// SERVER ACTION — Notify me (province in arrivo)
// =====================================================================
// Posizione: src/lib/actions/notify-province.ts
//
// Salva un'email di utente interessato a una provincia "in arrivo"
// nella tabella province_notify.
//
// USO LATO CLIENT:
// 'use client';
// import { notifyProvinciaAction } from '@/lib/actions/notify-province';
//
// const result = await notifyProvinciaAction(formData);
// if (result.success) { ... }
// =====================================================================

'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import type { NotifyResult } from '@/types/provincia';

/**
 * Valida formato email base.
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Server action: salva email per notifica apertura provincia.
 * Riceve un FormData o un oggetto plain.
 */
export async function notifyProvinciaAction(
  formData: FormData
): Promise<NotifyResult> {
  // Estrazione dati
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const provinciaSlug = String(formData.get('provinciaSlug') ?? '').trim();

  // Validazioni
  if (!email || !provinciaSlug) {
    return { success: false, error: 'Email e provincia obbligatori' };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: 'Formato email non valido' };
  }

  // Verifica che la provincia esista ed è "in arrivo" (attiva = false)
  const supabase = createAdminClient();

  const { data: provincia, error: erroreProv } = await supabase
    .from('province_stato')
    .select('slug, attiva')
    .eq('slug', provinciaSlug)
    .single();

  if (erroreProv || !provincia) {
    return { success: false, error: 'Provincia non trovata' };
  }

  if (provincia.attiva) {
    return { success: false, error: 'Provincia già attiva, nessuna notifica necessaria' };
  }

  // Verifica se già registrato (anti-duplicato)
  const { data: esistente } = await supabase
    .from('province_notify')
    .select('id')
    .eq('email', email)
    .eq('provincia_slug', provinciaSlug)
    .maybeSingle();

  if (esistente) {
    return { success: true, alreadyRegistered: true };
  }

  // Inserisci nuovo record
  const { error: erroreInsert } = await supabase
    .from('province_notify')
    .insert({
      email,
      provincia_slug: provinciaSlug,
      source: 'homepage',
      notificato: false,
    });

  if (erroreInsert) {
    console.error('[notifyProvinciaAction] errore insert:', erroreInsert.message);
    return { success: false, error: 'Errore durante la registrazione, riprova' };
  }

  return { success: true, alreadyRegistered: false };
}