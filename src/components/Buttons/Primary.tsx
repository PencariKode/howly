import { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    fullWidth?: boolean;
}

export default function PrimaryButton({ children, className = "", fullWidth = false, ...props }: PrimaryButtonProps) {
    return (
        <button
            type="button"
            {...props}
            className={ `primary-btn disabled:opacity-50 disabled:cursor-wait ${fullWidth ? 'w-full' : ''} ${className}` }
        >
            { children }
        </button>
    )
}