import {NewsFormValues} from "@/types/news.types";

export function validateNewsForm(values: NewsFormValues): string | null {
    if (!values.title.trim()) return "عنوان خبر را وارد کنید.";
    if (!values.slug.trim()) return "نشانی خبر (Slug) را وارد کنید.";
    if (!values.summary.trim()) return "خلاصه خبر را وارد کنید.";
    if (!values.content.trim()) return "متن خبر را وارد کنید.";
    if (!values.category_id || Number(values.category_id) < 1) return "یک دسته‌بندی انتخاب کنید.";
    if (!values.author_id || Number(values.author_id) < 1) return "یک نویسنده انتخاب کنید.";
    if (values.status !== "draft" && values.status !== "published") return "وضعیت خبر معتبر نیست.";
    return null;
}