'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UrlObject } from "node:url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function Page({ href, path, title, iconSolid, iconLight }: { href: string | UrlObject, path: string, title: string, iconSolid: IconDefinition, iconLight: IconDefinition }) {
    const pathname = usePathname();

    return (
        <section
            className={ `flex group items-center justify-center text-sm ${pathname === path ? 'bottomBarBtnActive' : 'bottomBarBtnNonActive'}` }>
            <Link href={ href } className="flex flex-col items-center justify-around">
                <FontAwesomeIcon icon={ pathname === path ? iconSolid : iconLight } className="text-xl" />
                <span>{ title }</span>
            </Link>
        </section>
    );
};