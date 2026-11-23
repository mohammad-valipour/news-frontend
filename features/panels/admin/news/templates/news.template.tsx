"use client";

import {useNews} from "@/queries/news.queries";
import {useCategories} from "@/queries/categories.queries";
import {useAuthors} from "@/queries/authors.queries";
import {NewsTypes} from "@/types/news.types";
import Error_state from "@/components/share/error_state";
import {CategoryType} from "@/types/category.types";
import Admin_page_header from "@/components/share/admin_page_header";
import Link from "next/link";
import {Pencil, Plus, Search} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select} from "@/components/ui/select";
import Empty_state from "@/components/share/empty_state";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Status_badge from "@/features/panels/admin/news/components/status_badge";
import {formatDate} from "@/lib/format";
import Delete_news_button from "@/features/panels/admin/news/components/delete_news_button";
import {Button} from "@/components/ui/button";
import {UserTypes} from "@/types/user.types";

export default function NewsTemplate() {
    const newsQuery = useNews();
    const categoriesQuery = useCategories();
    const authorsQuery = useAuthors();

    const news: NewsTypes[] = newsQuery.data ?? [];
    const categories: CategoryType[] = categoriesQuery.data ?? [];
    const authors: UserTypes[] = authorsQuery.data ?? [];

    const loading: boolean = newsQuery.isLoading || categoriesQuery.isLoading || authorsQuery.isLoading;
    const error: Error | null = newsQuery.error || categoriesQuery.error || authorsQuery.error;

    if (loading) {
        return <p className="py-20 text-center text-sm text-muted-foreground">در حال دریافت خبرها...</p>;
    }
    if (error) {
        return (
            <Error_state
                message={error.message}
                onRetry={() => {
                    newsQuery.refetch();
                    categoriesQuery.refetch();
                    authorsQuery.refetch();
                }}
            />
        );
    }


    return (
        <>
            <Admin_page_header
                title="مدیریت اخبار"
                description="خبرها را جست‌وجو، ویرایش، منتشر یا حذف کنید."
                action={
                    <Button
                        nativeButton={false}
                        render={
                            <Link href="/admin/news/new"/>
                        }>
                        <Plus className="size-4"/>
                        افزودن خبر
                    </Button>
                }
            />

            <Card className="border border-border bg-card shadow-none">
                <CardContent className="p-4 sm:p-5">
                    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_12rem]">

                        {/* Search */}
                        <div className="relative min-w-0">
                            <Search
                                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                            />

                            <Input
                                value={""}
                                onChange={() => {
                                }}
                                placeholder="جست‌وجو در عنوان یا نشانی خبر..."
                                className="h-10 w-full pr-9"
                                aria-label="جست‌وجوی خبر"
                            />
                        </div>

                        {/* Status Filter */}
                        <Select
                            value={status}
                            onChange={() => {
                            }}
                            className="h-10 w-full"
                            aria-label="فیلتر وضعیت خبر"
                        >
                            <option value="all">همه وضعیت‌ها</option>
                            <option value="published">منتشر شده</option>
                            <option value="draft">پیش‌نویس</option>
                        </Select>

                    </div>

                    {
                        news.length === 0 ?
                            <Empty_state
                                title={news.length === 0 ? "هنوز خبری وجود ندارد" : "خبری پیدا نشد"}
                                description={news.length === 0 ? "برای شروع، اولین خبر را اضافه کنید." : "عبارت جست‌وجو یا فیلتر وضعیت را تغییر دهید."}
                            />
                            :
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>خبر</TableHead>
                                        <TableHead>دسته‌بندی</TableHead>
                                        <TableHead>نویسنده</TableHead>
                                        <TableHead>وضعیت</TableHead>
                                        <TableHead>تاریخ ویرایش</TableHead>
                                        <TableHead>عملیات</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {
                                        news.map(item => {
                                            const category = categories.find((value) => value.id === item.category_id);
                                            const author = authors.find((value) => value.id === item.author_id);
                                            const authorName = author ? `${author.first_name} ${author.last_name}` : "—";

                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell className="min-w-48 max-w-70">
                                                        <p className="truncate font-semibold">{item.title}</p>
                                                        <p className="mt-1 truncate text-xs text-muted-foreground">{item.slug}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        {category?.name ?? "—"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {authorName}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Status_badge status={item.status}/>
                                                    </TableCell>
                                                    <TableCell
                                                        className="text-muted-foreground">
                                                        {formatDate(item.updated_at)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <Button
                                                                nativeButton={false}
                                                                render={
                                                                    <Link
                                                                        href={`/admin/news/${item.id}/edit`}/>
                                                                }
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-primary"
                                                            >
                                                                <Pencil className="size-4"/>
                                                            </Button>
                                                            <Delete_news_button id={+item.id}/>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                    }
                </CardContent>
            </Card>
        </>
    );
}
