import { formatPrice } from '@/lib/format';

describe('formatPrice', () => {
  it('formats whole dollar amounts correctly', () => {
    expect(formatPrice(12900)).toBe('$129.00');
  });

  it('formats amounts with cents correctly', () => {
    expect(formatPrice(499)).toBe('$4.99');
  });

  it('formats zero as $0.00', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});
