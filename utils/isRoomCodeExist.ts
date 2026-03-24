import { prisma } from "@/lib/prisma";

export default async function isRoomCodeExist(roomCode: string) {
    try {
        const db = await prisma.room.findUnique({
            where: {
                code: roomCode,
            },
        });
        return db !== null;
    } catch (error) {
        console.error("Error checking room code:", error);
        throw new Error("Gagal mengecek ketersediaan kode room: " + error)
    }
}