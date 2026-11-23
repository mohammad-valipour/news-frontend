export type ArticleStatus = "draft" | "published";

export interface Author {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  status: ArticleStatus;
  category_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
}

export interface ArticlePayload {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  status: ArticleStatus;
  category_id: number;
  author_id: number;
}
