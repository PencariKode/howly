/**
 * Serialize room code to uppercase and remove hyphens
 * @param roomCode string - Room code to serialize
 * @returns string - Serialized room code
 */
export default function serializeRoomCode(roomCode: string) {
    return roomCode.replace(/-/g, '').toUpperCase();
}