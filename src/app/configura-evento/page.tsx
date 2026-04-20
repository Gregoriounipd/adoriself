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
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const [config, setConfig] = useState<EventConfig>({
    tipo_evento: '18° compleanno',
    num_persone: 50,
    location: 'standard',
    catering: 'medio',
    dj: false,
    fotografo: false,
    allestimento: false,
  });

  const goToStep = (nextStep: number, dir: 'forward' | 'back') => {
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setAnimating(false);
    }, 260);
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1, 'forward');
    } else {
      setAnimating(true);
      setTimeout(() => {
        setShowBooking(true);
        setAnimating(false);
      }, 260);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1, 'back');
    }
  };

  /* ── Schermata di conferma ── */
  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-pattern flex items-center justify-center px-6 py-16">
        <div
          className="max-w-lg w-full text-center animate-fade-up"
          style={{ animationDuration: '0.6s' }}
        >
          {/* Icona decorativa */}
          <div className="relative inline-block mb-8">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
              style={{
                background: 'linear-gradient(135deg, var(--gold-subtle) 0%, rgba(201,162,74,0.15) 100%)',
                border: '1.5px solid rgba(201, 162, 74, 0.35)',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M8 20L16 28L32 12"
                  stroke="var(--gold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '1px solid rgba(201, 162, 74, 0.15)',
                transform: 'scale(1.3)',
                top: 0, left: 0, right: 0, bottom: 0,
              }}
            />
          </div>

          <p
            className="text-xs font-medium uppercase mb-3"
            style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            Richiesta inviata
          </p>

          <h1
            className="font-display mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: 'var(--dark)' }}
          >
            Perfetto!
          </h1>

          <div className="divider-gold mx-auto mb-6" />

          <p className="text-lg mb-2" style={{ color: 'var(--dark-soft)', fontWeight: 300 }}>
            Abbiamo ricevuto la tua richiesta. Ti contatteremo a breve
            per confermare la consulenza.
          </p>
          <p className="text-sm mb-10" style={{ color: 'rgba(43,43,43,0.45)' }}>
            Controlla la tua email (incluso la cartella spam)
          </p>

          <a href="/" className="button-primary inline-block">
            <span>Torna alla home</span>
          </a>
        </div>
      </div>
    );
  }

  /* ── Layout principale ── */
  return (
    <div className="min-h-screen bg-pattern">

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(255, 253, 248, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201, 162, 74, 0.2)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-5 h-5 rotate-45 rounded-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}
            />
            <h1
              className="font-display text-xl"
              style={{ fontWeight: 600, color: 'var(--dark)', letterSpacing: '-0.01em' }}
            >
              Configura il tuo evento
            </h1>
          </div>

          {!showBooking && (
            <span
              className="text-xs font-medium uppercase"
              style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}
            >
              Step {currentStep} / {TOTAL_STEPS}
            </span>
          )}
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-4xl mx-auto px-6 py-12 pb-40">

        <ProgressBar
          current={currentStep}
          total={showBooking ? TOTAL_STEPS + 1 : TOTAL_STEPS}
        />

        {!showBooking ? (
          <>
            {/* Card step con transizione */}
            <div
              className="card p-10 mb-8"
              style={{
                minHeight: '26rem',
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${direction === 'forward' ? '20px' : '-20px'})`
                  : 'translateX(0)',
                transition: 'opacity 0.26s ease, transform 0.26s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <ConfiguratorStep
                config={config}
                setConfig={setConfig}
                step={currentStep}
              />
            </div>

            {/* Navigazione */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="button-ghost flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Indietro
              </button>

              <button onClick={handleNext} className="button-primary">
                <span className="flex items-center gap-2">
                  {currentStep === TOTAL_STEPS ? 'Procedi alla prenotazione' : 'Avanti'}
                  {currentStep < TOTAL_STEPS && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </>
        ) : (
          <div className="animate-fade-up" style={{ animationDuration: '0.5s' }}>
            {/* Intestazione sezione */}
            <div className="mb-10">
              <p
                className="text-xs uppercase mb-2"
                style={{ color: 'var(--gold)', letterSpacing: '0.2em', fontWeight: 500 }}
              >
                Quasi fatto
              </p>
              <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 600 }}>
                Completa la prenotazione
              </h2>
              <div className="divider-gold mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3
                  className="font-display mb-6"
                  style={{ fontSize: '1.4rem', fontWeight: 600 }}
                >
                  I tuoi dettagli
                </h3>
                <BookingForm
                  config={config}
                  onSuccess={() => setShowConfirmation(true)}
                />
              </div>

              <div>
                <h3
                  className="font-display mb-6"
                  style={{ fontSize: '1.4rem', fontWeight: 600 }}
                >
                  Riepilogo configurazione
                </h3>
                <Summary config={config} />
              </div>
            </div>

            <button
              onClick={() => setShowBooking(false)}
              className="button-ghost flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Modifica configurazione
            </button>
          </div>
        )}
      </main>

      {!showBooking && <BudgetPreview config={config} />}
    </div>
  );
}