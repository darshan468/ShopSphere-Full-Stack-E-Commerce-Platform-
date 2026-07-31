import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'ShopSphere — Everyday essentials, delivered fast',
    template: '%s | ShopSphere',
  },
  description:
    'ShopSphere is a demo e-commerce storefront featuring a curated product catalogue, secure Stripe checkout and a full admin back-office.',
  openGraph: {
    title: 'ShopSphere',
    description: 'A modern, fast, mobile-friendly e-commerce storefront.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
