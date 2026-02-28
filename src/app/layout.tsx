import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Body from "@c/Body";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../../public/fontawesome/css/all.min.css";

export const metadata: Metadata = {
    title: "Howly - Home Page",
    description: "Howly is a platform for playing 'werewolf' games online with friends.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {

    return (
        <html lang="id">
            <head>
            </head>
            <Body children={ children } />
        </html>
    );
}
