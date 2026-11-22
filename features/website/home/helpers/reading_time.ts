export function getReadingTime(content: string): number {
    // حذف تگ‌های HTML
    const plainText = content.replace(/<[^>]*>/g, " ");

    // جدا کردن کلمات
    const words = plainText
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    // محاسبه زمان مطالعه
    return Math.max(1, Math.ceil(words.length / 200));
}