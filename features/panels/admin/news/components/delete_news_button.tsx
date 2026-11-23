"use client";

import {Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useDeleteNews} from "@/queries/news.queries";

interface DeleteNewsButtonProps {
    id: number;
    title?: string;
}

export default function Delete_news_button({id, title}: DeleteNewsButtonProps) {
    const mutation = useDeleteNews();

    function handleDelete() {
        const confirmed = window.confirm(`خبر «${title}» حذف شود؟`);
        if (confirmed) mutation.mutate(id);
    }

    return (
        <div className="flex flex-col items-start gap-1">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                disabled={mutation.isPending}
                onClick={handleDelete}
                aria-label={`حذف خبر ${title}`}
            >
                <Trash2 className="size-4"/>
            </Button>
            {
                mutation.error &&
                <span role="alert" className="max-w-32 text-[10px] text-destructive">
                    {mutation.error.message}
                </span>
            }
        </div>
    );
}
