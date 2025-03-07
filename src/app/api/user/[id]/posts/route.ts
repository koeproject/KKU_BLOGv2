import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    const userId = Number(id)
    const userWithPosts = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: true, // Include related posts in the response
      },
    })
    return Response.json(userWithPosts)
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    })
  }
}