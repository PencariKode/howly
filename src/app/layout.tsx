import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Body from "@c/Body";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;


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
                <link rel="stylesheet" href="/fontawesome/css/all.min.css" />
                <link rel="stylesheet" href="/fontawesome/css/etch-solid.css" />
            </head>
            <Body children={ children } />
        </html>
    );
}
