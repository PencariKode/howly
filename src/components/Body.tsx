'use client';
import { jetbrains } from "@/fonts";
import Header from "@c/Header";
import BottomBar from "@c/BottomBar";
import { ReactNode, useEffect } from "react";
import { useUIStore } from "@/stores/uiStore";
import Footer from "@c/Footer";
import { SessionProvider } from "next-auth/react";
import RoomGuard from "@c/RoomGuard";


export default function Body({ children }: { children: ReactNode }) {

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

    // biar pas klik link id (/link#blabla) gk ketutupan header
    useEffect(() => {
        const scrollToHash = (hash: string) => {
            if (!hash) return;
            const id = hash.replace('#', '');
            const el = document.getElementById(id);
            if (!el) return;
            const header = document.querySelector('header');
            const headerHeight = header ? header.getBoundingClientRect().height : 0;
            const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
            window.scrollTo({ top: y, behavior: 'smooth' });
        };

        if (window.location.hash) {
            setTimeout(() => scrollToHash(window.location.hash), 100);
        }

        const onHashChange = () => scrollToHash(window.location.hash);
        window.addEventListener('hashchange', onHashChange);

        const onClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest('a[href*="#"]');
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (!href) return;

            const [path, hash] = href.split('#');
            if (!hash) return;

            if (!path || path === window.location.pathname) {
                e.preventDefault();
                window.history.pushState(null, '', `#${hash}`);
                scrollToHash(`#${hash}`);
            }
        };
        document.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('hashchange', onHashChange);
            document.removeEventListener('click', onClick);
        };
    }, []);

    return (
        <body
            className={ `${jetbrains.variable} antialiased bg-hl-bg relative overflow-x-hidden hl-scrollbar minMaxWidth min-h-screen ` }
        >
            <SessionProvider>
                <RoomGuard />
                <Header />
                { children }
                <BottomBar />
                <Footer />
            </SessionProvider>
        </body>
    );
};