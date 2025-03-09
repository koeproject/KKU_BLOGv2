
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
    req: NextRequest, 
    { params }: { params: { id: string } }
  ) {
    const searchParams = req.nextUrl.searchParams;
    const sort = searchParams.get('sort') || 'desc';
    const { id } = await params;
    try {
      const comments = await prisma.comment.findMany({
        
        where: { postId: Number(id) },
        include: { user: true },
        orderBy: { createdAt: sort === 'asc' ? 'asc' : 'desc' },
      });
  
      return Response.json(comments);
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), {
        status: 500,
      });
    }
  }
