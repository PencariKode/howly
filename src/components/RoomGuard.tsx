'use client';

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EXCLUDED_PATHS = ['/login', '/register', '/api'];

export default function RoomGuard() {
    const pathname = usePathname();
    const router = useRouter();
    const { status } = useSession();
    const lastCheckedPath = useRef<string | null>(null);

    useEffect(() => {
        if (status !== 'authenticated') return;

        //PK: Jangan redirect jika sudah di halaman room
        if (pathname.startsWith('/room/')) return;

        //PK: Jangan redirect di halaman login/register/api
        if (EXCLUDED_PATHS.some(p => pathname.startsWith(p))) return;

        //PK: Hindari cek berulang untuk path yang sama
        if (lastCheckedPath.current === pathname) return;
        lastCheckedPath.current = pathname;

        const controller = new AbortController();

        fetch('/api/user/active-room', { signal: controller.signal })
            .then(res => res.json())
            .then(data => {
                if (data.activeRoom) {
                    router.replace(`/room/${data.activeRoom}`);
                }
            })
            .catch(() => {});

        return () => controller.abort();
    }, [pathname, status, router]);

    return null;
}
