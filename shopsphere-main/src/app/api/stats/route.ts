import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

/** GET /api/stats — admin-only summary metrics powering the dashboard reporting widgets. */
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [orderCount, productCount, paidOrders] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.order.findMany({ where: { status: 'PAID' } }),
  ]);

  const totalRevenueCents = paidOrders.reduce((sum, order) => sum + order.totalCents, 0);

  return NextResponse.json({
    orderCount,
    productCount,
    totalRevenueCents,
    paidOrderCount: paidOrders.length,
  });
}
