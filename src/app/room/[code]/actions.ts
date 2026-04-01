'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";
import { prisma } from "@l/prisma";
import { roomEvents } from "@l/roomEvents";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { randomizeRoles } from "@l/roleRandomizer";

const ACTIVE_ROOM_COOKIE = process.env.NEXT_PUBLIC_ACTIVE_ROOM_COOKIE || "active_room";

/**
 * PK: Cek user udah login / belum
 * @returns userId
 */
async function requireAuth() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Anda harus login.");
    return session.user.id;
}

/**
 * PK: Notif ke user lain kalau ada perubahan di room
 * @param roomCode string - Kode room
 */
function notifyRoomUpdate(roomCode: string) {
    revalidatePath(`/room/${roomCode}`);
    roomEvents.emit(roomCode);
}

async function _joinRoomAction(roomCode: string) {
    const userId = await requireAuth();

    const room = await prisma.room.findUnique({
        where: { code: roomCode },
        include: { players: { select: { id: true } } },
    });

    if (!room) {
        throw new Error("Room tidak ditemukan.");
    }

    if (room.status !== "WAITING") {
        throw new Error("Room sudah dimulai atau sudah berakhir.");
    }

    if (room.ownerId === userId) {
        throw new Error("Pemilik room tidak bisa bergabung sebagai pemain.");
    }

    if (room.players.some(p => p.id === userId)) {
        throw new Error("Kamu sudah bergabung di room ini.");
    }

    if (room.players.length >= room.playerCount) {
        throw new Error("Room sudah penuh.");
    }

    await prisma.room.update({
        where: { code: roomCode },
        data: {
            players: {
                connect: { id: userId },
            },
        },
    });


    // PK: auto redirect
    const cookieStore = await cookies();

    cookieStore.set(ACTIVE_ROOM_COOKIE, roomCode.toUpperCase(), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    cookieStore.set("active_room_hint", roomCode.toUpperCase(), {
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 6,
    });

    notifyRoomUpdate(roomCode);
}

async function _leaveRoomAction(roomCode: string) {
    const userId = await requireAuth();

    await prisma.room.update({
        where: { code: roomCode },
        data: {
            players: {
                disconnect: { id: userId },
            },
        },
    });

    const cookieStore = await cookies();
    cookieStore.delete(ACTIVE_ROOM_COOKIE);
    cookieStore.delete("active_room_hint");

    notifyRoomUpdate(roomCode);
}

async function _kickPlayerAction(roomCode: string, targetUserId: string) {
    const userId = await requireAuth();

    const room = await prisma.room.findUnique({
        where: { code: roomCode },
        select: {
            ownerId: true,
            status: true,
            players: { select: { id: true } },
        }
    });

    if (!room) {
        throw new Error("Room tidak ditemukan.");
    }

    if (room.ownerId !== userId) {
        throw new Error("Hanya pemilik room yang bisa menendang pemain.");
    }

    if (room.status !== "WAITING") {
        throw new Error("Tidak bisa menendang pemain saat permainan berlangsung.");
    }

    if (!room.players.some(p => p.id === targetUserId)) {
        throw new Error("Pemain tidak ditemukan di room ini.");
    }

    await prisma.room.update({
        where: { code: roomCode },
        data: {
            players: {
                disconnect: { id: targetUserId },
            },
        },
    });

    notifyRoomUpdate(roomCode);
}

async function _disbandRoomAction(roomCode: string) {
    const userId = await requireAuth();

    const room = await prisma.room.findUnique({
        where: { code: roomCode },
        select: { ownerId: true }
    });

    if (!room) {
        throw new Error("Room tidak ditemukan.");
    }

    if (room.ownerId !== userId) {
        throw new Error("Hanya pemilik room yang bisa membubarkan room.");
    }

    await prisma.room.delete({
        where: { code: roomCode }
    });

    const cookieStore = await cookies();
    cookieStore.delete(ACTIVE_ROOM_COOKIE);
    cookieStore.delete("active_room_hint");

    notifyRoomUpdate(roomCode);
}

async function _startGameAction(roomCode: string) {
    const userId = await requireAuth();
    const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

    const room = await prisma.room.findUnique({
        where: { code: roomCode },
        include: {
            players: { select: { id: true } },
            roleConfig: true,
            gameSession: { select: { id: true } },
        },
    });

    if (!room) {
        throw new Error("Room tidak ditemukan.");
    }

    if (room.ownerId !== userId) {
        throw new Error("Hanya moderator yang bisa memulai permainan.");
    }

    if (room.status !== "WAITING") {
        throw new Error("Room sudah dimulai atau sudah berakhir.");
    }

    //PK: Dev mode — boleh mulai meski belum penuh (min 1 player)
    if (!isDevMode && room.players.length < room.playerCount) {
        throw new Error(`Waiting room belum penuh. Butuh ${room.playerCount} pemain, baru ${room.players.length}.`);
    }

    if (isDevMode && room.players.length < 1) {
        throw new Error("Minimal 1 pemain asli untuk memulai (Dev Mode).");
    }

    if (!room.roleConfig) {
        throw new Error("Konfigurasi role belum diatur.");
    }

    if (room.gameSession) {
        throw new Error("Game session sudah ada.");
    }

    let playerIds = room.players.map((p) => p.id);

    //PK: Dev mode — isi slot kosong dengan bot palsu
    if (isDevMode && playerIds.length < room.playerCount) {
        const botsNeeded = room.playerCount - playerIds.length;
        const botNames = [
            "🤖 Bot Alpha", "🤖 Bot Bravo", "🤖 Bot Charlie", "🤖 Bot Delta",
            "🤖 Bot Echo", "🤖 Bot Foxtrot", "🤖 Bot Golf", "🤖 Bot Hotel",
            "🤖 Bot India", "🤖 Bot Juliet", "🤖 Bot Kilo", "🤖 Bot Lima",
            "🤖 Bot Mike", "🤖 Bot November", "🤖 Bot Oscar", "🤖 Bot Papa",
            "🤖 Bot Quebec", "🤖 Bot Romeo", "🤖 Bot Sierra", "🤖 Bot Tango",
        ];

        //PK: Buat user palsu di DB dan connect ke room
        for (let i = 0; i < botsNeeded; i++) {
            const botUser = await prisma.user.create({
                data: {
                    name: botNames[i % botNames.length],
                    email: `bot-${Date.now()}-${i}@dev.howly.local`,
                },
            });

            await prisma.room.update({
                where: { code: roomCode },
                data: {
                    players: { connect: { id: botUser.id } },
                },
            });

            playerIds.push(botUser.id);
        }

        console.log(`[DEV] Created ${botsNeeded} bot(s) for room ${roomCode}`);
    }

    //PK: Randomize role ke setiap player (termasuk bot)
    const roleMap = randomizeRoles(room.roleConfig, playerIds);

    //PK: Buat GameSession + GamePlayer dalam satu transaksi
    await prisma.$transaction([
        prisma.room.update({
            where: { code: roomCode },
            data: { status: "PLAYING" },
        }),
        prisma.gameSession.create({
            data: {
                roomId: room.id,
                players: {
                    create: playerIds.map((pid) => ({
                        userId: pid,
                        role: roleMap.get(pid)!,
                    })),
                },
            },
        }),
    ]);

    notifyRoomUpdate(roomCode);
}

export async function playerHeartbeatAction(roomCode: string) {
    const userId = await requireAuth();

    const room = await prisma.room.findUnique({
        where: { code: roomCode },
        select: { gameSession: { select: { id: true } } },
    });

    if (!room?.gameSession) return;

    await prisma.gamePlayer.updateMany({
        where: {
            gameSessionId: room.gameSession.id,
            userId,
        },
        data: {
            lastSeenAt: new Date(),
            isOnline: true,
        },
    });
}

async function _endGameAction(roomCode: string) {
    const userId = await requireAuth();

    const room = await prisma.room.findUnique({
        where: { code: roomCode },
        select: { ownerId: true, status: true },
    });

    if (!room) {
        throw new Error("Room tidak ditemukan.");
    }

    if (room.ownerId !== userId) {
        throw new Error("Hanya moderator yang bisa mengakhiri permainan.");
    }

    if (room.status !== "PLAYING") {
        throw new Error("Permainan belum dimulai.");
    }

    await prisma.room.update({
        where: { code: roomCode },
        data: { status: "ENDED" },
    });

    notifyRoomUpdate(roomCode);
}

async function _killPlayerAction(roomCode: string, targetPlayerId: string) {
    const userId = await requireAuth();

    const room = await prisma.room.findUnique({
        where: { code: roomCode },
        select: { 
            ownerId: true, 
            status: true,
            gameSession: { select: { id: true, players: true } }
        },
    });

    if (!room) {
        throw new Error("Room tidak ditemukan.");
    }

    if (room.ownerId !== userId) {
        throw new Error("Hanya moderator yang bisa membunuh pemain.");
    }

    if (room.status !== "PLAYING" || !room.gameSession) {
        throw new Error("Permainan belum dimulai atau sudah berakhir.");
    }

    const targetPlayer = room.gameSession.players.find(p => p.id === targetPlayerId);

    if (!targetPlayer) {
        throw new Error("Pemain tidak ditemukan di game ini.");
    }

    if (!targetPlayer.isAlive) {
        throw new Error("Pemain sudah mati.");
    }

    await prisma.gamePlayer.update({
        where: { id: targetPlayerId },
        data: { isAlive: false },
    });

    notifyRoomUpdate(roomCode);
}

function withErrorHandling<T extends (...args: any[]) => Promise<any>>(action: T) {
    return async (...args: Parameters<T>): Promise<{ success?: boolean; error?: string }> => {
        try {
            await action(...args);
            return { success: true };
        } catch (e: any) {
            return { error: e.message || "Terjadi kesalahan server." };
        }
    };
}

export const joinRoomAction = withErrorHandling(_joinRoomAction);
export const leaveRoomAction = withErrorHandling(_leaveRoomAction);
export const kickPlayerAction = withErrorHandling(_kickPlayerAction);
export const disbandRoomAction = withErrorHandling(_disbandRoomAction);
export const startGameAction = withErrorHandling(_startGameAction);
export const endGameAction = withErrorHandling(_endGameAction);
export const killPlayerAction = withErrorHandling(_killPlayerAction);
