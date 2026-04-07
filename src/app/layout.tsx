import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingSocialBar from '@/components/FloatingSocialBar';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'KATANA BURGER — La lame qui coupe la faim | Meilleur Burger à Aïn Taya',
    template: '%s | KATANA BURGER',
  },
  description: 'KATANA BURGER - Restaurant de burgers à Aïn Taya, Alger. Burgers signature, boxes, et plus encore. Ouvert tous les jours de 11h30 à 00h30. Commandez maintenant!',
  keywords: [
    'katana burger',
    'burger aïn taya',
    'restaurant burger alger',
    'meilleur burger alger',
    'fast food aïn taya',
    'burger livraison alger',
    'katana burger menu',
    'burger japonais alger',
    'commander burger en ligne',
    'restaurant 26 rue freres sentouhi',
  ],
  authors: [{ name: 'KATANA BURGER' }],
  openGraph: {
    title: 'KATANA BURGER — La lame qui coupe la faim',
    description: 'Fast food meets Japanese aesthetics. Signature burgers, boxes, and more at 26 Rue des Freres Sentouhi, Aïn Taya, Algiers.',
    type: 'website',
    locale: 'fr_DZ',
    siteName: 'KATANA BURGER',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KATANA BURGER — La lame qui coupe la faim',
    description: 'Meilleur restaurant de burgers à Aïn Taya, Alger. Burgers signature, boxes, et plus encore.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://katanaburger.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded"
        >
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingSocialBar />
        </CartProvider>
      </body>
    </html>
  );
}