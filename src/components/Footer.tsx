import Link from "next/link";
import { useSession } from "next-auth/react";
import "../../public/fontawesome/css/etch-solid.css";
import { useUIStore } from "@/stores/uiStore";


export default function Footer() {
    const { status } = useSession();
    const isInActiveRoom = useUIStore(state => state.isInActiveRoom);

    if (isInActiveRoom) return null;

    return (
        <footer className="minMaxWidth">
            <div className={ `bg-hl-secondary text-hl-text py-4 text-center pb-22 sm:pb-1 px-5 h-fit` }>
                <p className="text-xs pb-3">
                    Made with <i className="fa-solid fa-heart fa-bounce text-red-500"></i> and <i className="fa-etch fa-solid fa-laptop fa-beat text-cyan-700"></i> by <a target="_blank"
                        href="https://github.com/PencariKode">PencariKode</a>
                </p>
                <div style={ { borderTopWidth: '0.5px' } }
                    className=" border-t-neutral-50/20 items-start flex flex-wrap justify-between gap-5 font-extralight  minMaxWidth pt-3 text-xs px-2 sm:px-10 md:justify-start md:gap-10 sm:py-5 text-hl-text/70">
                    <div className="flex flex-col min-w-25 w-fit items-start *:hover:underline *:hover:font-normal">
                        <Link href="/docs#about">Tentang</Link>
                        <Link href={ status === "authenticated" ? "/profile" : "/login" }>Akun</Link>
                        <Link href="/docs#contact">Kontak</Link>
                        <Link href="/docs#faq">FAQ</Link>
                    </div>
                    <div className="flex flex-col min-w-25 w-fit items-start *:hover:underline *:hover:font-normal">
                        <Link href="/help">Bantuan</Link>
                        <Link href="/docs/contributing">Contributing</Link>
                        <Link href="/docs/tos">Terms of Service</Link>
                        <Link href="/docs/privacy">Kebijakan Privasi</Link>
                    </div>
                    <div className="flex flex-col min-w-25 w-fit items-start *:hover:underline *:hover:font-normal">
                        <Link href="/critique">Kritik dan Saran</Link>
                        <Link href="/report">Laporan</Link>
                        <Link href="/donate">Donasi</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
