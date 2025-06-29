import BottomBarBtn from "./BottomBarBtn";
import {useUIStore} from "@/stores/uiStore";


export default function BottomBar() {

    const isHeaderOpen = useUIStore(state => state.isHeaderOpen);


    return (
        <nav
            className={`flex items-end justify-around gap-2 min-h-17 pb-2 px-2 text-hl-text bg-hl-primary z-50 !fixed minMaxWidth bottom-0 ${isHeaderOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} transition-all duration-400`}>
            <BottomBarBtn href="/" path={'/'} title={"Home"} icon={'fa-paw-claws'}/>
            <BottomBarBtn href="/create" path={'/create'} title={"Create"} icon={'fa-dna'}/>
            <BottomBarBtn href="/join" path={'/join'} title={"Join"} icon={'fa-chart-network'}/>
            <BottomBarBtn href="/profile" path={'/profile'} title={"Profile"} icon={'fa-user'}/>
        </nav>
    );
};