import { prisma } from "@l/prisma";
import { roomEvents } from "@l/roomEvents";
import { moderatorPresence } from "@l/moderatorPresence";
import { playerPresence } from "@l/playerPresence";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";
import { buildRoleCounts, shouldRevealRole } from "@l/roleVisibility";

export const dynamic = 'force-dynamic';

/**
 * PK: SSE endpoint untuk game state (saat PLAYING)
 * - Moderator: tracking presence -> pause/resume
 * - Player: tracking presence -> offline timeout -> mati
 * - Role hanya dikirim untuk player sendiri + player yang sudah mati
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    const room = await prisma.room.findUnique({
        where: { code },
        select: {
            id: true,
            ownerId: true,
            status: true,
            gameSession: { select: { id: true } },
        },
    });

    if (!room) {
        return new Response("Room not found", { status: 404 });
    }

    if (room.status !== "PLAYING" || !room.gameSession) {
        return new Response("Game belum dimulai", { status: 400 });
    }

    const isOwner = room.ownerId === userId;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            //PK: Register presence
            if (isOwner) {
                await moderatorPresence.connect(code);
            } else {
                await playerPresence.connect(code, userId);
            }

            //PK: send data initial
            await sendGameData(code, userId, isOwner, controller, encoder);

            const unsubscribe = roomEvents.subscribe(code, () => {
                sendGameData(code, userId, isOwner, controller, encoder);
            });

            request.signal.addEventListener('abort', async () => {
                unsubscribe();

                if (isOwner) {
                    await moderatorPresence.disconnect(code);
                } else {
                    await playerPresence.disconnect(code, userId);
                }

                try {
                    controller.close();
                } catch {
                    // stream sudah ditutup
                }
            });
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
        },
    });
}

async function sendGameData(
    code: string,
    currentUserId: string,
    isOwner: boolean,
    controller: ReadableStreamDefaultController,
    encoder: TextEncoder
) {
    try {
        const room = await prisma.room.findUnique({
            where: { code },
            include: {
                gameSession: {
                    include: {
                        players: {
                            include: {
                                user: {
                                    select: { id: true, name: true, image: true },
                                },
                            },
                        },
                    },
                },
                owner: { select: { id: true, name: true, image: true } },
            },
        });

        if (!room || !room.gameSession) {
            const errorData = JSON.stringify({ status: "DISBANDED" });
            controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
            return;
        }

        const roleCounts = buildRoleCounts(room.gameSession.players);
        const currentPlayerRole =
            room.gameSession.players.find((gp) => gp.userId === currentUserId)?.role ?? null;

        //PK: filter role: aturan visibility per role
        const players = room.gameSession.players.map((gp) => ({
            id: gp.id,
            userId: gp.userId,
            name: gp.user.name,
            image: gp.user.image,
            role: shouldRevealRole({
                targetRole: gp.role,
                targetUserId: gp.userId,
                targetIsAlive: gp.isAlive,
                viewerUserId: currentUserId,
                viewerRole: currentPlayerRole,
                isOwner,
                roleCounts,
            })
                ? gp.role
                : null,
            isAlive: gp.isAlive,
            isOnline: gp.isOnline,
            lastSeenAt: gp.lastSeenAt.toISOString(),
        }));

        const data = JSON.stringify({
            status: room.status,
            gameSession: {
                id: room.gameSession.id,
                startedAt: room.gameSession.startedAt.toISOString(),
                isPaused: room.gameSession.isPaused,
                pausedAt: room.gameSession.pausedAt?.toISOString() ?? null,
                totalPausedMs: room.gameSession.totalPausedMs,
                players,
            },
            owner: room.owner,
        });

        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
    } catch (error) {
        console.error("[GameSSE] Error sending game data:", error);
        try {
            controller.close();
        } catch {
            // stream sudah ditutup
        }
    }
}
