import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  
  { params }: { params: { id: string } }
) {
  try {
    const {id} = await params;
    const userId = Number(id)
    const user = await prisma.user.findUnique({
      where: { id: userId },
     
    })
    return Response.json(user)
  } catch (error) {
    return Response.json({ error: "Failed to get user" })
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const userId = Number(id);

    const body = await req.json();
    const { username, bio, profilePicture, contact } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username, bio, profilePicture, contact },
    });

    return Response.json(updatedUser)
      
    }
   catch (error) {
   return Response.json({ error: "Failed to update user" })
  }
}
