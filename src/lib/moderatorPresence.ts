import { prisma } from "@l/prisma";
import { roomEvents } from "@l/roomEvents";

/**
 * PK: Tracking koneksi SSE moderator (singleton per-process)
 * Saat moderator disconnect -> game pause
 * Saat moderator reconnect -> game resume
 */

const globalForPresence = globalThis as unknown as {
  moderatorPresence?: ModeratorPresence;
};

class ModeratorPresence {
  //PK: roomCode -> jumlah koneksi SSE moderator aktif
  private connections: Map<string, number> = new Map();

  //PK: moderator terhubung ke SSE
  async connect(roomCode: string) {
    const current = this.connections.get(roomCode) || 0;
    this.connections.set(roomCode, current + 1);

    //PK: jika sebelumnya 0 (baru reconnect), resume game
    if (current === 0) {
      await this.resumeGame(roomCode);
    }
  }

  //PK: moderator disconnect dari SSE
  async disconnect(roomCode: string) {
    const current = this.connections.get(roomCode) || 0;
    const next = Math.max(0, current - 1);
    this.connections.set(roomCode, next);

    //PK: jika sudah tidak ada koneksi moderator, pause game
    if (next === 0) {
      await this.pauseGame(roomCode);
    }
  }

  isConnected(roomCode: string): boolean {
    return (this.connections.get(roomCode) || 0) > 0;
  }

  private async pauseGame(roomCode: string) {
    try {
      const room = await prisma.room.findUnique({
        where: { code: roomCode },
        select: { gameSession: { select: { id: true, isPaused: true } } },
      });

      if (!room?.gameSession || room.gameSession.isPaused) return;

      await prisma.gameSession.update({
        where: { id: room.gameSession.id },
        data: {
          isPaused: true,
          pausedAt: new Date(),
        },
      });

      roomEvents.emit(roomCode);
    } catch (error) {
      console.error(
        `[ModeratorPresence] Error pausing game for ${roomCode}:`,
        error,
      );
    }
  }

  private async resumeGame(roomCode: string) {
    try {
      const room = await prisma.room.findUnique({
        where: { code: roomCode },
        select: {
          gameSession: {
            select: {
              id: true,
              isPaused: true,
              pausedAt: true,
              totalPausedMs: true,
            },
          },
        },
      });

      if (!room?.gameSession || !room.gameSession.isPaused) return;

      const pausedMs = room.gameSession.pausedAt
        ? Date.now() - room.gameSession.pausedAt.getTime()
        : 0;

      await prisma.gameSession.update({
        where: { id: room.gameSession.id },
        data: {
          isPaused: false,
          pausedAt: null,
          totalPausedMs: room.gameSession.totalPausedMs + pausedMs,
        },
      });

      roomEvents.emit(roomCode);
    } catch (error) {
      console.error(
        `[ModeratorPresence] Error resuming game for ${roomCode}:`,
        error,
      );
    }
  }
}

export const moderatorPresence =
  globalForPresence.moderatorPresence ?? new ModeratorPresence();
if (process.env.NODE_ENV !== "production")
  globalForPresence.moderatorPresence = moderatorPresence;
