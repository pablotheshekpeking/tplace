import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req) => {
  const { ids } = await req.json();

  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error('Failed to fetch products', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
