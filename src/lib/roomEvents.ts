type RoomEventCallback = () => void;

class RoomEventEmitter {
    private listeners: Map<string, Set<RoomEventCallback>> = new Map();

    subscribe(roomCode: string, callback: RoomEventCallback): () => void {
        if (!this.listeners.has(roomCode)) {
            this.listeners.set(roomCode, new Set());
        }
        this.listeners.get(roomCode)!.add(callback);

        return () => {
            const roomListeners = this.listeners.get(roomCode);
            if (roomListeners) {
                roomListeners.delete(callback);
                if (roomListeners.size === 0) {
                    this.listeners.delete(roomCode);
                }
            }
        };
    }

    emit(roomCode: string) {
        const roomListeners = this.listeners.get(roomCode);
        if (roomListeners) {
            roomListeners.forEach(cb => cb());
        }
    }
}

//PK: (Singleton) biar roomEvents gk terduplicate setiap render
const globalForEmitter = globalThis as unknown as { roomEvents?: RoomEventEmitter };
export const roomEvents = globalForEmitter.roomEvents ?? new RoomEventEmitter();
if (process.env.NODE_ENV !== 'production') globalForEmitter.roomEvents = roomEvents;
