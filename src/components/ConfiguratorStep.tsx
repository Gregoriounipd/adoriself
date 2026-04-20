'use client';

import React from 'react';
import { EventConfig, EVENT_TYPES, LOCATIONS } from '@/lib/pricing';

interface ConfiguratorStepProps {
  config: EventConfig;
  setConfig: (config: EventConfig) => void;
  step: number;
}

export function ConfiguratorStep({ config, setConfig, step }: ConfiguratorStepProps) {
  const updateConfig = (updates: Partial<EventConfig>) => {
    setConfig({ ...config, ...updates });
  };

  switch (step) {
    // Step 1: Tipo evento
    case 1:
      return (
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-dark mb-6">
            Che tipo di evento stai organizzando?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EVENT_TYPES.map(type => (
              <button
                key={type}
                onClick={() => updateConfig({ tipo_evento: type })}
                className={`p-4 border-2 rounded-lg font-medium transition ${
                  config.tipo_evento === type
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-gold/30 text-dark hover:border-gold'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      );

    // Step 2: Numero persone
    case 2:
      return (
        <div className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-dark">
            Quante persone parteciperanno?
          </h2>
          <div className="space-y-4">
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={config.num_persone}
              onChange={e => updateConfig({ num_persone: parseInt(e.target.value) })}
              className="w-full h-3 bg-gold/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center">
              <span className="text-5xl font-display font-bold text-gold">
                {config.num_persone}
              </span>
              <p className="text-dark/60 mt-2">persone</p>
            </div>
            <div className="flex gap-2 justify-center">
              {[25, 50, 100, 200].map(val => (
                <button
                  key={val}
                  onClick={() => updateConfig({ num_persone: val })}
                  className="px-4 py-2 border border-gold/30 text-sm font-medium text-dark hover:border-gold hover:bg-gold/5 rounded-lg transition"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    // Step 3: Location
    case 3:
      return (
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-dark mb-6">
            Dove vuoi organizzare l'evento?
          </h2>
          <div className="space-y-3">
            {LOCATIONS.map(loc => (
              <button
                key={loc.value}
                onClick={() => updateConfig({ location: loc.value })}
                className={`w-full p-4 border-2 rounded-lg text-left transition ${
                  config.location === loc.value
                    ? 'border-gold bg-gold/10'
                    : 'border-gold/30 hover:border-gold'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-dark">{loc.name}</span>
                  <span className="text-gold font-bold">€{loc.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      );

    // Step 4: Catering
    case 4:
      return (
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-dark mb-6">
            Quale catering preferisci?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['base', 'medio', 'premium'].map(level => (
              <button
                key={level}
                onClick={() => updateConfig({ catering: level as any })}
                className={`p-6 border-2 rounded-lg text-center transition ${
                  config.catering === level
                    ? 'border-gold bg-gold/10'
                    : 'border-gold/30 hover:border-gold'
                }`}
              >
                <p className="font-display font-bold text-lg text-dark capitalize mb-2">
                  {level}
                </p>
                <p className="text-sm text-dark/60">
                  €{level === 'base' ? 15 : level === 'medio' ? 25 : 40}
                </p>
                <p className="text-xs text-dark/40 mt-2">a persona</p>
              </button>
            ))}
          </div>
        </div>
      );

    // Step 5: DJ
    case 5:
      return (
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-dark mb-6">
            Vuoi un DJ?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updateConfig({ dj: true })}
              className={`p-6 border-2 rounded-lg font-medium transition ${
                config.dj
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gold/30 text-dark hover:border-gold'
              }`}
            >
              Sì, +€400
            </button>
            <button
              onClick={() => updateConfig({ dj: false })}
              className={`p-6 border-2 rounded-lg font-medium transition ${
                !config.dj
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gold/30 text-dark hover:border-gold'
              }`}
            >
              No, grazie
            </button>
          </div>
        </div>
      );

    // Step 6: Extra
    case 6:
      return (
        <div className="space-y-4">
          <h2 className="text-3xl font-display font-bold text-dark mb-6">
            Servizi aggiuntivi
          </h2>
          <div className="space-y-3">
            <label className="flex items-center p-4 border-2 border-gold/30 hover:border-gold rounded-lg cursor-pointer transition">
              <input
                type="checkbox"
                checked={config.fotografo}
                onChange={e => updateConfig({ fotografo: e.target.checked })}
                className="w-5 h-5 accent-gold rounded"
              />
              <div className="ml-4">
                <p className="font-medium text-dark">Fotografo</p>
                <p className="text-sm text-dark/60">€200</p>
              </div>
            </label>

            <label className="flex items-center p-4 border-2 border-gold/30 hover:border-gold rounded-lg cursor-pointer transition">
              <input
                type="checkbox"
                checked={config.allestimento}
                onChange={e => updateConfig({ allestimento: e.target.checked })}
                className="w-5 h-5 accent-gold rounded"
              />
              <div className="ml-4">
                <p className="font-medium text-dark">Allestimento floreale</p>
                <p className="text-sm text-dark/60">€250</p>
              </div>
            </label>
          </div>
        </div>
      );

    default:
      return null;
  }
}
