import { productSchema, checkoutSchema } from '@/lib/validations';

describe('productSchema', () => {
  const validProduct = {
    name: 'Test Product',
    slug: 'test-product',
    description: 'A perfectly valid description.',
    priceCents: 1500,
    imageUrl: 'https://picsum.photos/600',
    category: 'Test',
    stock: 10,
  };

  it('accepts a valid product', () => {
    expect(productSchema.safeParse(validProduct).success).toBe(true);
  });

  it('rejects a slug with uppercase letters', () => {
    const result = productSchema.safeParse({ ...validProduct, slug: 'Invalid Slug' });
    expect(result.success).toBe(false);
  });

  it('rejects a negative price', () => {
    const result = productSchema.safeParse({ ...validProduct, priceCents: -100 });
    expect(result.success).toBe(false);
  });
});

describe('checkoutSchema', () => {
  it('rejects an empty cart', () => {
    const result = checkoutSchema.safeParse({
      customerEmail: 'test@example.com',
      customerName: 'Test User',
      items: [],
    });
    expect(result.success).toBe(false);
  });

  it('accepts a valid checkout payload', () => {
    const result = checkoutSchema.safeParse({
      customerEmail: 'test@example.com',
      customerName: 'Test User',
      items: [{ productId: 'p1', quantity: 2 }],
    });
    expect(result.success).toBe(true);
  });
});
