import Link from "next/link";
import { useUIStore } from "@/stores/uiStore";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { faPawClaws } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    const { data: session, status } = useSession();

    const isHeaderOpen = useUIStore(state => state.isHeaderOpen);
    const isScreenScrolled = useUIStore(state => state.isScreenScrolled);
    const isDropMenuOpen = useUIStore(state => state.isDropMenuOpen);
    const toggleDropMenu = useUIStore(state => state.toggleDropMenu);
    const isInActiveRoom = useUIStore(state => state.isInActiveRoom);

    const menuBarRef = useRef<HTMLElement>(null);

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

    function handleDropMenu() { toggleDropMenu(!isDropMenuOpen) }

    return (
        <>
            <header className={ `${isInActiveRoom ? 'absolute' : 'fixed'} w-full left-0 right-0 flex items-center justify-center px-4 min-h-14 max-h-18 group sm:max-h-24 minMaxWidth text-hl-text ${!isInActiveRoom && isScreenScrolled ? 'bg-hl-primary h-14 sm:h-18' : 'h-18 sm:h-24 bg-transparent'} top-0 !z-50 transition-all duration-500 ${isHeaderOpen ? 'opacity-100 translate-0' : 'opacity-0 -translate-y-16'}` }>
                <div className={ `flex items-center justify-center minMaxWidth relative w-full` }>
                    <div className={ `absolute transition-all duration-700 right-4 sm:right-10 ${!isInActiveRoom ? 'hidden sm:flex' : 'hidden'}` }>
                        <button onClick={ handleDropMenu } className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer text-hl-text hover:bg-hl-text/10 transition-all duration-200">
                            <i className="fal fa-bars text-xl" />
                        </button>
                        <nav ref={ menuBarRef } className={ `${isDropMenuOpen ? 'flex' : 'hidden'} min-h-10 min-w-max pb-0.5 *:hover:bg-hl-primary/80 pt-1 px-2 *:px-3 *:py-1.5 font-extralight text-left bg-hl-tertiary/85 absolute right-7 top-[80%] rounded-b-lg rounded-tl-lg shadow-lg flex-col items-center justify-center divide-y-[.5px] divide-hl-text/20` }>
                            <Link href={ status === "authenticated" ? "/profile" : "/login" } title={ status === "authenticated" ? "Profile " + session?.user?.name : "Login" } className="w-full text-[.95rem] lg:text-base transition-all duration-300 flex items-center gap-2">{ session?.user?.image ? <Image src={ session.user.image } alt="PFP" width={ 20 } height={ 20 } className="w-5 h-5 rounded-full object-cover" /> : <i className="fal fa-user w-5 flex items-center justify-center" /> } { status === "authenticated" ? "Profile" : "Login" }</Link>
                            <Link href="/create" className="w-full text-[.95rem] lg:text-base transition-all duration-300 flex items-center gap-2"><i className="fal fa-dna w-5 flex items-center justify-center" /> Create</Link>
                            <Link href="/join" className="w-full text-[.95rem] lg:text-base transition-all duration-300 flex items-center gap-2"><i className="fal fa-chart-network w-5 flex items-center justify-center" /> Join</Link>
                            { status === "authenticated" && <button onClick={ () => signOut({ callbackUrl: "/login" }) } className="cursor-pointer w-full text-[.95rem] lg:text-base transition-all duration-300 flex items-center gap-2"><i className="fal fa-person-to-door w-5 flex items-center justify-center" /> Logout</button> }
                        </nav>
                    </div>
                    <Link href="/" className="flex items-center justify-center gap-2 text-[1.6rem]">
                        <FontAwesomeIcon icon={ faPawClaws } className="text-xl flex items-center justify-center pb-[1px]" />
                        <h1 className="font-extrabold">Howly</h1>
                    </Link>
                </div>
            </header>
        </>
    );
};