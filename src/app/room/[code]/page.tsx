'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";
import { prisma } from "@l/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import WaitingRoom from "./WaitingRoom";
import GameRoom from "./GameRoom";

const ACTIVE_ROOM_COOKIE = process.env.NEXT_PUBLIC_ACTIVE_ROOM_COOKIE || "active_room";

interface RoomPageProps {
    params: Promise<{ code: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
    const { code: rawCode } = await params;
    const code = rawCode.toUpperCase();

    if (rawCode !== code) {
        redirect(`/room/${code}`);
    }

    const cookieStore = await cookies();
    const kickedCookie = cookieStore.get(`kicked_from_${code}`);

    if (kickedCookie) {
        redirect(`/?kicked=1&room=${code}`);
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/login");
    }

    const room = await prisma.room.findUnique({
        where: { code },
        include: {
            owner: {
                select: { id: true, name: true, image: true },
            },
            players: {
                select: { id: true, name: true, image: true },
            },
            roleConfig: true,
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
        },
    });

    if (!room) {
        //PK: bersihkan cookie active_room jika mengarah ke room yang sudah dihapus
        const cookieStore = await cookies();
        const activeRoomCookie = cookieStore.get(ACTIVE_ROOM_COOKIE)?.value;
        if (activeRoomCookie?.toUpperCase() === code) {
            cookieStore.delete(ACTIVE_ROOM_COOKIE);
            cookieStore.delete("active_room_hint");
        }

        return (
            <div className="flex min-h-screen items-center justify-center bg-hl-bg px-4 py-12">
                <div className="pointer-events-none fixed inset-0 z-0"
                    style={ {
                        background: `
                            radial-gradient(ellipse 40% 50% at 0% 0%, rgba(107,21,37,0.40) 0%, transparent 70%),
                            radial-gradient(ellipse 40% 50% at 100% 100%, rgba(139,32,48,0.30) 0%, transparent 70%),
                            radial-gradient(ellipse 30% 40% at 100% 50%, rgba(166,52,69,0.25) 0%, transparent 70%),
                            radial-gradient(ellipse 25% 30% at 25% 100%, rgba(107,21,37,0.30) 0%, transparent 70%)
                        `
                    } }
                />
                <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-4">
                    <div className="glass-card w-full flex flex-col items-center gap-4 py-8">
                        <i className="fas fa-ghost text-4xl text-zinc-500" />
                        <h1 className="text-2xl font-bold text-white">Room Tidak Ditemukan</h1>
                        <p className="text-sm text-zinc-400 text-center">Room dengan kode <span className="font-mono text-red-400">{code}</span> tidak ditemukan atau sudah dihapus.</p>
                        {/* PK: pakai <a> bukan <Link> agar hard navigation yg mengambil cookie terbaru */}
                        <a href="/" className="primary-btn mt-2 px-6">Kembali ke Beranda</a>
                    </div>
                </div>
            </div>
        );
    }

    const isOwner = room.ownerId === session.user.id;
    const isPlayer = room.players.some(p => p.id === session.user.id);

    //PK: jika game playing dan ada gameSession -> render GameRoom
    if (room.status === "PLAYING" && room.gameSession) {
        const currentGamePlayer = room.gameSession.players.find(
            (gp) => gp.userId === session.user.id
        );

        const gamePlayers = room.gameSession.players.map((gp) => ({
            id: gp.id,
            userId: gp.userId,
            name: gp.user.name,
            image: gp.user.image,
            role: (gp.userId === session.user.id || !gp.isAlive || isOwner)
                ? gp.role
                : null,
            isAlive: gp.isAlive,
            isOnline: gp.isOnline,
            lastSeenAt: gp.lastSeenAt.toISOString(),
        }));

        return (
            <GameRoom
                room={{
                    id: room.id,
                    code: room.code,
                    name: room.name,
                    playerCount: room.playerCount,
                    status: room.status,
                    owner: room.owner,
                    players: room.players,
                    roleConfig: room.roleConfig,
                    createdAt: room.createdAt.toISOString(),
                }}
                gameSession={{
                    id: room.gameSession.id,
                    startedAt: room.gameSession.startedAt.toISOString(),
                    isPaused: room.gameSession.isPaused,
                    pausedAt: room.gameSession.pausedAt?.toISOString() ?? null,
                    totalPausedMs: room.gameSession.totalPausedMs,
                    players: gamePlayers,
                }}
                currentUserId={session.user.id as string}
                currentPlayerRole={currentGamePlayer?.role ?? null}
                isOwner={isOwner}
            />
        );
    }

    return (
        <WaitingRoom
            room={{
                id: room.id,
                code: room.code,
                name: room.name,
                playerCount: room.playerCount,
                status: room.status,
                owner: room.owner,
                players: room.players,
                roleConfig: room.roleConfig,
                createdAt: room.createdAt.toISOString(),
            }}
            isOwner={isOwner}
            isPlayer={isPlayer}
            currentUserId={session.user.id as string}
        />
    );
}

