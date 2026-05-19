// =====================================================================
// COMPONENTE — FormContatto
// =====================================================================
// Posizione: src/components/configuratore/FormContatto.tsx
//
// Form contatto a 4 campi (nome, email, telefono, privacy).
// Si apre inline sotto il bottone "Richiedi consulenza".
// Su submit: chiama server action → redirect a /grazie?lead=ID
// =====================================================================

'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { creaLeadAction, type DatiContatto } from '@/lib/actions/crea-lead';
import type { ConfiguratoreState } from '@/types/configuratore';
import type { CalcoloEvento } from '@/lib/calculator';

interface FormContattoProps {
  state: ConfiguratoreState;
  calcolo: CalcoloEvento;
  salaId: number;
  salaNome: string;
  /** Callback per cleanup dopo submit (es. svuota localStorage) */
  onSuccess?: () => void;
}

export function FormContatto({
  state,
  calcolo,
  salaId,
  salaNome,
  onSuccess,
}: FormContattoProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [nome, setNome] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [errore, setErrore] = useState<string | null>(null);

  // Validazione minima frontend (la server action ri-valida tutto)
  const isFormValid =
    nome.trim().length >= 2 &&
    telefono.trim().length >= 8 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    privacy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrore(null);

    const contatto: DatiContatto = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono.trim(),
      privacy,
    };

    startTransition(async () => {
      const result = await creaLeadAction({
        contatto,
        state,
        calcolo,
        salaId,
        salaNome,
      });

      if (result.success) {
        // Cleanup
        if (onSuccess) onSuccess();
        // Redirect a /grazie
        router.push(`/grazie?lead=${result.leadId}`);
      } else {
        setErrore(result.error);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 animate-fade-in"
    >
      {/* Header form */}
      <div className="mb-2">
        <p
          className="text-xs uppercase mb-1"
          style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}
        >
          Ultimo passaggio
        </p>
        <h4
          className="font-display"
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--dark)',
            letterSpacing: '-0.01em',
          }}
        >
          Lasciaci i tuoi contatti
        </h4>
        <p
          className="text-sm mt-1"
          style={{ color: 'var(--dark-soft)', lineHeight: 1.5 }}
        >
          Ti chiamiamo entro 24h per fissare una consulenza gratuita.
        </p>
      </div>

      {/* Nome */}
      <div>
        <label
          className="block text-xs uppercase mb-1.5"
          style={{
            color: 'var(--dark-soft)',
            letterSpacing: '0.1em',
            fontWeight: 500,
          }}
        >
          Nome e cognome *
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          disabled={isPending}
          autoComplete="name"
          placeholder="Mario Rossi"
          className="w-full"
        />
      </div>

      {/* Cellulare */}
      <div>
        <label
          className="block text-xs uppercase mb-1.5"
          style={{
            color: 'var(--dark-soft)',
            letterSpacing: '0.1em',
            fontWeight: 500,
          }}
        >
          Cellulare *
        </label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          disabled={isPending}
          autoComplete="tel"
          placeholder="+39 333 1234567"
          className="w-full"
        />
        <p
          className="text-xs mt-1"
          style={{ color: 'var(--dark-soft)', opacity: 0.7 }}
        >
          Ti chiamiamo entro 24 ore
        </p>
      </div>

      {/* Email */}
      <div>
        <label
          className="block text-xs uppercase mb-1.5"
          style={{
            color: 'var(--dark-soft)',
            letterSpacing: '0.1em',
            fontWeight: 500,
          }}
        >
          Email *
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isPending}
          autoComplete="email"
          placeholder="mario.rossi@email.com"
          className="w-full"
        />
        <p
          className="text-xs mt-1"
          style={{ color: 'var(--dark-soft)', opacity: 0.7 }}
        >
          Per inviarti la conferma scritta
        </p>
      </div>

      {/* Privacy */}
      <label
        className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all"
        style={{
          background: privacy ? 'var(--gold-subtle)' : 'rgba(255, 253, 248, 0.5)',
          border: `1px solid ${
            privacy ? 'rgba(201, 162, 74, 0.3)' : 'rgba(43, 43, 43, 0.08)'
          }`,
        }}
      >
        <input
          type="checkbox"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
          required
          disabled={isPending}
          className="mt-0.5 w-4 h-4 cursor-pointer flex-shrink-0"
          style={{ accentColor: 'var(--gold)' }}
        />
        <span
          className="text-xs"
          style={{ color: 'var(--dark-soft)', lineHeight: 1.5 }}
        >
          Ho letto e accetto l'
          <Link
            href="/privacy"
            target="_blank"
            className="underline"
            style={{ color: 'var(--gold-dark)' }}
          >
            informativa privacy
          </Link>{' '}
          *
        </span>
      </label>

      {/* Errore */}
      {errore && (
        <div
          className="p-3 rounded-lg text-sm animate-fade-in"
          style={{
            background: 'rgba(220, 38, 38, 0.06)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            color: '#991B1B',
          }}
        >
          ⚠️ {errore}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid || isPending}
        className="w-full button-primary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="flex items-center justify-center gap-2">
          {isPending ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="animate-spin"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="20"
                  strokeLinecap="round"
                  opacity="0.3"
                />
                <path
                  d="M8 2C11.3137 2 14 4.68629 14 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Invio in corso...
            </>
          ) : (
            <>
              Invia richiesta
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7H12M12 7L7 2M12 7L7 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </span>
      </button>

      {/* Microcopy fiducia */}
      <p
        className="text-xs text-center"
        style={{ color: 'var(--dark-soft)', opacity: 0.7 }}
      >
        🔒 I tuoi dati sono al sicuro. Mai condivisi con terze parti.
      </p>
    </form>
  );
}