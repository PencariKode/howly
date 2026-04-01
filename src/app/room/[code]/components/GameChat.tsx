'use client';

export default function GameChat() {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto hl-scrollbar px-4 py-4">
                {/* System message */ }
                <div className="flex justify-center mb-4">
                    <span className="text-[0.65rem] text-zinc-500 bg-zinc-800/50 px-3 py-1 rounded-full">
                        <i className="fas fa-shield-halved mr-1.5 text-zinc-600" />
                        Permainan telah dimulai
                    </span>
                </div>

                {/* Placeholder */ }
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <div className="w-16 h-16 rounded-full bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center">
                        <i className="fas fa-comments text-2xl text-zinc-600" />
                    </div>
                    <p className="text-sm text-zinc-500 text-center">
                        Fitur chat akan segera hadir
                    </p>
                    <p className="text-[0.65rem] text-zinc-600 text-center max-w-[200px]">
                        Gunakan chat ini untuk berdiskusi dengan pemain lain selama permainan
                    </p>
                </div>
            </div>

            {/* Chat input (dummy) */ }
            <div className="border-t border-zinc-700/30 px-4 py-3">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Chat segera hadir..."
                        disabled
                        className="flex-1 base-input py-2 text-sm opacity-50 cursor-not-allowed"
                    />
                    <button
                        disabled
                        className="shrink-0 w-9 h-9 rounded-lg bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center text-zinc-600 cursor-not-allowed"
                    >
                        <i className="fas fa-paper-plane text-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
}
