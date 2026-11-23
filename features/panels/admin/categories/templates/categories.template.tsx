"use client";

import {useState, type FormEvent} from "react";
import {Plus, Folder} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Error_state from "@/components/share/error_state";
import Admin_page_header from "@/components/share/admin_page_header";
import {formatDate, formatNumber} from "@/lib/format";
import Empty_state from "@/components/share/empty_state";
import {useCategories, useCreateCategory} from "@/queries/categories.queries";
import {useNews} from "@/queries/news.queries";
import {CategoryType} from "@/types/category.types";
import {NewsTypes} from "@/types/news.types";
import {validateCategory} from "@/features/panels/admin/categories/validations/categories.validations";

export default function CategoriesTemplate() {
    const categoriesQuery = useCategories();
    const newsQuery = useNews();
    const createCategory = useCreateCategory();
    const categories: CategoryType[] = categoriesQuery.data ?? [];
    const news: NewsTypes[] = newsQuery.data ?? [];

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [formError, setFormError] = useState("");

    if (categoriesQuery.isLoading || newsQuery.isLoading) {
        return <p className="py-20 text-center text-sm text-muted-foreground">در حال دریافت دسته‌بندی‌ها...</p>;
    }

    const error = categoriesQuery.error || newsQuery.error;
    if (error) {
        return <Error_state message={error.message} onRetry={() => {
            categoriesQuery.refetch();
            newsQuery.refetch();
        }}/>;
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormError("");

        const category = {
            name: name.trim(),
            slug: slug.trim()
        };

        const validationError = validateCategory(category);
        if (validationError) {
            setFormError(validationError);
            return;
        }

        // @ts-ignore
        createCategory.mutate(category, {
            onSuccess: () => {
                setName("");
                setSlug("");
            },
        });
    }

    return (
        <>
            <Admin_page_header title="دسته‌بندی‌ها"
                               description="دسته‌بندی‌های محتوای سایت را مشاهده و دسته‌بندی جدید ایجاد کنید."
            />

            <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
                <Card className="border border-border bg-card shadow-none">
                    <CardHeader className="border-b border-border px-5 py-4">
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="size-4 text-primary"/>
                            دسته‌بندی جدید
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="category-name" className="text-sm font-medium">
                                    نام دسته‌بندی
                                </label>
                                <Input
                                    id="category-name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="مثلاً فناوری"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="category-slug" className="text-sm font-medium">
                                    نشانی (Slug)
                                </label>
                                <Input
                                    id="category-slug"
                                    dir="ltr"
                                    value={slug}
                                    onChange={(event) => setSlug(event.target.value)}
                                    placeholder="technology"
                                />
                            </div>
                            {
                                (formError || createCategory.error) &&
                                <p role="alert"
                                   className="rounded-lg bg-destructive/5 px-3 py-2 text-sm text-destructive">
                                    {formError || createCategory.error?.message}
                                </p>
                            }

                            {
                                createCategory.isSuccess &&
                                <p className="text-sm text-emerald-700">دسته‌بندی با موفقیت ایجاد شد.</p>
                            }
                            <Button type="submit" className="w-full" disabled={createCategory.isPending}>
                                <Plus className="size-4"/>
                                {
                                    createCategory.isPending ? "در حال ثبت..." : "ثبت دسته‌بندی"
                                }
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="border border-border bg-card shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
                        <div>
                            <CardTitle>فهرست دسته‌بندی‌ها</CardTitle>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {formatNumber(categories.length)}
                                دسته‌بندی ثبت شده
                            </p>
                        </div>
                        <span className="rounded-lg bg-primary/10 p-2 text-primary">
                            <Folder className="size-5"/>
                        </span>
                    </CardHeader>
                    <CardContent className="p-0">
                        {
                            categories.length === 0 ?
                                <Empty_state title="دسته‌بندی‌ای وجود ندارد"
                                             description="از فرم کنار صفحه اولین دسته‌بندی را بسازید."
                                />
                                :
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>نام</TableHead>
                                            <TableHead>نشانی</TableHead>
                                            <TableHead>تعداد خبر</TableHead>
                                            <TableHead>تاریخ ایجاد</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            categories.map(category =>
                                                <TableRow key={category.id}>
                                                    <TableCell className="font-semibold">{category.name}</TableCell>
                                                    <TableCell dir="ltr" className="text-right text-muted-foreground">
                                                        {category.slug}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatNumber(news.filter(item => item.category_id === category.id).length)}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {formatDate(category.created_at)}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                        }
                    </CardContent>
                </Card>
            </div>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">طبق API فعلی پروژه، برای دسته‌بندی فقط عملیات
                مشاهده، دریافت جزئیات و ایجاد وجود دارد؛ ویرایش و حذف در این صفحه نمایش داده نمی‌شود.
            </p>
        </>
    );
}
