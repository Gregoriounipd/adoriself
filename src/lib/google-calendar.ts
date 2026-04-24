import { google } from 'googleapis';

export async function createCalendarEvent(eventData: {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendeeEmail: string;
}) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        universe_domain: 'googleapis.com',
      },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: {
        summary: eventData.title,
        description: eventData.description,
        start: {
          dateTime: eventData.startTime.toISOString(),
          timeZone: 'Europe/Rome',
        },
        end: {
          dateTime: eventData.endTime.toISOString(),
          timeZone: 'Europe/Rome',
        },
        attendees: [
          {
            email: eventData.attendeeEmail,
            responseStatus: 'needsAction',
          },
        ],
        conferenceData: {
          conferenceType: 'hangoutsMeet',
        },
      },
      conferenceDataVersion: 1,
    });

    console.log('✅ Calendar event created:', event.data.htmlLink);
    return event.data;
  } catch (error) {
    console.error('❌ Calendar error:', error);
    throw error;
  }
}