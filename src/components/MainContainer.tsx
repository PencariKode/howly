'use client';
import {ReactNode} from "react";
import {useUIStore} from "@/stores/uiStore";


export default function MainContainer({children, id}: { children: ReactNode, id?: string }) {

    const isScreenScrolled = useUIStore(state => state.isScreenScrolled);

    return (
        <main className={`flex flex-col min-h-screen minMaxWidth px-3 gap-y-1 relative z-10 ${isScreenScrolled ? 'bg-hl-bg' : 'bg-transparent'} transition-[background] duration-200`} id={id}>
            {children}
        </main>
    );
};