import { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export default function PrimaryButton({ children, className = "", ...props }: PrimaryButtonProps) {
    return (
        <button
            type="button"
            {...props}
            className={ `primary-btn disabled:opacity-50 disabled:cursor-wait ${className}` }
        >
            { children }
        </button>
    )
}