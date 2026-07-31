'use client';

import type { CartLine } from '@/types';
import { formatPrice } from '@/lib/format';
import { useCart } from '@/context/CartContext';

/** A single editable row within the cart page (quantity stepper + remove button). */
export function CartItemRow({ line }: { line: CartLine }) {
  const { setQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 py-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={line.imageUrl}
        alt={line.name}
        className="h-16 w-16 rounded object-cover"
      />
      <div className="flex-1">
        <p className="font-medium text-gray-900">{line.name}</p>
        <p className="text-sm text-gray-500">{formatPrice(line.priceCents)}</p>
      </div>
      <input
        type="number"
        min={1}
        value={line.quantity}
        onChange={(event) => setQuantity(line.productId, Number(event.target.value))}
        className="w-16 rounded border border-gray-300 px-2 py-1 text-center"
        aria-label={`Quantity for ${line.name}`}
      />
      <p className="w-24 text-right font-semibold">
        {formatPrice(line.priceCents * line.quantity)}
      </p>
      <button
        onClick={() => removeItem(line.productId)}
        className="text-sm text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
