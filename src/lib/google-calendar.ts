interface GoogleCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
}

async function getAccessToken(): Promise<string> {
  const credentials: GoogleCredentials = {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID || '',
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID || '',
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
  };

  const { createSign } = await import('crypto');
  
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64');
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/calendar',
    aud: credentials.token_uri,
    exp: now + 3600,
    iat: now,
  };
  
  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = createSign('RSA-SHA256')
    .update(`${header}.${payloadEncoded}`)
    .sign(credentials.private_key, 'base64');

  const jwt = `${header}.${payloadEncoded}.${signature}`;

  const response = await fetch(credentials.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const data = await response.json() as { access_token: string };
  return data.access_token;
}

export async function createCalendarEvent(eventData: {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendeeEmail: string;
}) {
  try {
    const accessToken = await getAccessToken();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    const event = {
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
    };

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      throw new Error(`Calendar API error: ${response.statusText}`);
    }

    const data = await response.json() as { htmlLink?: string };
    console.log('✅ Calendar event created:', data.htmlLink);
    return data;
  } catch (error) {
    console.error('❌ Calendar error:', error);
    throw error;
  }
}