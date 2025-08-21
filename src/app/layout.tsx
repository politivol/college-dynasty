import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'College Dynasty',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
