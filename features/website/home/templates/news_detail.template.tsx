import {NewsTypes} from "@/types/news.types";
import {CategoryType} from "@/types/category.types";
import {UserTypes} from "@/types/user.types";
import NewsHeader from "@/features/website/home/components/news_header";
import NewsImage from "@/features/website/home/components/news_image";
import NewsShare from "@/features/website/home/components/news_share";
import NewsContent from "@/features/website/home/components/news_content";
import RelatedNews from "@/features/website/home/components/related_news";

interface NewsDetailTemplateProps {
    news: NewsTypes;
    category: CategoryType | null;
    author: UserTypes | null;
    relatedNews: NewsTypes[];
}

export default function NewsDetailTemplate({news, category, author, relatedNews}: NewsDetailTemplateProps) {
    return (
        <main
            dir="rtl"
            className="min-h-screen bg-background"
        >
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

                    {/* محتوای اصلی خبر */}
                    <article className="min-w-0 space-y-7 lg:col-span-8">

                        <NewsHeader
                            news={news}
                            category={category}
                            author={author}
                        />

                        <NewsImage
                            src={news.image_url}
                            alt={news.title}
                        />

                        <NewsContent content={news.content} />

                        <NewsShare title={news.title} />

                    </article>

                    {/* ستون اخبار مرتبط */}
                    <aside className="min-w-0 lg:col-span-4">
                        <div className="space-y-8 lg:sticky lg:top-8">
                            <RelatedNews news={relatedNews} />
                        </div>
                    </aside>

                </div>

            </div>
        </main>
    );
}