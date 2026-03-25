export interface RoomPlayer {
    id: string;
    name: string | null;
    image: string | null;
}

export interface RoomRoleConfig {
    id: string;
    warga: number;
    werewolf: number;
    peramal: number;
    penyihir: number;
    pemburu: number | null;
    dukun: number | null;
    raja: number | null;
    blackwolf: number | null;
    shapeshifter: number | null;
}

export interface RoomData {
    id: string;
    code: string;
    name: string;
    playerCount: number;
    status: string;
    owner: RoomPlayer;
    players: RoomPlayer[];
    roleConfig: RoomRoleConfig | null;
    createdAt: string;
}

export interface WaitingRoomProps {
    room: RoomData;
    isOwner: boolean;
    isPlayer: boolean;
    currentUserId: string;
}