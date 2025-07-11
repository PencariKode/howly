'use client';
import {jetbrains} from "@/fonts";
import Header from "@c/Header";
import BottomBar from "@c/BottomBar";
import {ReactNode, useEffect} from "react";
import {useUIStore} from "@/stores/uiStore";
import Footer from "@c/Footer";
import {SessionProvider} from "next-auth/react";


export default function Body({children}: { children: ReactNode }) {

    const toggleScreenScrolled = useUIStore(state => state.toggleScreenScrolled);
    const lastScrollTop = useUIStore(state => state.lastScrollTop);
    const setLastScrollTop = useUIStore(state => state.setLastScrollTop);
    const toggleHeader = useUIStore(state => state.toggleHeader);

    useEffect(() => {
        const SCROLL_DIFF_THRESHOLD = Math.max(window.innerHeight * 0.01, 15);

        const handleScroll = () => {
            if (Math.abs(scrollY - lastScrollTop) < SCROLL_DIFF_THRESHOLD) return;
            toggleScreenScrolled(window.scrollY > 15);
            let curScr = window.scrollY;
            toggleHeader(!(curScr > lastScrollTop && curScr > 50));
            setLastScrollTop(curScr <= 0 ? 0 : curScr);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [toggleScreenScrolled, toggleHeader, setLastScrollTop, lastScrollTop]);

    return (
        <body
            className={`${jetbrains.variable} antialiased bg-hl-bg relative overflow-x-hidden hl-scrollbar minMaxWidth min-h-screen `}
        >
        <SessionProvider>
            <Header/>
            {children}
            <BottomBar/>
            <Footer/>
        </SessionProvider>
        </body>
    );
};