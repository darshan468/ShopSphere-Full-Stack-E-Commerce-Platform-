/** Shared TypeScript types used across the storefront and admin dashboard. */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface CartLine {
  productId: string;
  name: string;
  priceCents: number;
  imageUrl: string;
  quantity: number;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'FULFILLED' | 'CANCELLED';

export interface OrderSummary {
  id: string;
  customerEmail: string;
  customerName: string;
  status: OrderStatus;
  totalCents: number;
  createdAt: string;
  itemCount: number;
}
