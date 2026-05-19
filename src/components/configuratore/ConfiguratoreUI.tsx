// =====================================================================
// COMPONENTE — ConfiguratoreUI (v4: con cleanup post-lead)
// =====================================================================
// Posizione: src/components/configuratore/ConfiguratoreUI.tsx
// SOSTITUISCI il file esistente.
//
// Aggiunge: callback onLeadInviato → reset localStorage dopo submit form
// =====================================================================

'use client';

import { useMemo } from 'react';
import { useConfiguratore } from '@/lib/use-configuratore';
import { isStepCompletato, TIPI_EVENTO_LABEL } from '@/types/configuratore';
import type { Sala } from '@/types/sala';
import type { ConfigPricing, FeeScaglione } from '@/lib/load-pricing-config';
import { calcolaEvento } from '@/lib/calculator';

import { SalaScelta } from './SalaScelta';
import { AccordionStep } from './AccordionStep';
import { Step1Evento } from './Step1Evento';
import { Step2Catering } from './Step2Catering';
import { Step3Bar } from './Step3Bar';
import { Step4DJ, type PacchettoDjItem } from './Step4DJ';
import { Step5Allestimento } from './Step5Allestimento';
import { Step6Riepilogo } from './Step6Riepilogo';
import { StickyPriceBar } from './StickyPriceBar';

interface ConfiguratoreUIProps {
  sala: Sala;
  config: ConfigPricing;
  scaglioni: FeeScaglione[];
  pacchettiDj: PacchettoDjItem[];
}

export function ConfiguratoreUI({
  sala,
  config,
  scaglioni,
  pacchettiDj,
}: ConfiguratoreUIProps) {
  const { state, update, setStepAttivo, completaStep, reset, isHydrated } =
    useConfiguratore(sala.id);

  const calcolo = useMemo(() => {
    const pacchettoScelto =
      state.pacchettoDjId !== null && state.pacchettoDjId !== 0
        ? pacchettiDj.find((p) => p.id === state.pacchettoDjId) ?? null
        : null;

    return calcolaEvento(
      state,
      sala,
      config,
      scaglioni,
      pacchettoScelto
        ? {
            id: pacchettoScelto.id,
            nome: pacchettoScelto.nome,
            costo: pacchettoScelto.costo,
          }
        : null
    );
  }, [state, sala, config, scaglioni, pacchettiDj]);

  // ── Riepiloghi accordion ──
  const riepilogoStep1 =
    state.tipoEvento && state.numPersone
      ? `${TIPI_EVENTO_LABEL[state.tipoEvento]} · ${state.numPersone} persone${
          state.dataPreferita
            ? ' · ' +
              new Date(state.dataPreferita).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
              })
            : ''
        }`
      : undefined;

  const riepilogoStep2 =
    state.cateringLivello && state.cateringValorePerPersona
      ? `Catering ${state.cateringLivello} · €${state.cateringValorePerPersona}/persona`
      : undefined;

  const riepilogoStep3 = (() => {
    const drinks = `${state.drinkPerPersona} drink/persona`;
    return state.barista ? `${drinks} · con barista` : drinks;
  })();

  const riepilogoStep4 = (() => {
    if (state.pacchettoDjId === null) return undefined;
    if (state.pacchettoDjId === 0) return 'Niente DJ';
    const p = pacchettiDj.find((x) => x.id === state.pacchettoDjId);
    return p?.nome;
  })();

  const riepilogoStep5 = (() => {
    if (state.allestimentoNessuno) return 'Niente allestimento';
    if (!state.allestimentoLivello) return undefined;
    const labels = {
      base: 'Essenziale',
      medio: 'Curato',
      premium: 'Esclusivo',
    };
    return `Allestimento ${labels[state.allestimentoLivello]}`;
  })();

  const avantiAStep = (stepCorrente: number, stepSuccessivo: number) => {
    if (isStepCompletato(state, stepCorrente)) {
      completaStep(stepCorrente);
      setStepAttivo(stepSuccessivo);
      setTimeout(() => {
        document
          .getElementById(`step-${stepSuccessivo}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const indietroAStep = (stepCorrente: number, stepPrecedente: number) => {
    setStepAttivo(stepPrecedente);
    setTimeout(() => {
      document
        .getElementById(`step-${stepPrecedente}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const showStickyPrice = state.stepCompletati.includes(1);

  if (!isHydrated) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: 'var(--cream)', opacity: 0.5 }}
        >
          <p style={{ color: 'var(--dark-soft)' }}>
            Caricamento configuratore...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
        <SalaScelta sala={sala} />

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="divider-gold" />
            <p
              className="text-xs uppercase font-medium"
              style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
            >
              Configura il tuo evento
            </p>
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Personalizza i dettagli
          </h1>
        </div>

        <div className="space-y-4">
          {/* STEP 1 */}
          <div id="step-1">
            <AccordionStep
              numero={1}
              titolo="Il tuo evento"
              attivo={state.stepAttivo === 1}
              completato={isStepCompletato(state, 1)}
              riepilogo={riepilogoStep1}
              onClick={() => setStepAttivo(1)}
            >
              <Step1Evento
                state={state}
                update={update}
                capienzaMax={sala.capienza_totale}
                onAvanti={() => avantiAStep(1, 2)}
              />
            </AccordionStep>
          </div>

          {/* STEP 2 */}
          <div id="step-2">
            <AccordionStep
              numero={2}
              titolo="Catering"
              attivo={state.stepAttivo === 2}
              completato={
                state.stepCompletati.includes(2) && isStepCompletato(state, 2)
              }
              riepilogo={riepilogoStep2}
              onClick={() => setStepAttivo(2)}
              disabilitato={!state.stepCompletati.includes(1)}
            >
              <Step2Catering
                state={state}
                update={update}
                ranges={config.cateringRanges}
                onAvanti={() => avantiAStep(2, 3)}
                onIndietro={() => indietroAStep(2, 1)}
              />
            </AccordionStep>
          </div>

          {/* STEP 3 */}
          <div id="step-3">
            <AccordionStep
              numero={3}
              titolo="Bar e bevande"
              attivo={state.stepAttivo === 3}
              completato={state.stepCompletati.includes(3)}
              riepilogo={riepilogoStep3}
              onClick={() => setStepAttivo(3)}
              disabilitato={!state.stepCompletati.includes(2)}
            >
              <Step3Bar
                state={state}
                update={update}
                config={{
                  costoDrink: config.costoDrink,
                  feeDrinkPercentuale: config.feeDrinkPercentuale,
                  baristaCosto: config.baristaCosto,
                  drinkMin: config.drinkMin,
                  drinkMax: config.drinkMax,
                }}
                onAvanti={() => avantiAStep(3, 4)}
                onIndietro={() => indietroAStep(3, 2)}
              />
            </AccordionStep>
          </div>

          {/* STEP 4 */}
          <div id="step-4">
            <AccordionStep
              numero={4}
              titolo="DJ e musica"
              attivo={state.stepAttivo === 4}
              completato={
                state.stepCompletati.includes(4) && isStepCompletato(state, 4)
              }
              riepilogo={riepilogoStep4}
              onClick={() => setStepAttivo(4)}
              disabilitato={!state.stepCompletati.includes(3)}
            >
              <Step4DJ
                state={state}
                update={update}
                pacchetti={pacchettiDj}
                onAvanti={() => avantiAStep(4, 5)}
                onIndietro={() => indietroAStep(4, 3)}
              />
            </AccordionStep>
          </div>

          {/* STEP 5 */}
          <div id="step-5">
            <AccordionStep
              numero={5}
              titolo="Allestimento"
              attivo={state.stepAttivo === 5}
              completato={
                state.stepCompletati.includes(5) && isStepCompletato(state, 5)
              }
              riepilogo={riepilogoStep5}
              onClick={() => setStepAttivo(5)}
              disabilitato={!state.stepCompletati.includes(4)}
            >
              <Step5Allestimento
                state={state}
                update={update}
                costi={{
                  base: config.allestimentoBase,
                  medio: config.allestimentoMedio,
                  premium: config.allestimentoPremium,
                }}
                onAvanti={() => avantiAStep(5, 6)}
                onIndietro={() => indietroAStep(5, 4)}
              />
            </AccordionStep>
          </div>

          {/* STEP 6 - Riepilogo */}
          <div id="step-6">
            <AccordionStep
              numero={6}
              titolo="Riepilogo e prenotazione"
              attivo={state.stepAttivo === 6}
              completato={false}
              onClick={() => setStepAttivo(6)}
              disabilitato={!state.stepCompletati.includes(5)}
            >
              {calcolo && state.stepCompletati.includes(5) ? (
                <Step6Riepilogo
                  state={state}
                  sala={sala}
                  calcolo={calcolo}
                  onIndietro={() => indietroAStep(6, 5)}
                  onLeadInviato={reset}
                />
              ) : (
                <div
                  className="p-6 rounded-lg text-center"
                  style={{
                    background: 'rgba(201, 162, 74, 0.04)',
                    border: '1px dashed rgba(201, 162, 74, 0.3)',
                  }}
                >
                  <p style={{ color: 'var(--dark-soft)' }}>
                    Completa tutti gli step precedenti per vedere il riepilogo
                  </p>
                </div>
              )}
            </AccordionStep>
          </div>
        </div>
      </div>

      <StickyPriceBar
        visible={showStickyPrice}
        prezzoStimato={calcolo?.totaleStimato ?? null}
        etichetta="stima evento"
        ctaLabel={
          state.stepCompletati.includes(5) ? 'Vai al riepilogo' : 'Riepilogo'
        }
        ctaDisabled={!state.stepCompletati.includes(5)}
        onCtaClick={() => {
          setStepAttivo(6);
          setTimeout(() => {
            document
              .getElementById('step-6')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }}
      />
    </>
  );
}