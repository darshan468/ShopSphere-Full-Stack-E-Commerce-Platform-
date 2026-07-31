import Link from 'next/link';

/** Left-hand navigation for every page under /admin (except the login page). */
export function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-4">
      <p className="mb-4 px-2 text-lg font-bold text-brand">ShopSphere Admin</p>
      <nav className="flex flex-col gap-1 text-sm">
        <Link href="/admin" className="rounded px-2 py-2 hover:bg-brand-light">
          Dashboard
        </Link>
        <Link href="/admin/products" className="rounded px-2 py-2 hover:bg-brand-light">
          Products
        </Link>
        <Link href="/admin/orders" className="rounded px-2 py-2 hover:bg-brand-light">
          Orders
        </Link>
        <form action="/api/admin/logout" method="post" className="mt-4">
          <button
            type="submit"
            className="w-full rounded px-2 py-2 text-left text-red-500 hover:bg-red-50"
          >
            Log out
          </button>
        </form>
      </nav>
    </aside>
  );
}
