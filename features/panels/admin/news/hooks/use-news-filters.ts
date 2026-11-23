"use client";

import { useMemo, useState } from "react";
import {AdminNews, NewsStatus} from "@/features/panels/admin/types/admin.types";

export function useNewsFilters(news: AdminNews[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<NewsStatus | "all">("all");

  const filteredNews = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return news.filter((item) => {
      const matchesSearch = !query ||
        item.title.toLocaleLowerCase().includes(query) ||
        item.slug.toLocaleLowerCase().includes(query);
      const matchesStatus = status === "all" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [news, search, status]);

  return { search, setSearch, status, setStatus, filteredNews };
}
