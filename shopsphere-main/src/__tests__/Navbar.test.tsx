import { render, screen } from '@testing-library/react';
import { useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { CartProvider, useCart } from '@/context/CartContext';

/** Seeds the cart with a single item once, so the Navbar's badge branch can be exercised. */
function SeededNavbar() {
  const { addItem } = useCart();
  const hasSeeded = useRef(false);

  useEffect(() => {
    if (!hasSeeded.current) {
      addItem({
        productId: 'p1',
        name: 'Sample product',
        priceCents: 1000,
        imageUrl: '/sample.jpg',
        quantity: 1,
      });
      hasSeeded.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navbar />;
}

describe('Navbar', () => {
  it('renders the brand name and navigation links', () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>,
    );

    expect(screen.getByText(/ShopSphere/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^shop$/i })).toHaveAttribute(
      'href',
      '/products',
    );
    expect(screen.getByRole('link', { name: /cart/i })).toHaveAttribute('href', '/cart');
  });

  it('does not show an item count badge when the cart is empty', () => {
    render(
      <CartProvider>
        <Navbar />
      </CartProvider>,
    );

    // With an empty cart, only the word "Cart" should appear, no numeric badge.
    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink.textContent?.trim()).toBe('Cart');
  });

  it('shows an item count badge once something is in the cart', () => {
    render(
      <CartProvider>
        <SeededNavbar />
      </CartProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
