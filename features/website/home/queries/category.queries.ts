import {useQuery} from "@tanstack/react-query";
import {getAll} from "@/features/website/home/services/category.service";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAll,
        staleTime: 5 * 60 * 1000,
    });
}