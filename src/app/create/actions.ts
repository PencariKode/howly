'use server';

import { redirect } from 'next/navigation';
import type { RoleConfig } from '@/types/roleconfig';
import { createRoomCode } from '@r/utils';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";

export interface CreateRoomPayload {
    roomName: string;
    playerCount: number;
    roleConfig: RoleConfig;
}

export async function createRoomAction(data: CreateRoomPayload) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        throw new Error("Anda harus login untuk membuat room.");
    }

    const { roomName, playerCount, roleConfig } = data;

    const roomCode = await createRoomCode();

    console.log("Membuat room dengan data state:", { roomName, playerCount, roleConfig, roomCode });

    const newRoom = await prisma.room.create({
        data: {
            code: roomCode,
            name: roomName,
            playerCount,
            roleConfig: {
                create: roleConfig
            },
            owner: {
                connect: {
                    id: session.user.id
                }
            }
        }
    });

    redirect(`/room/${roomCode}`);
}
