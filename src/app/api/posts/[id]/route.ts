import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        user: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return Response.json(post);
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return Response.json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}