"use client";

import {useEffect, useState, type FormEvent} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {ArrowRight, Save} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import Error_state from "@/components/share/error_state";
import {validateNewsForm} from "@/features/panels/admin/validations/admin.validation";
import Admin_page_header from "@/components/share/admin_page_header";
import {NEWS_STATUS_OPTIONS} from "@/features/panels/admin/constants/admin.constants";
import {useCreateNews, useNewsByID, useUpdateNews} from "@/queries/news.queries";
import {useCategories} from "@/queries/categories.queries";
import {useAuthors} from "@/queries/authors.queries";
import {NewsFormValues, NewsTypes} from "@/types/news.types";
import {CategoryType} from "@/types/category.types";
import {UserTypes} from "@/types/user.types";
import {NewsStatus} from "@/features/panels/admin/types/admin.types";

const emptyForm: NewsFormValues = {
    title: "",
    slug: "",
    summary: "",
    content: "",
    image_url: "",
    status: "draft",
    category_id: 1,
    author_id: 1,
};

interface NewsFormTemplateProps {
    newsID?: number
}

export default function NewsFormTemplate({newsID}: NewsFormTemplateProps) {
    const router = useRouter();

    const editing: boolean = newsID !== undefined;

    const newsQuery = useNewsByID(newsID!);
    const categoriesQuery = useCategories();
    const authorsQuery = useAuthors();
    const createNews = useCreateNews();
    const updateNews = useUpdateNews();


    const categories: CategoryType[] = categoriesQuery.data ?? [];
    const authors: UserTypes[] = authorsQuery.data ?? [];
    const isSaving: boolean = createNews.isPending || updateNews.isPending;
    const serverError: Error | null = createNews.error || updateNews.error;

    const [values, setValues] = useState<NewsFormValues>(emptyForm);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (!newsQuery.data) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValues({
            title: newsQuery.data.title,
            slug: newsQuery.data.slug,
            summary: newsQuery.data.summary,
            content: newsQuery.data.content,
            image_url: newsQuery.data.image_url ?? "",
            status: newsQuery.data.status,
            category_id: newsQuery.data.category_id,
            author_id: newsQuery.data.author_id,
        });
    }, [newsQuery.data]);

    if (editing && newsID && newsID < 1) return <Error_state message="شناسه خبر معتبر نیست."/>;
    if (editing && newsQuery.isLoading) return <p className="py-20 text-center text-sm text-muted-foreground">در حال
        دریافت اطلاعات خبر...</p>;
    if (editing && newsQuery.error) return <Error_state message={newsQuery.error.message}
                                                        onRetry={() => newsQuery.refetch()}/>;


    function updateField<K extends keyof NewsFormValues>(field: K, value: NewsFormValues[K]) {
        setValues((current) => ({...current, [field]: value}));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormError("");

        const validationError = validateNewsForm(values);
        if (validationError) {
            setFormError(validationError);
            return;
        }

        const news: NewsTypes = {
            title: values.title.trim(),
            slug: values.slug.trim(),
            summary: values.summary.trim(),
            content: values.content.trim(),
            image_url: values.image_url.trim(),
            status: values.status,
            category_id: values.category_id,
            author_id: values.author_id,
        };

        const onSuccess = () => router.push("/admin/news");

        if (editing && newsID) {
            updateNews.mutate({id: newsID, news}, {onSuccess});
        } else {
            createNews.mutate(news, {onSuccess});
        }
    }

    if (categoriesQuery.isLoading || authorsQuery.isLoading) return <p
        className="py-20 text-center text-sm text-muted-foreground">در حال آماده‌سازی فرم...</p>;
    if (categoriesQuery.error || authorsQuery.error) {
        const error = categoriesQuery.error || authorsQuery.error;
        return <Error_state message={error!.message}/>;
    }

    return (
        <>
            <Admin_page_header
                title={editing ? "ویرایش خبر" : "افزودن خبر جدید"}
                description="اطلاعات خبر را وارد کنید و سپس آن را ذخیره کنید."
                action={
                    <Button nativeButton={false} render={<Link href="/admin/news"/>} variant="outline">
                        <ArrowRight className="size-4"/>
                        بازگشت به خبرها
                    </Button>
                }
            />

            <Card className="border border-border bg-card shadow-none">
                <CardHeader className="border-b border-border px-5 py-4">
                    <CardTitle>اطلاعات خبر</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="news-title" className="text-sm font-medium">
                                    عنوان خبر
                                    <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    id="news-title"
                                    value={values.title}
                                    onChange={(event) => updateField("title", event.target.value)}
                                    placeholder="عنوان خبر را بنویسید"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="news-slug" className="text-sm font-medium">
                                    نشانی خبر (Slug)
                                    <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    id="news-slug"
                                    value={values.slug}
                                    onChange={(event) => updateField("slug", event.target.value)} dir="ltr"
                                    placeholder="news-title"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="news-category" className="text-sm font-medium">
                                    دسته‌بندی
                                    <span className="text-destructive">*</span>
                                </label>
                                <Select
                                    id="news-category"
                                    value={values.category_id}
                                    onChange={(event) => updateField("category_id", +event.target.value)}
                                >
                                    <option value="">انتخاب دسته‌بندی</option>
                                    {
                                        categories.map(category =>
                                            <option
                                                key={category.id}
                                                value={category.id}>
                                                {category.name}
                                            </option>)
                                    }
                                </Select>

                                {
                                    categories.length === 0 &&
                                    <p className="text-xs text-amber-700">ابتدا یک دسته‌بندی بسازید.</p>
                                }

                            </div>
                            <div className="space-y-2">
                                <label htmlFor="news-author" className="text-sm font-medium">
                                    نویسنده
                                    <span className="text-destructive">*</span>
                                </label>
                                <Select
                                    id="news-author"
                                    value={values.author_id}
                                    onChange={(event) => updateField("author_id", +event.target.value)}
                                >
                                    <option value="">انتخاب نویسنده</option>
                                    {
                                        authors.map(author =>
                                            <option key={author.id} value={author.id}>
                                                {author.first_name} {author.last_name}
                                            </option>
                                        )
                                    }
                                </Select>

                                {
                                    authors.length === 0 &&
                                    <p className="text-xs text-amber-700">هیچ نویسنده‌ای در API ثبت نشده است.</p>
                                }
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="news-status" className="text-sm font-medium">
                                    وضعیت انتشار
                                </label>
                                <Select
                                    id="news-status"
                                    value={values.status}
                                    onChange={(event) => updateField("status", event.target.value as NewsStatus)}
                                >
                                    {
                                        NEWS_STATUS_OPTIONS.map(option =>
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>)
                                    }
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="news-image" className="text-sm font-medium">آدرس تصویر</label>
                                <Input
                                    id="news-image"
                                    value={values.image_url}
                                    onChange={(event) => updateField("image_url", event.target.value)} dir="ltr"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="news-summary" className="text-sm font-medium">
                                خلاصه خبر
                                <span className="text-destructive">*</span>
                            </label>
                            <Textarea
                                id="news-summary"
                                rows={3}
                                value={values.summary}
                                onChange={(event) => updateField("summary", event.target.value)}
                                placeholder="یک خلاصه کوتاه از خبر بنویسید"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="news-content" className="text-sm font-medium">
                                متن خبر
                                <span className="text-destructive">*</span>
                            </label>
                            <Textarea
                                id="news-content"
                                rows={10}
                                value={values.content}
                                onChange={(event) => updateField("content", event.target.value)}
                                placeholder="متن کامل خبر را بنویسید"
                            />

                            <p className="text-xs text-muted-foreground">این نسخه متن را به‌صورت ساده ارسال می‌کند؛
                                ویرایشگر متن غنی در کد فعلی پروژه وجود ندارد.
                            </p>
                        </div>

                        {
                            (formError || serverError) &&
                            <p role="alert" className="rounded-lg bg-destructive/5 px-3 py-2 text-sm text-destructive">
                                {formError || serverError?.message}
                            </p>
                        }

                        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
                            <Button type="submit"
                                    disabled={isSaving || categories.length === 0 || authors.length === 0}
                            >
                                <Save className="size-4"/>
                                {isSaving ? "در حال ذخیره..." : editing ? "ذخیره تغییرات" : "ثبت خبر"}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => router.push("/admin/news")}>
                                انصراف
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
