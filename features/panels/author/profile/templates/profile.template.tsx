"use client";

import { Mail, CalendarDays, ShieldCheck, UserRound } from "lucide-react";
import { useAuthorProfile } from "@/features/panels/author/profile/queries/profile.queries";
import { formatDate } from "@/features/panels/author/helpers/formatters";

export default function ProfileTemplate() {
  const { data: author, isLoading, isError, error, refetch } = useAuthorProfile();

  if (isLoading) {
    return <div className="mx-auto max-w-4xl animate-pulse rounded-3xl bg-white p-8 text-slate-400">در حال دریافت پروفایل…</div>;
  }

  if (isError || !author) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        دریافت اطلاعات پروفایل ناموفق بود. {error?.message}
        <button type="button" onClick={() => refetch()} className="mr-3 font-bold underline">تلاش دوباره</button>
      </div>
    );
  }

  const fullName = `${author.first_name} ${author.last_name}`.trim();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900">پروفایل من</h2>
        <p className="mt-2 text-sm text-slate-500">اطلاعات حساب کاربری نویسنده</p>
      </div>

      <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30">
        <div className="h-32 bg-gradient-to-l from-emerald-800 via-emerald-600 to-teal-500" />
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
            <span className="flex size-20 items-center justify-center rounded-3xl border-4 border-white bg-emerald-50 text-emerald-700 shadow-sm">
              <UserRound className="size-9" />
            </span>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
              <ShieldCheck className="size-4" /> حساب نویسنده
            </span>
          </div>
          <h3 className="mt-4 text-xl font-black text-slate-900">{fullName || "نویسنده نیوز"}</h3>
          <p className="mt-1 text-sm text-slate-500">عضو نیوز از {formatDate(author.created_at)}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white text-slate-500"><Mail className="size-4" /></span>
              <div className="min-w-0">
                <p className="text-[11px] text-slate-400">ایمیل</p>
                <p className="mt-1 truncate text-sm font-semibold text-slate-800" dir="ltr">{author.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white text-slate-500"><CalendarDays className="size-4" /></span>
              <div>
                <p className="text-[11px] text-slate-400">تاریخ عضویت</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{formatDate(author.created_at)}</p>
              </div>
            </div>
          </div>
          <p className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs leading-6 text-amber-800">
            در API فعلی امکان ویرایش اطلاعات پروفایل یا تغییر رمز عبور وجود ندارد؛ به همین دلیل این صفحه فعلاً فقط اطلاعات حساب را نمایش می‌دهد.
          </p>
        </div>
      </section>
    </div>
  );
}
