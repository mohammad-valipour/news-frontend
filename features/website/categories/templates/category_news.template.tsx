
import Link from "next/link";
import {ArrowRight, Newspaper} from "lucide-react";

import {CategoryType} from "@/types/category.types";
import {NewsTypes} from "@/types/news.types";

import CategoryHero from "../components/category_hero";
import CategoryNewsList from "../components/category_news_list";
import EmptyNews from "../components/empty_news";

interface CategoryNewsTemplateProps {
    category: CategoryType;
    news: NewsTypes[];
}

export default function CategoryNewsTemplate({
                                                 category,
                                                 news,
                                             }: CategoryNewsTemplateProps) {

    return (
        <main className="
            container-page space-y-10
            py-8 sm:py-12
        ">

            {/* بازگشت به دسته‌بندی‌ها */}
            <Link
                href="/categories"
                className="
                    inline-flex items-center gap-2
                    text-sm text-muted-foreground
                    transition-colors hover:text-primary
                "
            >
                <ArrowRight size={17}/>
                همه دسته‌بندی‌ها
            </Link>

            {/* معرفی دسته‌بندی */}
            <CategoryHero
                title={category.name}
                description={`
                    جدیدترین اخبار منتشرشده
                    در دسته‌بندی ${category.name}
                `}
            />

            {/* اخبار */}
            <section className="space-y-6">

                <div className="
                    flex items-center justify-between
                    gap-3 border-b border-border
                    pb-5
                ">

                    <div className="flex items-center gap-3">

                        <div className="
                            flex size-11 items-center
                            justify-center rounded-xl
                            bg-primary/10 text-primary
                        ">
                            <Newspaper size={22}/>
                        </div>

                        <div>
                            <h2 className="
                                font-bold text-foreground
                            ">
                                اخبار {category.name}
                            </h2>

                            <p className="
                                mt-1 text-xs
                                text-muted-foreground
                            ">
                                {news.length.toLocaleString("fa-IR")}
                                {" "}خبر منتشرشده
                            </p>
                        </div>

                    </div>

                </div>

                {/* بررسی وجود خبر */}
                {news.length > 0 ? (

                    <CategoryNewsList news={news}/>

                ) : (

                    <EmptyNews/>

                )}

            </section>

        </main>
    );
}
