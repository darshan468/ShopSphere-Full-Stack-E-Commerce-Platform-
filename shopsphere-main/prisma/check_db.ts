import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log(`Total products in database: ${products.length}`);
  for (const p of products) {
    console.log(`- [${p.category}] ${p.name} (Slug: ${p.slug})`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
