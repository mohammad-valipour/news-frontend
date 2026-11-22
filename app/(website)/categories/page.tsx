
import CategoriesTemplate from "@/features/website/categories/templates/categories.template";

import {getAll as getAllCategories} from "@/features/website/home/services/category.service";
import {getAll as getAllNews} from "@/features/website/home/services/news.service";

export const metadata = {
    title: "دسته‌بندی اخبار | نیوز",
    description: "مشاهده تمام دسته‌بندی‌های اخبار در نیوز",
};

export default async function Categories() {

    // دریافت دسته‌بندی‌ها و اخبار
    const [categories, news] = await Promise.all([
        getAllCategories(),
        getAllNews(),
    ]);

    return (
        <CategoriesTemplate
            categories={categories}
            news={news}
        />
    );
}
