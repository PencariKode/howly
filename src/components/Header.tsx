import Link from "next/link";
import {useUIStore} from "@/stores/uiStore";
import Image from "next/image";
import {useEffect, useRef} from "react";

export default function Header() {

    // const isScreenScrolled = useUIStore(state => state.isScreenScrolled);
    const isHeaderOpen = useUIStore(state => state.isHeaderOpen);
    const isScreenScrolled = useUIStore(state => state.isScreenScrolled);
    const isDropMenuOpen = useUIStore(state => state.isDropMenuOpen);
    const toggleDropMenu = useUIStore(state => state.toggleDropMenu);

    const menuBarRef = useRef<HTMLElement>(null);

    function handleDropMenu() { toggleDropMenu(!isDropMenuOpen) }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuBarRef.current && !menuBarRef.current.contains(event.target as Node)) return toggleDropMenu(false);
        };

        if (isDropMenuOpen) document.addEventListener('click', handleClickOutside);
        else document.removeEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, [isDropMenuOpen]);

    useEffect(() => {
        if (!isScreenScrolled) return toggleDropMenu(false);
    }, [isScreenScrolled]);

    return (
        <header className={`flex items-center justify-center px-4 min-h-14 max-h-18 group sm:max-h-24 minMaxWidth text-hl-text ${isScreenScrolled ? 'bg-hl-primary h-14 sm:h-18' : 'h-18 sm:h-24 bg-transparent'} sticky top-0 !z-50 transition-all duration-500 ${isHeaderOpen ? 'opacity-100 translate-0' : 'opacity-0 -translate-y-16'}`}>
            <div className={`flex items-center justify-center minMaxWidth relative`}>
                <div className={`absolute transition-all duration-700 left-10 hidden sm:flex`}>
                    <Image onClick={handleDropMenu} className={`${isScreenScrolled ? 'block' : 'hidden group-hover:block'} !aspect-square max-h-10 w-10 rounded-full cursor-pointer`} src={`/img/blankprofile.png`} alt={'PFP'} width={70} height={70} />
                    <nav ref={menuBarRef} className={`${isDropMenuOpen ? 'flex' : 'hidden'}  min-h-10 min-w-max pb-0.5 *:hover:bg-hl-primary/80 pt-1 px-2 *:px-3 *:py-1.5  font-extralight text-left bg-hl-tertiary/85  absolute left-5 top-[110%] rounded-b-sm rounded-tr-sm shadow-lg flex-col items-center justify-center divide-y-[.5px] divide-hl-text/20`}>
                        <Link href="/profile" className="w-full text-[.95rem] lg:text-base transition-all duration-300 flex items-center gap-2"><i className="fa-light w-5 flex items-center justify-center fa-user"></i> Profile</Link>
                        <Link href="/create" className="w-full text-[.95rem] lg:text-base transition-all duration-300 flex items-center gap-2"><i className="fa-light w-5 flex items-center justify-center fa-dna"></i> Create</Link>
                        <Link href="/join" className="w-full text-[.95rem] lg:text-base transition-all duration-300 flex items-center gap-2"><i className="fa-light w-5 flex items-center justify-center fa-chart-network"></i> Join</Link>
                        <Link href="/logout" className="w-full text-[.95rem] lg:text-base transition-all duration-300 flex items-center gap-2"><i className="fa-light w-5 flex items-center justify-center fa-person-to-door"></i> Logout</Link>
                    </nav>
                </div>
                <Link href="/" className="flex items-center justify-center gap-2 text-[1.6rem]">
                    <i className={`fa-solid fa-paw-claws text-xl flex items-center justify-center pb-[1px]`}></i>
                    <h1 className="font-extrabold">Howly</h1>
                </Link>
            </div>
        </header>
    );
};