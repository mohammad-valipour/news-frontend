
interface AboutMissionProps {
    title: string;
    description: string;
    secondaryDescription: string;
}

export default function AboutMission({title, description, secondaryDescription}: AboutMissionProps) {
    return (
        <section className="grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:gap-16">

            <div className="space-y-5">
                <span className="text-sm font-semibold text-primary">
                    مأموریت ما
                </span>

                <h2 className="text-2xl font-bold leading-relaxed text-foreground sm:text-3xl">
                    {title}
                </h2>

                <p className="text-sm leading-9 text-muted-foreground sm:text-base">
                    {description}
                </p>

                <p className="text-sm leading-9 text-muted-foreground sm:text-base">
                    {secondaryDescription}
                </p>
            </div>

            <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-3xl bg-primary p-8 sm:min-h-80">

                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/20" />

                <div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full border border-white/20" />

                <div className="relative max-w-sm text-center">
                    <span className="text-6xl font-black text-white/20">
                        NEWS
                    </span>

                    <p className="mt-5 text-2xl font-bold leading-relaxed text-white">
                        آگاهی، نخستین قدم برای ساختن آینده‌ای بهتر است.
                    </p>
                </div>

            </div>
        </section>
    );
}
