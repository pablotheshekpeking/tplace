import { PrismaClient } from '@prisma/client';
import { authorize } from '../middleware'; // Adjust the path as needed
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';  

const prisma = new PrismaClient();

export const POST = async (req) => {
  const session = await getServerSession( authOptions);

  // If there's no session, return a 401 (Unauthorized) response
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }


  const { id } = await req.json(); // Expecting a single 'id' instead of 'ids'

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id, // Use the unique id to fetch a single product
      },
    });
    
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }
    
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error('Failed to fetch product', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
