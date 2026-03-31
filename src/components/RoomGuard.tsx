'use client';

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUIStore } from "@/stores/uiStore";

function readCookie(name: string) {
    if (typeof document === "undefined") return null;
    const match = document.cookie.split(";").map(c => c.trim())
        .find(row => row.startsWith(`${name}=`));
    if (!match) return null;
    return decodeURIComponent(match.split("=")[1] || "") || null;
}

export default function RoomGuard() {
    const pathname = usePathname();
    const router = useRouter();
    const activeRoomCode = useUIStore(state => state.activeRoomCode);
    const setInActiveRoom = useUIStore(state => state.setInActiveRoom);
    const setActiveRoomCode = useUIStore(state => state.setActiveRoomCode);

    useEffect(() => {
        let code = activeRoomCode;

        if (!code) {
            code = readCookie("active_room_hint");
            if (code) {
                setInActiveRoom(true);
                setActiveRoomCode(code);
            }
        }

        if (!code) return;

        const allowedPrefix = `/room/${code}`;
        if (pathname === allowedPrefix || pathname.startsWith(allowedPrefix + "/")) return;
        router.replace(allowedPrefix);
    }, [pathname, activeRoomCode, router, setInActiveRoom, setActiveRoomCode]);

    useEffect(() => {
        const code = activeRoomCode || readCookie("active_room_hint");
        if (!code) return;

        const allowedPrefix = `/room/${code}`;

        const onClickCapture = (e: MouseEvent) => {
            if (e.defaultPrevented) return;
            if (e.button !== 0) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const target = e.target as HTMLElement | null;
            const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
            if (!anchor) return;

            // Abaikan case tertentu
            if (anchor.target && anchor.target !== "_self") return;
            if (anchor.hasAttribute("download")) return;

            const href = anchor.getAttribute("href");
            if (!href || href.startsWith("#")) return;

            let url: URL;
            try {
                url = new URL(href, window.location.origin);
            } catch {
                return;
            }

            if (url.origin !== window.location.origin) return;

            const destPath = url.pathname;
            if (destPath === allowedPrefix || destPath.startsWith(allowedPrefix + "/")) return;

            e.preventDefault();
            router.replace(allowedPrefix);
        };

        document.addEventListener("click", onClickCapture, true);
        return () => document.removeEventListener("click", onClickCapture, true);
    }, [activeRoomCode, router]);

    return null;
}
