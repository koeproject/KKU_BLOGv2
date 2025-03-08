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
    return new Response(error as BodyInit, {
      status: 500,
    })
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

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
