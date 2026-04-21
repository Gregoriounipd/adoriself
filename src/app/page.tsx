'use client';

import Link from 'next/link';

const features = [
  {
    num: '01',
    title: 'Configura',
    desc: 'Scegli tipo evento, numero di ospiti, catering e servizi aggiuntivi in pochi click.',
  },
  {
    num: '02',
    title: 'Stima istantanea',
    desc: 'Il budget si aggiorna in tempo reale mentre costruisci il tuo evento ideale.',
  },
  {
    num: '03',
    title: 'Prenota la call',
    desc: 'Una consulenza gratuita e personalizzata per trasformare la visione in realtà.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--beige)' }}>

      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(255,253,248,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201,162,74,0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="w-5 h-5 rotate-45 rounded-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}
            />
            <span
              className="font-display text-xl"
              style={{ fontWeight: 600, color: 'var(--dark)', letterSpacing: '-0.01em' }}
            >
              Adori Self
            </span>
          </div>

          <Link href="/configura-evento" className="button-primary">
            <span>Configura evento</span>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: 'clamp(5rem, 12vw, 9rem)',
          paddingBottom: 'clamp(5rem, 12vw, 9rem)',
        }}
      >
        {/* Sfondo decorativo */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 80% 40%, rgba(47,74,90,0.06) 0%, transparent 70%), ' +
              'radial-gradient(ellipse 50% 50% at 10% 80%, rgba(201,162,74,0.07) 0%, transparent 60%)',
          }}
        />

        {/* Linea verticale decorativa */}
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 hidden lg:block"
          style={{
            width: '1px',
            left: 'calc((100vw - 72rem) / 2 - 2rem)',
            background: 'linear-gradient(to bottom, transparent, rgba(201,162,74,0.3), transparent)',
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-3xl animate-fade-up">

            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="divider-gold" style={{ width: '32px' }} />
              <span
                className="text-xs font-medium uppercase"
                style={{ color: 'var(--gold)', letterSpacing: '0.22em' }}
              >
                Pianificazione eventi
              </span>
            </div>

            <h2
              className="font-display mb-6"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 600,
                lineHeight: 1.05,
                color: 'var(--dark)',
                letterSpacing: '-0.02em',
              }}
            >
              L'evento
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>a porta di click</em>
            </h2>

            <p
              className="mb-10 animate-fade-up delay-100"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'rgba(43,43,43,0.65)',
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: '520px',
              }}
            >
              Configura il tuo evento in pochi minuti, ottieni una stima budget
              immediata e prenota una consulenza gratuita.
              Tutto semplice, rapido e trasparente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-200">
              <Link href="/configura-evento" className="button-primary text-center">
                <span>Inizia a configurare</span>
              </Link>
              <a href="#come-funziona" className="button-secondary text-center">
                Scopri come funziona
              </a>
            </div>

            {/* Social proof mini */}
            <div
              className="flex items-center gap-4 mt-12 animate-fade-up delay-300"
              style={{ opacity: 0.6 }}
            >
              <div className="flex -space-x-2">
                {['#C9A24A','#2F4A5A','#8B6A3A'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2"
                    style={{ background: c, borderColor: 'var(--beige)' }}
                  />
                ))}
              </div>
              <p className="text-sm" style={{ color: 'rgba(43,43,43,0.55)', fontWeight: 300 }}>
                Oltre <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>200 eventi</strong> organizzati
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Come funziona ── */}
      <section
        id="come-funziona"
        style={{
          background: 'var(--cream)',
          borderTop: '1px solid rgba(201,162,74,0.18)',
          borderBottom: '1px solid rgba(201,162,74,0.18)',
          paddingTop: 'clamp(4rem, 8vw, 7rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">

          {/* Intestazione */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="divider-gold" />
              <span
                className="text-xs uppercase"
                style={{ color: 'var(--gold)', letterSpacing: '0.22em', fontWeight: 500 }}
              >
                Il processo
              </span>
              <div className="divider-gold" />
            </div>
            <h3
              className="font-display"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, color: 'var(--dark)' }}
            >
              Come funziona
            </h3>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.num}
                className="card-flat p-8 group"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(43,43,43,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Numero */}
                <div
                  className="font-display mb-6"
                  style={{
                    fontSize: '3.5rem',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: 'rgba(201,162,74,0.25)',
                    fontStyle: 'italic',
                    transition: 'color 0.3s ease',
                  }}
                  ref={el => {
                    if (el) {
                      el.closest('.card-flat')?.addEventListener('mouseenter', () => {
                        el.style.color = 'rgba(201,162,74,0.55)';
                      });
                      el.closest('.card-flat')?.addEventListener('mouseleave', () => {
                        el.style.color = 'rgba(201,162,74,0.25)';
                      });
                    }
                  }}
                >
                  {f.num}
                </div>

                <div className="divider-gold mb-4" style={{ width: '24px' }} />

                <h4
                  className="font-display mb-3"
                  style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}
                >
                  {f.title}
                </h4>
                <p style={{ color: 'rgba(43,43,43,0.6)', fontWeight: 300, lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA finale ── */}
      <section
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Box CTA con bordo oro */}
          <div
            className="rounded-2xl p-12 md:p-16 text-center relative overflow-hidden"
            style={{
              background: 'var(--cream)',
              border: '1px solid rgba(201,162,74,0.3)',
              boxShadow: '0 8px 48px rgba(201,162,74,0.1)',
            }}
          >
            {/* Angoli decorativi */}
            {[
              'top-4 left-4 border-t border-l',
              'top-4 right-4 border-t border-r',
              'bottom-4 left-4 border-b border-l',
              'bottom-4 right-4 border-b border-r',
            ].map((cls, i) => (
              <div
                key={i}
                aria-hidden
                className={`absolute w-8 h-8 ${cls}`}
                style={{ borderColor: 'rgba(201,162,74,0.4)' }}
              />
            ))}

            <p
              className="text-xs uppercase mb-4"
              style={{ color: 'var(--gold)', letterSpacing: '0.22em', fontWeight: 500 }}
            >
              Inizia ora
            </p>

            <h3
              className="font-display mb-4"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 600,
                color: 'var(--dark)',
                letterSpacing: '-0.01em',
              }}
            >
              Pronto a organizzare
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>il tuo evento?</em>
            </h3>

            <div className="divider-gold mx-auto my-6" />

            <p
              className="mb-10"
              style={{
                color: 'rgba(43,43,43,0.6)',
                fontWeight: 300,
                maxWidth: '400px',
                margin: '0 auto 2.5rem',
              }}
            >
              Ottieni una stima in pochi minuti e prenota la tua consulenza gratuita.
            </p>

            <Link href="/configura-evento" className="button-primary inline-block">
              <span>Configura ora</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: '1px solid rgba(201,162,74,0.18)',
          background: 'var(--cream)',
          paddingTop: '3rem',
          paddingBottom: '3rem',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-4 h-4 rotate-45 rounded-sm"
              style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))' }}
            />
            <span
              className="font-display"
              style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '1rem' }}
            >
              Event Planner
            </span>
          </div>
          <p style={{ color: 'rgba(43,43,43,0.4)', fontSize: '0.875rem', fontWeight: 300 }}>
            &copy; 2024 Event Planner. Tutti i diritti riservati.
          </p>
        </div>
      </footer>

    </div>
  );
}