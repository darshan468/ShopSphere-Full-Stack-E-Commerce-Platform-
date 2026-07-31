import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

/**
 * POST /api/webhooks/stripe
 * Listens for Stripe events and marks the matching order as PAID once
 * `checkout.session.completed` fires. Configure this URL in the Stripe
 * dashboard (or via `stripe listen` locally) with STRIPE_WEBHOOK_SECRET.
 */
export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const payload = await request.text();

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? '',
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Webhook signature verification failed` },
      { status: 400 },
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as { metadata?: { orderId?: string } };
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
      });
    }
  }

  return NextResponse.json({ received: true });
}
