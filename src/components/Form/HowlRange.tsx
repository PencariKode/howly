'use client';

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';


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

    // memoize bg style
    const getBackgroundStyle = useCallback((val: number): string => {
        const range = max - min;
        const percent = range === 0 ? (min === 0 ? 0 : 100) : ((val - min) / range) * 100;
        return `linear-gradient(to right, #e0e0e0 0%, #e0e0e0 ${percent}%, #14141c ${percent}%, #14141c 100%)`;
    }, [min, max]);

    // memoize bg style sekarang
    const currentBackgroundStyle = useMemo(() =>
        getBackgroundStyle(value),
        [value, getBackgroundStyle]
    );

    // debouncing
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

    const isSingleValue = min === max;
    const isZeroRange = isSingleValue && min === 0;
    const effectiveMax = isSingleValue ? min + 1 : max;
    const effectiveValue = isSingleValue ? (isZeroRange ? min : min + 1) : value;

    return (
        <>
            <input
                ref={ rangeRef }
                type="range"
                min={ min }
                max={ effectiveMax }
                value={ effectiveValue }
                disabled={ disabled || isSingleValue }
                className="!w-full h-2.5 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                onInput={ handleInput }
                onChange={ eventChange }
                style={ {
                    background: currentBackgroundStyle,
                    touchAction: 'pan-x',
                    willChange: 'background'
                } }
            />
            { id && <input type="hidden" id={ id } name={ name } value={ value } /> }
        </>
    );
};