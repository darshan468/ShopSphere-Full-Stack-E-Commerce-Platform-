import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { checkoutSchema } from '@/lib/validations';

/**
 * POST /api/checkout
 * Validates the cart, creates a PENDING order in the database, then starts
 * a Stripe Checkout Session (test mode) and returns its hosted URL.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { customerEmail, customerName, items } = parsed.data;

  const productIds = items.map((item) => item.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  if (products.length !== productIds.length) {
    return NextResponse.json(
      { error: 'One or more products could not be found' },
      { status: 404 },
    );
  }

  const lineItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      product,
      quantity: item.quantity,
    };
  });

  const totalCents = lineItems.reduce(
    (sum, line) => sum + line.product.priceCents * line.quantity,
    0,
  );

  const order = await prisma.order.create({
    data: {
      customerEmail,
      customerName,
      totalCents,
      status: 'PENDING',
      items: {
        create: lineItems.map((line) => ({
          productId: line.product.id,
          quantity: line.quantity,
          priceCents: line.product.priceCents,
        })),
      },
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: customerEmail,
      line_items: lineItems.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: line.product.priceCents,
          product_data: { name: line.product.name },
        },
      })),
      success_url: `${baseUrl}/checkout/success`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: { orderId: order.id },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: checkoutSession.id },
    });

    return NextResponse.json({ checkoutUrl: checkoutSession.url });
  } catch (stripeError) {
    // Log the full error server-side so the real cause (e.g. an invalid or
    // placeholder STRIPE_SECRET_KEY) is visible in the terminal, instead of
    // a bare, unhelpful 500.
    console.error('Stripe checkout session creation failed:', stripeError);

    // The order was already created as PENDING; mark it CANCELLED since
    // checkout could not be started, so it doesn't linger indefinitely.
    await prisma.order.update({ where: { id: order.id }, data: { status: 'CANCELLED' } });

    const message =
      stripeError instanceof Error ? stripeError.message : 'Unable to start checkout';

    return NextResponse.json({ error: message }, { status: 502 });
  }
}
