import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPawClaws } from "@fortawesome/pro-solid-svg-icons";
import { faGhost } from "@fortawesome/pro-light-svg-icons";

export default function NotFound() {
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

            <div className="auth-card relative z-10 w-full max-w-md text-center">
                <div className="flex flex-col items-center gap-5">
                    <div className="relative">
                        <FontAwesomeIcon
                            icon={ faGhost }
                            className="text-7xl text-zinc-600 animate-[auth-float_3s_ease-in-out_infinite]"
                        />
                    </div>
                    <h1
                        className="text-8xl font-black tracking-tighter bg-clip-text text-transparent select-none"
                        style={ { backgroundImage: 'linear-gradient(135deg, #6b1525, #a63445, #c94d5e)' } }>
                        404
                    </h1>

                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-xl font-bold text-zinc-200">Halaman Tidak Ditemukan</h2>
                        <p className="text-sm text-zinc-500">
                            Sepertinya halaman yang kamu cari sudah ditelan oleh <em className="text-zinc-400">werewolf</em>.
                        </p>
                    </div>

                    <Link href="/" className="auth-submit-btn mt-2 w-full max-w-xs flex items-center justify-center gap-2 no-underline">
                        <FontAwesomeIcon icon={ faPawClaws } className="text-sm" />
                        Kembali ke Home
                    </Link>

                    <p className="text-xs text-zinc-600 mt-1">
                        Howly — Werewolf Online
                    </p>
                </div>
            </div>
        </div>
    );
}
