import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

/** Storefront home page: hero banner plus a grid of featured products. */
export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="rounded-2xl bg-brand px-8 py-16 text-center text-white">
          <h1 className="text-4xl font-extrabold">
            Everyday essentials, delivered fast.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-brand-light/90">
            Discover a curated catalogue of electronics, home goods and accessories, with
            a secure checkout powered by Stripe.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-md bg-white px-6 py-3 font-semibold text-brand hover:bg-gray-100"
          >
            Shop the collection
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Featured products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
