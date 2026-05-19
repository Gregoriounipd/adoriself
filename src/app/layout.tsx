import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adori Self - Configura il tuo evento',
  description: 'Configura il tuo evento e ricevi una stima budget in pochi minuti',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
        {children}
      </body>
    </html>
  );
}