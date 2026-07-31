import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth';

interface RouteParams {
  params: { id: string };
}

/** GET /api/products/:id — public single product lookup. */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

/** PUT /api/products/:id — updates a product. Admin-only. */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const product = await prisma.product.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return NextResponse.json(product);
}

/** DELETE /api/products/:id — removes a product. Admin-only. */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
