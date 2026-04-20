# 📦 Struttura Completa Progetto

```
event-planner/
│
├── 📄 Package Files
│   ├── package.json                 # Dipendenze
│   ├── tsconfig.json               # TypeScript config
│   ├── tailwind.config.ts          # Tailwind + colori custom
│   ├── next.config.js              # Next.js config
│   └── .env.local                  # Variables segrete
│
├── 📁 src/
│   │
│   ├── 📁 app/                     # APP ROUTER (Next.js 13+)
│   │   ├── page.tsx                # HOME PAGE con CTA
│   │   ├── layout.tsx              # Layout root (fonts, metadata)
│   │   ├── globals.css             # CSS globale
│   │   │
│   │   ├── 📁 configura-evento/    # MAIN FEATURE
│   │   │   └── page.tsx            # Step 1-6 + Booking
│   │   │
│   │   ├── 📁 api/
│   │   │   └── 📁 lead/
│   │   │       └── route.ts        # POST endpoint - Salva lead
│   │   │
│   │   └── 📁 admin/               # OPTIONAL
│   │       └── 📁 leads/
│   │           └── page.tsx        # Dashboard leads
│   │
│   ├── 📁 components/              # COMPONENTI RIUTILIZZABILI
│   │   ├── ProgressBar.tsx         # Barra progresso step
│   │   ├── ConfiguratorStep.tsx    # Switch step 1-6
│   │   ├── BudgetPreview.tsx       # Preview budget fixed
│   │   ├── Summary.tsx             # Riepilogo evento
│   │   └── BookingForm.tsx         # Form prenotazione call
│   │
│   └── 📁 lib/                     # UTILITIES & SERVICES
│       ├── pricing.ts              # Logica prezzi + interfaces
│       ├── supabase.ts             # Supabase client + types
│       ├── email.ts                # Resend email templates
│       └── validation.ts           # Form validation
│
├── 📄 Documentation
│   ├── README.md                   # Quick start
│   ├── SETUP.md                    # Detailed setup checklist
│   ├── schema.sql                  # SQL per Supabase
│   └── .gitignore                  # Git ignore rules
│
```

---

## 🔄 FLOW APPLICATIVO

```
HOME (/)
  ↓
  [CTA] "Configura evento"
  ↓
CONFIGURATORE (/configura-evento)
  ├─ Step 1: Tipo evento (18°, laurea, etc.)
  ├─ Step 2: Numero persone (slider)
  ├─ Step 3: Location (3 opzioni)
  ├─ Step 4: Catering (base, medio, premium)
  ├─ Step 5: DJ (si/no)
  └─ Step 6: Extra (fotografo, allestimento)
  ↓
  [Budget preview updated in real-time - fixed bottom]
  ↓
  [CTA] "Procedi prenotazione"
  ↓
BOOKING FORM
  ├─ Form: nome, email, telefono, data preferita
  ├─ Summary: Riepilogo configurazione
  └─ [Submit] "BLOCCA CONSULENZA GRATUITA"
  ↓
BACKEND (/api/lead)
  ├─ Validate form
  ├─ Calculate price (minPrice - maxPrice)
  ├─ Save to Supabase
  ├─ Send email (internal + user)
  └─ Return success
  ↓
SUCCESS PAGE
  └─ "Perfetto! Ti contatteremo a breve"
```

---

## 💾 DATABASE SCHEMA

### Table: `leads`

| Column | Type | Notes |
|--------|------|-------|
| id | BIGSERIAL | Primary key |
| tipo_evento | VARCHAR(255) | '18° compleanno', 'Laurea', etc. |
| num_persone | INTEGER | Numero ospiti |
| location | VARCHAR(100) | 'economica', 'standard', 'premium' |
| catering | VARCHAR(50) | 'base', 'medio', 'premium' |
| dj | BOOLEAN | true/false |
| fotografo | BOOLEAN | true/false |
| allestimento | BOOLEAN | true/false |
| budget_min | INTEGER | Stima minima |
| budget_max | INTEGER | Stima massima |
| nome | VARCHAR(255) | Nome cliente |
| email | VARCHAR(255) | Email cliente |
| telefono | VARCHAR(20) | Telefono cliente |
| data_preferita | DATE | Data preferita call |
| created_at | TIMESTAMP | Auto-insert |
| updated_at | TIMESTAMP | Auto-update |

---

## 🎨 STYLING STACK

- **Framework**: Tailwind CSS 4.0
- **Colori custom**: Definiti in `tailwind.config.ts`
- **Font**: Playfair Display (display) + Inter (body)
- **Mobile First**: Responsive su tutti i device

### Colori
```
--gold: #C9A24A          # Primary CTA
--gold-light: #E6C97A   # Hover states
--blue: #2F4A5A         # Accents
--dark: #2B2B2B         # Text
--beige: #F2E6CF        # Background
```

---

## 🔐 SECURITY & VALIDATION

- ✅ Form validation lato client (email, phone)
- ✅ Supabase RLS policies (insert public, select auth)
- ✅ CORS handled by Next.js
- ✅ Env variables in `.env.local` (non committati)
- ✅ Email validation regex
- ✅ Phone validation regex

---

## ⚡ PERFORMANCE

- Next.js 15 (latest)
- App Router (no legacy Pages)
- TypeScript strict mode
- Tailwind CSS with JIT
- Image optimization ready
- SSR pages per default

---

## 📡 API ENDPOINTS

### POST /api/lead
**Request body:**
```json
{
  "tipo_evento": "18° compleanno",
  "num_persone": 50,
  "location": "standard",
  "catering": "medio",
  "dj": true,
  "fotografo": false,
  "allestimento": true,
  "budget_min": 1800,
  "budget_max": 2500,
  "nome": "Luca Rossi",
  "email": "luca@example.com",
  "telefono": "+39 123 456 7890",
  "data_preferita": "2024-05-15"
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "created_at": "2024-04-17T10:30:00Z",
      ...
    }
  ]
}
```

---

## 📧 EMAIL TEMPLATES

### Email interna (to: company email)
- Subject: "🎉 Nuovo lead: {nome} - {evento}"
- Body: Dettagli lead + configurazione + budget

### Email utente (to: customer email)
- Subject: "Abbiamo ricevuto la tua richiesta, {nome} 🎉"
- Body: Conferma ricezione + stima budget + tempi contatto

---

## 🚀 DEPLOYMENT

**Vercel** (recommended)
- Automatic deployments from Git
- Auto-scaling
- Edge functions ready
- Env variables management

**Alternative:** Netlify, Railway, Heroku

---

## 📚 DIPENDENZE PRINCIPALI

```json
{
  "next": "^15.0.0",                    // Framework
  "react": "^19.0.0",                   // React 19
  "tailwindcss": "^4.0.0",              // Styling
  "@supabase/supabase-js": "^2.45.0",   // Database client
  "resend": "^3.0.0",                   // Email service
  "framer-motion": "^11.0.0"            // Animations (optional)
}
```

---

## ✅ CHECKLIST PRE-LAUNCH

- [ ] Testare form completo (tutti gli step)
- [ ] Testare database save
- [ ] Testare email invio (internal + user)
- [ ] Testare su mobile
- [ ] Testare su desktop
- [ ] Testare su browser diversi (Chrome, Safari, Firefox)
- [ ] Verificare prezzi sono corretti
- [ ] Verificare testi sono corretti
- [ ] Setup domain custom Resend
- [ ] Setup RLS policies Supabase
- [ ] Backup database Supabase
- [ ] Monitor errors (Sentry or similar)
- [ ] Analytics setup (Vercel or Google)

---

**PRONTO PER IL LAUNCH! 🚀**
