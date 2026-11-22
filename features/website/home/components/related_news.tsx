import Link from "next/link";
import {NewsTypes} from "@/types/news.types";

interface RelatedNewsProps {
    news: NewsTypes[];
}

export default function RelatedNews({news}: RelatedNewsProps) {
    if (news.length === 0) {
        return null;
    }

    return (
        <section className="space-y-5">

            <div className="flex items-center justify-between border-b border-border pb-3">
                <h2 className="text-lg font-bold text-foreground">
                    اخبار مرتبط
                </h2>

                <span className="text-xs text-muted-foreground">
                    مطالب بیشتر
                </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">

                {
                    news.map(item =>
                        <Link
                            key={item.id}
                            href={`/news/${item.id}`}
                            className="group flex gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-primary/40"
                        >
                            {
                                item.image_url &&
                                <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            }

                            <div className="flex min-w-0 flex-col justify-center gap-2">
                                <h3 className="line-clamp-2 text-sm font-semibold leading-7 text-foreground transition-colors group-hover:text-primary">
                                    {item.title}
                                </h3>

                                <span className="text-xs text-muted-foreground">
                                {new Date(item.created_at).toLocaleDateString("fa-IR")}
                            </span>
                            </div>
                        </Link>
                    )
                }

            </div>
        </section>
    );
}