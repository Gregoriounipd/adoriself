import React from 'react';
import { EventConfig, calculatePrice } from '@/lib/pricing';

interface BudgetPreviewProps {
  config: EventConfig;
}

export function BudgetPreview({ config }: BudgetPreviewProps) {
  const { minPrice, maxPrice } = calculatePrice(config);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gold shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-dark/60 mb-1">Stima Budget</p>
          <p className="text-3xl font-display font-bold text-gold">
            €{minPrice.toLocaleString('it-IT')} - €{maxPrice.toLocaleString('it-IT')}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-dark/50 mb-2">Una stima approssimativa</p>
          <p className="text-sm text-dark font-medium">
            {config.num_persone} persone • {config.catering}
          </p>
        </div>
      </div>
    </div>
  );
}
