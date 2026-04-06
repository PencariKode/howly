'use client';

import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { GameRoomProps, GameSessionData, RoomPlayer } from "@/types/room";
import { useUIStore } from "@/stores/uiStore";
import { endGameAction, killPlayerAction } from "./actions";
import GameHeader from "./components/GameHeader";
import PlayerListPanel from "./components/PlayerListPanel";
import RoleRevealModal from "./components/RoleRevealModal";
import GameChat from "./components/GameChat";
import DangerButton from "@c/Buttons/Danger";
import OutlineButton from "@c/Buttons/Outline";

export default function GameRoom({
    room,
    gameSession: initialSession,
    currentUserId,
    currentPlayerRole,
    isOwner,
}: GameRoomProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const setInActiveRoom = useUIStore(state => state.setInActiveRoom);
    const setActiveRoomCode = useUIStore(state => state.setActiveRoomCode);

    // PK: Live state dari SSE
    const [liveSession, setLiveSession] = useState<GameSessionData>(initialSession);
    const [liveOwner, setLiveOwner] = useState<RoomPlayer>(room.owner);
    const [showRoleModal, setShowRoleModal] = useState(!!currentPlayerRole);
    const [roleModalInfo, setRoleModalInfo] = useState(currentPlayerRole);
    const [showPlayerList, setShowPlayerList] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);
    const [playerToKill, setPlayerToKill] = useState<{ id: string; name: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Dynamic header height measurement
    const [headerHeight, setHeaderHeight] = useState(80);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!headerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setHeaderHeight(entry.target.clientHeight);
            }
        });
        resizeObserver.observe(headerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // PK: SSE connection untuk game events
    useEffect(() => {
        let eventSource: EventSource | null = null;
        let reconnectTimer: ReturnType<typeof setTimeout>;

        function connect() {
            eventSource = new EventSource(`/api/room/${room.code}/game/events`);

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    if (data.status === "DISBANDED") {
                        setInActiveRoom(false);
                        setActiveRoomCode(null);
                        document.cookie = "active_room_hint=; path=/; max-age=0";
                        router.push("/?disbanded=1");
                        return;
                    }

                    if (data.status === "ENDED") {
                        setInActiveRoom(false);
                        setActiveRoomCode(null);
                        document.cookie = "active_room_hint=; path=/; max-age=0";
                        router.push("/?ended=1");
                        return;
                    }

                    if (data.gameSession) {
                        setLiveSession(data.gameSession);
                    }
                    if (data.owner) {
                        setLiveOwner(data.owner);
                    }
                } catch (error) {
                    console.error("Error processing game event:", error);
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
    }, [room.code, currentUserId, isOwner, router, setInActiveRoom, setActiveRoomCode]);

    // PK: Sync status aktif room ke uiStore
    useEffect(() => {
        setInActiveRoom(true);
        setActiveRoomCode(room.code);
    }, [room.code, setInActiveRoom, setActiveRoomCode]);

    // PK: Sync props saat server component rerender
    useEffect(() => {
        setLiveSession(initialSession);
    }, [initialSession]);

    const alivePlayers = liveSession.players.filter(p => p.isAlive);

    function handleEndGame() {
        setError(null);
        startTransition(async () => {
            const res = await endGameAction(room.code);
            if (res?.error) {
                setError(res.error);
                setShowEndModal(false);
            }
        });
    }

    function handleKillPlayer() {
        if (!playerToKill) return;
        setError(null);
        startTransition(async () => {
            const res = await killPlayerAction(room.code, playerToKill.id);
            setPlayerToKill(null);
            if (res?.error) setError(res.error);
        });
    }

    //PK: fix stuck — paksa keluar dari room jika user terjebak
    function handleFixStuck() {
        setInActiveRoom(false);
        setActiveRoomCode(null);
        document.cookie = "active_room_hint=; path=/; max-age=0";
        document.cookie = "active_room=; path=/; max-age=0";
        window.location.href = "/";
    }

    return (
        <div className="flex min-h-screen bg-hl-bg">
            <div className="pointer-events-none fixed inset-0 z-0"
                style={{
                    background: `
                        radial-gradient(ellipse 40% 50% at 0% 0%, rgba(107,21,37,0.25) 0%, transparent 70%),
                        radial-gradient(ellipse 40% 50% at 100% 100%, rgba(139,32,48,0.18) 0%, transparent 70%),
                        radial-gradient(ellipse 30% 40% at 100% 50%, rgba(166,52,69,0.15) 0%, transparent 70%)
                    `
                }}
            />

            {/*PK: main */}
            <div className="relative z-10 flex flex-col lg:flex-row w-full h-screen pt-14 sm:pt-24">

                {/*PK: chat */}
                <div className="flex flex-col flex-1 min-w-0 h-full">
                    {/*PK: header game */}
                    <div className="z-20 p-3 lg:p-4 bg-hl-bg border-b border-zinc-800/50 shrink-0">
                        <GameHeader
                            startedAt={liveSession.startedAt}
                            isPaused={liveSession.isPaused}
                            pausedAt={liveSession.pausedAt}
                            totalPausedMs={liveSession.totalPausedMs}
                            aliveCount={alivePlayers.length}
                            totalCount={liveSession.players.length}
                            roomName={room.name}
                            isOwner={isOwner}
                            onEndGame={() => setShowEndModal(true)}
                        />
                    </div>

                    {/*PK: chat */}
                    <div className="flex-1 min-h-0">
                        <GameChat />
                    </div>
                    {/*PK: btn player list */}
                    <div className="lg:hidden fixed bottom-4 right-4 z-30">
                        <button
                            onClick={() => setShowPlayerList(!showPlayerList)}
                            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6B1525] to-[#A63445] border border-rose-accent/40 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105"
                        >
                            <i className={`fas ${showPlayerList ? 'fa-xmark' : 'fa-users'} text-white`} />
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center text-[0.55rem] font-bold text-white">
                                {alivePlayers.length}
                            </span>
                        </button>
                    </div>
                </div>

                {/*PK: player list */}
                <div className={`
                    fixed lg:relative inset-y-0 right-0 z-20
                    w-80 lg:w-72 xl:w-80
                    bg-glass/95 lg:bg-glass/60
                    border-l lg:border-t border-zinc-700/30 lg:rounded-ss-xl
                    transform transition-transform duration-300 ease-in-out
                    ${showPlayerList ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                `}>
                    {showPlayerList && (
                        <div
                            className="fixed inset-0 bg-black/40 -z-10 lg:hidden"
                            onClick={() => setShowPlayerList(false)}
                        />
                    )}
                    <div className="h-full p-4 overflow-hidden flex flex-col">
                        <div className="flex-1 min-h-0 overflow-hidden">
                            <PlayerListPanel
                                players={liveSession.players}
                                isOwner={isOwner}
                                currentUserId={currentUserId}
                                owner={liveOwner}
                                onKillPlayer={(id, name) => setPlayerToKill({ id, name })}
                                setRoleModalInfo={setRoleModalInfo}
                                setShowRoleModal={setShowRoleModal}
                            />
                        </div>
                        <button
                            onClick={ handleFixStuck }
                            className="w-full text-center text-[0.7rem] text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer py-2 mt-2 shrink-0"
                            title="Gunakan jika halaman tidak responsif atau kamu terjebak di room ini"
                        >
                            <i className="fas fa-wrench mr-1" />
                            Fix Stuck
                        </button>
                    </div>
                </div>
            </div>

            {/*PK: modal role */}
            {showRoleModal && roleModalInfo && (
                <RoleRevealModal
                    roleName={roleModalInfo}
                    onDismiss={() => setShowRoleModal(false)}
                />
            )}

            {/*PK: modal end game */}
            {showEndModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="glass-card w-full max-w-sm border-red-700/40">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-1">
                                <i className="fas fa-flag-checkered text-2xl text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white">Akhiri Permainan?</h3>
                            <p className="text-sm text-zinc-400">
                                Apakah kamu yakin ingin mengakhiri permainan ini? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            {error && (
                                <p className="text-sm text-red-400 bg-red-950/30 border border-red-700/30 rounded-lg px-3 py-2 w-full">
                                    <i className="fas fa-circle-exclamation mr-1.5" />
                                    {error}
                                </p>
                            )}
                            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                                <OutlineButton
                                    onClick={() => setShowEndModal(false)}
                                    className="flex-1 justify-center"
                                    disabled={isPending}
                                >
                                    Batal
                                </OutlineButton>
                                <DangerButton
                                    onClick={handleEndGame}
                                    className="flex-1"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <><i className="fas fa-spinner fa-spin mr-2" /> Memproses...</>
                                    ) : (
                                        "Ya, Akhiri"
                                    )}
                                </DangerButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/*PK: modal kill player */}
            {playerToKill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="glass-card w-full max-w-sm border-red-700/40">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-1">
                                <i className="fas fa-skull text-2xl text-red-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Bunuh Pemain?</h3>
                            <p className="text-sm text-zinc-300">
                                Apakah kamu yakin ingin membunuh <span className="font-bold text-red-400">{playerToKill.name || "Anonim"}</span>?
                            </p>
                            {error && (
                                <p className="text-sm text-red-400 bg-red-950/30 border border-red-700/30 rounded-lg px-3 py-2 w-full">
                                    <i className="fas fa-circle-exclamation mr-1.5" />
                                    {error}
                                </p>
                            )}
                            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                                <OutlineButton
                                    onClick={() => {
                                        setPlayerToKill(null);
                                        setError(null);
                                    }}
                                    className="flex-1 justify-center"
                                    disabled={isPending}
                                >
                                    Batal
                                </OutlineButton>
                                <DangerButton
                                    onClick={handleKillPlayer}
                                    className="flex-1"
                                    disabled={isPending}
                                >
                                    {isPending ? (
                                        <><i className="fas fa-spinner fa-spin mr-2" /> Memproses...</>
                                    ) : (
                                        "Ya, Bunuh"
                                    )}
                                </DangerButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
