import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';

/** Admin order list, showing status and totals for every order placed. */
export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Orders</h1>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-100">
                <td className="px-4 py-2 font-mono text-xs">{order.id.slice(0, 8)}</td>
                <td className="px-4 py-2">
                  {order.customerName}
                  <div className="text-xs text-gray-400">{order.customerEmail}</div>
                </td>
                <td className="px-4 py-2">{order.items.length}</td>
                <td className="px-4 py-2">{formatPrice(order.totalCents)}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
