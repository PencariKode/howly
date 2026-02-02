'use client';

import { memo } from 'react';
import HowlRangeVal from './HowlRangeVal';

interface OptimizedHowlRangeValProps {
    min: number;
    max: number;
    defaultValue?: number;
    id?: string;
    name?: string;
    label?: string;
    color?: 'cyan' | 'red' | 'default';
}

const OptimizedHowlRangeVal = memo(function OptimizedHowlRangeVal({
    min,
    max,
    defaultValue,
    id,
    name,
    label,
    color = 'default'
}: OptimizedHowlRangeValProps) {
    
    const getBorderColor = () => {
        switch (color) {
            case 'cyan': return 'border-cyan-600/50';
            case 'red': return 'border-red-600/50';
            default: return 'border-hl-text/20';
        }
    };

    const getTextColor = () => {
        switch (color) {
            case 'cyan': return 'text-cyan-600';
            case 'red': return 'text-red-700';
            default: return 'text-hl-text';
        }
    };

    if (label) {
        return (
            <div className={`minMaxWidth flex flex-col items-start justify-center gap-1 bg-hl-tertiary ${getBorderColor()} border-[0.5px] px-2 py-1.5 rounded-md range-container`}>
                <label htmlFor={id} className={`text-[.9rem] font-normal w-full ${getTextColor()}`}>
                    {label}:
                </label>
                <HowlRangeVal 
                    min={min} 
                    max={max} 
                    defaultValue={defaultValue} 
                    id={id} 
                    name={name} 
                />
            </div>
        );
    }

    return (
        <HowlRangeVal 
            min={min} 
            max={max} 
            defaultValue={defaultValue} 
            id={id} 
            name={name} 
        />
    );
});

export default OptimizedHowlRangeVal;
