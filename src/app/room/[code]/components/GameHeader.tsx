'use client';

import { useState, useEffect } from "react";

interface GameHeaderProps {
    startedAt: string;
    isPaused: boolean;
    pausedAt: string | null;
    totalPausedMs: number;
    aliveCount: number;
    totalCount: number;
    roomName: string;
    isOwner: boolean;
    onEndGame: () => void;
}

function formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function GameHeader({
    startedAt,
    isPaused,
    pausedAt,
    totalPausedMs,
    aliveCount,
    totalCount,
    roomName,
    isOwner,
    onEndGame,
}: GameHeaderProps) {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const startTime = new Date(startedAt).getTime();

        const updateElapsed = () => {
            const now = Date.now();

            //PK: waktu yang dipause saat ini (jika sedang pause)
            const currentPauseMs = isPaused && pausedAt
                ? now - new Date(pausedAt).getTime()
                : 0;

            //PK: total elapsed = waktu sejak start - total pause - pause saat ini
            const totalElapsed = now - startTime - totalPausedMs - currentPauseMs;
            setElapsed(Math.max(0, totalElapsed));
        };

        updateElapsed();

        const interval = setInterval(updateElapsed, 1000);
        return () => clearInterval(interval);
    }, [startedAt, isPaused, pausedAt, totalPausedMs]);

    return (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-hl-primary/70 border border-zinc-700/30">
            <div className="flex items-center gap-3 min-w-0">
                <div className={ `w-2.5 h-2.5 rounded-full shrink-0 ${isPaused
                    ? 'bg-amber-500 animate-pulse'
                    : 'bg-green-500'
                    }` } />
                <div className="flex flex-col min-w-0">
                    <h1 className="text-sm font-bold text-white truncate">{ roomName }</h1>
                    <span className={ `text-[0.65rem] font-medium ${isPaused ? 'text-amber-400' : 'text-green-400/80'}` }>
                        { isPaused ? (
                            <><i className="fas fa-pause mr-1" />Jeda — Moderator Offline</>
                        ) : (
                            <><i className="fas fa-circle-play mr-1" />Permainan Aktif</>
                        ) }
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4 shrink-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/30">
                    <i className="fas fa-heart text-red-400 text-[0.65rem]" />
                    <span className="text-xs font-mono text-zinc-300">
                        <span className="text-white font-bold">{ aliveCount }</span>
                        <span className="text-zinc-500">/{ totalCount }</span>
                    </span>
                </div>

                <div className={ `flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${isPaused
                    ? 'bg-amber-950/30 border-amber-700/30'
                    : 'bg-zinc-800/60 border-zinc-700/30'
                    }` }>
                    <i className={ `fas fa-stopwatch text-[0.65rem] ${isPaused ? 'text-amber-400' : 'text-zinc-400'}` } />
                    <span className={ `text-sm font-mono font-bold tracking-wider ${isPaused ? 'text-amber-300' : 'text-white'}` }>
                        { formatDuration(elapsed) }
                    </span>
                </div>

                {/*PK: btn end game (moderator)*/ }
                { isOwner && (
                    <button
                        onClick={ onEndGame }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-700/30 text-red-400 text-xs font-medium cursor-pointer transition-all duration-200 hover:bg-red-900/50 hover:border-red-600/40"
                        title="Akhiri Permainan"
                    >
                        <i className="fas fa-flag-checkered text-[0.65rem]" />
                        <span className="hidden sm:inline">Akhiri</span>
                    </button>
                ) }
            </div>
        </div>
    );
}
