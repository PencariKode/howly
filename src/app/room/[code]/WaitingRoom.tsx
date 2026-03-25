'use client';

import SimpleFormHeader from "@c/Form/SimpleFormHeader";
import PrimaryButton from "@c/Buttons/Primary";
import DangerButton from "@c/Buttons/Danger";
import { formatRoomCode } from "@/utils";
import Image from "next/image";
import { useState, useTransition, useEffect, useRef } from "react";
import { joinRoomAction, leaveRoomAction, kickPlayerAction } from "./actions";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/stores/uiStore";
import { RoomPlayer, RoomRoleConfig, WaitingRoomProps } from "@/types/room";

function UserProfilePhoto({ player }: { player: RoomPlayer }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    return (
        player.image ? (
            <>
                { !imgLoaded && (
                    <div className="absolute inset-0 rounded-full bg-zinc-700 animate-pulse" />
                ) }
                <Image
                    src={ player.image }
                    alt={ player.name || "Player" }
                    width={ 36 }
                    height={ 36 }
                    className={ `rounded-full object-cover w-9 h-9 transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}` }
                    onLoad={ () => setImgLoaded(true) }
                />
            </>
        ) : (
            <div className="w-full h-full rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300">
                { (player.name || "?")[0].toUpperCase() }
            </div>
        )
    );
}

function PlayerCard({
    player,
    isOwnerRole,
    canKick,
    onKick,
    isKicking
}: {
    player: RoomPlayer;
    isOwnerRole?: boolean;
    canKick?: boolean;
    onKick?: (userId: string) => void;
    isKicking?: boolean;
}) {

    return (
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-hl-primary/50 border border-zinc-700/30 transition-all duration-200 hover:border-zinc-600/50 group">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative shrink-0 w-9 h-9">
                    <UserProfilePhoto player={ player } />
                    { isOwnerRole && (
                        <span className="absolute z-10 -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[0.55rem] text-black" title="Moderator">
                            <i className="fas fa-crown" />
                        </span>
                    ) }
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-zinc-200 truncate">
                        { player.name || "Anonim" }
                    </span>
                    <span className="text-[0.65rem] text-zinc-500">
                        { isOwnerRole ? "Moderator" : "Pemain" }
                    </span>
                </div>
            </div>

            { canKick && onKick && (
                <button
                    onClick={ () => onKick(player.id) }
                    disabled={ isKicking }
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 p-2 lg:p-1.5 rounded-md hover:bg-red-500/20 text-zinc-500 hover:text-red-400 cursor-pointer disabled:cursor-wait"
                    title="Kick pemain"
                >
                    <i className={ isKicking ? 'fas fa-spinner fa-spin' : 'fas fa-user-slash' } />
                </button>
            ) }
        </div>
    );
}

function RoleConfigSummary({ config }: { config: RoomRoleConfig }) {
    const roles = [
        { key: 'warga', label: 'Warga', value: config.warga, isRed: false },
        { key: 'werewolf', label: 'Werewolf', value: config.werewolf, isRed: true },
        { key: 'peramal', label: 'Peramal', value: config.peramal, isRed: false },
        { key: 'penyihir', label: 'Penyihir', value: config.penyihir, isRed: false },
        { key: 'pemburu', label: 'Pemburu', value: config.pemburu, isRed: false },
        { key: 'dukun', label: 'Dukun', value: config.dukun, isRed: false },
        { key: 'raja', label: 'Raja', value: config.raja, isRed: false },
        { key: 'blackwolf', label: 'Blackwolf', value: config.blackwolf, isRed: true },
        { key: 'shapeshifter', label: 'Shapeshifter', value: config.shapeshifter, isRed: true },
    ].filter(r => r.value && r.value > 0);

    return (
        <div className="flex flex-wrap gap-2">
            { roles.map(role => (
                <span key={ role.key } className={ `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${role.isRed
                    ? 'bg-red-950/50 border-red-700/40 text-red-400'
                    : 'bg-cyan-950/40 border-cyan-700/30 text-cyan-400'
                    }` }>
                    { role.label }
                    <span className={ `font-bold ${role.isRed ? 'text-red-300' : 'text-cyan-300'}` }>{ role.value }</span>
                </span>
            )) }
        </div>
    );
}

export default function WaitingRoom({ room, isOwner, isPlayer, currentUserId }: WaitingRoomProps) {
    const [codeCopied, setCodeCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [kickingId, setKickingId] = useState<string | null>(null);
    const isLeaving = useRef(false);
    const router = useRouter();
    const formattedCode = formatRoomCode(room.code);

    //PK: State live dari SSE
    const [livePlayers, setLivePlayers] = useState<RoomPlayer[]>(room.players);
    const playersRef = useRef<RoomPlayer[]>(room.players);

    //PK: Sync ref dengan state
    useEffect(() => {
        playersRef.current = livePlayers;
    }, [livePlayers]);

    const [liveOwner, setLiveOwner] = useState<RoomPlayer>(room.owner);
    const [liveStatus, setLiveStatus] = useState(room.status);

    useEffect(() => {
        let eventSource: EventSource | null = null;
        let reconnectTimer: ReturnType<typeof setTimeout>;

        function connect() {
            eventSource = new EventSource(`/api/room/${room.code}/events`);

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    const currentIsStillPlayer = data.players.some((p: any) => p.id === currentUserId);
                    const currentWasPlayer = playersRef.current.some(p => p.id === currentUserId);

                    if (!currentIsStillPlayer && currentWasPlayer && !isLeaving.current && !isOwner) {
                        document.cookie = `kicked_from_${room.code}=1; path=/; max-age=60`;
                        router.push(`/?kicked=1&room=${room.code}`);
                        return;
                    }

                    setLivePlayers(data.players);
                    setLiveOwner(data.owner);
                    setLiveStatus(data.status);
                } catch (error) {
                    console.error("Error processing room event data:", error);
                }
            };

            eventSource.onerror = () => {
                eventSource?.close();
                reconnectTimer = setTimeout(connect, 3000);
            };
        }

        connect();

        return () => {
            eventSource?.close();
            clearTimeout(reconnectTimer);
        };
    }, [room.code, currentUserId, isOwner]);

    //PK: Sync props saat server component rerender (setelah join/leave sendiri)
    useEffect(() => {
        setLivePlayers(room.players);
        setLiveOwner(room.owner);
        setLiveStatus(room.status);
    }, [room.players, room.owner, room.status]);

    const liveIsPlayer = livePlayers.some(p => p.id === currentUserId);
    const joinedCount = livePlayers.length;
    const totalSlots = room.playerCount;

    //PK: Sync status aktif room ke uiStore (untuk hide/show BottomBar & Header)
    const setInActiveRoom = useUIStore(state => state.setInActiveRoom);
    useEffect(() => {
        setInActiveRoom(isOwner || liveIsPlayer);
        return () => setInActiveRoom(false);
    }, [isOwner, liveIsPlayer, setInActiveRoom]);

    function handleCopyCode() {
        navigator.clipboard.writeText(room.code);
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
    }

    function handleJoinRoom() {
        setError(null);
        startTransition(async () => {
            try {
                await joinRoomAction(room.code);
                router.refresh();
            } catch (e: any) {
                setError(e.message || "Gagal bergabung ke room.");
            }
        });
    }

    function handleLeaveRoom() {
        setError(null);
        isLeaving.current = true;
        startTransition(async () => {
            try {
                await leaveRoomAction(room.code);
                router.refresh();
            } catch (e: any) {
                isLeaving.current = false;
                setError(e.message || "Gagal keluar dari room.");
            }
        });
    }

    function handleKickPlayer(userId: string) {
        setError(null);
        setKickingId(userId);
        startTransition(async () => {
            try {
                await kickPlayerAction(room.code, userId);
            } catch (e: any) {
                setError(e.message || "Gagal menendang pemain.");
            } finally {
                setKickingId(null);
            }
        });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-hl-bg px-4 py-12">
            <div className="pointer-events-none fixed inset-0 z-0"
                style={ {
                    background: `
                        radial-gradient(ellipse 40% 50% at 0% 0%, rgba(107,21,37,0.40) 0%, transparent 70%),
                        radial-gradient(ellipse 40% 50% at 100% 100%, rgba(139,32,48,0.30) 0%, transparent 70%),
                        radial-gradient(ellipse 30% 40% at 100% 50%, rgba(166,52,69,0.25) 0%, transparent 70%),
                        radial-gradient(ellipse 25% 30% at 25% 100%, rgba(107,21,37,0.30) 0%, transparent 70%)
                    `
                } }
            />

            <div className="relative z-10 w-full max-w-lg flex flex-col gap-5">
                <div className="glass-card">
                    <SimpleFormHeader />

                    <div className="flex flex-col items-center gap-1 mb-4">
                        <h1 className="text-2xl font-bold tracking-tight text-white">{ room.name }</h1>
                        <p className="text-sm text-zinc-400">Menunggu pemain bergabung...</p>
                    </div>

                    {/*PK: Kode Room */ }
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <span className="text-xs text-zinc-500 uppercase tracking-widest">Kode Room</span>
                        <button
                            onClick={ handleCopyCode }
                            className="group flex items-center gap-2 px-5 py-2.5 rounded-lg bg-hl-primary/60 border border-zinc-700/40 hover:border-zinc-500/60 transition-all duration-200 cursor-pointer"
                            title="Klik untuk menyalin kode"
                        >
                            <span className="font-mono text-2xl font-extrabold tracking-[0.3em] text-white">
                                { formattedCode }
                            </span>
                            <i className={ `${codeCopied ? 'fas fa-check text-green-400' : 'far fa-copy text-zinc-400 group-hover:text-zinc-200'} transition-colors text-sm` } />
                        </button>
                        { codeCopied && (
                            <span className="text-xs text-green-400 animate-pulse">Kode disalin!</span>
                        ) }
                    </div>

                    {/*PK: Progress bar */ }
                    <div className="w-full px-1">
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
                            <span>Pemain bergabung</span>
                            <span className="font-mono">
                                <span className="text-white font-bold">{ joinedCount }</span>/{ totalSlots }
                            </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-[#8b2030] to-[#c9586a] transition-all duration-500 ease-out"
                                style={ { width: `${Math.min((joinedCount / totalSlots) * 100, 100)}%` } }
                            />
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-zinc-300">
                            <i className="fas fa-users mr-2 text-zinc-500" />
                            Daftar Pemain
                        </h2>
                        <span className="text-xs text-zinc-500">{ joinedCount } pemain</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <PlayerCard player={ liveOwner } isOwnerRole />

                        { isOwner || liveIsPlayer ? (
                            <>
                                {/*PK: Players - hanya terlihat oleh owner atau pemain yang sudah join */ }
                                { livePlayers.map(player => (
                                    <PlayerCard
                                        key={ player.id }
                                        player={ player }
                                        canKick={ isOwner }
                                        onKick={ handleKickPlayer }
                                        isKicking={ kickingId === player.id }
                                    />
                                )) }

                                {/* Empty Slots */ }
                                { joinedCount < totalSlots && (
                                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-dashed border-zinc-700/40 opacity-40">
                                        <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
                                            <i className="fas fa-user-plus text-xs text-zinc-600" />
                                        </div>
                                        <span className="text-sm text-zinc-600 italic">
                                            { totalSlots - joinedCount } slot tersisa
                                        </span>
                                    </div>
                                ) }
                            </>
                        ) : (
                            /*PK: hanya tampilkan jumlah pemain untuk nonjoin*/
                            joinedCount > 0 && (
                                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-hl-primary/30 border border-zinc-700/20">
                                    <div className="w-9 h-9 rounded-full bg-zinc-700/60 flex items-center justify-center">
                                        <i className="fas fa-user-group text-xs text-zinc-400" />
                                    </div>
                                    <span className="text-sm text-zinc-400">
                                        { joinedCount } pemain sudah bergabung
                                    </span>
                                </div>
                            )
                        ) }
                    </div>
                </div>

                { room.roleConfig && (
                    <div className="glass-card">
                        <div className="flex items-center mb-3">
                            <h2 className="text-sm font-semibold text-zinc-300">
                                <i className="fas fa-shield-halved mr-2 text-zinc-500" />
                                Konfigurasi Role
                            </h2>
                        </div>
                        <RoleConfigSummary config={ room.roleConfig } />
                    </div>
                ) }

                {/*PK: Tombol Aksi */ }
                <div className="glass-card">
                    { isOwner ? (
                        <div className="flex flex-col gap-3">
                            <PrimaryButton
                                className="w-full"
                                disabled={ joinedCount < 1 }
                                title={ joinedCount < 1 ? "Nunggu setidaknya 1 pemain bergabung" : "Mulai permainan" }
                            >
                                <i className="fas fa-play mr-2" />
                                Mulai Permainan
                            </PrimaryButton>
                            <DangerButton className="w-full">
                                <i className="fas fa-door-open mr-2" />
                                Bubarkan Room
                            </DangerButton>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 items-center">
                            { error && (
                                <p className="text-sm text-red-400 text-center bg-red-950/30 border border-red-700/30 rounded-lg px-3 py-2 w-full">
                                    <i className="fas fa-circle-exclamation mr-1.5" />
                                    { error }
                                </p>
                            ) }
                            { liveIsPlayer ? (
                                <>
                                    <p className="text-sm text-zinc-400 text-center">
                                        <i className="fas fa-clock mr-1.5 text-amber-500/70" />
                                        Menunggu moderator memulai permainan...
                                    </p>
                                    <DangerButton className="w-full" onClick={ handleLeaveRoom } disabled={ isPending }>
                                        <i className={ `${isPending ? 'fas fa-spinner fa-spin' : 'fas fa-right-from-bracket'} mr-2` } />
                                        { isPending ? 'Memproses...' : 'Keluar Room' }
                                    </DangerButton>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm text-zinc-400 text-center mb-1">
                                        Kamu belum bergabung ke room ini.
                                    </p>
                                    <PrimaryButton className="w-full" onClick={ handleJoinRoom } disabled={ isPending }>
                                        <i className={ `${isPending ? 'fas fa-spinner fa-spin' : 'fas fa-right-to-bracket'} mr-2` } />
                                        { isPending ? 'Bergabung...' : 'Gabung Room' }
                                    </PrimaryButton>
                                </>
                            ) }
                        </div>
                    ) }
                </div>
            </div>
        </div>
    );
}
