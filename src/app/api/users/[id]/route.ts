import { prisma } from "@l/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";

export const dynamic = "auto";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const userId = (await params).id;

  try {
    let user;

    if (userId === "me") {
      user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } else {
      user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      }),
      { status: 500 },
    );
  }
}
