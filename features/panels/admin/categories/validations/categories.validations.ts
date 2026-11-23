import {CategoryType} from "@/types/category.types";

export function validateCategory(values: CategoryType): string | null {
    if (!values.name.trim()) return "نام دسته‌بندی را وارد کنید.";
    if (!values.slug.trim()) return "نشانی دسته‌بندی (Slug) را وارد کنید.";
    return null;
}