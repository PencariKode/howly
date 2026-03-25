import { prisma } from "@l/prisma";
import { roomEvents } from "@l/roomEvents";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';


//PK: Serverside Event untuk update data waiting room
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    const room = await prisma.room.findUnique({
        where: { code },
        select: { id: true },
    });

    if (!room) {
        return new Response("Room not found", { status: 404 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            sendRoomData(code, controller, encoder); //PK: kirim data init

            //PK: Subscribe ke event emitternya
            const unsubscribe = roomEvents.subscribe(code, () => {
                sendRoomData(code, controller, encoder);
            });

            //PK: Pembersihan saat koneksi ditutup
            request.signal.addEventListener('abort', () => {
                unsubscribe();
                controller.close();
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

async function sendRoomData(
    code: string,
    controller: ReadableStreamDefaultController,
    encoder: TextEncoder
) {
    try {
        const room = await prisma.room.findUnique({
            where: { code },
            include: {
                owner: { select: { id: true, name: true, image: true } },
                players: { select: { id: true, name: true, image: true } },
            },
        });

        if (!room) {
            const disbandedData = JSON.stringify({
                status: "DISBANDED"
            });
            controller.enqueue(encoder.encode(`data: ${disbandedData}\n\n`));
            return;
        }

        const data = JSON.stringify({
            players: room.players,
            owner: room.owner,
            playerCount: room.playerCount,
            status: room.status,
        });

        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
    } catch (error) {
        try {
            controller.close();
        } catch (closeError) {
            console.error("Error closing stream controller:", closeError);
        }
    }
}
