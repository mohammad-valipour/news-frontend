import {apiClient} from "@/lib/api-client";
import {NewsTypes} from "@/types/news.types";

// Get All News
export async function getAllNews(): Promise<NewsTypes[]> {
    return await apiClient<NewsTypes[]>(`/news`);
}

// Get News By ID
export async function getNewsByID(id: number): Promise<NewsTypes> {
    return await apiClient<NewsTypes>(`/news/${id}`);
}

// Create News
export async function createNews(news: NewsTypes): Promise<NewsTypes> {
    return await apiClient<NewsTypes>(`/news`);
}

// Update News
export async function updateNews(id: number, news: NewsTypes): Promise<NewsTypes> {
    return await apiClient<NewsTypes>(`/news/${id}`);
}

// Delete News
export async function deleteNews(id: number) {
    return await apiClient(`/news/${id}`);
}