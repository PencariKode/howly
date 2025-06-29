import {ReactNode} from "react";

export default function MainContainer({children, id}: { children: ReactNode, id?: string }) {

    return (
        <main className={`flex flex-col min-h-screen minMaxWidth px-3 gap-y-1 relative z-10 `} id={id}>
            {children}
        </main>
    );
};