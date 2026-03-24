export default function Spinner({ size = "lg", className = "" }: { size?: "sm" | "lg", className?: string }) {
    if (size === "sm") {
        return <span className={`spinner-sm ${className}`} />;
    }
    return <div className={`spinner ${className}`} />;
}
