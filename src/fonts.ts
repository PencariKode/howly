import {Geist, Geist_Mono, JetBrains_Mono, Rubik} from "next/font/google";

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const jetbrains = JetBrains_Mono({
    variable: "--font-jetbrains",
    subsets: ["latin", "latin-ext"],
    display: "swap",
});


export const rubikSans = Rubik({
    variable: "--font-rubik-sans",
    subsets: ["latin", "latin-ext"],
    display: "swap",
});