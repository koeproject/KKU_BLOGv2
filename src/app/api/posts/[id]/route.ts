import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export async function GET(
    req: Request, 
    { params }: { params: { id: string } }
  ) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(params.id) }
      });
  
      return Response.json(post);
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), {
        status: 500,
      });
    }
  }

  export async function PUT(
    req: Request,
    { params }: { params: { id: string } },
  ) {
    try {
      const { title,image,content,categoryId } = await req.json()
      return Response.json(await prisma.post.update({
        where: { id: Number(params.id) },
        data: { title,image,content,categoryId },
      }))
    } catch (error) {
      return new Response(error as BodyInit, {
        status: 500,
      })
    }
  }


  export async function DELETE(
    req: Request,
    { params }: { params: { id: string } },
  ) {
    try {
      return Response.json(await prisma.post.delete({
        where: { id: Number(params.id) },
      }))
    } catch (error) {
      return new Response(error as BodyInit, {
        status: 500,
      })
    }
  }

  