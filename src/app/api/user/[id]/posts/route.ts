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

import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { username, bio, profilePicture, contact } = await req.json();
    
    const userId = parseInt(params.id, 10);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId }, // Use number instead of string
      data: { username, bio, profilePicture, contact },
    });

    return NextResponse.json({ message: "Profile updated", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Profile update failed" }, { status: 500 });
  }
}

