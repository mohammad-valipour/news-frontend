import type { ArticlePayload } from "@/features/panels/author/types/author.types";

export function validateArticle(payload: ArticlePayload): string | null {
  if (!payload.title.trim()) return "عنوان نوشته را وارد کنید.";
  if (!payload.slug.trim()) return "آدرس نوشته را وارد کنید.";
  if (!payload.summary.trim()) return "خلاصه نوشته را وارد کنید.";
  if (!payload.content.trim()) return "متن نوشته را وارد کنید.";
  if (!payload.category_id) return "یک دسته‌بندی انتخاب کنید.";
  return null;
}
