'use client';

import Image from "next/image";
import {useEffect, useState} from "react";

export default function SimpleFormHeader() {

    const [delay, setDelay] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setDelay(Math.random() * 2);
        }, 5000);

        return () => {
            clearInterval(interval);
        }

    }, [])

    return (
        <div className={`flex gap-2 minMaxWidth items-center flicker justify-center mb-4 *:select-none`}
             style={{
                 animationDelay: `${delay}s`,
             }}>
            <Image src={'/media/logo/logo_wolfman1.png'} alt={"Logo"} width={35} height={35}/>
            <h1 className={`font-extrabold text-3xl `}>Howly</h1>
        </div>
    );
};