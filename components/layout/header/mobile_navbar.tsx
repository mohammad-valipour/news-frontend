"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {HEADER} from "@/constants/header.constants";

export default function MobileNavbar() {
    const pathname = usePathname();

    return (
        <nav
            aria-label="ناوبری موبایل"
            className="
                fixed inset-x-0 bottom-2 z-50
                border border-border rounded-2xl
                bg-background/95 backdrop-blur-xl
                md:hidden mx-2
                pb-[env(safe-area-inset-bottom)]
            "
        >
            <ul className="grid grid-cols-4 items-center px-2 py-2">
                {
                    HEADER.navbar.map(item => {
                        const Icon = item.icon;

                        const active: boolean = pathname === item.url || (item.url !== "/" && pathname.startsWith(`${item.url}/`));

                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.url}
                                    aria-current={active ? "page" : undefined}
                                    className="flex flex-col items-center justify-center gap-1 py-2"
                                >
                                <span
                                    className={`${active
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground"}
                                        flex h-8 min-w-14 items-center
                                        justify-center rounded-full
                                        transition-all duration-200`}
                                >
                                    <Icon size={22} strokeWidth={active ? 2.3 : 1.8}/>
                                </span>

                                    <span
                                        className={`${active
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                        } text-[11px] font-medium`}
                                    >
                                    {item.label}
                                </span>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}