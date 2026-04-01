import { prisma } from "@l/prisma";
import { roomEvents } from "@l/roomEvents";

/**
 * PK: Tracking koneksi SSE player (singleton per-process)
 * Saat player disconnect -> mulai timer 2 menit
 * Setelah 2 menit offline -> player dianggap mati
 * Saat player reconnect sebelum 2 menit -> cancel timer
 */

const OFFLINE_TIMEOUT_MS = 2 * 60 * 1000; // 2 menit

const globalForPlayerPresence = globalThis as unknown as {
  playerPresence?: PlayerPresence;
};

class PlayerPresence {
  // key: `${roomCode}:${userId}` -> timeout handle
  private offlineTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();
  // key: `${roomCode}:${userId}` -> number of active SSE connections
  private connections: Map<string, number> = new Map();

  private key(roomCode: string, userId: string) {
    return `${roomCode}:${userId}`;
  }

  //PK: player terhubung ke SSE
  async connect(roomCode: string, userId: string) {
    const k = this.key(roomCode, userId);
    const current = this.connections.get(k) || 0;
    this.connections.set(k, current + 1);

    //PK: cancel timer offline jika ada
    const timer = this.offlineTimers.get(k);
    if (timer) {
      clearTimeout(timer);
      this.offlineTimers.delete(k);
    }

    //PK: update status online di DB
    if (current === 0) {
      await this.setOnline(roomCode, userId);
    }
  }

  //PK: player disconnect dari SSE
  async disconnect(roomCode: string, userId: string) {
    const k = this.key(roomCode, userId);
    const current = this.connections.get(k) || 0;
    const next = Math.max(0, current - 1);
    this.connections.set(k, next);

    if (next === 0) {
      //PK: set offline di DB
      await this.setOffline(roomCode, userId);

      //PK: mulai timer 2 menit
      const timer = setTimeout(async () => {
        this.offlineTimers.delete(k);
        await this.killPlayer(roomCode, userId);
      }, OFFLINE_TIMEOUT_MS);

      this.offlineTimers.set(k, timer);
    }
  }

  isConnected(roomCode: string, userId: string): boolean {
    return (this.connections.get(this.key(roomCode, userId)) || 0) > 0;
  }

  private async setOnline(roomCode: string, userId: string) {
    try {
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
          isOnline: true,
          lastSeenAt: new Date(),
        },
      });

      roomEvents.emit(roomCode);
    } catch (error) {
      console.error(
        `[PlayerPresence] Error setting online for ${userId}:`,
        error,
      );
    }
  }

  private async setOffline(roomCode: string, userId: string) {
    try {
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
          isOnline: false,
          lastSeenAt: new Date(),
        },
      });

      roomEvents.emit(roomCode);
    } catch (error) {
      console.error(
        `[PlayerPresence] Error setting offline for ${userId}:`,
        error,
      );
    }
  }

  private async killPlayer(roomCode: string, userId: string) {
    try {
      const room = await prisma.room.findUnique({
        where: { code: roomCode },
        select: {
          gameSession: {
            select: {
              id: true,
              players: { select: { id: true, userId: true, isAlive: true } },
            },
          },
        },
      });
      if (!room?.gameSession) return;

      const player = room.gameSession.players.find((p) => p.userId === userId);
      if (!player || !player.isAlive) return;

      await prisma.gamePlayer.update({
        where: { id: player.id },
        data: {
          isAlive: false,
          isOnline: false,
        },
      });

      roomEvents.emit(roomCode);
    } catch (error) {
      console.error(`[PlayerPresence] Error killing player ${userId}:`, error);
    }
  }
}

export const playerPresence =
  globalForPlayerPresence.playerPresence ?? new PlayerPresence();
if (process.env.NODE_ENV !== "production")
  globalForPlayerPresence.playerPresence = playerPresence;
