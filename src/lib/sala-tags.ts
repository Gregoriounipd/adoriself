// =====================================================================
// HELPER — Tag dinamici per le sale
// =====================================================================
// Posizione: src/lib/sala-tags.ts
//
// Calcola i tag da mostrare su una SalaCard in base ai dati DB.
// Estendibile: aggiungi nuove regole man mano che popoli dati.
// =====================================================================

import type { Sala } from '@/types/sala';

export type SalaTag = {
  /** Etichetta visualizzata */
  label: string;
  /** Categoria per styling */
  variant: 'evento' | 'capienza' | 'feature' | 'evidenza';
  /** Icona emoji o lucide */
  icon?: string;
};

/**
 * Genera fino a 2 tag rilevanti per una sala.
 * Priorità: evidenza > tipo evento > capienza > feature.
 */
export function getTagSala(sala: Sala): SalaTag[] {
  const tags: SalaTag[] = [];

  // ── 1. EVIDENZA (priorità massima) ──
  if (sala.in_evidenza) {
    tags.push({
      label: 'Più scelta',
      variant: 'evidenza',
      icon: '⭐',
    });
  }

  // ── 2. TIPO EVENTO (mostro UNO solo, il più popolare) ──
  const tipiEvento = sala.tipi_evento_adatti ?? [];

  // Priorità tipi evento: 18° > matrimonio > laurea > compleanno > aziendale
  if (tipiEvento.includes('18_anni') || tipiEvento.includes('diciottesimo')) {
    tags.push({
      label: 'Ideale per 18°',
      variant: 'evento',
      icon: '🎂',
    });
  } else if (tipiEvento.includes('matrimonio')) {
    tags.push({
      label: 'Perfetta per matrimoni',
      variant: 'evento',
      icon: '💍',
    });
  } else if (tipiEvento.includes('laurea')) {
    tags.push({
      label: 'Ottima per lauree',
      variant: 'evento',
      icon: '🎓',
    });
  } else if (tipiEvento.includes('compleanno')) {
    tags.push({
      label: 'Ideale per compleanni',
      variant: 'evento',
      icon: '🎉',
    });
  } else if (tipiEvento.includes('aziendale')) {
    tags.push({
      label: 'Eventi aziendali',
      variant: 'evento',
      icon: '💼',
    });
  }

  // ── 3. CAPIENZA (sempre se disponibile, ma max 2 tag totali) ──
  if (tags.length < 2 && sala.capienza_totale) {
    const cap = sala.capienza_totale;
    if (cap >= 150) {
      tags.push({
        label: 'Grandi eventi (150+)',
        variant: 'capienza',
        icon: '👥',
      });
    } else if (cap >= 80) {
      tags.push({
        label: `Fino a ${cap} persone`,
        variant: 'capienza',
        icon: '👥',
      });
    } else if (cap < 50) {
      tags.push({
        label: 'Evento intimo',
        variant: 'capienza',
        icon: '✨',
      });
    }
  }

  // ── 4. FEATURE SPECIALI (solo se ancora spazio) ──
  if (tags.length < 2) {
    if (sala.ha_giardino) {
      tags.push({
        label: 'Con giardino',
        variant: 'feature',
        icon: '🌿',
      });
    } else if (sala.ha_parcheggio) {
      tags.push({
        label: 'Parcheggio incluso',
        variant: 'feature',
        icon: '🅿️',
      });
    }
  }

  // Massimo 2 tag visualizzati
  return tags.slice(0, 2);
}

/**
 * Stile per ogni variant di tag.
 */
export function getTagStyle(variant: SalaTag['variant']): {
  background: string;
  color: string;
  border: string;
} {
  switch (variant) {
    case 'evidenza':
      return {
        background: 'rgba(201, 162, 74, 0.95)',
        color: 'var(--cream)',
        border: 'rgba(160, 120, 48, 0.3)',
      };
    case 'evento':
      return {
        background: 'rgba(201, 162, 74, 0.12)',
        color: 'var(--gold-dark)',
        border: 'rgba(201, 162, 74, 0.3)',
      };
    case 'capienza':
      return {
        background: 'rgba(47, 74, 90, 0.08)',
        color: 'var(--blue)',
        border: 'rgba(47, 74, 90, 0.2)',
      };
    case 'feature':
      return {
        background: 'rgba(242, 230, 207, 0.6)',
        color: 'var(--dark)',
        border: 'rgba(43, 43, 43, 0.1)',
      };
  }
}