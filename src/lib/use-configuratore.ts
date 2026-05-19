// =====================================================================
// HOOK — useConfiguratore
// =====================================================================
// Posizione: src/lib/use-configuratore.ts
//
// Gestisce lo stato del configuratore con persistenza in localStorage.
// Lo stato viene ripristinato al re-load se l'utente torna sulla stessa sala.
// =====================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  type ConfiguratoreState,
  creaStatoIniziale,
} from '@/types/configuratore';

const STORAGE_KEY_PREFIX = 'adoriself_configuratore_';

function getStorageKey(salaId: number): string {
  return `${STORAGE_KEY_PREFIX}${salaId}`;
}

/**
 * Hook per gestire lo stato del configuratore.
 * - Persiste in localStorage (chiave per ogni sala)
 * - Hydration-safe (no SSR mismatch)
 */
export function useConfiguratore(salaId: number) {
  // Stato iniziale: parte sempre con stato pulito (no SSR mismatch)
  const [state, setState] = useState<ConfiguratoreState>(() =>
    creaStatoIniziale(salaId)
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // Al mount client-side, prova a leggere da localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(getStorageKey(salaId));
      if (saved) {
        const parsed = JSON.parse(saved) as ConfiguratoreState;
        // Verifica che sia per la stessa sala
        if (parsed.salaId === salaId) {
          setState(parsed);
        }
      }
    } catch (err) {
      console.warn('[useConfiguratore] errore lettura localStorage:', err);
    }
    setIsHydrated(true);
  }, [salaId]);

  // Salva in localStorage ogni volta che lo stato cambia (dopo hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(getStorageKey(salaId), JSON.stringify(state));
    } catch (err) {
      console.warn('[useConfiguratore] errore salvataggio localStorage:', err);
    }
  }, [state, isHydrated, salaId]);

  // Helper: update parziale dello stato
  const update = useCallback((patch: Partial<ConfiguratoreState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  // Helper: cambia step attivo
  const setStepAttivo = useCallback((step: number) => {
    setState((prev) => ({ ...prev, stepAttivo: step }));
  }, []);

  // Helper: marca step come completato (se non già)
  const completaStep = useCallback((step: number) => {
    setState((prev) => {
      if (prev.stepCompletati.includes(step)) return prev;
      return {
        ...prev,
        stepCompletati: [...prev.stepCompletati, step].sort(),
      };
    });
  }, []);

  // Helper: reset totale (utile dopo invio lead)
  const reset = useCallback(() => {
    try {
      localStorage.removeItem(getStorageKey(salaId));
    } catch {}
    setState(creaStatoIniziale(salaId));
  }, [salaId]);

  return {
    state,
    update,
    setStepAttivo,
    completaStep,
    reset,
    isHydrated,
  };
}