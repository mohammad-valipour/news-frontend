import { Badge } from "@/components/ui/badge";
import type { ArticleStatus } from "@/features/panels/author/types/author.types";

export default function ArticleStatusBadge({ status }: { status: ArticleStatus }) {
  return (
    <Badge
      variant="outline"
      className={status === "published"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-amber-200 bg-amber-50 text-amber-700"}
    >
      <span className={`ml-1.5 size-1.5 rounded-full ${status === "published" ? "bg-emerald-500" : "bg-amber-500"}`} />
      {status === "published" ? "منتشر شده" : "پیش‌نویس"}
    </Badge>
  );
}
