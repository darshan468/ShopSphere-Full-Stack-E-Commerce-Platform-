import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types';

const product: Product = {
  id: '1',
  name: 'Aurora Wireless Headphones',
  slug: 'aurora-wireless-headphones',
  description: 'Great headphones',
  priceCents: 12900,
  imageUrl: 'https://picsum.photos/seed/test/600/600',
  category: 'Electronics',
  stock: 10,
};

describe('ProductCard', () => {
  it('renders the product name, category and formatted price', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText('Aurora Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('$129.00')).toBeInTheDocument();
  });

  it('links to the product detail page', () => {
    render(<ProductCard product={product} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/products/aurora-wireless-headphones');
  });
});
