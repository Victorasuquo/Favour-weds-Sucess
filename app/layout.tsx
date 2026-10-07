import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const displayFont = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const bodyFont = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://favour-weds-success.vercel.app'),
  title: 'Favour weds Godswill | 14 November 2026',
  description:
    'The wedding invitation of Favour Ntiense Oton and Godswill Alexander Abiodun, #GodsFav\'26.',
  keywords: ['Favour weds Godswill', 'Favour Ntiense Oton', 'Godswill Alexander Abiodun', 'Uyo wedding'],
  openGraph: {
    title: 'Favour weds Godswill',
    description: 'Join us for the solemnization of Favour and Godswill in Uyo on 14 November 2026.',
    type: 'website',
    images: [{ url: '/wedding/hero-florals.png', width: 1536, height: 1024, alt: 'Burgundy and peach wedding florals' }],
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
