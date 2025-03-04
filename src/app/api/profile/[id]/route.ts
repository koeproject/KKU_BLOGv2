import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(params.id) }
      });
  
      return Response.json(user);
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), {
        status: 500,
      });
    }
  }

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { username,email,bio,profilePicture,contact} = await request.json()
    const user = await prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        username,
        email,
        bio,
        profilePicture,
        contact
      },
    })
    return Response.json({ message: 'User updated', user })
  } catch (error) {
    return Response.json({ error: 'User could not be updated' })
  }
}


