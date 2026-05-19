// =====================================================================
// PAGINA — /come-funziona
// =====================================================================
// Posizione: src/app/come-funziona/page.tsx
//
// Pagina di onboarding/trust per Adoriself.
// Sezioni:
// 1. Hero - "Ciao, siamo Denis e Gregorio"
// 2. Chi siamo - la storia + USP consulenti
// 3. Processo in 4 step
// 4. Tabella "Chi fa cosa"
// 5. Prezzi trasparenti
// 6. FAQ
// 7. CTA finale
// =====================================================================

import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Come funziona — Adoriself',
  description:
    'Adoriself: i consulenti che organizzano il tuo evento in Veneto. Prezzi trasparenti, processo in 4 step, oltre 50 eventi gestiti nel primo anno.',
};

export default function ComeFunzionaPage() {
  return (
    <main className="min-h-screen bg-pattern">
      {/* ── Header ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: 'rgba(255, 253, 248, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201, 162, 74, 0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-5 h-5 rotate-45 rounded-sm flex-shrink-0 transition-transform group-hover:rotate-[60deg]"
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

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#scegli-citta"
              className="text-sm uppercase tracking-wider transition-colors hover:text-gold"
              style={{ color: 'var(--dark-soft)', letterSpacing: '0.1em' }}
            >
              Sale
            </Link>
            <Link
              href="/come-funziona"
              className="text-sm uppercase tracking-wider"
              style={{ color: 'var(--gold-dark)', letterSpacing: '0.1em' }}
            >
              Come funziona
            </Link>
            <Link href="/#scegli-citta">
              <Button>Inizia ora</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────── */}
      {/* SEZIONE 1 — HERO                                         */}
      {/* ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="flex items-center gap-4 mb-8 animate-fade-up">
          <div className="divider-gold" />
          <p
            className="text-xs uppercase font-medium"
            style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
          >
            Come funziona
          </p>
        </div>

        <h1
          className="font-display mb-6 animate-fade-up"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            animationDelay: '0.1s',
          }}
        >
          Ciao, siamo{' '}
          <span
            style={{
              fontStyle: 'italic',
              background:
                'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Denis e Gregorio.
          </span>
        </h1>

        <p
          className="text-lg md:text-xl max-w-3xl mb-12 animate-fade-up"
          style={{
            color: 'var(--dark-soft)',
            fontWeight: 300,
            lineHeight: 1.6,
            animationDelay: '0.2s',
          }}
        >
          Da Padova organizziamo eventi che non si dimenticano. Oltre 50 nel
          nostro primo anno, e abbiamo capito una cosa: la differenza non la
          fanno gli ingredienti, ma chi li unisce.
        </p>

        {/* Stats row */}
        <div
          className="grid grid-cols-3 gap-4 md:gap-8 mb-4 animate-fade-up max-w-2xl"
          style={{ animationDelay: '0.3s' }}
        >
          <StatBox numero="50+" label="Eventi nel primo anno" />
          <StatBox numero="4" label="Province coperte" />
          <StatBox numero="400" label="Ospiti gestiti in un evento" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────── */}
      {/* SEZIONE 2 — CHI SIAMO                                    */}
      {/* ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <SectionLabel>La nostra storia</SectionLabel>
        <h2
          className="font-display mb-10"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            maxWidth: '40rem',
          }}
        >
          Abbiamo creato Adoriself perché organizzare un evento è un casino.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
          {/* Testo */}
          <div
            className="space-y-5 text-base md:text-lg max-w-2xl"
            style={{
              color: 'var(--dark-soft)',
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            <p>
              Tu vuoi una serata indimenticabile, non passare tre settimane a
              chiamare DJ, catering, sale, fotografi — ognuno che parla un
              linguaggio diverso e ti propone un preventivo diverso.
            </p>
            <p>
              Per questo facciamo i{' '}
              <strong style={{ color: 'var(--dark)' }}>consulenti</strong>, non
              i rivenditori. Tu paghi i fornitori direttamente — niente
              ricarichi nascosti — e a noi paghi solo il lavoro che facciamo:
              trovare i fornitori giusti, coordinarli, e farti vivere l&apos;evento
              senza pensieri.
            </p>
            <p>
              <strong style={{ color: 'var(--dark)' }}>Denis</strong> viene
              dall&apos;associazione FastLife di Padova, dove per anni ha
              organizzato feste da 300-400 persone. Sa cosa significa gestire
              un evento grande quando le cose si complicano sul campo —
              perché lì succede sempre qualcosa.
            </p>
            <p>
              Padova è la nostra base, ma operiamo in tutto il Veneto.
            </p>
          </div>

          {/* Card team */}
          <div className="lg:sticky lg:top-24 w-full max-w-xs mx-auto">
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{
                background: 'var(--cream)',
                border: '1px solid rgba(201, 162, 74, 0.25)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <p
                className="text-xs uppercase font-medium"
                style={{
                  color: 'var(--gold)',
                  letterSpacing: '0.18em',
                }}
              >
                Il team
              </p>
              <TeamMember
                iniziale="D"
                nome="Denis"
                ruolo="Operations · ex FastLife"
              />
              <div
                style={{
                  height: '1px',
                  background: 'rgba(201, 162, 74, 0.2)',
                }}
              />
              <TeamMember
                iniziale="G"
                nome="Gregorio"
                ruolo="Strategia · Sviluppo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────── */}
      {/* SEZIONE 3 — PROCESSO 4 STEP                              */}
      {/* ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <SectionLabel>Come lavoriamo</SectionLabel>
        <h2
          className="font-display mb-12"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          Il tuo evento, in quattro passi.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <StepCard
            numero="01"
            titolo="Configura online"
            descrizione="Su questo sito, in 5 minuti, scegli sala e servizi. Vedi subito una stima trasparente del costo totale."
            tempo="≈ 5 minuti"
          />
          <StepCard
            numero="02"
            titolo="Ci sentiamo"
            descrizione="Ti chiamiamo entro 24 ore. Ascoltiamo, capiamo cosa vuoi davvero, prendiamo un caffè se vieni a Padova."
            tempo="Entro 24h"
          />
          <StepCard
            numero="03"
            titolo="Confermiamo i dettagli"
            descrizione="Definiamo il tuo evento al millimetro. Tu firmi un solo accordo con noi, non cinque con cinque fornitori diversi."
            tempo="In 2-3 giorni"
          />
          <StepCard
            numero="04"
            titolo="Tu vivi l'evento"
            descrizione="Noi coordiniamo tutto sul campo. Tu pensi solo a divertirti e far divertire i tuoi ospiti."
            tempo="Il grande giorno"
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────── */}
      {/* SEZIONE 4 — TABELLA "Chi fa cosa"                        */}
      {/* ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <SectionLabel>Trasparenza totale</SectionLabel>
        <h2
          className="font-display mb-4"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          Chi fa cosa, senza misteri.
        </h2>
        <p
          className="text-lg mb-10 max-w-2xl"
          style={{
            color: 'var(--dark-soft)',
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Sappiamo che ti chiedi: &quot;Cosa includono e cosa no?&quot;. Niente
          giri di parole, ecco come funziona davvero.
        </p>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--cream)',
            border: '1px solid rgba(201, 162, 74, 0.2)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Header tabella */}
          <div
            className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-4"
            style={{
              background: 'var(--gold-subtle)',
              borderBottom: '1px solid rgba(201, 162, 74, 0.2)',
            }}
          >
            <span
              className="text-xs uppercase font-medium"
              style={{ color: 'var(--gold-dark)', letterSpacing: '0.15em' }}
            >
              Servizio
            </span>
            <span
              className="text-xs uppercase font-medium text-center"
              style={{
                color: 'var(--gold-dark)',
                letterSpacing: '0.1em',
                minWidth: '90px',
              }}
            >
              Adoriself
            </span>
            <span
              className="text-xs uppercase font-medium text-center"
              style={{
                color: 'var(--gold-dark)',
                letterSpacing: '0.1em',
                minWidth: '90px',
              }}
            >
              Fornitore
            </span>
          </div>

          {/* Righe */}
          <TabellaRiga
            servizio="Coordinamento generale"
            adori="full"
            fornitore="none"
          />
          <TabellaRiga
            servizio="Scelta della sala"
            adori="full"
            fornitore="none"
            note="Selezioniamo le migliori della zona"
          />
          <TabellaRiga
            servizio="Sala (costo)"
            adori="management"
            fornitore="payment"
            note="Tu paghi direttamente la sala scelta"
          />
          <TabellaRiga
            servizio="Catering"
            adori="management"
            fornitore="payment"
            note="Selezioniamo e coordiniamo, tu paghi al catering"
          />
          <TabellaRiga
            servizio="DJ / Musica"
            adori="management"
            fornitore="payment"
            note="Selezioniamo e coordiniamo, tu paghi al DJ"
          />
          <TabellaRiga
            servizio="Bar e drink"
            adori="full"
            fornitore="none"
            note="Gestiamo noi tutta la parte bar"
          />
          <TabellaRiga
            servizio="Allestimento"
            adori="full"
            fornitore="none"
            note="Decorazioni, fiori, mise en place"
          />
          <TabellaRiga
            servizio="Audio / Luci"
            adori="management"
            fornitore="payment"
            note="In genere incluso nel pacchetto DJ"
            isLast
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────── */}
      {/* SEZIONE 5 — PREZZI                                       */}
      {/* ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <SectionLabel>Prezzi</SectionLabel>
        <h2
          className="font-display mb-4"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          Niente pacchetti fissi.
          <br />
          Solo trasparenza.
        </h2>
        <p
          className="text-lg mb-12 max-w-2xl"
          style={{
            color: 'var(--dark-soft)',
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Il prezzo dipende da quello che scegli. Più sale il valore del tuo
          evento, più scende la nostra percentuale di consulenza.
        </p>

        {/* Card scaglioni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <ScaglioneCard
            range="fino a € 1.500"
            percentuale="20%"
            label="Eventi piccoli"
          />
          <ScaglioneCard
            range="€ 1.500 – 5.000"
            percentuale="18-16%"
            label="Eventi medi"
            highlight
          />
          <ScaglioneCard
            range="oltre € 5.000"
            percentuale="14-12%"
            label="Eventi grandi"
          />
        </div>

        {/* Disclaimer IVA */}
        <div
          className="p-5 rounded-xl space-y-2 text-sm"
          style={{
            background: 'rgba(47, 74, 90, 0.04)',
            border: '1px solid rgba(47, 74, 90, 0.15)',
            color: 'var(--dark-soft)',
          }}
        >
          <p className="flex items-start gap-2">
            <span style={{ fontSize: '1rem' }}>💼</span>
            <span style={{ lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--dark)' }}>IVA 22%</strong>{' '}
              applicata solo sulla nostra consulenza e sui servizi che
              gestiamo internamente (bar, allestimento). I fornitori esterni
              li paghi tu direttamente, con la loro fattura.
            </span>
          </p>
          <p className="flex items-start gap-2 pt-1">
            <span style={{ fontSize: '1rem' }}>🧾</span>
            <span style={{ lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--dark)' }}>
                Nel preventivo vedi ogni voce.
              </strong>{' '}
              Niente costi nascosti, niente sorprese. È quello che ti diciamo,
              è quello che paghi.
            </span>
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────── */}
      {/* SEZIONE 6 — FAQ                                          */}
      {/* ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <SectionLabel>Domande frequenti</SectionLabel>
        <h2
          className="font-display mb-10"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          Le cose che ci chiedete sempre.
        </h2>

        <div className="space-y-4 max-w-3xl">
          <FAQItem domanda="Quanto costa organizzare un evento con voi?">
            <p>
              Dipende da te: da quante persone, che tipo di evento, che
              livello di catering, se vuoi DJ, allestimento eccetera. Per
              ogni evento si parte da circa <strong>€1.500</strong> e si
              arriva a quanto vuoi.
            </p>
            <p className="mt-3">
              Il modo più veloce per capirlo?{' '}
              <Link
                href="/#scegli-citta"
                className="underline"
                style={{ color: 'var(--gold-dark)' }}
              >
                Configura il tuo evento qui
              </Link>{' '}
              e vedi la stima in 5 minuti.
            </p>
          </FAQItem>

          <FAQItem domanda="Vi occupate davvero di tutto o solo di alcune cose?">
            <p>
              Ci occupiamo di tutto: sala, catering, DJ, fotografo,
              allestimento, bar, audio luci — tutto.
            </p>
            <p className="mt-3">
              Però se vuoi solo uno dei servizi (es. solo il DJ o solo
              l&apos;allestimento), si può fare anche quello. Ne parliamo in
              consulenza.
            </p>
          </FAQItem>

          <FAQItem domanda="In che zone lavorate?">
            <p>
              Padova è la nostra base. Operiamo in tutto il Veneto,
              principalmente <strong>Padova, Treviso e Venezia</strong>.
            </p>
            <p className="mt-3">
              <strong>Verona e Vicenza</strong> presto: stiamo selezionando
              le sale migliori della zona, apriremo nei prossimi mesi.
            </p>
          </FAQItem>

          <FAQItem domanda="Quanto anticipo serve per prenotare?">
            <p>
              Idealmente <strong>1-2 mesi</strong>: ci dà tempo di
              selezionare i fornitori migliori e personalizzare bene
              l&apos;evento.
            </p>
            <p className="mt-3">
              Però se hai una serata libera e i fornitori giusti sono
              disponibili, riusciamo a fare un evento anche in{' '}
              <strong>10-15 giorni</strong>. Sentici comunque, valutiamo
              insieme.
            </p>
          </FAQItem>

          <FAQItem domanda="Se ho un budget limitato, riuscite comunque a fare qualcosa di bello?">
            <p>
              Sì. Il configuratore ti permette di simulare diversi budget.
              Con <strong>€1.500</strong> ci sta una bella festa intima. Con{' '}
              <strong>€5.000</strong> ci sta un evento grande.
            </p>
            <p className="mt-3">
              La nostra consulenza serve proprio a tirarne fuori il meglio
              con quello che hai. Non c&apos;è un budget &quot;troppo basso&quot;
              per chiamarci — c&apos;è solo il modo giusto di spenderlo.
            </p>
          </FAQItem>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────── */}
      {/* SEZIONE 7 — CTA FINALE                                   */}
      {/* ─────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div
          className="rounded-3xl p-10 md:p-16 text-center"
          style={{
            background:
              'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
            boxShadow: '0 16px 64px rgba(201, 162, 74, 0.25)',
          }}
        >
          <p
            className="text-xs uppercase mb-4 font-medium"
            style={{
              color: 'rgba(255, 253, 248, 0.85)',
              letterSpacing: '0.25em',
            }}
          >
            Pronto a iniziare?
          </p>

          <h2
            className="font-display mb-6"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
            }}
          >
            Il tuo evento, in 5 minuti.
          </h2>

          <p
            className="text-base md:text-lg mb-10 max-w-2xl mx-auto"
            style={{
              color: 'rgba(255, 253, 248, 0.92)',
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Configura tutto online, ricevi una stima trasparente, e ti
            chiamiamo per il resto. Senza impegno, senza pensieri.
          </p>

          <Link href="/#scegli-citta">
            <button
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--cream)',
                color: 'var(--gold-dark)',
                letterSpacing: '0.02em',
                boxShadow: '0 4px 16px rgba(43, 43, 43, 0.15)',
              }}
            >
              Configura il tuo evento
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7H12M12 7L7 2M12 7L7 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Link>
        </div>
      </section>

      {/* Footer minimale */}
      <footer className="max-w-5xl mx-auto px-6 py-10 text-center">
        <p
          className="text-sm"
          style={{ color: 'var(--dark-soft)', opacity: 0.6 }}
        >
          © {new Date().getFullYear()} Adoriself — Padova, Veneto.{' '}
          <Link
            href="/privacy"
            className="underline"
            style={{ color: 'var(--gold-dark)' }}
          >
            Privacy
          </Link>
        </p>
      </footer>
    </main>
  );
}

/* ── Sotto-componenti ──────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="divider-gold" />
      <p
        className="text-xs uppercase font-medium"
        style={{ color: 'var(--gold)', letterSpacing: '0.2em' }}
      >
        {children}
      </p>
    </div>
  );
}

function StatBox({ numero, label }: { numero: string; label: string }) {
  return (
    <div>
      <p
        className="font-display mb-1"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 600,
          color: 'var(--gold-dark)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {numero}
      </p>
      <p
        className="text-xs uppercase"
        style={{
          color: 'var(--dark-soft)',
          letterSpacing: '0.1em',
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function TeamMember({
  iniziale,
  nome,
  ruolo,
}: {
  iniziale: string;
  nome: string;
  ruolo: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display"
        style={{
          background:
            'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
          color: 'var(--cream)',
          fontWeight: 600,
          fontSize: '1.15rem',
          boxShadow: '0 4px 12px rgba(201, 162, 74, 0.3)',
        }}
      >
        {iniziale}
      </div>
      <div>
        <p
          className="font-display"
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--dark)',
            lineHeight: 1.2,
          }}
        >
          {nome}
        </p>
        <p
          className="text-xs"
          style={{ color: 'var(--dark-soft)', lineHeight: 1.4 }}
        >
          {ruolo}
        </p>
      </div>
    </div>
  );
}

function StepCard({
  numero,
  titolo,
  descrizione,
  tempo,
}: {
  numero: string;
  titolo: string;
  descrizione: string;
  tempo: string;
}) {
  return (
    <div
      className="p-6 rounded-2xl h-full transition-all duration-300 hover:shadow-card-hover"
      style={{
        background: 'var(--cream)',
        border: '1px solid rgba(201, 162, 74, 0.2)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="flex items-baseline justify-between mb-4">
        <span
          className="font-display"
          style={{
            fontSize: '2.5rem',
            fontWeight: 600,
            color: 'var(--gold)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {numero}
        </span>
        <span
          className="text-xs uppercase px-2.5 py-1 rounded-full"
          style={{
            background: 'var(--gold-subtle)',
            color: 'var(--gold-dark)',
            letterSpacing: '0.08em',
            fontWeight: 500,
          }}
        >
          {tempo}
        </span>
      </div>

      <h3
        className="font-display mb-2"
        style={{
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--dark)',
          letterSpacing: '-0.01em',
        }}
      >
        {titolo}
      </h3>

      <p
        className="text-sm"
        style={{
          color: 'var(--dark-soft)',
          fontWeight: 300,
          lineHeight: 1.6,
        }}
      >
        {descrizione}
      </p>
    </div>
  );
}

function TabellaRiga({
  servizio,
  adori,
  fornitore,
  note,
  isLast,
}: {
  servizio: string;
  adori: 'full' | 'management' | 'none';
  fornitore: 'payment' | 'none';
  note?: string;
  isLast?: boolean;
}) {
  return (
    <div
      className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-4 items-center"
      style={{
        borderBottom: isLast ? 'none' : '1px solid rgba(201, 162, 74, 0.12)',
      }}
    >
      <div>
        <p
          className="font-medium"
          style={{ color: 'var(--dark)', fontSize: '0.95rem' }}
        >
          {servizio}
        </p>
        {note && (
          <p
            className="text-xs mt-0.5"
            style={{ color: 'var(--dark-soft)', opacity: 0.75 }}
          >
            {note}
          </p>
        )}
      </div>

      <div className="text-center" style={{ minWidth: '90px' }}>
        {adori === 'full' && (
          <span
            className="text-sm"
            style={{ color: 'var(--gold-dark)', fontWeight: 600 }}
          >
            ✓
          </span>
        )}
        {adori === 'management' && (
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              background: 'var(--gold-subtle)',
              color: 'var(--gold-dark)',
              fontWeight: 500,
            }}
          >
            gestione
          </span>
        )}
        {adori === 'none' && (
          <span style={{ color: 'var(--dark-soft)', opacity: 0.3 }}>—</span>
        )}
      </div>

      <div className="text-center" style={{ minWidth: '90px' }}>
        {fornitore === 'payment' && (
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              background: 'rgba(47, 74, 90, 0.08)',
              color: 'var(--blue)',
              fontWeight: 500,
            }}
          >
            paghi tu
          </span>
        )}
        {fornitore === 'none' && (
          <span style={{ color: 'var(--dark-soft)', opacity: 0.3 }}>—</span>
        )}
      </div>
    </div>
  );
}

function ScaglioneCard({
  range,
  percentuale,
  label,
  highlight,
}: {
  range: string;
  percentuale: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="relative p-6 rounded-2xl"
      style={{
        background: highlight ? 'var(--gold-subtle)' : 'var(--cream)',
        border: `1.5px solid ${highlight ? 'var(--gold)' : 'rgba(201, 162, 74, 0.2)'}`,
        boxShadow: highlight
          ? '0 8px 32px rgba(201, 162, 74, 0.15)'
          : 'var(--shadow-card)',
      }}
    >
      {highlight && (
        <div
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
          style={{
            background:
              'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)',
            color: 'var(--cream)',
            letterSpacing: '0.05em',
            boxShadow: '0 2px 6px rgba(201, 162, 74, 0.3)',
          }}
        >
          ⭐ Più comune
        </div>
      )}

      <p
        className="text-xs uppercase mb-2"
        style={{
          color: 'var(--dark-soft)',
          letterSpacing: '0.15em',
          fontWeight: 500,
        }}
      >
        {label}
      </p>

      <p
        className="font-display mb-1"
        style={{
          fontSize: '2rem',
          fontWeight: 600,
          color: 'var(--gold-dark)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {percentuale}
      </p>

      <p
        className="text-sm mt-3"
        style={{ color: 'var(--dark-soft)' }}
      >
        Consulenza per eventi {range}
      </p>
    </div>
  );
}

function FAQItem({
  domanda,
  children,
}: {
  domanda: string;
  children: React.ReactNode;
}) {
  return (
    <details
      className="group rounded-2xl overflow-hidden"
      style={{
        background: 'var(--cream)',
        border: '1px solid rgba(201, 162, 74, 0.2)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <summary
        className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer list-none"
        style={{ color: 'var(--dark)' }}
      >
        <span
          className="font-display"
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          {domanda}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
          style={{ color: 'var(--gold)' }}
        >
          <path
            d="M5 8L10 13L15 8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div
        className="px-5 md:px-6 pb-6 text-sm md:text-base"
        style={{
          color: 'var(--dark-soft)',
          fontWeight: 300,
          lineHeight: 1.7,
          borderTop: '1px solid rgba(201, 162, 74, 0.12)',
          paddingTop: '1rem',
        }}
      >
        {children}
      </div>
    </details>
  );
}