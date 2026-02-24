import { prisma } from "@l/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
        message: "Silahkan gunakan autentikasi anda",
      }),
      { status: 401 },
    );

  try {
    const allUsers = await prisma.user.findMany({
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

    return new Response(JSON.stringify(allUsers), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
