import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '../ProductForm';

interface EditProductPageProps {
  params: { id: string };
}

/** Admin page to edit (or delete) an existing product. */
export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit product</h1>
      <ProductForm product={product!} />
    </div>
  );
}
