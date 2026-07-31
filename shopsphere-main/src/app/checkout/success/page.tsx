import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

/** Shown after Stripe redirects back with a successful test payment. */
export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-green-600">Payment successful 🎉</h1>
        <p className="mt-3 text-gray-600">
          Thank you for your order. A confirmation has been recorded in the admin
          dashboard.
        </p>
        <Link href="/products" className="mt-6 inline-block text-brand hover:underline">
          Continue shopping
        </Link>
      </main>
      <Footer />
    </>
  );
}
