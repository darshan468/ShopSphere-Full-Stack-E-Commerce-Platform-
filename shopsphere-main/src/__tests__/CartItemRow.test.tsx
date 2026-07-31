import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useRef } from 'react';
import { CartItemRow } from '@/components/CartItemRow';
import { CartProvider, useCart } from '@/context/CartContext';
import type { CartLine } from '@/types';

const sampleLine: CartLine = {
  productId: 'p1',
  name: 'Sample product',
  priceCents: 2000,
  imageUrl: '/sample.jpg',
  quantity: 2,
};

/** Small test harness that seeds the cart with one item once, then renders the row. */
function Harness() {
  const { lines, addItem } = useCart();
  const hasSeeded = useRef(false);

  useEffect(() => {
    if (!hasSeeded.current) {
      addItem(sampleLine);
      hasSeeded.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (lines.length === 0) {
    return null;
  }

  return <CartItemRow line={lines[0]} />;
}

function renderWithCart() {
  return render(
    <CartProvider>
      <Harness />
    </CartProvider>,
  );
}

describe('CartItemRow', () => {
  it('renders the product name, price and line total', () => {
    renderWithCart();

    expect(screen.getByText('Sample product')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument(); // unit price
    expect(screen.getByText('$40.00')).toBeInTheDocument(); // line total (2 x $20)
  });

  it('removes the item when "Remove" is clicked', async () => {
    const user = userEvent.setup();
    renderWithCart();

    await user.click(screen.getByRole('button', { name: /remove/i }));

    expect(screen.queryByText('Sample product')).not.toBeInTheDocument();
  });
});
