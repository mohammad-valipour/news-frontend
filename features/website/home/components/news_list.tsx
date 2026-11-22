import {NewsTypes} from "@/types/news.types";
import Link from "next/link";
import {NewsCard} from "@/features/website/home/components/news_card";

interface NewsProps {
    news: NewsTypes[];
}

export default function NewsList({news}: NewsProps) {
    return (
        <ul className="space-y-3">
            {
                news.map(item =>
                    <li key={item.id}>
                        <Link href={`/news/${item.id}`}>
                            <NewsCard news={item}/>
                        </Link>
                    </li>
                )
            }
        </ul>
    );
}