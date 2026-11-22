
import {
    ShieldCheck,
    Eye,
    Scale,
    Clock,
} from "lucide-react";

interface AboutValuesProps {
    values: {
        id: number;
        title: string;
        description: string;
    }[];
}

const icons = [
    ShieldCheck,
    Eye,
    Scale,
    Clock,
];

export default function AboutValues({values}: AboutValuesProps) {
    return (
        <section className="py-12">

            <div className="mb-10 space-y-3 text-center">
                <span className="text-sm font-semibold text-primary">
                    اصول کاری ما
                </span>

                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                    ارزش‌هایی که به آن‌ها پایبندیم
                </h2>

                <p className="mx-auto max-w-2xl text-sm leading-8 text-muted-foreground">
                    اصولی که در تهیه و انتشار محتوا راهنمای فعالیت ما هستند.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((item, index) => {
                    const Icon = icons[index % icons.length];

                    return (
                        <div
                            key={item.id}
                            className="rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon size={24} />
                            </div>

                            <h3 className="mb-3 font-bold text-foreground">
                                {item.title}
                            </h3>

                            <p className="text-sm leading-8 text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>

        </section>
    );
}
