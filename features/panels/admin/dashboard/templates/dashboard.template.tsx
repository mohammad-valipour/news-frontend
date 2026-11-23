"use client";

import Admin_page_header from "@/components/share/admin_page_header";
import Link from "next/link";
import {ArrowLeft, FileText, Folder, Plus, Users} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formatDate, formatNumber} from "@/lib/format";
import {useNews} from "@/queries/news.queries";
import Empty_state from "@/components/share/empty_state";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Status_badge from "@/features/panels/admin/news/components/status_badge";
import {useCategories} from "@/queries/categories.queries";
import {NewsTypes} from "@/types/news.types";
import {CategoryType} from "@/types/category.types";
import {useAuthors} from "@/queries/authors.queries";
import Error_state from "@/components/share/error_state";
import {Button} from "@/components/ui/button";

export default function DashboardTemplate() {
    const newsQuery = useNews();
    const categoriesQuery = useCategories();
    const authorsQuery = useAuthors();

    const loading: boolean = newsQuery.isLoading || categoriesQuery.isLoading || authorsQuery.isLoading;
    const error: Error | null = newsQuery.error || categoriesQuery.error || authorsQuery.error;

    if (loading) {
        return <p className="py-20 text-center text-sm text-muted-foreground">در حال دریافت اطلاعات
            داشبورد...</p>;
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

    const news: NewsTypes[] = newsQuery.data ?? [];
    const categories: CategoryType[] = categoriesQuery.data ?? [];
    const publishedCount: number = news.filter(item => item.status === "published").length;
    const draftCount: number = news.filter(item => item.status === "draft").length;

    const stats = [
        {title: "کل اخبار", value: news.length, caption: "تمام خبرهای ثبت‌شده", icon: FileText},
        {title: "منتشرشده", value: publishedCount, caption: "خبرهای قابل نمایش در سایت", icon: FileText},
        {title: "پیش‌نویس‌ها", value: draftCount, caption: "خبرهای منتشرنشده", icon: FileText},
        {title: "دسته‌بندی‌ها", value: categories.length, caption: "گروه‌های محتوایی", icon: Folder},
        {title: "نویسندگان", value: 1, caption: "حساب‌های ثبت‌شده", icon: Users},
    ];
    return (
        <>
            <Admin_page_header
                title="نمای کلی"
                description="گزارش کوتاهی از وضعیت محتوای سایت نیوز."
                action={
                    <Button
                        render={
                            <Link href="/admin/news/new"/>
                        }>
                        <Plus className="size-4"/>
                        خبر جدید
                    </Button>
                }
            />

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {
                    stats.map(item => {
                        const Icon = item.icon;

                        return (
                            <Card key={item.title} className="border border-border bg-card shadow-none">
                                <CardContent className="flex items-start justify-between gap-3 p-5">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{item.title}</p>
                                        <p className="mt-3 text-2xl font-extrabold tabular-nums text-foreground">{formatNumber(item.value)}</p>
                                        <p className="mt-2 text-xs text-muted-foreground">{item.caption}</p>
                                    </div>
                                    <span
                                        className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon className="size-5"/>
                                </span>
                                </CardContent>
                            </Card>
                        );
                    })
                }
            </section>

            <Card className="mt-6 border border-border bg-card shadow-none">
                <CardHeader
                    className="flex flex-row items-center justify-between gap-3 border-b border-border px-5 py-4">
                    <div>
                        <CardTitle>آخرین خبرها</CardTitle>
                        <p className="mt-1 text-xs text-muted-foreground">آخرین خبرهایی که در پنل ثبت یا ویرایش
                            شده‌اند.</p>
                    </div>
                    <Link href="/admin/news"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                        همه خبرها
                        <ArrowLeft className="size-4"/>
                    </Link>
                </CardHeader>

                <CardContent className="p-0">
                    {
                        news!.length === 0 ?
                            <Empty_state
                                title="هنوز خبری ثبت نشده است"
                                description="اولین خبر سایت را ایجاد کنید تا در این بخش نمایش داده شود."
                            />
                            :
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>عنوان خبر</TableHead>
                                        <TableHead>وضعیت</TableHead>
                                        <TableHead>آخرین تغییر</TableHead>
                                        <TableHead>شناسه</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {
                                        news.map(item =>
                                            <TableRow key={item.id}>
                                                <TableCell className="max-w-95 truncate font-medium">
                                                    {item.title}
                                                </TableCell>
                                                <TableCell>
                                                    <Status_badge status={item.status}/>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {formatDate(item.updated_at)}
                                                </TableCell>
                                                <TableCell className="tabular-nums text-muted-foreground">
                                                    {formatNumber(+item.id)}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                    }
                </CardContent>
            </Card>
        </>
    );
}