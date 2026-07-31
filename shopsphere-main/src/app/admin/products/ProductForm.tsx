'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product } from '@/types';

interface ProductFormProps {
  product?: Product;
}

/**
 * Shared create/edit form for products. When `product` is provided the form
 * performs a PUT to update it; otherwise it performs a POST to create one.
 */
export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    priceCents: product ? String(product.priceCents) : '',
    imageUrl: product?.imageUrl ?? '',
    category: product?.category ?? '',
    stock: product ? String(product.stock) : '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      ...form,
      priceCents: Number(form.priceCents),
      stock: Number(form.stock),
    };

    const url = product ? `/api/products/${product.id}` : '/api/products';
    const method = product ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      const data = await response.json();
      setError(data.error ?? 'Something went wrong');
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirm('Delete this product?')) return;

    await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    router.push('/admin/products');
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 rounded-lg border border-gray-200 bg-white p-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          required
          value={form.name}
          onChange={(event) => update('name', event.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          required
          value={form.slug}
          onChange={(event) => update('slug', event.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="my-product-name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          value={form.description}
          onChange={(event) => update('description', event.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (cents)</label>
          <input
            required
            type="number"
            value={form.priceCents}
            onChange={(event) => update('priceCents', event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            required
            type="number"
            value={form.stock}
            onChange={(event) => update('stock', event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          required
          value={form.category}
          onChange={(event) => update('category', event.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          required
          value={form.imageUrl}
          onChange={(event) => update('imageUrl', event.target.value)}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-brand px-5 py-2 font-semibold text-white disabled:opacity-60"
        >
          {product ? 'Save changes' : 'Create product'}
        </button>
        {product && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md border border-red-300 px-5 py-2 font-semibold text-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
