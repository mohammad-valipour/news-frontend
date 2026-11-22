
import Link from "next/link";
import { ArrowUpLeft, Mail, MessageSquare } from "lucide-react";

interface ContactInfoProps {
    items: {
        id: number;
        title: string;
        value: string;
        description: string;
        href: string;
    }[];
}

const icons = [Mail, MessageSquare];

export default function ContactInfo({ items }: ContactInfoProps) {
    return (
        <section className="space-y-5">

            <div>
                <h2 className="text-xl font-bold text-foreground">
                    راه‌های ارتباطی
                </h2>

                <p className="mt-2 text-sm leading-8 text-muted-foreground">
                    برای ارتباط با تیم رسانه می‌توانید از روش‌های زیر استفاده کنید.
                </p>
            </div>

            <div className="grid gap-4">
                {items.map((item, index) => {
                    const Icon = icons[index % icons.length];

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-md"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon size={23} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-foreground">
                                    {item.title}
                                </h3>

                                <p className="mt-2 break-words text-sm font-medium text-primary">
                                    {item.value}
                                </p>

                                <p className="mt-2 text-xs leading-7 text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>

                            <ArrowUpLeft
                                size={18}
                                className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                            />
                        </Link>
                    );
                })}
            </div>

        </section>
    );
}
