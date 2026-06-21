// =====================================================================
// COMPONENTE — TabsServizi
// =====================================================================
// Posizione: src/components/homepage/TabsServizi.tsx
//
// Tab switcher Booking-style sopra l'hero per scegliere tra:
// - Evento completo (default)
// - Allestimento singolo
// - Bar singolo
// - Fotografo singolo
//
// Selezione tab → naviga a /servizio/[tipo] o resta su / (evento completo)
// =====================================================================

'use client';

import Link from 'next/link';

const TABS = [
  {
    id: 'completo',
    label: 'Evento completo',
    icon: '🎉',
    href: '/#scegli-citta',
    isCompleto: true,
  },
  {
    id: 'allestimento',
    label: 'Solo allestimento',
    icon: '✨',
    href: '/servizio/allestimento',
    isCompleto: false,
  },
  {
    id: 'bar',
    label: 'Solo bar',
    icon: '🍸',
    href: '/servizio/bar',
    isCompleto: false,
  },
  {
    id: 'fotografo',
    label: 'Solo fotografo',
    icon: '📷',
    href: '/servizio/fotografo',
    isCompleto: false,
  },
];

interface TabsServiziProps {
  /** ID del tab attualmente attivo */
  attivo?: string;
}

export function TabsServizi({ attivo = 'completo' }: TabsServiziProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 -mb-2">
      <div
        className="inline-flex items-center gap-1 p-1.5 rounded-full whitespace-nowrap"
        style={{
          background: 'rgba(255, 253, 248, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(201, 162, 74, 0.18)',
          boxShadow: '0 4px 16px rgba(43, 43, 43, 0.04)',
        }}
      >
        {TABS.map((tab) => {
          const isActive = attivo === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)'
                  : 'transparent',
                color: isActive ? 'var(--cream)' : 'var(--dark-soft)',
                boxShadow: isActive
                  ? '0 2px 8px rgba(201, 162, 74, 0.3)'
                  : 'none',
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ fontSize: '1.05rem' }}>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">
                {tab.id === 'completo' ? 'Completo' : tab.label.replace('Solo ', '')}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}