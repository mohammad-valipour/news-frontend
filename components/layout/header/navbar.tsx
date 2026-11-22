"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

import {HEADER} from "@/constants/header.constants";
import isActive from "@/lib/isActive";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav aria-label="منوی اصلی" className="hidden md:block">
            <ul className="flex items-center gap-8">
                {
                    HEADER.navbar.map(item => {
                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.url}
                                    className={`
                                    flex items-center gap-2
                                    py-2 text-sm font-medium
                                    transition-colors duration-200
                                    hover:text-primary
                                    ${isActive(item.url, pathname)
                                        ? "text-primary"
                                        : "text-muted-foreground"}
                                    `}
                                >
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}