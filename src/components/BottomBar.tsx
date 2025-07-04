import BottomBarBtn from "./BottomBarBtn";
import {useUIStore} from "@/stores/uiStore";
import {useSession} from "next-auth/react";


export default function BottomBar() {
    const {status} = useSession()

    // const isHeaderOpen = useUIStore(state => state.isHeaderOpen);
    const isScreenScrolled = useUIStore(state => state.isScreenScrolled);

    return (
        <nav
            // className={`flex items-end justify-around gap-2 min-h-17 ${isScreenScrolled ? 'p-4' : 'pb-2'} px-2 text-hl-text bg-hl-primary z-50 !fixed minMaxWidth bottom-0 ${isHeaderOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} transition-all duration-400`}>
            className={`flex sm:hidden items-end justify-around gap-2 min-h-17 ${isScreenScrolled ? 'p-4' : 'pb-2'} px-2 text-hl-text bg-hl-primary z-50 !fixed minMaxWidth bottom-0 opacity-100 translate-y-0 transition-all duration-400`}>
            <BottomBarBtn href="/" path={'/'} title={"Home"} icon={'fa-paw-claws'}/>
            <BottomBarBtn href="/create" path={'/create'} title={"Create"} icon={'fa-dna'}/>
            <BottomBarBtn href="/join" path={'/join'} title={"Join"} icon={'fa-chart-network'}/>
            <BottomBarBtn href={status === "authenticated" ? "/profile" : "/auth/login"} path={status === "authenticated" ? "/profile" : "/auth/login"} title={"Profile"} icon={'fa-user'}/>
        </nav>
    );
};