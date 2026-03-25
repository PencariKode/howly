import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";
import { prisma } from "@l/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ activeRoom: null });
    }

    // Cek apakah user adalah owner dari room yang aktif
    const ownedRoom = await prisma.room.findFirst({
        where: {
            ownerId: session.user.id,
            status: { in: ['WAITING', 'PLAYING'] },
        },
        select: { code: true },
    });

    if (ownedRoom) {
        return NextResponse.json({ activeRoom: ownedRoom.code });
    }

    // Cek apakah user adalah pemain di room yang aktif
    const joinedRoom = await prisma.room.findFirst({
        where: {
            players: { some: { id: session.user.id } },
            status: { in: ['WAITING', 'PLAYING'] },
        },
        select: { code: true },
    });

    if (joinedRoom) {
        return NextResponse.json({ activeRoom: joinedRoom.code });
    }

    return NextResponse.json({ activeRoom: null });
}
