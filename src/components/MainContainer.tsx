import {ReactNode} from "react";

export default function MainContainer({children, id}: { children: ReactNode, id?: string }) {

    return (
        <main className={`flex flex-col min-h-screen minMaxWidth px-3 pb-5 gap-y-1 relative z-10 sm:px-12 md:px-24 lg:px-34 xl:px-42 2xl:px-54`} id={id}>
            {children}
        </main>
    );
};