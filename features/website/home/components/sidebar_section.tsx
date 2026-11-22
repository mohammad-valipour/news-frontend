import SidebarCategories from "@/features/website/home/components/sidebar_categories";

export default function SidebarSection() {
    return (
        <aside className="hidden lg:block w-64 space-y-6 border border-border rounded-2xl p-6">
             <SidebarCategories/>
        </aside>
    );
}