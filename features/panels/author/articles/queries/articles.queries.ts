import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteArticle, getArticles } from "@/features/panels/author/services/author-api.service";
import { getAuthorId } from "@/features/panels/author/helpers/author-config";

export function useAuthorArticles() {
  const authorId = getAuthorId();

  return useQuery({
    queryKey: ["author", "articles", authorId],
    queryFn: getArticles,
    select: (articles) => articles.filter((article) => article.author_id === authorId),
  });
}

export function useDeleteAuthorArticle() {
  const queryClient = useQueryClient();
  const authorId = getAuthorId();

  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["author", "articles", authorId] });
      queryClient.invalidateQueries({ queryKey: ["author", "article", authorId] });
    },
  });
}
