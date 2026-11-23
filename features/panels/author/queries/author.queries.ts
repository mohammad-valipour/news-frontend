import { useQuery } from "@tanstack/react-query";
import { getAuthorId } from "@/features/panels/author/helpers/author-config";
import { getAuthor } from "@/features/panels/author/services/author-api.service";

export function useAuthorProfile() {
  const authorId = getAuthorId();

  return useQuery({
    queryKey: ["author", "profile", authorId],
    queryFn: () => getAuthor(authorId),
  });
}
