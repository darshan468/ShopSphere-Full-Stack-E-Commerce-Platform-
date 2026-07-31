import { render, screen } from '@testing-library/react';
import { AdminSidebar } from '@/components/AdminSidebar';

describe('AdminSidebar', () => {
  it('renders links to every admin section', () => {
    render(<AdminSidebar />);

    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute(
      'href',
      '/admin',
    );
    expect(screen.getByRole('link', { name: /^products$/i })).toHaveAttribute(
      'href',
      '/admin/products',
    );
    expect(screen.getByRole('link', { name: /^orders$/i })).toHaveAttribute(
      'href',
      '/admin/orders',
    );
  });

  it('renders a logout button inside a form posting to the logout endpoint', () => {
    render(<AdminSidebar />);
    const logoutButton = screen.getByRole('button', { name: /log out/i });
    const form = logoutButton.closest('form');

    expect(form).toHaveAttribute('action', '/api/admin/logout');
    expect(form).toHaveAttribute('method', 'post');
  });
});
