
import {NewsTypes} from "@/types/news.types";

export function getCategoryNews(
    news: NewsTypes[],
    categoryId: number
): NewsTypes[] {

    return news
        .filter(item =>
            item.category_id === categoryId &&
            item.status === "published"
        )
        .sort((a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
}
