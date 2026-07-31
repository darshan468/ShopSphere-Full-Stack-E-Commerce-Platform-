import { render, screen } from '@testing-library/react';
import { StatCard } from '@/components/StatCard';

describe('StatCard', () => {
  it('renders the label and value it is given', () => {
    render(<StatCard label="Total revenue" value="$1,234.00" />);

    expect(screen.getByText('Total revenue')).toBeInTheDocument();
    expect(screen.getByText('$1,234.00')).toBeInTheDocument();
  });
});
