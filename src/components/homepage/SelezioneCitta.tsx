// =====================================================================
// COMPONENTE — SelezioneCitta
// =====================================================================
// Posizione: src/components/homepage/SelezioneCitta.tsx
//
// Sezione "Scegli la tua città" da inserire nella homepage.
// Carica le province da Supabase e le mostra in griglia.
//
// È un Server Component (no "use client") perché fetcha dati direttamente.
// Le card sono Client Components dentro (per il form notify-me).
// =====================================================================

import { getProvincePubbliche } from '@/lib/supabase/queries-province';
import { ProvinciaCard } from './ProvinciaCard';

export async function SelezioneCitta() {
  const province = await getProvincePubbliche();

  if (province.length === 0) {
    return null; // se DB vuoto, non mostriamo niente
  }

  return (
    <section
      id="scegli-citta"
      className="max-w-6xl mx-auto px-6 py-20 md:py-28"
    >
      {/* Header sezione */}
      <div className="max-w-2xl mb-14">
        <div className="flex items-center gap-4 mb-6">
          <div className="divider-gold" />
          <p
            className="text-xs uppercase font-medium"
            style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            Dove
          </p>
        </div>

        <h2
          className="font-display mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          Scegli la tua città
        </h2>

        <p
          className="text-lg"
          style={{ color: 'var(--dark-soft)', fontWeight: 300, lineHeight: 1.6 }}
        >
          Inizia a configurare il tuo evento esplorando le sale disponibili nella
          tua zona. Copriamo le principali province del Veneto.
        </p>
      </div>

      {/* Griglia province */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {province.map((provincia, idx) => (
          <ProvinciaCard
            key={provincia.slug}
            provincia={provincia}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}