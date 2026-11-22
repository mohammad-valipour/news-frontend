
import Link from "next/link";
import {ArrowLeft, Newspaper} from "lucide-react";
import {CategoryType} from "@/types/category.types";

interface CategoryCardProps {
    category: CategoryType;
    newsCount: number;
}

export default function CategoryCard({
                                         category,
                                         newsCount,
                                     }: CategoryCardProps) {

    return (
        <Link
            href={`/categories/${category.slug}`}
            className="
                group flex items-center gap-4
                rounded-2xl border border-border
                bg-surface p-5
                transition-all duration-300
                hover:-translate-y-1
                hover:border-primary/40
                hover:shadow-lg
            "
        >

            {/* آیکون */}
            <div className="
                flex size-14 shrink-0
                items-center justify-center
                rounded-2xl bg-primary/10
                text-primary transition-colors
                group-hover:bg-primary
                group-hover:text-white
            ">
                <Newspaper size={25}/>
            </div>

            {/* اطلاعات دسته‌بندی */}
            <div className="min-w-0 flex-1">

                <h2 className="
                    font-bold text-foreground
                    transition-colors
                    group-hover:text-primary
                ">
                    {category.name}
                </h2>

                <p className="
                    mt-2 text-xs text-muted-foreground
                ">
                    {newsCount.toLocaleString("fa-IR")} خبر منتشرشده
                </p>

            </div>

            {/* فلش */}
            <ArrowLeft
                size={20}
                className="
                    shrink-0 text-muted-foreground
                    transition-all
                    group-hover:-translate-x-1
                    group-hover:text-primary
                "
            />

        </Link>
    );
}
