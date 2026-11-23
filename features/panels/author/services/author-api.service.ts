import type {
  Article,
  ArticlePayload,
  Author,
  Category,
} from "@/features/panels/author/types/author.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    throw new Error("آدرس API تنظیم نشده است. مقدار NEXT_PUBLIC_API_URL را در .env.local قرار دهید.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  if (response.status === 204) return undefined as T;

  const result = await response.json().catch(() => null) as
    | T
    | { message?: unknown }
    | null;

  if (!response.ok) {
    const body = result as { message?: unknown } | null;
    const message =
      typeof body?.message === "string"
        ? body.message
        : `خطا در ارتباط با سرور (${response.status})`;

    throw new Error(message);
  }

  return result as T;
}

export async function getArticles(): Promise<Article[]> {
  return (await request<Article[] | null>("/news")) ?? [];
}

export function getArticle(id: number): Promise<Article> {
  return request<Article>(`/news/${id}`);
}

export async function getCategories(): Promise<Category[]> {
  return (await request<Category[] | null>("/categories")) ?? [];
}

export function getAuthor(id: number): Promise<Author> {
  return request<Author>(`/users/${id}`);
}

export function createArticle(payload: ArticlePayload): Promise<Article> {
  return request<Article>("/news", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateArticle(id: number, payload: ArticlePayload): Promise<Article> {
  return request<Article>(`/news/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteArticle(id: number): Promise<void> {
  return request<void>(`/news/${id}`, { method: "DELETE" });
}
