import {useQuery} from "@tanstack/react-query";
import {getAll} from "@/features/website/home/services/news.service";

export function useNews() {
    return useQuery({
        queryKey: ["news"],
        queryFn: getAll,
        staleTime: 5 * 60 * 1000,
    });
}