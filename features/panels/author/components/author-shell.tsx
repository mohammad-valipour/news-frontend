"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Newspaper, LogOut, Bell, ExternalLink } from "lucide-react";
import { AUTHOR_NAVIGATION } from "@/features/panels/author/constants/author.constants";

function isActive(pathname: string, href: string) {
  return href === "/author"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

function pageTitle(pathname: string) {
  if (pathname.startsWith("/author/articles/new")) return "نوشتن مطلب جدید";
  if (pathname.includes("/edit")) return "ویرایش مطلب";
  if (pathname.startsWith("/author/articles")) return "نوشته‌های من";
  if (pathname.startsWith("/author/profile")) return "پروفایل من";
  return "داشبورد نویسنده";
}

export default function AuthorShell({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-l">
          <div className="flex items-center justify-between px-4 py-5 lg:px-6">
            <Link href="/author" className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/20">
                <Newspaper className="size-5" />
              </span>
              <span>
                <span className="block text-base font-black">نیوز</span>
                <span className="mt-0.5 block text-xs text-slate-500">پنل نویسنده</span>
              </span>
            </Link>
            <Link href="/" target="_blank" className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="مشاهده سایت">
              <ExternalLink className="size-4" />
            </Link>
          </div>

          <div className="px-3 pb-4 lg:px-4">
            <p className="mb-2 hidden px-3 text-[11px] font-bold text-slate-400 lg:block">فضای کاری</p>
            <nav aria-label="منوی نویسنده" className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">
              {AUTHOR_NAVIGATION.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    } lg:w-full`}
                  >
                    <Icon className="size-[18px]" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mx-4 mt-2 hidden rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 lg:block">
            <p className="text-sm font-bold text-emerald-900">ایده‌ات را منتشر کن</p>
            <p className="mt-2 text-xs leading-6 text-emerald-800/80">
              نوشته‌های ارزشمندت را با مخاطبان نیوز به اشتراک بگذار.
            </p>
            <Link href="/author/articles/new" className="mt-3 inline-flex text-xs font-bold text-emerald-700 hover:text-emerald-900">
              نوشتن مطلب جدید
            </Link>
          </div>

          <div className="mt-auto hidden border-t border-slate-100 p-4 lg:block">
            <p className="text-xs text-slate-400">پنل محتوای نیوز</p>
            <p className="mt-1 text-xs text-slate-500">نسخه نویسندگان</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
            <div className="flex h-[68px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-[11px] font-medium text-slate-400">پنل نویسنده / نیوز</p>
                <h1 className="mt-1 text-sm font-extrabold text-slate-800">{pageTitle(pathname)}</h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 sm:inline-flex">
                  فضای نویسندگی
                </span>
                <button type="button" aria-label="اعلان‌ها" className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50">
                  <Bell className="size-4" />
                  <span className="absolute right-2 top-2 size-1.5 rounded-full bg-emerald-500" />
                </button>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
