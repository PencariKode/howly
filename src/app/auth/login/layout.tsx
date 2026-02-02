import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Howly - Login",
    description: "Howly is a platform for playing 'werewolf' games online with friends.",
};

export default function LoginLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return children
}