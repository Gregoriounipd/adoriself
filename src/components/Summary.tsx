import React from 'react';
import { EventConfig, calculatePrice, LOCATIONS } from '@/lib/pricing';

interface SummaryProps {
  config: EventConfig;
}

export function Summary({ config }: SummaryProps) {
  const { minPrice, maxPrice } = calculatePrice(config);
  const location = LOCATIONS.find(l => l.value === config.location);

  return (
    <div className="bg-white rounded-lg border border-gold/30 p-8 space-y-6">
      <h2 className="text-2xl font-display font-bold text-dark">Riepilogo evento</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dettagli evento */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-dark/60">Tipo evento</p>
            <p className="text-lg font-medium text-dark">{config.tipo_evento}</p>
          </div>
          <div>
            <p className="text-sm text-dark/60">Numero persone</p>
            <p className="text-lg font-medium text-dark">{config.num_persone} persone</p>
          </div>
          <div>
            <p className="text-sm text-dark/60">Location</p>
            <p className="text-lg font-medium text-dark">{location?.name}</p>
          </div>
        </div>

        {/* Servizi selezionati */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-dark/60">Catering</p>
            <p className="text-lg font-medium text-dark capitalize">{config.catering}</p>
          </div>
          <div>
            <p className="text-sm text-dark/60">Servizi aggiuntivi</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {config.dj && (
                <span className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full">DJ</span>
              )}
              {config.fotografo && (
                <span className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full">
                  Fotografo
                </span>
              )}
              {config.allestimento && (
                <span className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full">
                  Allestimento
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Budget finale */}
      <div className="border-t border-gold/30 pt-6">
        <p className="text-sm text-dark/60 mb-2">Stima budget finale</p>
        <p className="text-4xl font-display font-bold text-gold">
          €{minPrice.toLocaleString('it-IT')} - €{maxPrice.toLocaleString('it-IT')}
        </p>
        <p className="text-xs text-dark/50 mt-2">*Stima approssimativa. Prezzo finale dopo consulenza.</p>
      </div>
    </div>
  );
}
