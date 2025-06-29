'use client';

import {useEffect, useRef, useState} from "react";
import Typed from "typed.js";


export default function WelcomeSection() {
    const typeRef = useRef(null);

    const [delay, setDelay] = useState(0);

    useEffect(() => {
        const typed = new Typed(typeRef.current, {
            strings: [
                'Friends',
                'Family',
                'Colleagues',
                'Classmates',
                'Everyone!!'
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
            <section className="minMaxWidth flex flex-col items-start gap-y-2 justify-center h-[70vh] px-4">
                <h1 className="text-4xl font-normal text-teal-600">
                    Welcome to <b className="font-extrabold flicker text-hl-text"
                      style={{animationDelay: `${delay}s`}}>
                    Howly <i className="fa-solid fa-paw-claws"></i>
                </b>
                </h1>
                <span className="mt-4 text-lg text-hl-text-secondary  !inline  whitespace-pre-line text-wrap">
                            Play the <b className="text-teal-500">'werewolf'</b> roleplay game online with <p
                    className="!inline text-emerald-600" ref={typeRef}></p>
                        </span>
            </section>
        </>
    );
};