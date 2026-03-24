"use server";

import { prisma } from "@/lib/prisma";
import { serializeRoomCode } from "@/utils";

export default async function checkRoom(code: string) {
    try {
        code = serializeRoomCode(code);

        const room = await prisma.room.findUnique({
            where: {
                code
            },
        });

        return room;
    } catch (error) {
        console.error("[CHECK_ROOM_ERROR]", error);
        throw new Error("Terjadi kesalahan sistem saat mencari room");
    }
}


