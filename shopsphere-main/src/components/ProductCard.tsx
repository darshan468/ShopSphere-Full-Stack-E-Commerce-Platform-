import Link from 'next/link';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/format';

/** Card used in product grids across the storefront (home page, category listing, search). */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-md"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-56 w-full object-cover transition group-hover:scale-105"
      />
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          {product.category}
        </p>
        <h3 className="mt-1 font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-2 font-bold text-brand">{formatPrice(product.priceCents)}</p>
      </div>
    </Link>
  );
}
