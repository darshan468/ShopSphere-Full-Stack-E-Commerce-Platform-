import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
  it('renders the copyright notice with the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('links to the admin login page', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /admin login/i })).toHaveAttribute(
      'href',
      '/admin/login',
    );
  });
});
