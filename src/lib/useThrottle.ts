import { useEffect, useRef, useState } from "react";



export default function useThrottle<T>(value: T, delay: number): T {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(() => {
            const timeElapsed = Date.now() - lastRan.current;
            if (timeElapsed >= delay) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, delay)

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);


    return throttledValue;
}