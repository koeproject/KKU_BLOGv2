import { PrismaClient, Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const category = searchParams.get('category');
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'desc';
  const status = searchParams.get('status');

  let whereCondition: Prisma.PostWhereInput = {
    title: {
      contains: search,
      mode: 'insensitive',
    },
  };

  if (category) {
    whereCondition = {
      ...whereCondition,
      category: {
        is: {
          name: category,
        },
      },
    };
  }

  if (status) {
    whereCondition = {
      ...whereCondition,
      status: status, // Assuming status is a field directly on Post
    };
  }

  try {
    const posts = await prisma.post.findMany({
      where: whereCondition,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: sort as Prisma.SortOrder,
      },
    });
    return Response.json(posts);
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const { title, image, content, userId, categoryId } = await request.json();

    const post = await prisma.post.create({
      data: {
        title,
        image,
        content,
        userId,
        categoryId,
      },
    });
    return Response.json({ message: 'Post created', post });
  } catch (error) {
    console.error("Error creating post:", error);
    return Response.json({ error: 'Failed to create post' }, { status: 500 });
  }
}