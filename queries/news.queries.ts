import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createNews, deleteNews, getAllNews, getNewsByID, updateNews} from "@/services/news.services";
import {NewsTypes} from "@/types/news.types";

const queryKey = ["admin", "news"];

// All News
export function useNews() {
    return useQuery({
        queryKey: queryKey,
        queryFn: getAllNews,
    });
}

// News By ID
export function useNewsByID(id: number) {
    return useQuery({
        queryKey: queryKey,
        queryFn: () => getNewsByID(id),
    })
}

// Create News
export function useCreateNews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNews,
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: queryKey,
        })
    });
}

// Update News
export function useUpdateNews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, news}: { id: number, news: NewsTypes }) => updateNews(id, news),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: queryKey,
        })
    });
}

// Delete News
export function useDeleteNews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNews,
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: queryKey,
        })
    });
}