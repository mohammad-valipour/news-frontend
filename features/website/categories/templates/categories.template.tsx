
import {CategoryType} from "@/types/category.types";
import {NewsTypes} from "@/types/news.types";

import CategoryHero from "../components/category_hero";
import CategoryGrid from "../components/category_grid";

interface CategoriesTemplateProps {
    categories: CategoryType[];
    news: NewsTypes[];
}

export default function CategoriesTemplate({
                                               categories,
                                               news,
                                           }: CategoriesTemplateProps) {

    // محاسبه تعداد اخبار هر دسته‌بندی
    const newsCounts: Record<number, number> = {};

    categories.forEach(category => {

        newsCounts[category.id] = news.filter(item =>
            item.category_id === category.id &&
            item.status === "published"
        ).length;

    });

    return (
        <main className="container-page space-y-10 py-8 sm:py-12">

            {/* معرفی صفحه */}
            <CategoryHero
                title="دسته‌بندی اخبار"
                description="
                    اخبار مورد علاقه خود را به‌راحتی پیدا کنید.
                    یک دسته‌بندی را انتخاب کنید و جدیدترین
                    اخبار مربوط به آن را بخوانید.
                "
            />

            {/* عنوان بخش */}
            <section className="space-y-6">

                <div className="
                    flex items-center justify-between
                    gap-3
                ">

                    <div>
                        <h2 className="
                            text-xl font-bold text-foreground
                        ">
                            همه دسته‌بندی‌ها
                        </h2>

                        <p className="
                            mt-2 text-sm text-muted-foreground
                        ">
                            {categories.length.toLocaleString("fa-IR")}
                            {" "}دسته‌بندی موجود است
                        </p>
                    </div>

                </div>

                {/* لیست دسته‌بندی‌ها */}
                <CategoryGrid
                    categories={categories}
                    newsCounts={newsCounts}
                />

            </section>

        </main>
    );
}
