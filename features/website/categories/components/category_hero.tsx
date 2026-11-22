
interface CategoryHeroProps {
    title: string;
    description: string;
}

export default function CategoryHero({
                                         title,
                                         description,
                                     }: CategoryHeroProps) {

    return (
        <section className="
            relative overflow-hidden
            rounded-3xl border border-border
            bg-surface px-6 py-12
            text-center sm:px-12 sm:py-16
        ">

            <div className="
                absolute -right-20 -top-20
                h-56 w-56 rounded-full
                bg-primary/10 blur-3xl
            " />

            <div className="relative mx-auto max-w-2xl space-y-4">

                <span className="
                    inline-flex rounded-full
                    bg-primary/10 px-4 py-2
                    text-sm font-medium text-primary
                ">
                    دسته‌بندی‌های نیوز
                </span>

                <h1 className="
                    text-2xl font-extrabold
                    leading-relaxed text-foreground
                    sm:text-4xl
                ">
                    {title}
                </h1>

                <p className="
                    text-sm leading-8
                    text-muted-foreground sm:text-base
                ">
                    {description}
                </p>

            </div>

        </section>
    );
}
