'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {UrlObject} from "node:url";

export default function Page({href, path, title, icon} : {href: string | UrlObject, path: string, title: string, icon: string}) {
    const pathname = usePathname();

    return (
        <section
            className={`flex group items-center justify-center text-sm ${pathname === path ? 'bottomBarBtnActive' : 'bottomBarBtnNonActive'}`}>
            <Link href={href} className="flex flex-col items-center justify-around">
                <i className={`fa-${pathname === path ? 'solid' : 'light'} ${icon} text-xl`}></i>
                <span>{title}</span>
            </Link>
        </section>
    );
};