import MainContainer from "@c/MainContainer";
import { ReactNode } from "react";

export default function DocLayout({ title, subtitle, updated, children }: {
    title: string;
    subtitle: string;
    updated: string;
    children: ReactNode;
}) {
    return (
        <MainContainer>
            <article className="w-full max-w-3xl mx-auto pt-8 sm:pt-16 pb-8 flex flex-col gap-8 sm:gap-10">
                <header className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{ title }</h1>
                    <p className="text-sm text-zinc-400">{ subtitle }</p>
                    <p className="text-xs text-zinc-600">Terakhir diperbarui: { updated }</p>
                </header>
                <div className="flex flex-col gap-6 text-[.82rem] sm:text-sm text-zinc-300 leading-relaxed
                    [&_h2]:text-base [&_h2]:sm:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-2
                    [&_h3]:text-[.85rem] [&_h3]:sm:text-base [&_h3]:font-semibold [&_h3]:text-zinc-100
                    [&_strong]:text-zinc-100 [&_strong]:font-semibold
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-1
                    [&_a]:text-rose-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-rose-300
                    [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[.78rem] [&_code]:text-rose-300 [&_code]:font-mono
                    [&_pre]:bg-white/[0.04] [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-[.78rem] [&_pre]:font-mono [&_pre]:text-zinc-300 [&_pre]:border [&_pre]:border-white/[0.06]
                    [&_table]:w-full [&_table]:text-left [&_table]:text-[.78rem]
                    [&_th]:text-zinc-200 [&_th]:font-semibold [&_th]:px-3 [&_th]:py-2 [&_th]:border-b [&_th]:border-white/10
                    [&_td]:px-3 [&_td]:py-2 [&_td]:border-b [&_td]:border-white/[0.05] [&_td]:text-zinc-400
                ">
                    { children }
                </div>
            </article>
        </MainContainer>
    );
}
