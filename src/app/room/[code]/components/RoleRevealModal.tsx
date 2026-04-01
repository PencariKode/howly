'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { roles as roleDefinitions } from "@l/roles";

interface RoleRevealModalProps {
    roleName: string;
    onDismiss: () => void;
}

export default function RoleRevealModal({ roleName, onDismiss }: RoleRevealModalProps) {
    const [phase, setPhase] = useState<'entering' | 'visible' | 'exiting'>('entering');

    const roleInfo = roleDefinitions.find(
        r => r.name.toLowerCase() === roleName ||
            r.name.toLowerCase().replace('dark werewolf', 'blackwolf') === roleName
    );

    const displayMap: Record<string, { name: string; image: string; side: 'manusia' | 'werewolf' }> = {
        warga: { name: 'Warga', image: '/icons/icon_ww_warga.png', side: 'manusia' },
        peramal: { name: 'Peramal', image: '/icons/icon_ww_peramal.png', side: 'manusia' },
        penyihir: { name: 'Penyihir', image: '/icons/icon_ww_penyihir.png', side: 'manusia' },
        dukun: { name: 'Dukun', image: '/icons/icon_ww_dukun.png', side: 'manusia' },
        raja: { name: 'Raja', image: '/icons/icon_ww_raja.png', side: 'manusia' },
        pemburu: { name: 'Pemburu', image: '/icons/icon_ww_warga.png', side: 'manusia' },
        werewolf: { name: 'Werewolf', image: '/icons/icon_ww_werewolf.png', side: 'werewolf' },
        blackwolf: { name: 'Dark Werewolf', image: '/icons/icon_ww_darkwerewolf.png', side: 'werewolf' },
        shapeshifter: { name: 'Shapeshifter', image: '/icons/icon_ww_shapeshifter.png', side: 'werewolf' },
    };

    const display = displayMap[roleName] || { name: roleName, image: '/icons/icon_ww_warga.png', side: 'manusia' as const };
    const description = roleInfo?.desc || "Peranmu telah ditentukan. Mainkan dengan baik!";

    useEffect(() => {
        const timer = setTimeout(() => setPhase('visible'), 100);
        return () => clearTimeout(timer);
    }, []);

    function handleDismiss() {
        setPhase('exiting');
        setTimeout(onDismiss, 400);
    }

    const isWolf = display.side === 'werewolf';

    return (
        <div className={ `fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-500 ${phase === 'entering' ? 'bg-black/0' : phase === 'exiting' ? 'bg-black/0' : 'bg-black/80'
            }` }>
            <div className={ `glass-card w-full max-w-sm border transition-all duration-500 ${isWolf ? 'border-red-700/50' : 'border-cyan-700/40'
                } ${phase === 'visible'
                    ? 'opacity-100 scale-100 translate-y-0'
                    : phase === 'entering'
                        ? 'opacity-0 scale-90 translate-y-8'
                        : 'opacity-0 scale-95 -translate-y-4'
                }` }>
                <div className={ `absolute inset-x-0 -top-px h-px ${isWolf
                    ? 'bg-gradient-to-r from-transparent via-red-500/60 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent'
                    }` } />

                <div className="flex flex-col items-center gap-4 text-center">
                    <div className={ `relative w-24 h-24 rounded-full flex items-center justify-center ${isWolf
                        ? 'bg-gradient-to-br from-red-950/60 to-red-900/30 border-2 border-red-700/40 shadow-[0_0_30px_rgba(220,38,38,0.2)]'
                        : 'bg-gradient-to-br from-cyan-950/60 to-cyan-900/30 border-2 border-cyan-700/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                        }` }>
                        <Image
                            src={ display.image }
                            alt={ display.name }
                            width={ 56 }
                            height={ 56 }
                            className="object-contain"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className={ `text-[0.65rem] font-bold uppercase tracking-[0.2em] ${isWolf ? 'text-red-400/70' : 'text-cyan-400/70'
                            }` }>
                            Rolemu adalah
                        </span>
                        <h2 className={ `text-2xl font-extrabold ${isWolf ? 'text-red-400' : 'text-cyan-300'}` }>
                            { display.name }
                        </h2>
                        <span className={ `text-[0.7rem] font-medium ${isWolf ? 'text-red-500/60' : 'text-cyan-500/60'
                            }` }>
                            Tim { isWolf ? 'Werewolf 🐺' : 'Manusia 👥' }
                        </span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed max-h-28 overflow-y-auto hl-scrollbar">
                        { description }
                    </p>

                    <button
                        onClick={ handleDismiss }
                        className={ `w-full mt-2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer ${isWolf
                            ? 'bg-gradient-to-br from-red-800/60 to-red-700/40 border border-red-600/40 text-red-200 hover:from-red-700/70 hover:to-red-600/50'
                            : 'bg-gradient-to-br from-cyan-800/50 to-cyan-700/30 border border-cyan-600/40 text-cyan-200 hover:from-cyan-700/60 hover:to-cyan-600/40'
                            }` }
                    >
                        <i className="fas fa-eye mr-2" />
                        Mengerti, Lanjutkan
                    </button>

                    <p className="text-[0.6rem] text-zinc-600">
                        <i className="fas fa-lock mr-1" />
                        Jangan beritahu siapapun rolemu
                    </p>
                </div>
            </div>
        </div>
    );
}
