'use client';

import { useEffect, useState } from "react";
import DangerButton from "@c/Buttons/Danger";

export default function KickedNotify({ roomCode }: { roomCode?: string }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('kicked') === '1') {
            setIsOpen(true);
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-6 mx-4 max-w-sm w-full flex flex-col items-center gap-4 animate-[scaleIn_0.2s_ease-out]">
                <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center">
                    <i className="fa-solid fa-user-slash text-red-500 text-2xl"></i>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-1">Anda Telah Ditendang</h3>
                    <p className="text-xs text-zinc-400">
                        Maaf, Anda telah ditendang dari room {roomCode ? <span className="text-red-400 font-mono">[{roomCode}]</span> : 'tersebut'} oleh moderator. 
                        Anda tidak dapat bergabung kembali selama 1 menit.
                    </p>
                </div>
                <DangerButton className="w-full mt-1" onClick={() => setIsOpen(false)}>
                    Mengerti
                </DangerButton>
            </div>
        </div>
    );
}
