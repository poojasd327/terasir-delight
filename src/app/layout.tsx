import type { Metadata } from 'next';
import { Playfair_Display, Manrope, Caveat } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Terasiri Delights | Heirloom Nutrition',
  description: 'Heirloom nutrition for pregnancy, postpartum and the first years. Hand-rolled in Bengaluru.',
  keywords: ['Terasiri Delights', 'Heirloom nutrition', 'Laddu', 'Postpartum food', 'Pregnancy nutrition', 'Bengaluru'],
  icons: {
    icon: [
      { url: '/images/terasiri_logo.png', sizes: 'any' },
      { url: '/terasiri/images/terasiri_logo.png', sizes: 'any' },
    ],
    apple: [
      { url: '/images/terasiri_logo.png' },
      { url: '/terasiri/images/terasiri_logo.png' },
    ],
    shortcut: '/images/terasiri_logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable} ${caveat.variable}`}>
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
