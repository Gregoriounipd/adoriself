// =====================================================================
// SUPABASE CLIENT — BROWSER
// =====================================================================
// Per Client Components (con "use client" in cima al file).
// Posizione: src/lib/supabase/client.ts
// =====================================================================

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}