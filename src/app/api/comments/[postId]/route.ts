import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  try {

    const comments = await prisma.comment.findMany({
      where: { postId: Number(params.postId) }
    });

    return Response.json(comments);
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}

