import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";
import Body from "@c/Body";


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
            <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css"/>
        </head>
        <Body children={children} />
        </html>
    );
}
