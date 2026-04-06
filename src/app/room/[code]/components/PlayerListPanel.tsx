'use client';

import { useState } from "react";
import Image from "next/image";
import { GamePlayerData } from "@/types/room";
import RoleRevealModal from "./RoleRevealModal";

interface PlayerListPanelProps {
    players: GamePlayerData[];
    isOwner: boolean;
    currentUserId: string;
    owner: { id: string; name: string | null; image: string | null };
    onKillPlayer?: (playerId: string, playerName: string) => void;
    setShowRoleModal: (state: boolean) => void;
    setRoleModalInfo: (info: string | null) => void;
}

function PlayerAvatar({ name, image, isAlive, isOnline }: {
    name: string | null;
    image: string | null;
    isAlive: boolean;
    isOnline: boolean;
}) {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div className={ `relative shrink-0 w-9 h-9 ${!isAlive ? 'opacity-40 grayscale' : ''}` }>
            { image ? (
                <>
                    { !imgLoaded && (
                        <div className="absolute inset-0 rounded-full bg-zinc-700 animate-pulse" />
                    ) }
                    <Image
                        src={ image }
                        alt={ name || "Player" }
                        width={ 36 }
                        height={ 36 }
                        className={ `rounded-full object-cover w-9 h-9 transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}` }
                        onLoad={ () => setImgLoaded(true) }
                    />
                </>
            ) : (
                <div className="w-full h-full rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300">
                    { Array.from(name || "?")[0].toUpperCase() }
                </div>
            ) }
            <span className={ `absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#14141c] ${isOnline ? 'bg-green-500' : 'bg-zinc-600'
                }` } />
        </div>
    );
}

function getRoleDisplayInfo(roleName: string) {
    const roleMap: Record<string, { label: string; icon: string; side: 'manusia' | 'werewolf' }> = {
        warga: { label: 'Warga', icon: '/icons/icon_ww_warga.png', side: 'manusia' },
        peramal: { label: 'Peramal', icon: '/icons/icon_ww_peramal.png', side: 'manusia' },
        penyihir: { label: 'Penyihir', icon: '/icons/icon_ww_penyihir.png', side: 'manusia' },
        dukun: { label: 'Dukun', icon: '/icons/icon_ww_dukun.png', side: 'manusia' },
        raja: { label: 'Raja', icon: '/icons/icon_ww_raja.png', side: 'manusia' },
        pemburu: { label: 'Pemburu', icon: '/icons/icon_ww_warga.png', side: 'manusia' },
        werewolf: { label: 'Werewolf', icon: '/icons/icon_ww_werewolf.png', side: 'werewolf' },
        blackwolf: { label: 'Dark Werewolf', icon: '/icons/icon_ww_darkwerewolf.png', side: 'werewolf' },
        shapeshifter: { label: 'Shapeshifter', icon: '/icons/icon_ww_shapeshifter.png', side: 'werewolf' },
    };
    return roleMap[roleName] || { label: roleName, icon: '/icons/icon_ww_warga.png', side: 'manusia' as const };
}

function handleRoleInfoClick({ setShowRoleModal, roleInfo, setRoleModalInfo }: {setShowRoleModal: (state: boolean) => void; roleInfo: string | null, setRoleModalInfo: (info: string | null) => void }) {
    setRoleModalInfo(roleInfo);
    setShowRoleModal(true);
}

function GamePlayerCard({ player, isCurrentUser, forceShowRole, onKillPlayer, setShowRoleModal, setRoleModalInfo }: {
    player: GamePlayerData;
    isCurrentUser: boolean;
    forceShowRole: boolean;
    onKillPlayer?: (id: string, name: string) => void;
    setShowRoleModal: (state: boolean) => void;
    setRoleModalInfo: (info: string | null) => void;
}) {
    const roleInfo = player.role ? getRoleDisplayInfo(player.role) : null;
    const showRole = player.role !== null && (forceShowRole || !player.isAlive || isCurrentUser);

    return (
        <>
            <div className={ `flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 ${!player.isAlive
                ? 'bg-zinc-900/60 border-zinc-800/50 opacity-70'
                : isCurrentUser
                    ? 'bg-indigo-950/30 border-indigo-700/30'
                    : 'bg-hl-primary/50 border-zinc-700/30 hover:border-zinc-600/50'
                }` }>
                <div className="flex items-center gap-3 overflow-hidden">
                    <PlayerAvatar
                        name={ player.name }
                        image={ player.image }
                        isAlive={ player.isAlive }
                        isOnline={ player.isOnline }
                    />
                    <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                            <span className={ `text-sm font-medium truncate ${!player.isAlive ? 'line-through text-zinc-500' : 'text-zinc-200'}` }>
                                { player.name || "Anonim" }
                            </span>
                            { isCurrentUser && (
                                <span className="text-[0.6rem] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-medium">
                                    Kamu
                                </span>
                            ) }
                        </div>
                        <div className="flex items-center gap-1.5">
                            { !player.isAlive ? (
                                <span className="text-[0.65rem] text-red-400/80 flex items-center gap-1">
                                    <i className="fas fa-skull text-[0.55rem]" />
                                    Mati
                                </span>
                            ) : !player.isOnline ? (
                                <span className="text-[0.65rem] text-amber-400/80 flex items-center gap-1">
                                    <i className="fas fa-wifi text-[0.55rem]" />
                                    Offline
                                </span>
                            ) : (
                                <span className="text-[0.65rem] text-green-400/80">
                                    Online
                                </span>
                            ) }
                        </div>
                    </div>
                </div>

                <div className="shrink-0">
                    { showRole && roleInfo ? (
                        <button onClick={ () => handleRoleInfoClick({setShowRoleModal, roleInfo: player.role, setRoleModalInfo }) } className={ `inline-flex items-center cursor-pointer gap-1 px-2 py-1 rounded-md text-[0.65rem] font-semibold border ${roleInfo.side === 'werewolf'
                            ? 'bg-red-950/50 border-red-700/40 text-red-400'
                            : 'bg-cyan-950/40 border-cyan-700/30 text-cyan-400'
                            }` }>
                            { roleInfo.label }
                        </button>
                    ) : (
                        <button disabled className="inline-flex items-center px-2 py-1 rounded-md text-[0.65rem] font-semibold bg-zinc-800/60 border border-zinc-700/30 text-zinc-500">
                            ???
                        </button>
                    ) }
                    { onKillPlayer && player.isAlive && !isCurrentUser && (
                        <button
                            onClick={ (e) => {
                                e.stopPropagation();
                                onKillPlayer(player.id, player.name || "Anonim");
                            } }
                            className="ml-2 w-7 h-7 inline-flex items-center justify-center rounded bg-red-950/40 border border-red-800/50 text-red-500 hover:bg-red-900/60 hover:text-red-400 transition-all cursor-pointer"
                            title="Bunuh Pemain"
                        >
                            <i className="fas fa-skull text-xs" />
                        </button>
                    ) }
                </div>
            </div>
        </>
    );
}

export default function PlayerListPanel({ players, isOwner, currentUserId, owner, onKillPlayer, setShowRoleModal, setRoleModalInfo }: PlayerListPanelProps) {
    const [filter, setFilter] = useState<'all' | 'alive' | 'dead'>('all');
    const [showRoles, setShowRoles] = useState(false);

    const alivePlayers = players.filter(p => p.isAlive);
    const deadPlayers = players.filter(p => !p.isAlive);

    const filteredPlayers = filter === 'alive' ? alivePlayers : filter === 'dead' ? deadPlayers : players;

    //PK: sort players: diri sendiri muncul pertama (setelah moderator)
    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
        if (a.userId === currentUserId) return -1;
        if (b.userId === currentUserId) return 1;
        return 0;
    });

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-zinc-300">
                    <i className="fas fa-users mr-2 text-zinc-500" />
                    Pemain
                </h2>
                <div className="flex items-center gap-2">
                    {/*PK: Moderator toggle show/hide roles */ }
                    { isOwner && (
                        <button
                            onClick={ () => setShowRoles(!showRoles) }
                            className={ `text-[0.6rem] px-2 py-1 rounded-md font-medium transition-all duration-200 cursor-pointer border ${showRoles
                                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                                : 'bg-zinc-800/50 border-zinc-700/30 text-zinc-500 hover:text-zinc-300'
                                }` }
                            title={ showRoles ? "Sembunyikan role" : "Tampilkan role" }
                        >
                            <i className={ `fas ${showRoles ? 'fa-eye' : 'fa-eye-slash'} mr-1` } />
                            Role
                        </button>
                    ) }
                    <div className="flex items-center gap-1.5">
                        <span className="text-[0.65rem] text-green-400 font-mono">{ alivePlayers.length }</span>
                        <span className="text-[0.65rem] text-zinc-600">/</span>
                        <span className="text-[0.65rem] text-zinc-400 font-mono">{ players.length }</span>
                        <span className="text-[0.65rem] text-zinc-500">hidup</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-1 mb-3">
                { (['all', 'alive', 'dead'] as const).map(f => (
                    <button
                        key={ f }
                        onClick={ () => setFilter(f) }
                        className={ `flex-1 text-[0.65rem] py-1.5 rounded-md font-medium transition-all duration-200 cursor-pointer ${filter === f
                            ? 'bg-zinc-700/60 text-zinc-200 border border-zinc-600/50'
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40 border border-transparent'
                            }` }
                    >
                        { f === 'all' ? 'Semua' : f === 'alive' ? `Hidup (${alivePlayers.length})` : `Mati (${deadPlayers.length})` }
                    </button>
                )) }
            </div>

            {/*PK: moderator */ }
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-amber-950/20 border border-amber-700/20 mb-2">
                <div className="relative shrink-0 w-9 h-9">
                    { owner.image ? (
                        <Image src={ owner.image } alt={ owner.name || "Moderator" } width={ 36 } height={ 36 } className="rounded-full object-cover w-9 h-9" />
                    ) : (
                        <div className="w-full h-full rounded-full bg-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300">
                            { (owner.name || "?")[0].toUpperCase() }
                        </div>
                    ) }
                    <span className="absolute z-10 -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[0.55rem] text-black" title="Moderator">
                        <i className="fas fa-crown" />
                    </span>
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-zinc-200 truncate">{ owner.name || "Anonim" }</span>
                    <span className="text-[0.65rem] text-amber-500/70">Moderator</span>
                </div>
            </div>

            {/*PK: player list*/ }
            <div className="flex flex-col gap-1.5 overflow-y-auto hl-scrollbar flex-1">
                { sortedPlayers.length === 0 ? (
                    <div className="text-center py-6 text-zinc-600 text-sm">
                        <i className="fas fa-ghost text-2xl mb-2 block" />
                        { filter === 'dead' ? 'Belum ada yang mati' : 'Tidak ada pemain' }
                    </div>
                ) : (
                    sortedPlayers.map(player => (
                        <GamePlayerCard
                            key={ player.id }
                            player={ player }
                            isCurrentUser={ player.userId === currentUserId }
                            forceShowRole={ isOwner && showRoles }
                            onKillPlayer={ isOwner ? onKillPlayer : undefined }
                            setShowRoleModal={setShowRoleModal}
                            setRoleModalInfo={setRoleModalInfo}
                        />
                    ))
                ) }
            </div>
        </div>
    );
}
