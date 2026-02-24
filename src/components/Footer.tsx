import Link from "next/link";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";


export default function Footer() {
    const { status } = useSession();

    return (
        <footer className="minMaxWidth">
            <div className="bg-hl-secondary text-hl-text py-4 text-center pb-22 sm:pb-1 px-5 h-fit">
                <p className="text-xs pb-3">
                    Made with <FontAwesomeIcon icon={ faHeart } className="text-red-500" /> by <a target="_blank"
                        href="https://github.com/PencariKode">PencariKode</a>
                </p>
                <div style={ { borderTopWidth: '0.5px' } }
                    className=" border-t-neutral-50/20 items-start flex flex-wrap justify-between gap-5 font-extralight  minMaxWidth pt-3 text-xs px-2 sm:px-10 md:justify-start md:gap-10 sm:py-5 text-hl-text/70">
                    <div className="flex flex-col min-w-25 w-fit items-start *:hover:underline *:hover:font-normal">
                        {/*<a href="https://github.com/PencariKode">PencariKode</a>*/ }
                        <Link href="/about">Tentang</Link>
                        <Link href={ status === "authenticated" ? "/profile" : "/login" }>Akun</Link>
                        <Link href="/contact">Kontak</Link>
                        <Link href="/faq">FAQ</Link>
                    </div>
                    <div className="flex flex-col min-w-25 w-fit items-start *:hover:underline *:hover:font-normal">
                        <Link href="/help">Bantuan</Link>
                        <Link href="/contribution">Contribution</Link>
                        <Link href="/tos">Terms of Service</Link>
                        <Link href="/privacy">Kebijakan Privasi</Link>
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