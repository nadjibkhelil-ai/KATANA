import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'KATANA BURGER — La lame qui coupe la faim',
    template: '%s | KATANA BURGER',
  },
  description: 'Fast food meets Japanese aesthetics. Signature burgers, boxes, and more at 26 Rue des Freres Sentouhi, Aïn Taya, Algiers.',
  keywords: ['katana burger', 'burger', 'fast food', 'aïn taya', 'algiers', 'restaurant'],
  authors: [{ name: 'KATANA BURGER' }],
  openGraph: {
    title: 'KATANA BURGER — La lame qui coupe la faim',
    description: 'Fast food meets Japanese aesthetics. Signature burgers, boxes, and more.',
    type: 'website',
    locale: 'fr_DZ',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-body min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}