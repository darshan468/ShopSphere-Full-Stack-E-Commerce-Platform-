'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartItemRow } from '@/components/CartItemRow';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';

/** Cart page: editable list of line items plus a form to start checkout. */
export default function CartPage() {
  const { lines, subtotalCents } = useCart();
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          items: lines.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to start checkout');
      }

      // In test mode this redirects to Stripe's hosted Checkout page.
      window.location.href = data.checkoutUrl;
    } catch (checkoutError) {
      setError((checkoutError as Error).message);
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">Your cart</h1>

        {lines.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-2 inline-block text-brand hover:underline"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              {lines.map((line) => (
                <CartItemRow key={line.productId} line={line} />
              ))}
              <div className="flex justify-end pt-4 text-lg font-bold">
                Subtotal: {formatPrice(subtotalCents)}
              </div>
            </div>

            <form
              onSubmit={handleCheckout}
              className="mt-8 space-y-4 rounded-lg border border-gray-200 bg-white p-6"
            >
              <h2 className="text-lg font-semibold">Checkout details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input
                  required
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  required
                  type="email"
                  value={customerEmail}
                  onChange={(event) => setCustomerEmail(event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-brand py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
              >
                {isSubmitting ? 'Redirecting to secure payment...' : 'Pay with Stripe'}
              </button>
            </form>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
