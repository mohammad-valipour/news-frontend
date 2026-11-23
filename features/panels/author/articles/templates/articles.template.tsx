"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText, Plus, Search, Pencil, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ArticleStatusBadge from "@/features/panels/author/articles/components/article-status";
import { useAuthorArticles, useDeleteAuthorArticle } from "@/features/panels/author/articles/queries/articles.queries";
import { formatDate } from "@/features/panels/author/helpers/formatters";

export default function ArticlesTemplate() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const { data: articles = [], isLoading, isError, error, refetch } = useAuthorArticles();
  const deleteMutation = useDeleteAuthorArticle();

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return articles.filter((article) => {
      const matchesSearch = !term || article.title.toLocaleLowerCase().includes(term);
      const matchesStatus = status === "all" || article.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [articles, search, status]);

  function handleDelete(id: number, title: string) {
    if (window.confirm(`نوشته «${title}» حذف شود؟ این کار قابل بازگشت نیست.`)) {
      deleteMutation.mutate(id);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-black text-slate-900">نوشته‌های من</h2>
          <p className="mt-2 text-sm text-slate-500">نوشته‌ها و پیش‌نویس‌های خود را مدیریت کنید.</p>
        </div>
        <Button nativeButton={false} render={<Link href="/author/articles/new" />} className="h-10 rounded-xl bg-emerald-600 px-4 font-bold hover:bg-emerald-700">
          <Plus className="ml-2 size-4" /> نوشته جدید
        </Button>
      </div>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="جست‌وجو در عنوان نوشته‌ها…" className="h-11 rounded-xl pr-10" />
          </div>
          <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="فیلتر وضعیت" className="h-11 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 sm:w-48">
            <option value="all">همه وضعیت‌ها</option>
            <option value="published">منتشر شده</option>
            <option value="draft">پیش‌نویس</option>
          </select>
        </div>

        {isLoading ? (
          <div className="space-y-3 py-6">{[1, 2, 3, 4].map((x) => <div key={x} className="h-16 animate-pulse rounded-xl bg-slate-50" />)}</div>
        ) : isError ? (
          <div className="py-10 text-center">
            <p className="text-sm font-bold text-rose-700">دریافت نوشته‌ها ناموفق بود.</p>
            <p className="mt-2 text-xs text-slate-500">{error.message}</p>
            <Button onClick={() => refetch()} variant="outline" size="sm" className="mt-4"><RefreshCw className="ml-2 size-4" /> تلاش دوباره</Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-14 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><FileText className="size-5" /></span>
            <p className="mt-4 font-bold text-slate-800">{articles.length ? "نوشته‌ای با این مشخصات پیدا نشد" : "هنوز نوشته‌ای ثبت نکرده‌اید"}</p>
            <p className="mt-1 text-sm text-slate-500">{articles.length ? "عبارت جست‌وجو یا فیلتر را تغییر دهید." : "با نوشتن اولین مطلب، این بخش کامل می‌شود."}</p>
          </div>
        ) : (
          <>
            <div className="mt-5 hidden overflow-x-auto md:block">
              <table className="w-full min-w-[650px] text-right text-sm">
                <thead className="border-y border-slate-100 bg-slate-50/70 text-xs font-bold text-slate-500">
                  <tr>
                    <th className="px-4 py-4">عنوان نوشته</th>
                    <th className="px-4 py-4">وضعیت</th>
                    <th className="px-4 py-4">آخرین ویرایش</th>
                    <th className="px-4 py-4">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((article) => (
                    <tr key={article.id} className="transition hover:bg-slate-50/70">
                      <td className="max-w-[360px] px-4 py-4">
                        <p className="truncate font-bold text-slate-800">{article.title}</p>
                        <p className="mt-1 truncate text-xs text-slate-400">{article.slug}</p>
                      </td>
                      <td className="px-4 py-4"><ArticleStatusBadge status={article.status} /></td>
                      <td className="px-4 py-4 text-xs text-slate-500">{formatDate(article.updated_at)}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <Button nativeButton={false} render={<Link href={`/author/articles/${article.id}/edit`} />} size="icon" variant="ghost" aria-label="ویرایش" className="text-slate-500 hover:text-emerald-700"><Pencil className="size-4" /></Button>
                          <Button type="button" size="icon" variant="ghost" aria-label="حذف" disabled={deleteMutation.isPending} onClick={() => handleDelete(article.id, article.title)} className="text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 className="size-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3 md:hidden">
              {filtered.map((article) => (
                <article key={article.id} className="rounded-xl border border-slate-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold leading-6 text-slate-800">{article.title}</p>
                    <ArticleStatusBadge status={article.status} />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">آخرین ویرایش: {formatDate(article.updated_at)}</p>
                  <div className="mt-3 flex justify-end gap-2 border-t border-slate-100 pt-3">
                    <Button nativeButton={false} render={<Link href={`/author/articles/${article.id}/edit`} />} size="sm" variant="outline" className="rounded-lg"><Pencil className="ml-1 size-3.5" /> ویرایش</Button>
                    <Button type="button" size="sm" variant="ghost" disabled={deleteMutation.isPending} onClick={() => handleDelete(article.id, article.title)} className="rounded-lg text-rose-600 hover:bg-rose-50"><Trash2 className="ml-1 size-3.5" /> حذف</Button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
        {deleteMutation.isError ? <p role="alert" className="mt-4 text-xs text-rose-600">{deleteMutation.error.message}</p> : null}
      </section>
    </div>
  );
}
