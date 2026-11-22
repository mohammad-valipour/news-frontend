
import {notFound} from "next/navigation";
import type {Metadata} from "next";

import CategoryNewsTemplate from "@/features/website/categories/templates/category_news.template";

import {getAll as getAllCategories} from "@/features/website/home/services/category.service";
import {getAll as getAllNews} from "@/features/website/home/services/news.service";

import {getCategoryNews} from "@/features/website/categories/helpers/category.helper";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// اطلاعات صفحه برای SEO
export async function generateMetadata({params}: CategoryPageProps): Promise<Metadata> {

    const {slug} = await params;

    const categories = await getAllCategories();

    const category = categories.find(item =>
        item.slug === slug
    );

    if (!category) {
        return {
            title: "دسته‌بندی پیدا نشد | نیوز",
        };
    }

    return {
        title: `${category.name} | نیوز`,
        description: `جدیدترین اخبار دسته‌بندی ${category.name}`,
    };
}

// صفحه اخبار دسته‌بندی
export default async function Category({params,}: CategoryPageProps) {

    const {slug} = await params;

    // دریافت دسته‌بندی‌ها و اخبار
    const [categories, allNews] = await Promise.all([
        getAllCategories(),
        getAllNews(),
    ]);

    // پیدا کردن دسته‌بندی با استفاده از slug
    const category = categories.find(item =>
        item.slug === slug
    );

    // اگر دسته‌بندی وجود نداشت
    if (!category) {
        notFound();
    }

    // دریافت اخبار دسته‌بندی
    const news = getCategoryNews(
        allNews,
        category.id
    );

    return (
        <CategoryNewsTemplate
            category={category}
            news={news}
        />
    );
}
