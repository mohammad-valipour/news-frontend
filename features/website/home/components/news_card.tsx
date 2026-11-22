import Image from "next/image";
import {Bookmark, CalendarDays, Clock3, Share2} from "lucide-react";
import {Card} from "@/components/ui/card";
import {NewsTypes} from "@/types/news.types";

interface NewsCardProps {
    news: NewsTypes;
    readingTime?: number;
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
}

export function NewsCard({news, readingTime = 3}: NewsCardProps) {
    return (
        <Card
            className="group overflow-hidden border-border bg-card p-3 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
            <div className="flex flex-row-reverse items-stretch gap-4 sm:gap-5">
                {/* تصویر خبر */}
                <div className="relative aspect-4/3 w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:w-44 md:w-52">
                    {
                        news.image_url ?
                            <Image
                                src={news.image_url}
                                alt={news.title}
                                fill
                                sizes="(max-width: 640px) 112px, (max-width: 768px) 176px, 208px"
                                className="object-cover transition-transform duration-500"
                            />
                            :
                            <div className="flex h-full items-center justify-center">
                                <span className="text-xs text-muted-foreground">
                                    بدون تصویر
                                </span>
                            </div>

                    }
                </div>

                {/* محتوای خبر */}
                <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                    <div className="space-y-2">
                        <h3 className="line-clamp-2 text-sm font-bold leading-7 text-foreground transition-colors group-hover:text-primary sm:text-base md:text-lg">
                            {news.title}
                        </h3>

                        <p className="line-clamp-1 text-xs leading-6 text-muted-foreground sm:text-sm">
                            {news.summary}
                        </p>
                    </div>

                    {/* اطلاعات و عملیات */}
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div
                            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground sm:text-xs">
                            <span className="flex items-center gap-1.5">
                                <CalendarDays className="size-3.5"/>
                                {formatDate(news.created_at)}
                            </span>

                            <span className="flex items-center gap-1.5">
                                <Clock3 className="size-3.5"/>
                                {readingTime} دقیقه مطالعه
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                aria-label="ذخیره خبر"
                                title="ذخیره خبر"
                                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                            >
                                <Bookmark className="size-4"/>
                            </button>

                            <button
                                type="button"
                                aria-label="اشتراک‌گذاری خبر"
                                title="اشتراک‌گذاری خبر"
                                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                            >
                                <Share2 className="size-4"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
