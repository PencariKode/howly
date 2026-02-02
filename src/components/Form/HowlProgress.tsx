interface HowlProgressProps {
    min?: number;
    max?: number;
    value?: number;
    label?: string;
}

export default function HowlProgress({
    min = 0,
    max = 100,
    value = 50,
    label = "Progress"
}: HowlProgressProps) {


    return (
        <div className="flex flex-col gap-1 w-full">
            { label && (
                <label className="text-base font-bold">
                    { label }
                </label>
            ) }
            <span className={ "minMaxWidth ring ring-hl-text/5  flex items-center justify-between gap-3 bg-hl-secondary h-10 px-3 rounded-md" }>
                <div className="flex items-center justify-center text-red-800">
                    <i className="fas fa-paw-claws w-4 h-4"></i>
                </div>

                <div className="flex-1 bg-cyan-900 h-2.5 rounded-lg overflow-hidden">
                    <div
                        className="h-full rounded-lg bg-red-800 transition-[width] duration-300 ease-in-out"
                        style={ {
                            width: `${((value - min) / (max - min)) * 100}%`
                        } }
                    />
                </div>

                <div className="flex items-center justify-center text-cyan-600">
                    <i className="fas fa-users w-4 h-4"></i>
                </div>
            </span>
        </div>
    );
}
