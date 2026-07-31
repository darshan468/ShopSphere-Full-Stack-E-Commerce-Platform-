import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

/** Shown if the customer cancels the Stripe Checkout flow. */
export default function CheckoutCancelPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Checkout cancelled</h1>
        <p className="mt-3 text-gray-600">
          Your cart has been saved if you&apos;d like to try again.
        </p>
        <Link href="/cart" className="mt-6 inline-block text-brand hover:underline">
          Back to cart
        </Link>
      </main>
      <Footer />
    </>
  );
}
