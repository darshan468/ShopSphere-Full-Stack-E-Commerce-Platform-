import Stripe from 'stripe';

// A single shared Stripe client, configured with the secret key from
// environment variables. Never expose this key to the client bundle.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2024-06-20',
});
