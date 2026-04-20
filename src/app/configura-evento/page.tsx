'use client';

import React, { useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { BudgetPreview } from '@/components/BudgetPreview';
import { ConfiguratorStep } from '@/components/ConfiguratorStep';
import { Summary } from '@/components/Summary';
import { BookingForm } from '@/components/BookingForm';
import { EventConfig } from '@/lib/pricing';

const TOTAL_STEPS = 6;

export default function ConfiguraEventoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showBooking, setShowBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [config, setConfig] = useState<EventConfig>({
    tipo_evento: '18° compleanno',
    num_persone: 50,
    location: 'standard',
    catering: 'medio',
    dj: false,
    fotografo: false,
    allestimento: false,
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowBooking(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center px-6 py-12">
        <div className="max-w-md text-center space-y-6">
          <div className="text-6xl">✓</div>
          <h1 className="text-4xl font-display font-bold text-dark">
            Perfetto!
          </h1>
          <p className="text-lg text-dark/70">
            Abbiamo ricevuto la tua richiesta. Ti contatteremo a breve per confirmare la consulenza.
          </p>
          <p className="text-sm text-dark/50">
            Controlla la tua email (incluso spam)
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-gold hover:bg-gold-light text-white font-bold rounded-lg transition"
          >
            Torna alla home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <div className="border-b border-gold/30 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-xl font-display font-bold text-dark">
            Configura il tuo evento
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
        <ProgressBar current={currentStep} total={showBooking ? TOTAL_STEPS + 1 : TOTAL_STEPS} />

        {/* Step selector */}
        {!showBooking ? (
          <>
            <div className="bg-white rounded-lg border border-gold/30 p-8 mb-8 min-h-96">
              <ConfiguratorStep
                config={config}
                setConfig={setConfig}
                step={currentStep}
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-4 justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-8 py-3 border-2 border-gold text-dark font-bold rounded-lg hover:bg-beige disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ← Indietro
              </button>

              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gold hover:bg-gold-light text-white font-bold rounded-lg transition"
              >
                {currentStep === TOTAL_STEPS ? 'Procedi alla prenotazione' : 'Avanti →'}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Booking section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-dark mb-6">
                  I tuoi dettagli
                </h2>
                <BookingForm
                  config={config}
                  onSuccess={() => setShowConfirmation(true)}
                />
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-dark mb-6">
                  Verifica la configurazione
                </h2>
                <Summary config={config} />
              </div>
            </div>

            {/* Back button */}
            <button
              onClick={() => setShowBooking(false)}
              className="px-8 py-3 border-2 border-gold text-dark font-bold rounded-lg hover:bg-beige transition"
            >
              ← Modifica configurazione
            </button>
          </>
        )}
      </div>

      {/* Budget preview - fixed bottom */}
      {!showBooking && <BudgetPreview config={config} />}
    </div>
  );
}
