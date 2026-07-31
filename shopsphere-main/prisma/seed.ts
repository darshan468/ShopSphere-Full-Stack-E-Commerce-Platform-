/**
 * Seeds the local SQLite database with demo products, an admin account
 * and a couple of sample orders so the storefront and admin dashboard
 * are populated on first run.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const products = [
  // --- Electronics ---
  {
    name: 'Aurora Wireless Headphones',
    slug: 'aurora-wireless-headphones',
    description:
      'Over-ear wireless headphones with active noise cancellation and 30-hour battery life.',
    priceCents: 12900,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 42,
  },
  {
    name: 'Vertex Mechanical Keyboard',
    slug: 'vertex-mechanical-keyboard',
    description:
      'Tenkeyless mechanical keyboard featuring customizable RGB backlighting and hot-swappable tactile switches.',
    priceCents: 11900,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 35,
  },
  {
    name: 'Apex Ergonomic Mouse',
    slug: 'apex-ergonomic-mouse',
    description:
      'Wireless mouse with an ergonomic thumb rest, multi-device connectivity, and customizable shortcut buttons.',
    priceCents: 7900,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 50,
  },
  {
    name: 'Chronos Smart Watch',
    slug: 'chronos-smart-watch',
    description:
      'Sleek smartwatch with heart rate monitoring, GPS tracking, sleep insights, and up to 7 days of battery life.',
    priceCents: 19900,
    imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 25,
  },
  {
    name: 'Prism Portable Projector',
    slug: 'prism-portable-projector',
    description:
      'Full HD mini projector featuring built-in dual stereo speakers, screen mirroring, and multiple input ports.',
    priceCents: 24900,
    imageUrl: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=600&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 15,
  },

  // --- Footwear ---
  {
    name: 'Nimbus Running Shoes',
    slug: 'nimbus-running-shoes',
    description:
      'Lightweight running shoes with responsive cushioning for daily training.',
    priceCents: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    category: 'Footwear',
    stock: 60,
  },
  {
    name: 'Terra Trail Hiking Boots',
    slug: 'terra-trail-hiking-boots',
    description:
      'Waterproof hiking boots with rugged all-terrain traction, reinforced toe caps, and ankle support.',
    priceCents: 14900,
    imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=80',
    category: 'Footwear',
    stock: 30,
  },
  {
    name: 'Velo Urban Sneakers',
    slug: 'velo-urban-sneakers',
    description:
      'Minimalist everyday sneakers with premium leather upper, natural rubber soles, and memory foam insoles.',
    priceCents: 9500,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
    category: 'Footwear',
    stock: 45,
  },
  {
    name: 'Aeon Slip-On Sandals',
    slug: 'aeon-slip-on-sandals',
    description:
      'Extremely comfortable slip-on sandals with contoured cork footbeds and adjustable double buckle straps.',
    priceCents: 3900,
    imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec9e93b1?w=600&auto=format&fit=crop&q=80',
    category: 'Footwear',
    stock: 80,
  },
  {
    name: 'Stride Training Shoes',
    slug: 'stride-training-shoes',
    description:
      'Versatile cross-training shoes with a stable flat heel, breathable mesh, and lateral support for gym workouts.',
    priceCents: 11000,
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    category: 'Footwear',
    stock: 40,
  },

  // --- Home ---
  {
    name: 'Solstice Ceramic Mug Set',
    slug: 'solstice-ceramic-mug-set',
    description: 'Set of four hand-glazed ceramic mugs, dishwasher and microwave safe.',
    priceCents: 3400,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    category: 'Home',
    stock: 120,
  },
  {
    name: 'Halo Desk Lamp',
    slug: 'halo-desk-lamp',
    description: 'Dimmable LED desk lamp with a wireless charging base and USB port.',
    priceCents: 4600,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
    category: 'Home',
    stock: 55,
  },
  {
    name: 'Zest Culinary Knife Set',
    slug: 'zest-culinary-knife-set',
    description:
      'Professional 5-piece high-carbon stainless steel kitchen knife set stored in an elegant wooden block.',
    priceCents: 8900,
    imageUrl: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&auto=format&fit=crop&q=80',
    category: 'Home',
    stock: 40,
  },
  {
    name: 'Elysian Scented Candle Set',
    slug: 'elysian-scented-candle-set',
    description:
      'Three hand-poured soy wax candles in amber jars, featuring lavender, eucalyptus, and cozy vanilla scents.',
    priceCents: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
    category: 'Home',
    stock: 100,
  },
  {
    name: 'Loom Cotton Throw Blanket',
    slug: 'loom-cotton-throw-blanket',
    description:
      'Cozy and lightweight throw blanket made of 100% organic cotton, styled with classic diamond weave patterns.',
    priceCents: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&auto=format&fit=crop&q=80',
    category: 'Home',
    stock: 65,
  },
  {
    name: 'Bloom Self-Watering Planter',
    slug: 'bloom-self-watering-planter',
    description:
      'Minimalist matte ceramic plant pot with an integrated self-watering reservoir to prevent over-watering.',
    priceCents: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
    category: 'Home',
    stock: 150,
  },

  // --- Accessories ---
  {
    name: 'Drift Canvas Backpack',
    slug: 'drift-canvas-backpack',
    description: 'Water-resistant canvas backpack with a padded 15-inch laptop sleeve.',
    priceCents: 5900,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 75,
  },
  {
    name: 'Pathfinder Insulated Bottle',
    slug: 'pathfinder-insulated-bottle',
    description:
      'Double-wall insulated stainless steel bottle, keeps drinks cold for 24 hours.',
    priceCents: 2900,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 200,
  },
  {
    name: 'Horizon Polarized Sunglasses',
    slug: 'horizon-polarized-sunglasses',
    description:
      'Timeless browline sunglasses with lightweight acetate frames, metal details, and UV400 polarized lenses.',
    priceCents: 4900,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 90,
  },
  {
    name: 'Atlas Leather Wallet',
    slug: 'atlas-leather-wallet',
    description:
      'Premium slim bifold leather wallet featuring RFID blocking protection and quick-access card slots.',
    priceCents: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1627124709703-323e230cb63d?w=600&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 110,
  },
  {
    name: 'Nova Leather Tech Organizer',
    slug: 'nova-leather-tech-organizer',
    description:
      'Organized tech pouch crafted from full-grain leather, with elastic loops and mesh pockets for cables and chargers.',
    priceCents: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1581404917879-17e19e16350f?w=600&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 70,
  },
  {
    name: 'Vanguard Travel Umbrella',
    slug: 'vanguard-travel-umbrella',
    description:
      'Compact, windproof travel umbrella with a rubberized grip and automatic open/close mechanism.',
    priceCents: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1530268578403-4fdd842d87e0?w=600&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 130,
  },
];

async function main() {
  console.log('Seeding database...');

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@shopsphere.dev';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  console.log(`Seed complete. Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
