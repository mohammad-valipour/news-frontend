import {CategoryType} from "@/types/category.types";
import {apiClient} from "@/lib/api-client";

// Get All Categories
export async function getAll(): Promise<CategoryType[]> {
    const response = await apiClient<CategoryType[] | null>("/categories");

    return response ?? [];
}

// Get Category By ID
export async function getCategoryByID(id: number): Promise<CategoryType> {
    const response = await apiClient<CategoryType>(`/categories/${id}`);

    return response ?? [];
}