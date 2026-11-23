import {useQuery} from "@tanstack/react-query";
import {getAllAuthors} from "@/services/authors.services";

export function useAuthors() {
    return useQuery({
        queryKey: ["admin", "author"],
        queryFn: getAllAuthors,
    })
}