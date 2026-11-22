import Link from "next/link";
import {NewsTypes} from "@/types/news.types";
import {CategoryType} from "@/types/category.types";
import {UserTypes} from "@/types/user.types";
import {getReadingTime} from "@/features/website/home/helpers/reading_time";
import {formatDate} from "@/features/website/home/helpers/format_date";

interface NewsHeaderProps {
    news: NewsTypes;
    category: CategoryType | null;
    author: UserTypes | null;
}

export default function NewsHeader({news, category, author}: NewsHeaderProps) {
    const authorName = author
        ? `${author.first_name} ${author.last_name}`
        : "تحریریه";

    const readingTime = getReadingTime(news.content);

    return (
        <header className="space-y-5">

            {/* مسیر راهنما */}
            <nav
                aria-label="مسیر صفحه"
                className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
                <Link
                    href="/"
                    className="transition-colors hover:text-primary"
                >
                    خانه
                </Link>

                <span>/</span>

                <span className="text-foreground">
                    {category?.name || "اخبار"}
                </span>
            </nav>

            {/* دسته‌بندی */}
            {
                category &&
                <div>
                    <span className="inline-flex rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                        {category.name}
                    </span>
                </div>
            }

            {/* عنوان */}
            <h1 className="text-2xl font-extrabold leading-[1.8] text-foreground sm:text-3xl lg:text-4xl">
                {news.title}
            </h1>

            {/* خلاصه */}
            {
                news.summary &&
                <p className="text-base leading-9 text-muted-foreground sm:text-lg">
                    {news.summary}
                </p>
            }

            {/* اطلاعات انتشار */}
            <div
                className="flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-border py-4 text-sm text-muted-foreground">

                <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                        نویسنده:
                    </span>

                    <span>{authorName}</span>
                </div>

                <span className="hidden h-4 w-px bg-border sm:block"/>

                <div>
                    {formatDate(news.created_at)}
                </div>

                <span className="hidden h-4 w-px bg-border sm:block"/>

                <div>
                    {readingTime} دقیقه مطالعه
                </div>

            </div>
        </header>
    );
}