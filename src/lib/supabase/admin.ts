// =====================================================================
// SUPABASE CLIENT — ADMIN (SERVICE ROLE)
// =====================================================================
// USO ESCLUSIVAMENTE LATO SERVER. Bypass RLS.
// MAI importare in componenti client.
// Posizione: src/lib/supabase/admin.ts
// =====================================================================

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY non configurata. Aggiungila in .env.local'
    );
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}