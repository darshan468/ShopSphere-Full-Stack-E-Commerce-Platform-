import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Shop all products',
  description: 'Browse the full ShopSphere catalogue, with search and category filters.',
};

interface ProductsPageProps {
  searchParams: { q?: string; category?: string };
}

/** Product listing page with a simple search box and category filter. */
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { q, category } = searchParams;

  const products = await prisma.product.findMany({
    where: {
      AND: [q ? { name: { contains: q } } : {}, category ? { category } : {}],
    },
    orderBy: { name: 'asc' },
  });

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ['category'],
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">Shop all products</h1>

        <form className="mb-8 flex flex-wrap gap-3" role="search">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search products..."
            className="flex-1 rounded-md border border-gray-300 px-4 py-2"
          />
          <select
            name="category"
            defaultValue={category ?? ''}
            className="rounded-md border border-gray-300 px-4 py-2"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.category} value={c.category}>
                {c.category}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-md bg-brand px-5 py-2 font-medium text-white"
          >
            Search
          </button>
        </form>

        {products.length === 0 ? (
          <p className="text-gray-500">No products match your search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
