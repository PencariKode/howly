'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "node:url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { faUser as faUserSolid } from "@fortawesome/pro-solid-svg-icons";
import { faUser as faUserLight } from "@fortawesome/pro-light-svg-icons";

export default function BottomBarProfile({ href, path, title }: { href: string | UrlObject, path: string, title: string }) {
    const pathname = usePathname();
    const { data: session } = useSession()

    function btnIcon() {
        if (session?.user?.image) {
            return <Image src={session.user.image} width={50} height={50} alt="PFP" className="rounded-full w-6" />
        } else {
            return <FontAwesomeIcon icon={ pathname === path ? faUserSolid : faUserLight } className="text-xl" />
        }
    }

    return (
        <section
            className={ `flex group items-center justify-center text-sm ${pathname === path ? 'bottomBarBtnActive' : 'bottomBarBtnNonActive'}` }>
            <Link href={ href } className="flex flex-col items-center justify-around">
                {btnIcon()}
                <span>{ title }</span>
            </Link>
        </section>
    );
};