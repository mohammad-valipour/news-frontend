import {apiClient} from "@/lib/api-client";
import {NewsTypes} from "@/types/news.types";

// Get All News
export async function getAll(): Promise<NewsTypes[]> {
    const response = await apiClient<NewsTypes[]>("/news");

    return response ?? [];
}


// Get News By ID
export async function getNewsByID(id: string): Promise<NewsTypes> {
    const response = await apiClient<NewsTypes>(`/news/${id}`);

    return response ?? [];
}