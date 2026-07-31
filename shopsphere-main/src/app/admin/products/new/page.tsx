import { ProductForm } from '../ProductForm';

/** Admin page to create a brand-new product. */
export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New product</h1>
      <ProductForm />
    </div>
  );
}
