import HeroSection from "@/features/website/home/components/hero_section";
import SidebarSection from "@/features/website/home/components/sidebar_section";
import NewsSection from "@/features/website/home/components/news_section";

export default function HomeTemplate() {
    return (
        <main className="my-10 space-y-20">
            <HeroSection/>

            <div className="flex gap-6">
                <SidebarSection/>

                <NewsSection/>
            </div>
        </main>
    );
}