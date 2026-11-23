import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  getArticle,
  getCategories,
  updateArticle,
} from "@/features/panels/author/services/author-api.service";
import { getAuthorId } from "@/features/panels/author/helpers/author-config";
import type { ArticlePayload } from "@/features/panels/author/types/author.types";

export function useArticleFormData(articleId?: number) {
  const authorId = getAuthorId();

  const categories = useQuery({
    queryKey: ["author", "categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });

  const article = useQuery({
    queryKey: ["author", "article", authorId, articleId],
    queryFn: () => getArticle(articleId as number),
    enabled: Boolean(articleId),
  });

  return { categories, article };
}

export function useSaveArticle() {
  const queryClient = useQueryClient();
  const authorId = getAuthorId();

  return useMutation({
    mutationFn: ({ articleId, payload }: { articleId?: number; payload: ArticlePayload }) =>
      articleId ? updateArticle(articleId, payload) : createArticle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["author", "articles", authorId] });
      queryClient.invalidateQueries({ queryKey: ["author", "article", authorId] });
    },
  });
}
