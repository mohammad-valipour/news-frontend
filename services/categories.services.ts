import {CategoryType} from "@/types/category.types";
import {apiClient} from "@/lib/api-client";

// Get All Categories
export async function getAllCategories(): Promise<CategoryType[]> {
    return await apiClient<CategoryType[]>(`/categories`);
}

// Create Category
export async function createCategory(category: CategoryType): Promise<CategoryType> {
    return await apiClient<CategoryType>(`/categories`);
}