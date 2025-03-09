import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // ✅ Await params before accessing

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
