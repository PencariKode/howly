'use client';

import { useEffect, useState } from 'react';
import {useUIStore} from "@/stores/uiStore";

type WolfTrack = {
    id: number;
    top: string;
    left: string;
    size: number;
    rotate: string;
    opacity: number;
};

export default function WolfTrackLayer() {
    const isScreenScrolled = useUIStore(state => state.isScreenScrolled);

    const [tracks, setTracks] = useState<WolfTrack[]>([]);

    useEffect(() => {
        const maxTracks = Math.random() * 12 + 10;
        const intervalTime = Math.random() * 500 + 200;
        let current = 0;

        const interval = setInterval(() => {
            if (current >= maxTracks) {
                clearInterval(interval);
                return;
            }

            const newTrack: WolfTrack = {
                id: current,
                top: `${Math.random() * 120}%`,
                left: `${Math.random() * 90}%`,
                size: Math.random() * 36 + 24,
                rotate: `${Math.random() * 360}deg`,
                opacity: Math.random() * 0.25 + 0.05,
            };

            setTracks(prev => [...prev, newTrack]);
            current++;
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${isScreenScrolled ? 'fixed' : 'fixed'} inset-0 -z-10 pointer-events-none minMaxWidth overflow-hidden h-screen `}>
            {tracks.map(track => (
                <i
                    key={track.id}
                    className="fa-solid fa-paw-claws text-rose-900 absolute transition-all duration-500 ease-out"
                    style={{
                        top: track.top,
                        left: track.left,
                        fontSize: `${track.size}px`,
                        transform: `rotate(${track.rotate})`,
                        opacity: track.opacity,
                    }}
                />
            ))}
        </div>
    );
}
