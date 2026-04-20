import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Lead = {
  id: string;
  tipo_evento: string;
  num_persone: number;
  location: string;
  catering: string;
  dj: boolean;
  fotografo: boolean;
  allestimento: boolean;
  budget_min: number;
  budget_max: number;
  nome: string;
  email: string;
  telefono: string;
  data_preferita: string;
  created_at: string;
};
