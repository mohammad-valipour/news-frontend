"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, FileText, FileCheck2, FilePenLine, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/features/panels/author/dashboard/components/stat-card";
import { useDashboardArticles } from "@/features/panels/author/dashboard/queries/dashboard.queries";
import { formatDate } from "@/features/panels/author/helpers/formatters";

export default function DashboardTemplate() {
  const { data: articles = [], isLoading, isError, error, refetch, isFetching } = useDashboardArticles();

  const published = articles.filter((item) => item.status === "published").length;
  const drafts = articles.filter((item) => item.status === "draft").length;
  const recent = [...articles].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  ).slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-emerald-800 via-emerald-700 to-teal-600 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-8">
        <div className="pointer-events-none absolute -left-12 -top-20 size-64 rounded-full border-[35px] border-white/5" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-emerald-100">اتاق نویسندگی شما</p>
            <h2 className="mt-3 text-2xl font-black leading-relaxed sm:text-3xl">سلام، وقت خلق یک داستان تازه است!</h2>
            <p className="mt-2 text-sm leading-7 text-emerald-50/90">
              نوشته‌هایت را مدیریت کن، پیشرفتت را ببین و ایده بعدی‌ات را با خوانندگان به اشتراک بگذار.
            </p>
          </div>
          <Button nativeButton={false} render={<Link href="/author/articles/new" />} className="h-11 shrink-0 rounded-xl bg-white px-5 font-bold text-emerald-800 hover:bg-emerald-50">
            <Plus className="ml-1 size-4" />
            نوشتن مطلب جدید
          </Button>
        </div>
      </section>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-36 animate-pulse rounded-2xl bg-white" />)}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          <p className="font-bold">دریافت آمار با خطا مواجه شد.</p>
          <p className="mt-1">{error.message}</p>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="mt-3">
            <RefreshCw className="ml-2 size-4" /> تلاش دوباره
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard title="همه نوشته‌ها" value={articles.length} note="تمام نوشته‌های ثبت‌شده شما" icon={FileText} iconClass="bg-sky-50 text-sky-700" />
          <StatCard title="منتشر شده" value={published} note="نوشته‌های قابل مشاهده در سایت" icon={FileCheck2} iconClass="bg-emerald-50 text-emerald-700" />
          <StatCard title="پیش‌نویس‌ها" value={drafts} note="نوشته‌هایی که هنوز منتشر نشده‌اند" icon={FilePenLine} iconClass="bg-amber-50 text-amber-700" />
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
          <div>
            <h3 className="font-extrabold text-slate-900">آخرین نوشته‌ها</h3>
            <p className="mt-1 text-xs text-slate-400">آخرین مطالبی که ویرایش کرده‌اید</p>
          </div>
          <Link href="/author/articles" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900">
            مشاهده همه <ArrowLeft className="size-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3 p-5">{[1, 2, 3].map((x) => <div key={x} className="h-12 animate-pulse rounded-xl bg-slate-50" />)}</div>
        ) : isError ? null : recent.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><FileText className="size-5" /></span>
            <p className="mt-4 font-bold text-slate-800">هنوز نوشته‌ای ندارید</p>
            <p className="mt-1 text-sm text-slate-500">اولین مطلب خود را بنویسید و ذخیره کنید.</p>
            <Button nativeButton={false} render={<Link href="/author/articles/new" />} className="mt-4 rounded-xl bg-emerald-600 hover:bg-emerald-700">
              <Plus className="ml-2 size-4" /> ایجاد اولین نوشته
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recent.map((article) => (
              <div key={article.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition hover:bg-slate-50/70 sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">{article.title}</p>
                  <p className="mt-1 text-xs text-slate-400">آخرین ویرایش: {formatDate(article.updated_at)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${article.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {article.status === "published" ? "منتشر شده" : "پیش‌نویس"}
                  </span>
                  <Link href={`/author/articles/${article.id}/edit`} aria-label={`ویرایش ${article.title}`} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-700">
                    <ArrowUpLeft className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {isFetching && !isLoading ? <p className="px-6 pb-3 text-[11px] text-slate-400">در حال به‌روزرسانی…</p> : null}
      </section>
    </div>
  );
}
