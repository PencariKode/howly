import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

interface DangerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const DangerButton = forwardRef<HTMLButtonElement, DangerButtonProps>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                {...props}
                className={ `flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-white bg-gradient-to-br from-[#7F1D1D] to-[#B91C1C] border border-red-700/60 hover:from-[#991b1b] hover:to-[#dc2626] hover:border-red-600/80 hover:shadow-lg active:scale-[0.98] active:from-[#7F1D1D] active:to-[#991b1b] focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900 ${className}` }
            >
                { children }
            </button>
        )
    }
);

DangerButton.displayName = "DangerButton";

export default DangerButton;