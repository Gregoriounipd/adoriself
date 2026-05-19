import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface UserData {
  nome: string;
  email: string;
  telefono: string;
}

interface EventData {
  tipo_evento: string;
  num_persone: number;
  budget_min: number;
  budget_max: number;
}

/* ── Helpers ─────────────────────────────────────────────────── */
const fmt = (n: number) => n.toLocaleString('it-IT');

/* ── Stili inline condivisi ──────────────────────────────────── */
const COLORS = {
  gold:       '#C9A24A',
  goldLight:  '#E6C97A',
  goldSubtle: '#F9F2E3',
  dark:       '#2B2B2B',
  darkSoft:   '#3D3D3D',
  beige:      '#F2E6CF',
  cream:      '#FFFDF8',
  border:     '#E8D9B8',
  muted:      '#888888',
};

/* ── Layout wrapper ──────────────────────────────────────────── */
function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Event Planner</title>
</head>
<body style="
  margin: 0; padding: 0;
  background-color: ${COLORS.beige};
  font-family: Georgia, 'Times New Roman', serif;
  -webkit-font-smoothing: antialiased;
">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.beige}; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <!-- Header brand -->
          <tr>
            <td style="padding-bottom: 24px; text-align: center;">
              <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="
                    width: 10px; height: 10px;
                    background: linear-gradient(135deg, ${COLORS.gold}, #A07830);
                    transform: rotate(45deg);
                    border-radius: 2px;
                    display: inline-block;
                    margin-right: 10px;
                    vertical-align: middle;
                  "></td>
                  <td style="
                    font-family: Georgia, serif;
                    font-size: 20px;
                    font-weight: 600;
                    color: ${COLORS.dark};
                    letter-spacing: -0.3px;
                    vertical-align: middle;
                  ">Event Planner</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card principale -->
          <tr>
            <td style="
              background: ${COLORS.cream};
              border: 1px solid ${COLORS.border};
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 8px 40px rgba(43,43,43,0.08);
            ">
              <!-- Banda oro superiore -->
              <tr>
                <td style="
                  height: 4px;
                  background: linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight}, ${COLORS.gold});
                "></td>
              </tr>

              <!-- Contenuto -->
              <tr>
                <td style="padding: 48px 48px 40px;">
                  ${content}
                </td>
              </tr>

              <!-- Footer card -->
              <tr>
                <td style="
                  padding: 20px 48px;
                  border-top: 1px solid ${COLORS.border};
                  background: ${COLORS.goldSubtle};
                  text-align: center;
                ">
                  <p style="margin:0; font-size:11px; color:${COLORS.muted}; font-family: Arial, sans-serif; letter-spacing: 0.05em;">
                    © ${new Date().getFullYear()} Event Planner &nbsp;·&nbsp; Tutti i diritti riservati
                  </p>
                </td>
              </tr>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── Riga info riutilizzabile ────────────────────────────────── */
function infoRow(label: string, value: string): string {
  return `
  <tr>
    <td style="padding: 10px 0; border-bottom: 1px solid ${COLORS.border};">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="
            font-family: Arial, sans-serif;
            font-size: 11px;
            color: ${COLORS.muted};
            text-transform: uppercase;
            letter-spacing: 0.12em;
            width: 40%;
            vertical-align: top;
            padding-top: 2px;
          ">${label}</td>
          <td style="
            font-family: Georgia, serif;
            font-size: 15px;
            color: ${COLORS.darkSoft};
            font-weight: 400;
            vertical-align: top;
          ">${value}</td>
        </tr>
      </table>
    </td>
  </tr>`;
}

/* ── Template: email interna (lead) ─────────────────────────── */
function buildInternalEmail(user: UserData, event: EventData, companyName: string): string {
  const content = `
    <!-- Eyebrow -->
    <p style="
      margin: 0 0 8px;
      font-family: Arial, sans-serif;
      font-size: 11px;
      color: ${COLORS.gold};
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-weight: 500;
    ">Nuovo lead</p>

    <!-- Titolo -->
    <h1 style="
      margin: 0 0 8px;
      font-family: Georgia, serif;
      font-size: 28px;
      font-weight: 600;
      color: ${COLORS.dark};
      letter-spacing: -0.3px;
      line-height: 1.2;
    ">${user.nome}</h1>
    <p style="
      margin: 0 0 32px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      color: ${COLORS.muted};
    ">Ha configurato un <strong style="color:${COLORS.darkSoft}">${event.tipo_evento}</strong></p>

    <!-- Divisore gold -->
    <div style="width:40px; height:2px; background:${COLORS.gold}; border-radius:1px; margin-bottom:32px;"></div>

    <!-- Sezione contatti -->
    <p style="
      margin: 0 0 12px;
      font-family: Arial, sans-serif;
      font-size: 10px;
      color: ${COLORS.gold};
      text-transform: uppercase;
      letter-spacing: 0.18em;
    ">Contatti</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      ${infoRow('Email', `<a href="mailto:${user.email}" style="color:${COLORS.gold}; text-decoration:none;">${user.email}</a>`)}
      ${infoRow('Telefono', `<a href="tel:${user.telefono}" style="color:${COLORS.gold}; text-decoration:none;">${user.telefono}</a>`)}
    </table>

    <!-- Sezione evento -->
    <p style="
      margin: 0 0 12px;
      font-family: Arial, sans-serif;
      font-size: 10px;
      color: ${COLORS.gold};
      text-transform: uppercase;
      letter-spacing: 0.18em;
    ">Dettagli evento</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
      ${infoRow('Tipo', event.tipo_evento)}
      ${infoRow('Ospiti', `${event.num_persone} persone`)}
      ${infoRow('Budget stimato', `€ ${fmt(event.budget_min)} – € ${fmt(event.budget_max)}`)}
    </table>

    <!-- CTA -->
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="
          background: linear-gradient(135deg, ${COLORS.gold}, #A07830);
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(201,162,74,0.3);
        ">
          <a href="mailto:${user.email}" style="
            display: inline-block;
            padding: 14px 28px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            font-weight: 700;
            color: ${COLORS.cream};
            text-decoration: none;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          ">Rispondi al lead →</a>
        </td>
      </tr>
    </table>
  `;
  return emailWrapper(content);
}

/* ── Template: email utente (conferma) ──────────────────────── */
function buildUserEmail(user: UserData, event: EventData, companyName: string): string {
  const content = `
    <!-- Eyebrow -->
    <p style="
      margin: 0 0 8px;
      font-family: Arial, sans-serif;
      font-size: 11px;
      color: ${COLORS.gold};
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-weight: 500;
    ">Richiesta ricevuta</p>

    <!-- Titolo -->
    <h1 style="
      margin: 0 0 16px;
      font-family: Georgia, serif;
      font-size: 28px;
      font-weight: 600;
      color: ${COLORS.dark};
      letter-spacing: -0.3px;
      line-height: 1.2;
    ">Ciao ${user.nome},<br/>il tuo evento è<br/><em style="color:${COLORS.gold}">quasi realtà.</em></h1>

    <!-- Divisore gold -->
    <div style="width:40px; height:2px; background:${COLORS.gold}; border-radius:1px; margin-bottom:24px;"></div>

    <p style="
      margin: 0 0 32px;
      font-family: Arial, sans-serif;
      font-size: 15px;
      color: ${COLORS.muted};
      line-height: 1.7;
      font-weight: 400;
    ">
      Abbiamo ricevuto la tua configurazione e la stiamo analizzando.<br/>
      Ti contatteremo a breve per fissare una <strong style="color:${COLORS.darkSoft}">consulenza gratuita</strong> e personalizzata.
    </p>

    <!-- Box riepilogo -->
    <div style="
      background: ${COLORS.goldSubtle};
      border: 1px solid ${COLORS.border};
      border-radius: 12px;
      padding: 28px 32px;
      margin-bottom: 32px;
    ">
      <p style="
        margin: 0 0 16px;
        font-family: Arial, sans-serif;
        font-size: 10px;
        color: ${COLORS.gold};
        text-transform: uppercase;
        letter-spacing: 0.18em;
      ">La tua configurazione</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${infoRow('Evento', event.tipo_evento)}
        ${infoRow('Ospiti', `${event.num_persone} persone`)}
        ${infoRow('Budget stimato', `€ ${fmt(event.budget_min)} – € ${fmt(event.budget_max)}`)}
      </table>
    </div>

    <p style="
      margin: 0;
      font-family: Arial, sans-serif;
      font-size: 13px;
      color: ${COLORS.muted};
      line-height: 1.6;
    ">
      A presto,<br/>
      <strong style="color:${COLORS.darkSoft}; font-family: Georgia, serif; font-size:15px;">${companyName}</strong>
    </p>
  `;
  return emailWrapper(content);
}

/* ── Funzione principale ─────────────────────────────────────── */
export async function sendLeadEmail(user: UserData, event: EventData) {
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'noreply@events.com';
  const companyName  = process.env.NEXT_PUBLIC_COMPANY_NAME  || 'Event Planner';

  try {
    await Promise.all([
      // Email interna
      resend.emails.send({
        from:    `${companyName} <${companyEmail}>`,
        to:      companyEmail,
        subject: `Nuovo lead: ${user.nome} — ${event.tipo_evento} (${event.num_persone} ospiti)`,
        html:    buildInternalEmail(user, event, companyName),
      }),
      // Email utente
      resend.emails.send({
        from:    `${companyName} <${companyEmail}>`,
        to:      user.email,
        subject: `${user.nome}, abbiamo ricevuto la tua richiesta ✦`,
        html:    buildUserEmail(user, event, companyName),
      }),
    ]);
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}