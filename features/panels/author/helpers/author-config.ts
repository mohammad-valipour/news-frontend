export function getAuthorId(): number {
  const value = Number(process.env.NEXT_PUBLIC_AUTHOR_ID);

  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      "شناسه نویسنده تنظیم نشده است. مقدار NEXT_PUBLIC_AUTHOR_ID را در فایل .env.local قرار دهید."
    );
  }

  return value;
}
