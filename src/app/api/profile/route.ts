import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";
import { prisma } from "@l/prisma";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, image } = body;

    if (
      name !== undefined &&
      (typeof name !== "string" || name.trim().length < 3)
    ) {
      return NextResponse.json(
        { error: "Nama harus terdiri dari minimal 3 karakter" },
        { status: 400 },
      );
    }

    if (image !== undefined && typeof image !== "string") {
      return NextResponse.json(
        { error: "URL gambar tidak valid" },
        { status: 400 },
      );
    }

    // update profile
    const updateData: { name?: string; image?: string | null } = {};
    if (name !== undefined) updateData.name = name.trim();
    if (image !== undefined) updateData.image = image.trim() || null;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui profil" },
      { status: 500 },
    );
  }
}

// hapus akun
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // cascade
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return NextResponse.json({ message: "Akun berhasil dihapus" });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus akun" },
      { status: 500 },
    );
  }
}
