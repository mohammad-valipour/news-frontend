"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Save, Send, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useArticleFormData, useSaveArticle } from "@/features/panels/author/article-form/queries/article-form.queries";
import { validateArticle } from "@/features/panels/author/article-form/validations/article.validation";
import { getAuthorId } from "@/features/panels/author/helpers/author-config";
import type { ArticlePayload, ArticleStatus } from "@/features/panels/author/types/author.types";

interface ArticleFormTemplateProps {
  articleId?: number;
}

const emptyForm: ArticlePayload = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  image_url: "",
  status: "draft",
  category_id: 0,
  author_id: 0,
};

export default function ArticleFormTemplate({ articleId }: ArticleFormTemplateProps) {
  const router = useRouter();
  const { categories, article } = useArticleFormData(articleId);
  const saveMutation = useSaveArticle();
  const [form, setForm] = useState<ArticlePayload>(emptyForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (article.data) {
      setForm({
        title: article.data.title,
        slug: article.data.slug,
        summary: article.data.summary,
        content: article.data.content,
        image_url: article.data.image_url ?? "",
        status: article.data.status,
        category_id: article.data.category_id,
        author_id: article.data.author_id,
      });
    }
  }, [article.data]);

  function updateField<K extends keyof ArticlePayload>(key: K, value: ArticlePayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: current.slug || value.trim().replace(/\s+/g, "-"),
    }));
  }

  async function handleSave(status: ArticleStatus) {
    setFormError("");

    const payload: ArticlePayload = {
      ...form,
      status,
      author_id: getAuthorId(),
    };

    const validationError = validateArticle(payload);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      if (articleId && article.data?.author_id !== payload.author_id) {
        setFormError("شما اجازه ویرایش این نوشته را ندارید.");
        return;
      }

      await saveMutation.mutateAsync({ articleId, payload });
      router.push("/author/articles");
      router.refresh();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "ذخیره نوشته ناموفق بود.");
    }
  }

  if (articleId && article.isLoading) {
    return <div className="mx-auto max-w-4xl animate-pulse rounded-2xl bg-white p-8 text-slate-400">در حال دریافت نوشته…</div>;
  }

  if (articleId && (article.isError || !article.data)) {
    return <div className="mx-auto max-w-4xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">نوشته پیدا نشد یا دریافت آن با خطا مواجه شد. {article.error?.message}</div>;
  }

  if (articleId && article.data && article.data.author_id !== getAuthorId()) {
    return <div className="mx-auto max-w-4xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">شما اجازه ویرایش این نوشته را ندارید.</div>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/author/articles" aria-label="بازگشت به نوشته‌ها" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-50">
          <ArrowRight className="size-4" />
        </Link>
        <div>
          <h2 className="text-xl font-black text-slate-900">{articleId ? "ویرایش نوشته" : "نوشتن مطلب جدید"}</h2>
          <p className="mt-1 text-sm text-slate-500">جزئیات نوشته را کامل کنید و آن را ذخیره یا منتشر کنید.</p>
        </div>
      </div>

      <form onSubmit={(event) => {
        event.preventDefault();
        void handleSave(form.status);
      }} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5">
          <section className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
            <div>
              <label htmlFor="article-title" className="mb-2 block text-sm font-bold text-slate-700">عنوان نوشته <span className="text-rose-500">*</span></label>
              <Input id="article-title" value={form.title} onChange={(event) => handleTitleChange(event.target.value)} placeholder="عنوان جذاب و روشن بنویسید" className="h-12 rounded-xl text-base font-semibold" required />
            </div>
            <div>
              <label htmlFor="article-slug" className="mb-2 block text-sm font-bold text-slate-700">آدرس نوشته (Slug) <span className="text-rose-500">*</span></label>
              <Input id="article-slug" value={form.slug} onChange={(event) => updateField("slug", event.target.value)} placeholder="my-first-article" className="h-11 rounded-xl" dir="ltr" required />
              <p className="mt-1.5 text-[11px] text-slate-400">این مقدار در آدرس صفحه نوشته استفاده می‌شود.</p>
            </div>
            <div>
              <label htmlFor="article-summary" className="mb-2 block text-sm font-bold text-slate-700">خلاصه نوشته <span className="text-rose-500">*</span></label>
              <Textarea id="article-summary" value={form.summary} onChange={(event) => updateField("summary", event.target.value)} placeholder="در چند جمله بگویید این نوشته درباره چیست…" className="min-h-24 resize-y rounded-xl leading-7" required />
            </div>
            <div>
              <label htmlFor="article-content" className="mb-2 block text-sm font-bold text-slate-700">متن نوشته <span className="text-rose-500">*</span></label>
              <Textarea id="article-content" value={form.content} onChange={(event) => updateField("content", event.target.value)} placeholder="متن کامل نوشته را اینجا وارد کنید…" className="min-h-[320px] resize-y rounded-xl leading-8" required />
              <p className="mt-1.5 text-[11px] text-slate-400">در نسخه فعلی، متن به‌صورت ساده ارسال می‌شود؛ ویرایشگر غنی و آپلود فایل در API فعلی وجود ندارد.</p>
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30">
            <h3 className="font-extrabold text-slate-800">تنظیمات انتشار</h3>
            <div>
              <label htmlFor="article-category" className="mb-2 block text-xs font-bold text-slate-600">دسته‌بندی <span className="text-rose-500">*</span></label>
              <select id="article-category" value={form.category_id || ""} onChange={(event) => updateField("category_id", Number(event.target.value))} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15" required>
                <option value="">انتخاب دسته‌بندی</option>
                {(categories.data ?? []).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              {categories.isError ? <p className="mt-2 text-xs text-rose-600">{categories.error.message}</p> : null}
            </div>
            <div>
              <label htmlFor="article-image" className="mb-2 block text-xs font-bold text-slate-600">آدرس تصویر شاخص</label>
              <div className="relative">
                <ImagePlus className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input id="article-image" value={form.image_url} onChange={(event) => updateField("image_url", event.target.value)} placeholder="https://example.com/image.jpg" className="h-11 rounded-xl pr-9" dir="ltr" />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">فعلاً فقط آدرس تصویر پذیرفته می‌شود.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-bold text-slate-700">وضعیت نوشته</p>
              <p className="mt-1 text-xs leading-6 text-slate-500">می‌توانید نوشته را پیش‌نویس نگه دارید یا منتشر کنید.</p>
              <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${form.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                {form.status === "published" ? "منتشر شده" : "پیش‌نویس"}
              </span>
            </div>
          </section>

          <section className="space-y-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30">
            <Button type="button" disabled={saveMutation.isPending || categories.isLoading} onClick={() => void handleSave("published")} className="h-11 w-full rounded-xl bg-emerald-600 font-bold hover:bg-emerald-700">
              <Send className="ml-2 size-4" /> انتشار نوشته
            </Button>
            <Button type="button" variant="outline" disabled={saveMutation.isPending || categories.isLoading} onClick={() => void handleSave("draft")} className="h-11 w-full rounded-xl font-bold">
              <Save className="ml-2 size-4" /> ذخیره پیش‌نویس
            </Button>
            <p className="pt-1 text-center text-[11px] text-slate-400">{saveMutation.isPending ? "در حال ذخیره…" : "تغییرات پس از ذخیره در سرور ثبت می‌شوند."}</p>
          </section>
          {formError ? <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs leading-6 text-rose-700">{formError}</p> : null}
          {saveMutation.isError ? <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs leading-6 text-rose-700">{saveMutation.error.message}</p> : null}
        </aside>
      </form>
    </div>
  );
}
