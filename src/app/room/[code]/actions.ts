'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";
import { prisma } from "@l/prisma";
import { roomEvents } from "@l/roomEvents";
import { revalidatePath } from "next/cache";

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

export async function joinRoomAction(roomCode: string) {
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

    notifyRoomUpdate(roomCode);
}

export async function leaveRoomAction(roomCode: string) {
    const userId = await requireAuth();

    await prisma.room.update({
        where: { code: roomCode },
        data: {
            players: {
                disconnect: { id: userId },
            },
        },
    });

    notifyRoomUpdate(roomCode);
}

export async function kickPlayerAction(roomCode: string, targetUserId: string) {
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

export async function disbandRoomAction(roomCode: string) {
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

    notifyRoomUpdate(roomCode);
}
