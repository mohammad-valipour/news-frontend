"use client";

import Link from "next/link";
import type {ReactNode} from "react";
import {usePathname} from "next/navigation";
import {LayoutDashboard, Newspaper, PanelRight, ShieldCheck, Tags, Users} from "lucide-react";

export const ADMIN_NAVIGATION = [
    {label: "نمای کلی", href: "/admin", icon: LayoutDashboard},
    {label: "مدیریت اخبار", href: "/admin/news", icon: Newspaper},
    {label: "دسته‌بندی‌ها", href: "/admin/categories", icon: Tags},
    {label: "نویسندگان", href: "/admin/authors", icon: Users},
] as const;

export const NEWS_STATUS_LABELS: Record<"draft" | "published", string> = {
    draft: "پیش‌نویس",
    published: "منتشر شده",
};

export const AUTHOR_ROLE_LABELS: Record<string, string> = {
    admin: "مدیر",
    author: "نویسنده",
};

export const NEWS_STATUS_OPTIONS = [
    {value: "draft", label: "پیش‌نویس"},
    {value: "published", label: "منتشر شده"},
] as const;


function isActive(pathname: string, href: string) {
    if (href === "/admin") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
}

function getPageTitle(pathname: string) {
    if (pathname.startsWith("/admin/news")) return "مدیریت اخبار";
    if (pathname.startsWith("/admin/categories")) return "دسته‌بندی‌ها";
    if (pathname.startsWith("/admin/authors")) return "نویسندگان";
    return "نمای کلی";
}

export default function AdminShell({children}: Readonly<{ children: ReactNode }>) {
    const pathname = usePathname();

    return (
        <div dir="rtl" className="min-h-screen bg-muted/30 text-foreground">
            <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
                <aside
                    className="w-full shrink-0 border-b border-border bg-card lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-l">
                    <div className="flex items-center justify-between px-4 py-4 lg:px-5 lg:py-6">
                        <Link href="/admin" className="flex items-center gap-3">
                            <span
                                className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <Newspaper className="size-5"/>
                            </span>

                            <span>
                                <span className="block text-base font-extrabold">نیوز</span>
                                <span className="block text-xs text-muted-foreground">پنل مدیریت</span>
                            </span>
                        </Link>

                        <span className="hidden rounded-full bg-primary/10 p-2 text-primary lg:inline-flex">
                            <ShieldCheck className="size-4"/>
                        </span>
                    </div>

                    <div className="px-3 pb-3 lg:px-4 lg:pb-6">
                        <p className="mb-2 hidden px-3 text-[11px] font-semibold text-muted-foreground lg:block">
                            منوی اصلی
                        </p>
                        <nav aria-label="منوی مدیریت" className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">
                            {
                                ADMIN_NAVIGATION.map(item => {
                                    const Icon = item.icon;
                                    const active = isActive(pathname, item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            aria-current={active ? "page" : undefined}
                                            className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                                                active
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            }`}
                                        >
                                            <Icon className="size-4.5"/>
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                        </nav>
                    </div>

                    <div className="mx-4 mb-4 hidden rounded-xl border border-border bg-muted/50 p-3 lg:block">
                        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                            <PanelRight className="size-4 text-primary"/>
                            مدیریت محتوای نیوز
                        </div>
                        <p className="mt-2 text-xs leading-6 text-muted-foreground">
                            از این بخش می‌توانید خبرها، دسته‌بندی‌ها و نویسندگان را مدیریت کنید.
                        </p>
                    </div>
                </aside>

                <div className="min-w-0 flex-1">
                    <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
                </div>
            </div>
        </div>
    );
}
