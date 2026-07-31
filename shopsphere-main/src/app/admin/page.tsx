import { prisma } from '@/lib/prisma';
import { StatCard } from '@/components/StatCard';
import { formatPrice } from '@/lib/format';

/** Admin dashboard overview: basic back-office reporting (revenue, orders, catalogue size). */
export default async function AdminDashboardPage() {
  const [orderCount, productCount, paidOrders] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.order.findMany({ where: { status: 'PAID' } }),
  ]);

  const totalRevenueCents = paidOrders.reduce((sum, order) => sum + order.totalCents, 0);
  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { items: true },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total revenue (paid orders)"
          value={formatPrice(totalRevenueCents)}
        />
        <StatCard label="Total orders" value={String(orderCount)} />
        <StatCard label="Products in catalogue" value={String(productCount)} />
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold">Recent orders</h2>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-t border-gray-100">
                <td className="px-4 py-2">{order.customerName}</td>
                <td className="px-4 py-2">{order.items.length}</td>
                <td className="px-4 py-2">{formatPrice(order.totalCents)}</td>
                <td className="px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
