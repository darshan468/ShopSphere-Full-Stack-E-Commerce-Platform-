import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';
import { AddToCartButton } from './AddToCartButton';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: 'Product not found' };

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.imageUrl] },
  };
}

/** Product detail page: image, description, price and an "Add to cart" call to action. */
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product!.imageUrl}
          alt={product!.name}
          className="w-full rounded-lg object-cover"
        />
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-400">
            {product!.category}
          </p>
          <h1 className="mt-1 text-3xl font-bold">{product!.name}</h1>
          <p className="mt-4 text-2xl font-bold text-brand">
            {formatPrice(product!.priceCents)}
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">{product!.description}</p>
          <p className="mt-2 text-sm text-gray-400">
            {product!.stock > 0 ? `${product!.stock} in stock` : 'Out of stock'}
          </p>
          <AddToCartButton product={product!} />
        </div>
      </main>
      <Footer />
    </>
  );
}
