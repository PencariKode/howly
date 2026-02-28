'use client';

import Image from 'next/image';
import Swiper from 'swiper';
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from 'swiper/modules'
import { useEffect, useRef, useState } from 'react'


import { roles } from "@l/roles";

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const configRoleColor = {
    'manusia': 'after:bg-cyan-500/60',
    'werewolf': 'after:bg-red-600/50',
}

export default function RolesList() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperReady, setSwiperReady] = useState(false);
    const isMobileRef = useRef<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            isMobileRef.current = window.innerWidth <= 640;
        };

        handleResize(); // cek pas render pertama
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const swiperEl = document.querySelector('.swiper');

        if (swiperEl && 'swiper' in swiperEl) {
            const typedSwiperEl = swiperEl as HTMLElement & { swiper: Swiper };
            const swiperInstance = typedSwiperEl.swiper;

            if (swiperInstance.params.effect === 'coverflow' && swiperInstance.params.coverflowEffect) {
                swiperInstance.params.coverflowEffect.modifier = isMobileRef.current ? 1.5 : 3.5;
                swiperInstance.update();
            }
        }
    }, []);

    function handleSwiper(swiper: Swiper) {
        swiper.on('slideChange', () => {
            const idx = swiper.realIndex;
            setActiveIndex(idx);
        });
        setSwiperReady(true);
    }

    const activeRole = roles[activeIndex];
    const isManusia = activeRole.side === 'manusia';

    return (
        <section id="roles" className="min-h-screen minMaxWidth text-hl-text px-4 mt-15 relative">
            {/* loading spinner */ }
            { !swiperReady && (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="auth-spinner" />
                </div>
            ) }
            <div className={ `transition-opacity duration-500 ${swiperReady ? 'opacity-100' : 'opacity-0 absolute inset-0'}` }>
                <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl font-bold mb-3 items-center justify-center flex gap-3 px-4 py-1.5 rounded-lg bg-glass/70 border border-glass-border/50">
                        <i className="fas fa-user-alien text-2xl text-red-400" />
                        <span className="text-zinc-100">Roles</span>
                        <i className="fas fa-user-astronaut text-2xl text-cyan-400" />
                    </h2>
                    <p className="mb-8 text-zinc-400">Temukan role (peran) yang tersedia di <b className="text-zinc-200">Howly</b>.</p>
                </div>
                <div className="slider-container">
                    <SwiperComponent
                        effect={ 'coverflow' }
                        grabCursor={ true }
                        centeredSlides={ true }
                        slidesPerView={ 'auto' }
                        loop={ true }
                        coverflowEffect={ {
                            rotate: 0,
                            stretch: -50,
                            depth: 125,
                            modifier: isMobileRef.current ? 1.5 : 5.5,
                            slideShadows: false
                        } }
                        navigation={ {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            enabled: true,
                        } }
                        modules={ [EffectCoverflow, Navigation] }
                        onSwiper={ handleSwiper }
                        id="slider"
                        className="!relative mb-0"
                    >
                        { roles.map((role, index) => {

                            return (
                                <SwiperSlide key={ index }
                                    className={ `max-w-32 sm:max-w-64 min-w-fit min-h-4 pb-2 sm:pb-10 mt-5 transition-opacity duration-300 ${index === activeIndex ? '' : 'opacity-35'}` }>
                                    <div
                                        className={ `min-w-32 max-w-full select-none min-h-2 flex object-contain flex-col items-center justify-center ${configRoleColor[role.side]} ${index === activeIndex ? 'after:rounded-full' : 'after:rounded-[3rem] sm:after:rounded-[4.5rem]'} after:[content:''] after:min-w-32 after:max-w-32 after:min-h-32 after:max-h-32 sm:after:min-w-56 sm:after:max-w-56 sm:after:min-h-56 sm:after:max-h-56 after:absolute after:-z-10 after:top-5 sm:after:top-12` }>
                                        <Image src={ role.image } priority={ false } alt={ role.name }
                                            width={ isMobileRef.current ? 128 : 400 }
                                            height={ isMobileRef.current ? 128 : 400 }
                                            className={ `select-none max-w-40 sm:max-w-64 object-contain min-w-fit max-h-40 min-h-fit !aspect-square ${index === activeIndex ? 'w-40 h-40 sm:w-64 -top-5' : ' '} relative` } />
                                    </div>
                                </SwiperSlide>
                            );
                        }) }

                    </SwiperComponent>
                </div>
                <div className="min-w-full flex flex-col gap-5 items-center relative !max-w-2xl">
                    <div
                        className="slider-controler absolute top-0 z-50 w-full max-w-xl md:max-w-lg min-h-2 flex justify-between font-bold text-2xl sm:text-3xl md:text-xl">
                        <button
                            className="swiper-button-prev px-3 py-1 rounded-lg cursor-pointer hover:scale-95 transition-all duration-200 text-zinc-200 hover:text-white bg-gradient-to-br from-[#6B1525B3] to-[#A6344580] border border-rose-accent/40">
                            <i className="fas fa-arrow-left-long" /></button>
                        <button
                            className="swiper-button-next px-3 py-1 rounded-lg cursor-pointer hover:scale-95 transition-all duration-200 text-zinc-200 hover:text-white bg-gradient-to-br from-[#6B1525B3] to-[#A6344580] border border-rose-accent/40">
                            <i className="fas fa-arrow-right-long" /></button>
                    </div>
                    <h1
                        className="px-4 py-1.5 rounded-lg w-fit text-center text-xl font-bold text-white transition-colors duration-300"
                        style={ {
                            background: isManusia
                                ? 'linear-gradient(135deg, #0891B299, #22D3EE4D)'
                                : 'linear-gradient(135deg, #6B1525CC, #A6344580)',
                            border: `1px solid ${isManusia ? '#22D3EE4D' : '#A6344566'}`
                        } }>
                        { activeRole.name }
                    </h1>
                    <div
                        className="px-4 py-3 text-justify leading-relaxed text-sm text-zinc-300 rounded-lg max-w-lg bg-glass/70 border border-glass-border/50">
                        { activeRole.desc }
                    </div>
                </div>
            </div>
        </section>
    );
};