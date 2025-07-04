import { MouseEvent } from "react";

export default function SimpleFormButton({text, type, eventClick} : {
    text: string;
    type?: "button" | "submit" | "reset";
    eventClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
    return (
        <button className={`minMaxWidth h-12 text-hl-text bg-hl-tertiary hover:bg-hl-tertiary/85 rounded-md mt-1 ring-[0.5px] ring-transparent hover:ring-hl-text/50 hover:scale-101 active:ring-hl-text active:scale-99 focus:ring-hl-text/90 cursor-pointer font-semibold text-lg md:text-base md:h-10`} type={type} onClick={eventClick}>
            {text}
        </button>
    );
};