import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createCategory, getAllCategories} from "@/services/categories.services";
import {CategoryType} from "@/types/category.types";

const queryKey = ["admin", "categories"];

// All Categories
export function useCategories() {
    return useQuery({
        queryKey: queryKey,
        queryFn: getAllCategories,
    })
}

// Create Category
export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (category: CategoryType) => createCategory(category),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: queryKey,
        })
    })
}