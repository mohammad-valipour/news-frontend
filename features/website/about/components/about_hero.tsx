
interface AboutHeroProps {
    eyebrow: string;
    title: string;
    description: string;
}

export default function AboutHero({eyebrow, title, description}: AboutHeroProps) {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">

            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl space-y-6">

                <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    {eyebrow}
                </span>

                <h1 className="text-3xl font-extrabold leading-[1.7] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                    {title}
                </h1>

                <p className="mx-auto max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base sm:leading-9">
                    {description}
                </p>

            </div>
        </section>
    );
}
