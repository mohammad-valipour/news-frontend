import {
  LayoutDashboard,
  FileText,
  UserRound,
} from "lucide-react";

export const AUTHOR_NAVIGATION = [
  { label: "داشبورد", href: "/author", icon: LayoutDashboard },
  { label: "نوشته‌های من", href: "/author/articles", icon: FileText },
  { label: "پروفایل", href: "/author/profile", icon: UserRound },
];

export const ARTICLE_STATUS_LABELS = {
  published: "منتشر شده",
  draft: "پیش‌نویس",
} as const;
