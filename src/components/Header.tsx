import Link from "next/link";
import {useUIStore} from "@/stores/uiStore";

export default function Header() {

    // const isScreenScrolled = useUIStore(state => state.isScreenScrolled);
    const isHeaderOpen = useUIStore(state => state.isHeaderOpen);
    const isScreenScrolled = useUIStore(state => state.isScreenScrolled);

    return (
        <header className={`flex items-center justify-center px-4 min-h-16 max-h-18 minMaxWidth text-hl-text ${isScreenScrolled ? 'bg-hl-primary h-16' : 'h-18 bg-transparent'} sticky top-0 !z-50 transition-all duration-500 ${isHeaderOpen ? 'opacity-100 translate-0' : 'opacity-0 -translate-y-16'}`}>
            <Link href="/" className="flex items-center justify-center gap-2 text-[1.6rem]">
                <i className={`fa-solid fa-paw-claws text-xl flex items-center justify-center pb-[1px]`}></i>
                <h1 className="font-extrabold">Howly</h1>
            </Link>
            <nav className="hidden md:flex">
                <ul className="flex space-x-4">
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/about" className="hover:underline">About</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};