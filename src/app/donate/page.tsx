import MainContainer from "@c/MainContainer";
import Link from "next/link";

export default function DonatePage() {
    return (
        <MainContainer>
            <div className="w-full max-w-2xl mx-auto pt-16 sm:pt-24 pb-8 flex flex-col items-center gap-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center">Donasi</h1>
                <div
                    className="auth-card w-full max-w-lg bg-glass/85 border border-glass-border/60 shadow-[0_8px_32px_-8px] shadow-black/30"
                >
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                        Saat ini belum ada metode donasi yang tersedia. Kami akan menginformasikan apabila fitur donasi sudah dibuka di kemudian hari.
                    </p>
                    <p className="text-xs text-zinc-500">
                        Terima kasih atas niat baik Anda untuk mendukung pengembangan Howly.
                    </p>
                </div>
                <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200">
                    Kembali ke Beranda
                </Link>
            </div>
        </MainContainer>
    );
}
