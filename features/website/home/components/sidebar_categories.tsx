"use client";

import {useCategories} from "@/features/website/home/queries/category.queries";
import {FolderOpen, Loader2, RefreshCw} from "lucide-react";
import CategoryList from "@/features/website/home/components/category_list";

export default function SidebarCategories() {
    const {data: categories, isLoading, isError, refetch} = useCategories();

    return (
        <section className="space-y-3">
            <div className="flex items-center gap-2">
                <FolderOpen size={18}/>

                <h3 className="text-sm font-semibold">
                    دسته‌بندی‌ها
                </h3>
            </div>

            {
                isLoading && <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
                    <Loader2 size={16} className="animate-spin"/>
                    در حال دریافت دسته‌بندی‌ها...
                </div>
            }

            {
                isError && <div className="space-y-2">
                    <p className="text-sm text-destructive">
                        دریافت دسته‌بندی‌ها ناموفق بود.
                    </p>

                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="flex items-center gap-2 text-sm text-primary"
                    >
                        <RefreshCw size={14}/>
                        تلاش مجدد
                    </button>
                </div>
            }

            {
                !isLoading && !isError && <CategoryList categories={categories ?? []}/>
            }
        </section>
    );
}