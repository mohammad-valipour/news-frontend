"use client";

import {useNews} from "@/features/website/home/queries/news.queries";
import {useState} from "react";
import {Loader2, RefreshCw} from "lucide-react";
import NewsList from "@/features/website/home/components/news_list";
import NewsPagination from "@/features/website/home/components/news_pagination";

const PAGE_SIZE = 10;

export default function NewsSection() {
    const {data: news, isLoading, isError, refetch} = useNews();
    const [currentPage, setCurrentPage] = useState(1);

    const allNews = news ?? [];
    const totalPages = Math.ceil(allNews.length / PAGE_SIZE);
    const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

    const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;
    const currentNews = allNews.slice(startIndex, startIndex + PAGE_SIZE);

    function handlePageChange(page: number) {
        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    if (isLoading) {
        return (
            <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
                <Loader2 size={16} className="animate-spin"/>
                در حال دریافت اطلاعات...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-2">
                <p className="text-md text-destructive">
                    دریافت اطلاعات ناموفق بود.
                </p>

                <button
                    type="button"
                    onClick={() => refetch()}
                    className="flex items-center gap-2 text-md text-primary"
                >
                    <RefreshCw size={14}/>
                    تلاش مجدد
                </button>
            </div>
        );
    }

    if (allNews.length === 0) {
        return (
            <p className="py-10 text-center text-sm text-muted-foreground">
                خبری برای نمایش وجود ندارد.
            </p>
        );
    }

    return (
        <section>
            <NewsList news={currentNews}/>

            <NewsPagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </section>
    );
}
