'use client';
import HowlRange from "@c/Form/HowlRange";
import { useState, useCallback, FormEvent, useEffect } from "react";


export default function HowlRangeVal({
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

    const [value, setValue] = useState<number>(defaultValue || min);

    // Memoize event handler to prevent recreation on every render
    const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        const newValue = Number((e.target as HTMLInputElement).value);
        setValue(newValue);
        if (eventChange) eventChange(e);
    }, [eventChange]);
    
    useEffect(() => {
        if (defaultValue !== undefined) {
            setValue(defaultValue);
        }
    }, [defaultValue, min]);


    return (
        <span
            className={ `minMaxWidth ring ring-hl-text/5 hover:ring-hl-text/25 active:scale-99 flex items-center justify-between gap-2 bg-hl-secondary h-10 px-2 rounded-md ${disabled ? 'cursor-not-allowed' : ''}` }
            style={ {
                touchAction: 'pan-y pinch-zoom',
                willChange: 'transform'
            } }
        >
            <strong className={  `bg-hl-tertiary w-10 flex items-center justify-center rounded-sm ${disabled ? 'opacity-50' : ''}` }>{ value }</strong>
            <HowlRange
                min={ min }
                max={ max }
                defaultValue={ defaultValue }
                id={ id }
                name={ name }
                eventChange={ handleChange }
                disabled={disabled}
            />
        </span>
    );
};