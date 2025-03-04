import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET() {
  return Response.json(await prisma.post.findMany())
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

