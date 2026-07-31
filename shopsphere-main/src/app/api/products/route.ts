import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth';

/** GET /api/products — public list of products, optionally filtered by category. */
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category');

  const products = await prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(products);
}

/** POST /api/products — creates a new product. Admin-only. */
export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const product = await prisma.product.create({ data: parsed.data });
  return NextResponse.json(product, { status: 201 });
}
