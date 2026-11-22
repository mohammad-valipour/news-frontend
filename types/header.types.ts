import type { LucideIcon } from "lucide-react";

export interface NavbarType {
    id: string;
    label: string;
    url: string;
    icon: LucideIcon;
}

export interface HeaderType {
    logo: string;
    navbar: NavbarType[];
}