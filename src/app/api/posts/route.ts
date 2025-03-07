import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'
const prisma = new PrismaClient()




export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const category = searchParams.get('category')
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'desc'

  const whereCondition = category
    ? {
        category: {
          is: {
            name: category,
          },
        },
        title: {
          contains: search,
          mode: 'insensitive',
        },
      }
    : {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      }

  try {
    const posts = await prisma.post.findMany({
      where: whereCondition,
      include: {
        category: true, // Include category data in the response
      },
      orderBy: {
        createdAt: sort,
      },
    })
    return Response.json(posts)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}

export async function POST(request:Request) {
  try {
    const { title,image,content,userId,categoryId } = await request.json()

    const user = await prisma.post.create({
      data: {
        title,
        image,
        content,
        userId,
        categoryId
      },
    })
    return Response.json({ message: 'Post created', user })
  } catch (error) {
    return Response.json({ error: 'error' })
  }
}

