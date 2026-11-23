import {Badge} from "@/components/ui/badge";

export const NEWS_STATUS_LABELS: Record<"draft" | "published", string> = {
    draft: "پیش‌نویس",
    published: "منتشر شده",
};

interface StatusBadgeProps {
    status: "draft" | "published";
}

export default function Status_badge({status}: StatusBadgeProps) {
    const published: boolean = status === "published";

    return (
        <Badge
            variant="outline"
            className={published
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-amber-200 bg-amber-50 text-amber-700"}
        >
            <span className={`me-1.5 size-1.5 rounded-full ${published ? "bg-emerald-500" : "bg-amber-500"}`}/>
            {
                NEWS_STATUS_LABELS[status]
            }
        </Badge>
    );
}
