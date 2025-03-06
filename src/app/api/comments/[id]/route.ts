
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    req: Request, 
    { params }: { params: { id: string } }
  ) {
    const { id } = await params;
    try {
      const comments = await prisma.comment.findMany({
        where: { postId: Number(id) },
        include: { user: true },
      });
  
      return Response.json(comments);
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), {
        status: 500,
      });
    }
  }
