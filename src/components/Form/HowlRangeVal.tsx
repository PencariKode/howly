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

    // biar gk dibuat ulang pas rerender
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
            className={ `w-full flex items-center justify-between gap-2 h-10 px-2 rounded-md ${disabled ? 'cursor-not-allowed' : ''} bg-hl-primary/60 border border-zinc-700/40` }
            style={ {
                touchAction: 'pan-y pinch-zoom',
                willChange: 'transform',
            } }
        >
            <strong className="w-10 flex items-center justify-center rounded-sm text-zinc-200 bg-glass/60">{ value }</strong>
            <HowlRange
                min={ min }
                max={ max }
                defaultValue={ defaultValue }
                id={ id }
                name={ name }
                eventChange={ handleChange }
                disabled={ disabled }
            />
        </span>
    );
};