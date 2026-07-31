import { z } from 'zod';

/**
 * The set of valid order statuses. Kept in application code (rather than a
 * Prisma enum) because the `sqlite` connector does not support native enums.
 */
export const orderStatusSchema = z.enum(['PENDING', 'PAID', 'FULFILLED', 'CANCELLED']);

/** Validates the payload used to create or update a product from the admin dashboard. */
export const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z
    .string()
    .min(2)
    .regex(
      /^[a-z0-9-]+$/,
      'Slug may only contain lowercase letters, numbers and hyphens',
    ),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  priceCents: z.number().int().positive('Price must be a positive number'),
  imageUrl: z.string().url('Image URL must be a valid URL'),
  category: z.string().min(2),
  stock: z.number().int().min(0),
});

export type ProductInput = z.infer<typeof productSchema>;

/** Validates the payload used to start a checkout session. */
export const checkoutSchema = z.object({
  customerEmail: z.string().email(),
  customerName: z.string().min(2),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, 'Cart must contain at least one item'),
});
