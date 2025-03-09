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
        user: true ,
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
    const { title, image, content, userId, categoryId, tags } = await request.json();

    // ตรวจสอบและสร้าง/อัปเดตแท็ก
    const tagConnections = await Promise.all(
      tags.map(async (tag: string) => {
        const existingTag = await prisma.tag.findUnique({
          where: { name: tag },
        });

        if (existingTag) {
          // ถ้ามีแท็กอยู่แล้ว ให้เพิ่มค่า used
          await prisma.tag.update({
            where: { name: tag },
            data: { used: existingTag.used + 1 },
          });

          return { tagId: existingTag.id };
        } else {
          // ถ้าแท็กไม่มี ให้สร้างใหม่
          const newTag = await prisma.tag.create({
            data: { name: tag, used: 1 },
          });

          return { tagId: newTag.id };
        }
      })
    );

    // สร้างโพสต์และเชื่อมแท็ก
    const post = await prisma.post.create({
      data: {
        title,
        image,
        content,
        userId,
        categoryId,
        tags: {
          create: tagConnections.map(({ tagId }) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: { tags: { include: { tag: true } } },
    });

    return Response.json({ message: "Post created", post });
  } catch (error) {
    console.error("Error creating post:", error);
    return Response.json({ error: "Failed to create post" }, { status: 500 });
  }
}
