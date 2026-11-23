import {NewsStatus} from "@/features/panels/admin/types/admin.types";

export interface NewsTypes {
    id?: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    status: "draft" | "published";
    category_id: number;
    author_id: number;
    created_at?: string;
    updated_at?: string;
}

export interface NewsFormValues {
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    status: NewsStatus;
    category_id: number;
    author_id: number;
}