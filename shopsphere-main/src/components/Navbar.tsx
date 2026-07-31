'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

/** Top navigation bar shown on every public storefront page. */
export function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-brand">
          🛍️ ShopSphere
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/products" className="hover:text-brand">
            Shop
          </Link>
          <Link href="/cart" className="relative hover:text-brand">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 rounded-full bg-brand px-1.5 py-0.5 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
