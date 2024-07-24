import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';  // Adjust the path as necessary

const prisma = new PrismaClient();

export async function GET(req) {
  // Get the session from the request
  const session = await getServerSession( authOptions);

  // If there's no session, return a 401 (Unauthorized) response
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // If there's a session, proceed to fetch the products
  try {
    const products = await prisma.product.findMany({
      where: {
        isSold: false,
      },
      include: {
        user: true, // This includes the related user data
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch products', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
