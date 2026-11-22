
import {CategoryType} from "@/types/category.types";
import CategoryCard from "./category_card";

interface CategoryGridProps {
    categories: CategoryType[];
    newsCounts: Record<number, number>;
}

export default function CategoryGrid({
                                         categories,
                                         newsCounts,
                                     }: CategoryGridProps) {

    if (categories.length === 0) {
        return (
            <div className="
                rounded-2xl border border-border
                bg-surface p-10 text-center
            ">
                <p className="text-muted-foreground">
                    هنوز دسته‌بندی‌ای ثبت نشده است.
                </p>
            </div>
        );
    }

    return (
        <div className="
            grid gap-4
            sm:grid-cols-2
            lg:grid-cols-3
        ">

            {categories.map(category => (

                <CategoryCard
                    key={category.id}
                    category={category}
                    newsCount={newsCounts[category.id] ?? 0}
                />

            ))}

        </div>
    );
}
