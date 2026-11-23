import ArticleFormTemplate from "@/features/panels/author/article-form/templates/article-form.template";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  return <ArticleFormTemplate articleId={Number(id)} />;
}
