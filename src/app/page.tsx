'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-beige">
      {/* Navigation */}
      <nav className="border-b border-gold/30 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-display font-bold text-dark">Event Planner</h1>
          <Link
            href="/configura-evento"
            className="px-6 py-2 bg-gold hover:bg-gold-light text-white font-bold rounded-lg transition"
          >
            Configura evento
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-dark mb-6 leading-tight">
            L'Amazon degli eventi
          </h2>
          <p className="text-xl text-dark/70 mb-8">
            Configura il tuo evento in pochi minuti, ottieni una stima budget immediata e prenota una consulenza gratuita. 
            Tutto semplice, rapido e trasparente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/configura-evento"
              className="px-8 py-4 bg-gold hover:bg-gold-light text-white font-bold rounded-lg transition inline-block text-center"
            >
              Inizia a configurare →
            </Link>
            <button className="px-8 py-4 border-2 border-gold text-dark font-bold rounded-lg hover:bg-beige transition">
              Scopri come funziona
            </button>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-white border-y border-gold/30 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-display font-bold text-dark mb-12 text-center">
            Come funziona
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '1',
                title: 'Configura',
                desc: 'Scegli tipo evento, persone, catering e servizi aggiuntivi',
              },
              {
                num: '2',
                title: 'Ottieni stima',
                desc: 'Vedi il budget stimato in tempo reale mentre configuri',
              },
              {
                num: '3',
                title: 'Prenota call',
                desc: 'Contattaci per una consulenza gratuita e personalizzata',
              },
            ].map(feature => (
              <div key={feature.num} className="p-8 text-center">
                <div className="text-4xl font-display font-bold text-gold mb-4">
                  {feature.num}
                </div>
                <h4 className="text-xl font-display font-bold text-dark mb-2">
                  {feature.title}
                </h4>
                <p className="text-dark/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h3 className="text-3xl font-display font-bold text-dark mb-8">
          Pronto a organizzare il tuo evento?
        </h3>
        <Link
          href="/configura-evento"
          className="px-8 py-4 bg-gold hover:bg-gold-light text-white font-bold rounded-lg transition inline-block"
        >
          Configura ora
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-gold/30 bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-dark/60">
          <p>&copy; 2024 Event Planner. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
