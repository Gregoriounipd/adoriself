// =====================================================================
// PAGINA — /privacy
// =====================================================================
// Posizione: src/app/privacy/page.tsx
//
// PLACEHOLDER scheletro GDPR. Da personalizzare con il tuo legale/commercialista.
// I template seguenti coprono i punti base richiesti dal GDPR italiano.
// =====================================================================

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Adoriself',
  description: 'Informativa sul trattamento dei dati personali.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-pattern">
      {/* Header */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(255, 253, 248, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201, 162, 74, 0.2)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-5 h-5 rotate-45 rounded-sm flex-shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              }}
            />
            <h1
              className="font-display text-xl"
              style={{
                fontWeight: 600,
                color: 'var(--dark)',
                letterSpacing: '-0.01em',
              }}
            >
              Adori Self
            </h1>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-gold"
          style={{ color: 'var(--dark-soft)' }}
        >
          ← Torna alla home
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <div className="divider-gold" />
          <p
            className="text-xs uppercase font-medium"
            style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            Compliance
          </p>
        </div>

        <h1
          className="font-display mb-6"
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Informativa Privacy
        </h1>

        <p
          className="text-sm mb-10"
          style={{ color: 'var(--dark-soft)', opacity: 0.7 }}
        >
          Ultima modifica: {new Date().toLocaleDateString('it-IT')}
        </p>

        {/* ⚠️ BANNER WIP */}
        <div
          className="p-4 rounded-lg mb-10"
          style={{
            background: 'rgba(218, 165, 32, 0.08)',
            border: '1px solid rgba(218, 165, 32, 0.3)',
          }}
        >
          <p
            className="text-sm"
            style={{ color: 'var(--dark)', lineHeight: 1.6 }}
          >
            <strong>⚠️ Versione provvisoria.</strong> Questa informativa è uno
            scheletro generico. Prima del go-live, fai revisionare il testo dal
            tuo commercialista o legale di fiducia per conformità al GDPR italiano.
          </p>
        </div>

        <div className="prose-content space-y-8 text-sm" style={{ color: 'var(--dark-soft)', lineHeight: 1.7 }}>

          <section>
            <h2 className="font-display mb-3" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}>
              1. Titolare del trattamento
            </h2>
            <p>
              Il titolare del trattamento dei dati personali è{' '}
              <strong style={{ color: 'var(--dark)' }}>Adoriself</strong>, con
              sede in [via giovanni xxiii, 14], P.IVA [05752550284],
              email <a href="mailto:assistenza.adorievents@gmail.com" style={{ color: 'var(--gold-dark)' }}>assistenza.adorievents@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}>
              2. Dati raccolti
            </h2>
            <p>
              Attraverso il configuratore eventi raccogliamo i seguenti dati personali:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Nome e cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono</li>
              <li>Indirizzo IP e dati tecnici di navigazione</li>
              <li>Preferenze relative all'evento (tipo, persone, date)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display mb-3" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}>
              3. Finalità del trattamento
            </h2>
            <p>I tuoi dati personali sono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Contattarti per fissare una consulenza gratuita</li>
              <li>Inviarti la conferma scritta della richiesta</li>
              <li>Organizzare e gestire l'eventuale evento</li>
              <li>Adempiere a obblighi fiscali e contrattuali</li>
              <li>Eventuali comunicazioni promozionali (solo previo consenso esplicito)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display mb-3" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}>
              4. Base giuridica
            </h2>
            <p>
              Il trattamento si fonda sul tuo consenso esplicito (art. 6, par. 1,
              lett. a GDPR) e sulla necessità di adempiere a obblighi contrattuali
              e fiscali (art. 6, par. 1, lett. b e c GDPR).
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}>
              5. Conservazione
            </h2>
            <p>
              I dati vengono conservati per il tempo strettamente necessario alle
              finalità sopra indicate. Per i dati amministrativi/fiscali: 10 anni
              come da normativa italiana. Per i lead non convertiti: 24 mesi dalla
              raccolta.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}>
              6. Strumenti utilizzati
            </h2>
            <p>
              I dati sono gestiti tramite strumenti di terze parti che agiscono
              come responsabili del trattamento:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong style={{ color: 'var(--dark)' }}>Supabase</strong> (database)</li>
              <li><strong style={{ color: 'var(--dark)' }}>Resend</strong> (invio email)</li>
              <li><strong style={{ color: 'var(--dark)' }}>Google Calendar</strong> (gestione appuntamenti)</li>
              <li><strong style={{ color: 'var(--dark)' }}>Vercel</strong> (hosting)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display mb-3" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}>
              7. Diritti dell'interessato
            </h2>
            <p>
              In qualsiasi momento puoi esercitare i seguenti diritti previsti
              dal GDPR:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Accesso ai tuoi dati personali</li>
              <li>Rettifica di dati inesatti</li>
              <li>Cancellazione (diritto all'oblio)</li>
              <li>Limitazione del trattamento</li>
              <li>Portabilità dei dati</li>
              <li>Opposizione al trattamento</li>
              <li>Revoca del consenso in qualsiasi momento</li>
              <li>Reclamo all'Autorità Garante per la protezione dei dati personali</li>
            </ul>
            <p className="mt-3">
              Per esercitare questi diritti, scrivi a{' '}
              <a
                href="mailto:info@adoriself.it"
                style={{ color: 'var(--gold-dark)' }}
              >
                assistenza.adorievents@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display mb-3" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}>
              8. Modifiche all'informativa
            </h2>
            <p>
              Adoriself si riserva il diritto di modificare la presente
              informativa, dandone comunicazione tramite il sito web.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}