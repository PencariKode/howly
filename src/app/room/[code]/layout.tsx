import type { Metadata } from "next";
import type { ReactNode } from "react";
import { prisma } from "@l/prisma";

interface RoomLayoutProps {
    params: Promise<{ code: string }>;
    children: ReactNode;
}

export async function generateMetadata({ params }: RoomLayoutProps): Promise<Metadata> {
    const { code } = await params;

    const room = await prisma.room.findUnique({
        where: { code: code.toUpperCase() },
        select: { owner: { select: { name: true } } },
    });

    const ownerName = room?.owner?.name?.split(" ").slice(0, 2).join(" ") ?? "Unknown";

    return {
        title: `Howly - ${ownerName}'s Room`,
        description: "Howly is a platform for playing 'werewolf' games online with friends.",
    };
}

export default function RoomLayout({ children }: RoomLayoutProps) {
    return children;
}