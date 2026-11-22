import type { HeaderType } from "@/types/header.types";

import {
    House,
    LayoutGrid,
    Headset,
    Info,
} from "lucide-react";

export const HEADER: HeaderType = {
    logo: "/images/logo.png",

    navbar: [
        {
            id: "home",
            label: "خانه",
            url: "/",
            icon: House,
        },
        {
            id: "categories",
            label: "دسته‌بندی‌ها",
            url: "/categories",
            icon: LayoutGrid,
        },
        {
            id: "contact",
            label: "تماس با ما",
            url: "/contact",
            icon: Headset,
        },
        {
            id: "about",
            label: "درباره ما",
            url: "/about",
            icon: Info,
        },
    ],
};