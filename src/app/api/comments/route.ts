import { PrismaClient, Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { content,postId,userId } = await request.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });
    return Response.json({ message: 'Comment created', comment });
  } catch (error) {
    console.error("Error creating post:", error);
    return Response.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}