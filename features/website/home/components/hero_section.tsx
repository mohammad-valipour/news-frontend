import Slider from "@/features/website/home/components/slider";

export default function HeroSection() {
    return (
        <section className="w-full">
            <div className="h-65 overflow-hidden rounded-2xl sm:h-90 lg:h-115">
                <Slider />
            </div>
        </section>
    );
}

