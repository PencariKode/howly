'use client';
import { useSession } from "next-auth/react";

export default function MyComponent() {
    const { data: session } = useSession();

    if (!session) return <p>Belum login</p>;
    return <p>Halo {session.user?.name}</p>;
};
