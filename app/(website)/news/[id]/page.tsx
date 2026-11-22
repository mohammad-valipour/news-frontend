import {Metadata} from "next";
import {getAll, getNewsByID} from "@/features/website/home/services/news.service";
import {notFound} from "next/navigation";
import {getCategoryByID} from "@/features/website/home/services/category.service";
import {getUserByID} from "@/features/website/home/services/user.service";
import NewsDetailTemplate from "@/features/website/home/templates/news_detail.template";

interface NewsPageProps {
    params: Promise<{
        id: string;
    }>;
}

// تولید اطلاعات SEO
export async function generateMetadata({params}: NewsPageProps): Promise<Metadata> {
    const {id} = await params;

    const news = await getNewsByID(id);

    if (!news || news.status !== "published") {
        return {
            title: "خبر موردنظر پیدا نشد",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    return {
        title: news.title,
        description: news.summary,

        alternates: {
            canonical: `/news/${news.id}`,
        },

        openGraph: {
            title: news.title,
            description: news.summary,
            type: "article",
            publishedTime: news.created_at,
            modifiedTime: news.updated_at,
            images: news.image_url
                ? [news.image_url]
                : [],
        },

        twitter: {
            card: "summary_large_image",
            title: news.title,
            description: news.summary,
            images: news.image_url
                ? [news.image_url]
                : [],
        },
    };
}

// صفحه جزئیات خبر
export default async function NewsDetail({params}: NewsPageProps) {
    const {id} = await params;

    // دریافت خبر
    const news = await getNewsByID(id);

    // بررسی وجود و وضعیت خبر
    if (!news || news.status !== "published") {
        notFound();
    }

    // دریافت اطلاعات تکمیلی
    const [
        category,
        author,
        allNews,
    ] = await Promise.all([
        getCategoryByID(news.category_id),
        getUserByID(news.author_id),
        getAll(),
    ]);

    // انتخاب اخبار مرتبط
    const relatedNews = allNews
        .filter((item) =>
            item.status === "published" &&
            item.category_id === news.category_id &&
            item.id !== news.id
        )
        .sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        )
        .slice(0, 4);

    return (
        <NewsDetailTemplate
            news={news}
            category={category}
            author={author}
            relatedNews={relatedNews}
        />
    );
}