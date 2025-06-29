'use client';

import {useEffect, useRef, useState} from "react";
import Typed from "typed.js";


export default function WelcomeSection() {
    const typeRef = useRef(null);

    const [delay, setDelay] = useState(0);

    useEffect(() => {
        const typed = new Typed(typeRef.current, {
            strings: [
                'Teman',
                'Keluarga',
                'Kolega',
                'Teman Sekelas',
                'Semua Orang!'
            ],
            typeSpeed: 100,
            startDelay: 500,
            backSpeed: 100,
            backDelay: 700,
            loop: true,
            shuffle: true,
        });

        const interval = setInterval(() => {
            setDelay(Math.random() * 2);
        }, 5000);

        return () => {
            typed.destroy();
            clearInterval(interval);
        }
    }, [])


    return (
        <>
            <section className="minMaxWidth flex flex-col items-start gap-y-2 justify-center h-[75vh] px-4">
                <h1 className="text-4xl font-normal text-rose-800 italic">
                    Welcome to <b className="font-extrabold flicker text-hl-text not-italic"
                      style={{animationDelay: `${delay}s`}}>
                    Howly <i className="fa-solid fa-paw-claws"></i>
                </b>
                </h1>
                <span className="mt-4 text-lg text-hl-text-secondary  !inline  whitespace-pre-line text-wrap">
                            Mainkan game roleplay <b className="text-red-800 drop-shadow-[0_0_0.3rem] drop-shadow-red-600 italic">'werewolf'</b> secara online bersama <p
                    className="!inline text-rose-600 drop-shadow-[0_0_.3rem] drop-shadow-rose-500" ref={typeRef}></p>
                        </span>
            </section>
        </>
    );
};