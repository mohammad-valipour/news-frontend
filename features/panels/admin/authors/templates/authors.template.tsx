"use client";

import Error_state from "@/components/share/error_state";
import Admin_page_header from "@/components/share/admin_page_header";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formatDate, formatNumber} from "@/lib/format";
import Empty_state from "@/components/share/empty_state";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Pencil, Trash, Users} from "lucide-react";
import {useAuthors} from "@/queries/authors.queries";
import {UserTypes} from "@/types/user.types";
import {AUTHOR_ROLE_LABELS} from "@/features/panels/admin/components/admin-shell";

export default function AuthorsTemplate() {
    const authorsQuery = useAuthors();

    if (authorsQuery.isLoading) {
        return <p className="py-20 text-center text-sm text-muted-foreground">در حال دریافت نویسندگان...</p>;
    }

    if (authorsQuery.error) {
        return <Error_state
            message={authorsQuery.error.message}
            onRetry={() => authorsQuery.refetch()}
        />;
    }

    const authors: UserTypes[] = authorsQuery.data ?? [];

    return (
        <>
            <Admin_page_header title="نویسندگان" description="فهرست حساب‌های ثبت‌شده در API را مشاهده کنید."/>

            <Card className="border border-border bg-card shadow-none">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
                    <div>
                        <CardTitle>فهرست کاربران</CardTitle>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {formatNumber(authors.length)} کاربر
                        </p>
                    </div>
                    <span className="rounded-lg bg-primary/10 p-2 text-primary">
                        <Users className="size-5"/>
                    </span>
                </CardHeader>

                <CardContent className="p-0">
                    {
                        authors.length === 0 ?
                            <Empty_state
                                title="کاربری ثبت نشده است"
                                description="پس از ثبت کاربران در API، اطلاعات آن‌ها در این بخش نمایش داده می‌شود."
                            />
                            :
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>نام و نام خانوادگی</TableHead>
                                        <TableHead>ایمیل</TableHead>
                                        <TableHead>نقش</TableHead>
                                        <TableHead>تاریخ عضویت</TableHead>
                                        <TableHead>شناسه</TableHead>
                                        <TableHead>عملیات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        authors.map(author =>
                                            <TableRow key={author.id}>
                                                <TableCell
                                                    className="font-semibold">
                                                    {author.first_name} {author.last_name}
                                                </TableCell>
                                                <TableCell dir="ltr"
                                                           className="text-right text-muted-foreground">
                                                    {author.email}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                                                        {AUTHOR_ROLE_LABELS[author.role] ?? author.role}
                                                    </span>
                                                </TableCell>
                                                <TableCell
                                                    className="text-muted-foreground">
                                                    {formatDate(author.created_at)}
                                                </TableCell>
                                                <TableCell
                                                    className="tabular-nums text-muted-foreground">
                                                    {formatNumber(author.id)}
                                                </TableCell>
                                                <TableCell
                                                    className="flex justify-center items-center gap-4">
                                                    <Pencil className="size-4 text-warning"/>
                                                    <Trash className="size-4 text-danger"/>
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
