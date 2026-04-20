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

export async function sendLeadEmail(user: UserData, event: EventData) {
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'noreply@events.com';
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Event Company';

  try {
    // Email interno (a noi)
    await resend.emails.send({
      from: `${companyName} <${companyEmail}>`,
      to: companyEmail,
      subject: `🎉 Nuovo lead: ${user.nome} - ${event.tipo_evento}`,
      html: `
        <h2>Nuovo lead configuratore evento</h2>
        <p><strong>Nome:</strong> ${user.nome}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Telefono:</strong> ${user.telefono}</p>
        <hr />
        <p><strong>Tipo evento:</strong> ${event.tipo_evento}</p>
        <p><strong>Persone:</strong> ${event.num_persone}</p>
        <p><strong>Budget stimato:</strong> €${event.budget_min} - €${event.budget_max}</p>
      `,
    });

    // Email utente
    await resend.emails.send({
      from: `${companyName} <${companyEmail}>`,
      to: user.email,
      subject: `Abbiamo ricevuto la tua richiesta, ${user.nome} 🎉`,
      html: `
        <h2>Grazie per la tua richiesta!</h2>
        <p>Ciao ${user.nome},</p>
        <p>Abbiamo ricevuto la tua configurazione evento e ti contatteremo a breve.</p>
        <p><strong>Stima budget:</strong> €${event.budget_min} - €${event.budget_max}</p>
        <p>A presto!</p>
        <p>${companyName}</p>
      `,
    });
  } catch (error) {
    console.error('Email error:', error);
  }
}
