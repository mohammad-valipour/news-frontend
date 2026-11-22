
interface ContactHeroProps {
    eyebrow: string;
    title: string;
    description: string;
}

export default function ContactHero({eyebrow, title, description}: ContactHeroProps) {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl space-y-5">

                <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    {eyebrow}
                </span>

                <h1 className="text-3xl font-extrabold leading-[1.7] text-foreground sm:text-4xl">
                    {title}
                </h1>

                <p className="text-sm leading-9 text-muted-foreground sm:text-base">
                    {description}
                </p>

            </div>
        </section>
    );
}
