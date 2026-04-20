# Event Planner MVP

"Amazon degli eventi" - Configuratore evento + Stima budget + Prenotazione call

## 🚀 Setup rapido

### 1. Clone e dipendenze
```bash
git clone <repo>
cd event-planner
npm install
```

### 2. Configurazione Supabase
- Crea progetto su [supabase.com](https://supabase.com)
- Esegui lo script in `schema.sql` nel SQL editor di Supabase
- Copia URL e API key nel `.env.local`

### 3. Configurazione Resend
- Iscritti a [resend.com](https://resend.com)
- Copia API key nel `.env.local`

### 4. Env variables
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
RESEND_API_KEY=re_xxxxx
NEXT_PUBLIC_COMPANY_EMAIL=tua-email@example.com
NEXT_PUBLIC_COMPANY_NAME=Tuo Event
```

### 5. Run dev
```bash
npm run dev
```

Vai a `http://localhost:3000/configura-evento`

---

## 📁 Struttura file

```
src/
├── app/
│   ├── page.tsx (home)
│   ├── configura-evento/page.tsx (main configuratore)
│   ├── api/lead/route.ts (POST endpoint)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ProgressBar.tsx
│   ├── ConfiguratorStep.tsx
│   ├── BudgetPreview.tsx
│   ├── Summary.tsx
│   └── BookingForm.tsx
└── lib/
    ├── pricing.ts (logica calcolo prezzo)
    ├── supabase.ts (client config)
    └── email.ts (Resend integration)
```

---

## 🎯 Flow principale

1. **Home page** → CTA "Configura evento"
2. **Step 1-6** → Tipo evento, persone, location, catering, DJ, extra
3. **Budget preview** → Aggiornato in real-time (fixed bottom)
4. **Booking form** → Nome, email, telefono, data preferita
5. **Conferma** → Lead salvato in Supabase + Email inviata

---

## 💰 Pricing (customizzabile in `src/lib/pricing.ts`)

| Servizio | Costo |
|----------|-------|
| Catering base | €15/persona |
| Catering medio | €25/persona |
| Catering premium | €40/persona |
| DJ | €400 |
| Fotografo | €200 |
| Allestimento | €250 |
| Location economica | €350 |
| Location standard | €750 |
| Location premium | €1200 |

---

## 🎨 Colori custom

```css
--gold: #C9A24A
--gold-light: #E6C97A
--blue: #2F4A5A
--dark: #2B2B2B
--beige: #F2E6CF
```

Configurati in `tailwind.config.ts`

---

## 📧 Email automata

**Dopo booking:**
- ✅ Email interna: Dettagli lead + budget
- ✅ Email utente: Conferma ricezione + data consulenza

Configura in `src/lib/email.ts`

---

## 🔒 Supabase RLS

- Lettura: Solo admin (autenticati)
- Inserimento: Pubblico (no auth required)
- Trigger: Auto-update di `updated_at`

---

## 🚀 Deploy su Vercel

```bash
npm run build
vercel deploy
```

Ricorda di aggiungere env variables in Vercel dashboard.

---

## 📱 Mobile first

- Responsive design (Tailwind)
- Touch-friendly buttons
- Slider per numero persone
- Form ottimizzato mobile

---

## 🔧 Customizzazione rapida

### Aggiungere tipo evento
Modifica `EVENT_TYPES` in `src/lib/pricing.ts`

### Cambiare pricing
Modifica `PRICING` object in `src/lib/pricing.ts`

### Aggiungere servizio
1. Aggiungi property in `EventConfig` interface
2. Aggiungi checkbox in `ConfiguratorStep` (step 6)
3. Aggiungi prezzo in `PRICING.services`
4. Aggiorna `calculatePrice()`

---

## ⚠️ Prima di andare live

- [ ] Testare form submission
- [ ] Verificare email (spam folder)
- [ ] Aggiungere custom domain Resend
- [ ] Personalizzare footer + company info
- [ ] Setup Google Calendar integration (opzionale)
- [ ] SSL certificate su Vercel
- [ ] Test mobile + desktop
- [ ] Analytics (Vercel Analytics o Google)

---

## 📞 Integrazioni future

- Google Calendar per automatizzare slot disponibili
- Calendly embed per booking diretto
- Stripe per pagamenti (fase 2)
- Admin dashboard per visualizzare leads
- SMS reminder pre-consulenza

---

Fatto! Il tuo MVP è pronto. 🚀
