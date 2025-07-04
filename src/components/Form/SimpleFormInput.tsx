import {ChangeEvent} from "react";


export default function SimpleFormInput({label, htmlFor, type, value, placeholder, eventChange, name, error} : {
    label: string;
    htmlFor: string;
    type: string;
    value: string;
    placeholder?: string;
    eventChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    error: {
        type?: string;
        message: string;
    }
}) {
    return (
        <div className={`minMaxWidth flex flex-col justify-center group`}>
            <label className={`ml-0.5 md:mb-0.5 text-base md:text-sm font-extralight text-hl-text/85`} htmlFor={htmlFor}>{label}</label>
            <input className={`bg-hl-tertiary/70  md:text-base md:h-10 outline-none ring-[0.5px] ring-transparent group-hover:ring-hl-text/70 active:scale-99 focus:ring-hl-text not-placeholder-shown:ring-hl-text/15 rounded-md h-12 text-lg minMaxWidth px-3`} type={type} id={htmlFor} name={name || htmlFor} value={value} placeholder={placeholder} onChange={eventChange} />
            {error.message !== "" && error.type === htmlFor && (
                <small className={`ml-0.5 font-thin md:text-xs italic text-red-600/90 mt-0.5`}>{error.message}</small>
            )}
        </div>
    );
};