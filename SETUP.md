# 🚀 SETUP MVP - Checklist Completa

## FASE 1: Setup Supabase (10 min)

- [ ] Vai su https://supabase.com e crea account
- [ ] Crea nuovo progetto
- [ ] Vai a SQL Editor
- [ ] Copia il contenuto di `schema.sql`
- [ ] Esegui lo script (click "Run")
- [ ] Vai a Settings > API > Copia URL e `anon` key
- [ ] Aggiungi a `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
  ```

## FASE 2: Setup Resend (5 min)

- [ ] Vai su https://resend.com e crea account
- [ ] Vai a API Keys
- [ ] Crea nuova API key
- [ ] Aggiungi a `.env.local`:
  ```
  RESEND_API_KEY=re_xxxxx
  NEXT_PUBLIC_COMPANY_EMAIL=tua-email@example.com
  NEXT_PUBLIC_COMPANY_NAME=Tuo Event
  ```

## FASE 3: Setup locale (5 min)

```bash
# Clone o estrai il progetto
cd event-planner

# Installa dipendenze
npm install

# Avvia dev server
npm run dev
```

## FASE 4: Test completo

### Test form
- [ ] Vai a http://localhost:3000/configura-evento
- [ ] Compila step 1-6
- [ ] Verifica budget preview updated
- [ ] Compila form prenotazione
- [ ] Clicca "BLOCCA CONSULENZA GRATUITA"
- [ ] Verifica success page

### Test database
- [ ] Vai a Supabase dashboard
- [ ] Vai a Table Editor > leads
- [ ] Verifica il record è stato creato

### Test email
- [ ] Controlla email inbox (incluso spam)
- [ ] Verifica email interna ricevuta
- [ ] Verifica email utente ricevuta

## FASE 5: Customizzazione

### 1. Prezzi
File: `src/lib/pricing.ts`
- [ ] Modifica `PRICING` object con i tuoi costi
- [ ] Aggiungi/rimuovi servizi

### 2. Tipi evento
File: `src/lib/pricing.ts`
- [ ] Modifica `EVENT_TYPES` array

### 3. Location
File: `src/lib/pricing.ts`
- [ ] Modifica `LOCATIONS` array

### 4. Testi email
File: `src/lib/email.ts`
- [ ] Personalizza subject e body

### 5. Colori
File: `tailwind.config.ts`
- [ ] Modifica color palette se necessario

## FASE 6: Deploy Vercel (15 min)

```bash
# Build locale
npm run build

# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Dopo deploy:
- [ ] Vai a Vercel dashboard
- [ ] Progetto > Settings > Environment Variables
- [ ] Aggiungi tutte le env variables:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - RESEND_API_KEY
  - NEXT_PUBLIC_COMPANY_EMAIL
  - NEXT_PUBLIC_COMPANY_NAME

- [ ] Redeploy il progetto
- [ ] Testa form su URL live
- [ ] Verifica email

---

## 📋 Struttura finale file

```
event-planner/
├── src/
│   ├── app/
│   │   ├── page.tsx (HOME)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── configura-evento/page.tsx (MAIN)
│   │   ├── api/lead/route.ts (BACKEND)
│   │   └── admin/leads/page.tsx (OPTIONAL)
│   ├── components/
│   │   ├── ProgressBar.tsx
│   │   ├── ConfiguratorStep.tsx
│   │   ├── BudgetPreview.tsx
│   │   ├── Summary.tsx
│   │   └── BookingForm.tsx
│   └── lib/
│       ├── pricing.ts
│       ├── supabase.ts
│       ├── email.ts
│       └── validation.ts
├── schema.sql
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── .env.local
├── .gitignore
└── README.md
```

---

## 🔧 Troubleshooting

### Email non arriva
- [ ] Verifica RESEND_API_KEY è valida
- [ ] Controlla cartella spam
- [ ] Verifica NEXT_PUBLIC_COMPANY_EMAIL è valida
- [ ] Leggi docs Resend per domain verification

### Supabase error
- [ ] Verifica URL e key sono corretti
- [ ] Verifica schema.sql è stato eseguito
- [ ] Controlla RLS policies sono attive

### Form non funziona
- [ ] Apri console browser (F12)
- [ ] Verifica non ci sono errori JS
- [ ] Verifica network tab nel POST /api/lead

---

## 📞 Features future

- [ ] Google Calendar integration per slot disponibili
- [ ] Calendly embed per booking diretto
- [ ] WhatsApp integration per reminder
- [ ] Admin panel con dashboard (leads, stats)
- [ ] Stripe payment per acconto
- [ ] Email reminder pre-consulenza (task scheduler)

---

## ✅ PRONTO!

Il tuo MVP è live. Buona fortuna! 🚀
