import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const {password} = await request.json()
      const hashedPassword = bcrypt.hashSync(password, 10)
    
        const user = await prisma.user.update({
            where: { id: Number(params.id) },
            data: { passwordHash: hashedPassword },
        })
    return Response.json({ message: 'User password updated', user })
  } catch (error) {
    return Response.json({ error: 'User password could not be updated' })
  }
}


