'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "node:url";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function BottomBarProfile({ href, path, title }: { href: string | UrlObject, path: string, title: string }) {
    const pathname = usePathname();
    const { data: session } = useSession()

    function btnIcon() {
        if (session?.user?.image) {
            return <Image src={ session.user.image } width={ 50 } height={ 50 } alt="PFP" className="rounded-full w-6" />
        } else {
            return <i className={ pathname === path ? `fa-solid fa-user text-xl` : `fa-light fa-user text-xl` } />
        }
    }

    return (
        <section
            className={ `flex group items-center justify-center text-sm ${pathname === path ? 'bottomBarBtnActive' : 'bottomBarBtnNonActive'}` }>
            <Link href={ href } className="flex flex-col items-center justify-around">
                { btnIcon() }
                <span>{ title }</span>
            </Link>
        </section>
    );
};