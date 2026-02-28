import MainContainer from "@c/MainContainer";
import Link from "next/link";

export default function ReportPage() {
    return (
        <MainContainer>
            <div className="w-full max-w-2xl mx-auto pt-16 sm:pt-24 pb-8 flex flex-col items-center gap-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center">Laporan</h1>
                <div
                    className="auth-card w-full max-w-lg bg-glass/85 border border-glass-border/60 shadow-[0_8px_32px_-8px] shadow-black/30"
                >
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                        Menemukan bug atau ingin melaporkan masalah? Saat ini, seluruh laporan ditangani melalui <strong className="text-zinc-100">GitHub Issues</strong>.
                        Silakan buat issue baru dengan label <code className="bg-white/[0.06] px-1.5 py-0.5 rounded text-rose-300 text-xs font-mono">bug</code> untuk melaporkan masalah yang Anda temukan.
                    </p>
                    <a
                        href="https://github.com/PencariKode/howly/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 mx-auto px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 transition-all duration-200"
                    >
                        <i className="fas fa-arrow-up-right-from-square text-xs" />
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
