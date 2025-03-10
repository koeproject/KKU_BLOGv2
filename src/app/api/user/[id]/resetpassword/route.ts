import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const userId = Number(id);

    const body = await req.json();
    const { oldPassword, newPassword } = body;

    if (!oldPassword || !newPassword) {
      return new Response(JSON.stringify({ error: "Both old and new passwords are required" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    if (!user.passwordHash) {
      return new Response(JSON.stringify({ error: "User has no password set" }), { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Incorrect old password" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: hashedPassword },
    });

    return new Response(JSON.stringify({ message: "Password updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return new Response(JSON.stringify({ error: "Failed to update password" }), { status: 500 });
  }
}
