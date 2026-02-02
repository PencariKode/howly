'use client';

import {FormEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';


export default function HowlRange({
      min, max, defaultValue, id, name, disabled, eventChange
    }: {
    min: number,
    max: number,
    defaultValue?: number,
    id?: string,
    name?: string,
    disabled?: boolean,
    eventChange?: (e: FormEvent<HTMLInputElement>) => void
}) {


    const rangeRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<number>(defaultValue || min);

    // Memoize background style calculation
    const getBackgroundStyle = useCallback((val: number): string => {
        const percent = ((val - min) / (max - min)) * 100;
        return `linear-gradient(to right, #e0e0e0 0%, #e0e0e0 ${percent}%, #14141c ${percent}%, #14141c 100%)`;
    }, [min, max]);

    // Memoize current background style
    const currentBackgroundStyle = useMemo(() => 
        getBackgroundStyle(value), 
        [value, getBackgroundStyle]
    );

    // Optimize input handler with debouncing for better performance
    const handleInput = useCallback((e: FormEvent<HTMLInputElement>) => {
        const newValue = Number((e.target as HTMLInputElement).value);
        setValue(newValue);
    }, []);

    useEffect(() => {
        if (rangeRef.current) {
            rangeRef.current.style.background = currentBackgroundStyle;
        }
    }, [currentBackgroundStyle]);

    useEffect(() => {
        if (defaultValue !== undefined) {
            setValue(defaultValue);
            if (rangeRef.current) {
                rangeRef.current.value = defaultValue.toString();
                rangeRef.current.style.background = getBackgroundStyle(defaultValue);
            }
        }
    }, [defaultValue, getBackgroundStyle]);

    return (
        <input
            ref={rangeRef}
            type="range"
            min={min}
            max={max}
            value={value}
            id={id}
            name={name}
            disabled={disabled}
            className="!w-full h-2.5 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            onInput={handleInput}
            onChange={eventChange}
            style={{
                background: currentBackgroundStyle,
                touchAction: 'pan-x',
                willChange: 'background'
            }}
        />
    );
};