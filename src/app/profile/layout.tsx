import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Howly - Profile",
    description: "Kelola profil akun Howly kamu.",
};

export default function ProfileLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return children;
}
