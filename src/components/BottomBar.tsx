import BottomBarBtn from "./BottomBarBtn";
import { useUIStore } from "@/stores/uiStore";
import { useSession } from "next-auth/react";
import { faPawClaws as faPawClawsSolid, faDna as faDnaSolid, faChartNetwork as faChartNetworkSolid, faUser as faUserSolid } from "@fortawesome/pro-solid-svg-icons";
import { faPawClaws as faPawClawsLight, faDna as faDnaLight, faChartNetwork as faChartNetworkLight, faUser as faUserLight } from "@fortawesome/pro-light-svg-icons";


export default function BottomBar() {
    const { status } = useSession()

    // const isHeaderOpen = useUIStore(state => state.isHeaderOpen);
    const isScreenScrolled = useUIStore(state => state.isScreenScrolled);

    return (
        <nav
            // className={`flex items-end justify-around gap-2 min-h-17 ${isScreenScrolled ? 'p-4' : 'pb-2'} px-2 text-hl-text bg-hl-primary z-50 !fixed minMaxWidth bottom-0 ${isHeaderOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} transition-all duration-400`}>
            className={ `flex sm:hidden items-end justify-around gap-2 min-h-17 ${isScreenScrolled ? 'p-4' : 'pb-2'} px-2 text-hl-text bg-hl-primary z-50 !fixed minMaxWidth bottom-0 opacity-100 translate-y-0 transition-all duration-400` }>
            <BottomBarBtn href="/" path={ '/' } title={ "Home" } iconSolid={ faPawClawsSolid } iconLight={ faPawClawsLight } />
            <BottomBarBtn href="/create" path={ '/create' } title={ "Create" } iconSolid={ faDnaSolid } iconLight={ faDnaLight } />
            <BottomBarBtn href="/join" path={ '/join' } title={ "Join" } iconSolid={ faChartNetworkSolid } iconLight={ faChartNetworkLight } />
            <BottomBarBtn href={ status === "authenticated" ? "/profile" : "/login" } path={ status === "authenticated" ? "/profile" : "/login" } title={ "Profile" } iconSolid={ faUserSolid } iconLight={ faUserLight } />
        </nav>
    );
};