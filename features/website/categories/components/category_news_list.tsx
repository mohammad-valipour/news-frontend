
import Link from "next/link";
import {NewsTypes} from "@/types/news.types";
import {NewsCard} from "@/features/website/home/components/news_card";

interface CategoryNewsListProps {
    news: NewsTypes[];
}

export default function CategoryNewsList({
                                             news,
                                         }: CategoryNewsListProps) {

    return (
        <div className="space-y-4">

            {news.map(item => (

                <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="block"
                >
                    <NewsCard news={item}/>
                </Link>

            ))}

        </div>
    );
}
