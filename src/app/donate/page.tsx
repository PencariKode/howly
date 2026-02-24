import MainContainer from "@c/MainContainer";
import Link from "next/link";

export default function DonatePage() {
    return (
        <MainContainer>
            <div className="w-full max-w-2xl mx-auto pt-16 sm:pt-24 pb-8 flex flex-col items-center gap-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white text-center">Donasi</h1>
                <div
                    className="w-full rounded-xl p-6 sm:p-8 flex flex-col gap-4 text-center"
                    style={ { background: 'rgba(25, 25, 35, 0.85)', border: '1px solid rgba(41, 41, 56, 0.6)', boxShadow: '0 8px 32px -8px rgba(0,0,0,0.3)' } }
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
