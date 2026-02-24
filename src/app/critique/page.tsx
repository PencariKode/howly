import MainContainer from "@c/MainContainer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/pro-solid-svg-icons";

export default function CritiquePage() {
    return (
        <MainContainer>
            <div className="w-full max-w-2xl mx-auto pt-16 sm:pt-24 pb-8 flex flex-col items-center gap-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center">Kritik dan Saran</h1>
                <div
                    className="w-full rounded-xl p-6 sm:p-8 flex flex-col gap-4 text-center"
                    style={ { background: 'rgba(25, 25, 35, 0.85)', border: '1px solid rgba(41, 41, 56, 0.6)', boxShadow: '0 8px 32px -8px rgba(0,0,0,0.3)' } }
                >
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                        Saat ini, seluruh kritik dan saran untuk pengembangan Howly dilakukan melalui <strong className="text-zinc-100">GitHub Issues</strong>.
                        Silakan buat issue baru dengan label <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-rose-300 text-xs font-mono">feedback</code> untuk menyampaikan masukan Anda.
                    </p>
                    <a
                        href="https://github.com/PencariKode/howly/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 mx-auto px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={ faArrowUpRightFromSquare } className="text-xs" />
                        Buka GitHub Issues
                    </a>
                </div>
                <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
                    Kembali ke Beranda
                </Link>
            </div>
        </MainContainer>
    );
}
