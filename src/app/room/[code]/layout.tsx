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
        select: { owner: { select: { name: true } }, status: true },
    });

    const ownerName = room?.owner?.name?.split(" ").slice(0, 2).join(" ") ?? "Unknown";

    let roomStatus = "";

    switch (room?.status) {
        case "WAITING":
            roomStatus = "Waiting for players";
            break;
        case "PLAYING":
            roomStatus = "Game in progress";
            break;
        case "ENDED":
            roomStatus = "Game ended";
            break;
        default:
            roomStatus = "";
            break;
    }

    return {
        title: `Howly - ${ownerName}'s Room ${roomStatus ? `| ${roomStatus}` : ""}`,
        description: "Howly is a platform for playing 'werewolf' games online with friends.",
    };
}

export default function RoomLayout({ children }: RoomLayoutProps) {
    return children;
}