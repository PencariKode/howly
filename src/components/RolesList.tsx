'use client';

import Image from 'next/image';
import Swiper from 'swiper';
import {Swiper as SwiperComponent, SwiperSlide} from "swiper/react";
import {EffectCoverflow, Navigation} from 'swiper/modules'
import {useEffect, useRef, useState} from 'react'

import {roles} from "@l/roles";

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const configRoleColor = {
    'manusia': 'after:bg-cyan-500/80',
    'werewolf': 'after:bg-red-700/70',
}

export default function RolesList() {
    const [activeIndex, setActiveIndex] = useState(0);
    const isMobileRef = useRef<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            isMobileRef.current = window.innerWidth <= 640;
        };

        handleResize(); // Check on initial render
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

            if ( swiperInstance.params.effect === 'coverflow' && swiperInstance.params.coverflowEffect ) {
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
    }



    return (
        <section id="roles" className="min-h-screen minMaxWidth text-hl-text px-4 mt-15">
            <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-bold mb-4 items-center justify-center flex gap-2 bg-red-700/50 hover:bg-red-700/55 px-3 py-1 rounded-md">
                    <i className="fa-solid fa-user-alien text-2xl"></i> Roles <i
                    className="fa-solid fa-user-astronaut text-2xl"></i></h2>
                <p className="mb-8">Temukan role (peran) yang tersedia di <b>Howly</b>.</p>
            </div>
            <div className="slider-container">
                <SwiperComponent
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: -50,
                        depth: 125,
                        modifier: isMobileRef.current ? 1.5 : 3.5,
                        slideShadows: false
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        enabled: true,
                    }}
                    modules={[EffectCoverflow, Navigation]}
                    onSwiper={handleSwiper}
                    id="slider"
                    className="!relative mb-0"
                >
                    {roles.map((role, index) => {

                        return (
                            <SwiperSlide key={index}
                                         className={`max-w-32 sm:max-w-64 min-w-fit min-h-4 pb-2 mt-5 ${index === activeIndex ? '' : 'opacity-40'}`}>
                                <div
                                    className={`min-w-32 max-w-full min-h-2 flex flex-col items-center justify-center ${configRoleColor[role.side]} ${index === activeIndex ? 'after:rounded-full' : 'after:rounded-[3rem] sm:after:rounded-[4.5rem]'} after:[content:''] after:min-w-32 after:max-w-32 after:min-h-32 after:max-h-32 sm:after:min-w-56 sm:after:max-w-56 sm:after:min-h-56 sm:after:max-h-56 after:absolute after:-z-10 after:top-5 sm:after:top-12`}>
                                    <Image src={role.image} priority={false} alt={role.name}
                                           width={isMobileRef.current ? 128 : 400}
                                           height={isMobileRef.current ? 128 : 400}
                                           className={` max-w-40 sm:max-w-64 min-w-fit max-h-40 min-h-fit !aspect-square ${index === activeIndex ? 'w-40 h-40 sm:w-64 -top-5' : ' '} relative`}/>
                                </div>
                            </SwiperSlide>
                        );
                    })}

                </SwiperComponent>
            </div>
            <div className="minMaxWidth flex flex-col gap-7 items-center relative">
                <div
                    className=" slider-controler absolute top-0 z-50 min-w-full max-w-full min-h-2 flex justify-between font-bold text-2xl sm:text-4xl">
                    <button
                        className="swiper-button-prev bg-red-700/60 px-3 py-1 rounded-md cursor-pointer hover:scale-95 ">
                        <i className="fa-solid fa-arrow-left-long"></i></button>
                    <button
                        className="swiper-button-next bg-red-700/60 px-3 py-1 rounded-md cursor-pointer hover:scale-95 ">
                        <i className="fa-solid fa-arrow-right-long"></i></button>
                </div>
                <h1 className={`${roles[activeIndex].side === 'manusia' ? 'bg-cyan-600/80' : 'bg-red-700/60'} px-2 py-1 rounded-md w-fit text-center text-xl font-bold ${configRoleColor[roles[activeIndex].side]}`}>{roles[activeIndex].name}</h1>
                <div className="px-3 py-2 text-justify leading-snug text-sm rounded-md bg-white/10">{roles[activeIndex].desc}</div>
            </div>
        </section>
    );
};