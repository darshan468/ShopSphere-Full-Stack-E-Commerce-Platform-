'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

/** Client-side button that adds the current product to the cart. */
export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({
      productId: product.id,
      name: product.name,
      priceCents: product.priceCents,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      disabled={product.stock === 0}
      className="mt-6 w-full rounded-md bg-brand py-3 font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      {added ? 'Added to cart ✓' : 'Add to cart'}
    </button>
  );
}
