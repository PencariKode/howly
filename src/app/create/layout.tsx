import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Howly - Create Room",
    description: "Howly is a platform for playing 'werewolf' games online with friends.",
};

export default function CreateRoomLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return children
}