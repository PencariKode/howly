import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

const OutlineButton = forwardRef<HTMLButtonElement, OutlineButtonProps>(
    ({ children, className = "", ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                {...props}
                className={ `outline-btn ${className}` }
            >
                { children }
            </button>
        )
    }
);

OutlineButton.displayName = "OutlineButton";

export default OutlineButton;
