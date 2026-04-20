-- Crea tabella leads
CREATE TABLE public.leads (
  id BIGSERIAL PRIMARY KEY,
  tipo_evento VARCHAR(255) NOT NULL,
  num_persone INTEGER NOT NULL,
  location VARCHAR(100) NOT NULL,
  catering VARCHAR(50) NOT NULL,
  dj BOOLEAN DEFAULT false,
  fotografo BOOLEAN DEFAULT false,
  allestimento BOOLEAN DEFAULT false,
  budget_min INTEGER NOT NULL,
  budget_max INTEGER NOT NULL,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  data_preferita DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indici per query veloci
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- RLS Policy per lettura (admin only)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can read leads" ON public.leads
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Per inserire da client (anonimo)
CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Trigger per aggiornare updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
