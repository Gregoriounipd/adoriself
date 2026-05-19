// =====================================================================
// COMPONENTE — CalcomEmbed
// =====================================================================
// Posizione: src/components/grazie/CalcomEmbed.tsx
//
// Embed inline di Cal.com per prenotare la call dopo l'invio lead.
// Pre-compila nome/email per ridurre attrito.
//
// Implementazione: iframe semplice (no SDK Cal.com, zero dipendenze npm).
//
// CONFIGURAZIONE:
// Modifica CAL_LINK con il tuo link Cal.com event type.
// Esempio: "adoriself/consulenza-adoriself"
// =====================================================================

'use client';

// ⚠️ CONFIGURA QUI il tuo link Cal.com
// Formato: "username/event-type-slug"
// Esempio: "adoriself/consulenza-adoriself"
const CAL_LINK = 'adori-events/consulenza-adori-events';

interface CalcomEmbedProps {
  /** Email cliente per pre-compilare il form */
  email?: string;
  /** Nome cliente per pre-compilare il form */
  nome?: string;
  /** Note evento per arrivare al booking con contesto */
  note?: string;
}

export function CalcomEmbed({ email, nome, note }: CalcomEmbedProps) {
  // Costruzione URL con prefill query params
  const params = new URLSearchParams();
  if (nome) params.set('name', nome);
  if (email) params.set('email', email);
  if (note) params.set('notes', note);

  // Tema visivo
  params.set('theme', 'light');

  const queryString = params.toString();
  const embedSrc = `https://cal.com/${CAL_LINK}${queryString ? '?' + queryString : ''}`;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--cream)',
        border: '1px solid rgba(201, 162, 74, 0.2)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <iframe
        src={embedSrc}
        title="Prenota una call con Adoriself"
        style={{
          border: 'none',
          width: '100%',
          minHeight: '700px',
          display: 'block',
        }}
        loading="lazy"
      />
    </div>
  );
}