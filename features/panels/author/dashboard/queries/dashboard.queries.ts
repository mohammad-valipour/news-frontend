import { useQuery } from "@tanstack/react-query";
import { getArticles } from "@/features/panels/author/services/author-api.service";
import { getAuthorId } from "@/features/panels/author/helpers/author-config";

export function useDashboardArticles() {
  const authorId = getAuthorId();

  return useQuery({
    queryKey: ["author", "articles", authorId],
    queryFn: getArticles,
    select: (articles) => articles.filter((article) => article.author_id === authorId),
  });
}
