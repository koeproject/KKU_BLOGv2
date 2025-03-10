import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const postId = Number(id);
    const { status } = await request.json()
    if (isNaN(postId)) {
      return new Response(JSON.stringify({ error: 'Invalid post ID' }), { status: 400 });
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        status : status,
      },
    });

    return new Response(JSON.stringify({ message: 'Post updated', post }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Post could not be updated' }), { status: 500 });
  }
}
